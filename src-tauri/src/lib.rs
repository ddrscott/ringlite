use tauri::Manager;

mod licensing;

#[cfg(target_os = "macos")]
mod macos {
    use cocoa::base::{id, NO};
    use objc::{msg_send, sel, sel_impl, class};

    // NSWindowSharingType enum values
    const NS_WINDOW_SHARING_NONE: u64 = 0;

    pub fn exclude_from_capture(ns_window: id) {
        unsafe {
            let _: () = msg_send![ns_window, setSharingType: NS_WINDOW_SHARING_NONE];
        }
    }

    pub fn disable_window_shadow(ns_window: id) {
        unsafe {
            let _: () = msg_send![ns_window, setHasShadow: NO];
        }
    }

    pub fn get_global_mouse_position() -> (f64, f64) {
        unsafe {
            let ns_event = class!(NSEvent);
            let mouse_location: cocoa::foundation::NSPoint = msg_send![ns_event, mouseLocation];
            // NSEvent mouseLocation returns screen coordinates with origin at bottom-left
            // We need to flip Y to get top-left origin
            let screens: id = msg_send![class!(NSScreen), screens];
            let main_screen: id = msg_send![screens, objectAtIndex: 0_usize];
            let frame: cocoa::foundation::NSRect = msg_send![main_screen, frame];
            let screen_height = frame.size.height;
            (mouse_location.x, screen_height - mouse_location.y)
        }
    }
}

#[cfg(target_os = "windows")]
mod windows_impl {
    use windows::Win32::Foundation::HWND;
    use windows::Win32::UI::WindowsAndMessaging::{SetWindowDisplayAffinity, WDA_EXCLUDEFROMCAPTURE};

    pub fn exclude_from_capture(hwnd: isize) {
        unsafe {
            let _ = SetWindowDisplayAffinity(HWND(hwnd as *mut _), WDA_EXCLUDEFROMCAPTURE);
        }
    }
}

#[tauri::command]
fn get_cursor_position() -> (f64, f64) {
    #[cfg(target_os = "macos")]
    {
        macos::get_global_mouse_position()
    }
    #[cfg(not(target_os = "macos"))]
    {
        (0.0, 0.0) // TODO: implement for other platforms
    }
}

fn setup_capture_exclusion(app: &tauri::App) {
    let window = app.get_webview_window("main").expect("Failed to get main window");

    #[cfg(target_os = "macos")]
    {
        use cocoa::base::id;
        if let Ok(ns_window) = window.ns_window() {
            let ns_window = ns_window as id;
            macos::exclude_from_capture(ns_window);
            macos::disable_window_shadow(ns_window);
        }
    }

    #[cfg(target_os = "windows")]
    {
        if let Ok(hwnd) = window.hwnd() {
            windows_impl::exclude_from_capture(hwnd.0 as isize);
        }
    }

    #[cfg(target_os = "linux")]
    {
        eprintln!("Linux: Screen capture exclusion not supported");
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .invoke_handler(tauri::generate_handler![
            licensing::get_license_status,
            licensing::increment_use_count,
            licensing::activate_license,
            licensing::should_show_nag,
            get_cursor_position,
        ])
        .setup(|app| {
            setup_capture_exclusion(app);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
