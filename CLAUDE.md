# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is RingLite?

A virtual ring light for video recording built with Tauri 2.0. The ring is invisible to screen recorders on macOS and Windows using platform-specific APIs.

## Commands

```bash
npm run dev      # Run in development mode with hot reload
npm run build    # Build release binaries (outputs to src-tauri/target/release/bundle/)
```

## Architecture

**Frontend** (`src/`): Vanilla HTML/CSS/JS
- `main.js` - Ring controls (drag, resize, keyboard), window management via Tauri APIs
- `styles.css` - Ring rendering with CSS box-shadow for glow effect
- Ring size persisted to localStorage

**Backend** (`src-tauri/`): Rust + Tauri 2.0
- `src/lib.rs` - Screen capture exclusion using platform-specific APIs:
  - macOS: `NSWindow.setSharingType(NSWindowSharingNone)` via cocoa/objc crates
  - Windows: `SetWindowDisplayAffinity(WDA_EXCLUDEFROMCAPTURE)` via windows crate
  - Linux: Not supported

**Key Config** (`tauri.conf.json`):
- `macOSPrivateApi: true` required for `ns_window()` access
- Window: transparent, no decorations, always-on-top, skip taskbar

## Icon Generation

Icons are generated using ImageMagick. Base icon at `src-tauri/icons/icon.png` (512x512). The `.icns` is created via macOS `iconutil`.
