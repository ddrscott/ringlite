use tauri::Manager;

mod licensing;

#[cfg(target_os = "macos")]
mod macos {
    use cocoa::appkit::NSWindow;
    use cocoa::base::id;
    use objc::{msg_send, sel, sel_impl};

    // NSWindowSharingType enum values
    const NS_WINDOW_SHARING_NONE: u64 = 0;

    pub fn exclude_from_capture(ns_window: id) {
        unsafe {
            let _: () = msg_send![ns_window, setSharingType: NS_WINDOW_SHARING_NONE];
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

fn setup_capture_exclusion(app: &tauri::App) {
    let window = app.get_webview_window("main").expect("Failed to get main window");

    #[cfg(target_os = "macos")]
    {
        use cocoa::base::id;
        if let Ok(ns_window) = window.ns_window() {
            macos::exclude_from_capture(ns_window as id);
            println!("macOS: Window excluded from screen capture");
        }
    }

    #[cfg(target_os = "windows")]
    {
        if let Ok(hwnd) = window.hwnd() {
            windows_impl::exclude_from_capture(hwnd.0 as isize);
            println!("Windows: Window excluded from screen capture");
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
        ])
        .setup(|app| {
            setup_capture_exclusion(app);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
