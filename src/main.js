const { getCurrentWindow } = window.__TAURI__.window;
const { exit } = window.__TAURI__.process;
const { invoke } = window.__TAURI__.core;

// Ring state
const DEFAULT_SIZE = 400;
const MIN_SIZE = 100;
const MAX_SIZE = 1600;
const SIZE_STEP = 20;
const NUDGE_STEP = 10;

let ringSize = loadSavedSize();
let ringThickness = ringSize * 0.1;
let ringX = loadSavedPosition().x;
let ringY = loadSavedPosition().y;

function loadSavedSize() {
  const saved = localStorage.getItem('ringSize');
  if (saved) {
    const size = parseInt(saved, 10);
    if (size >= MIN_SIZE && size <= MAX_SIZE) {
      return size;
    }
  }
  return DEFAULT_SIZE;
}

function loadSavedPosition() {
  const savedX = localStorage.getItem('ringX');
  const savedY = localStorage.getItem('ringY');
  return {
    x: savedX ? parseInt(savedX, 10) : window.innerWidth / 2,
    y: savedY ? parseInt(savedY, 10) : window.innerHeight / 2
  };
}

function saveSize() {
  localStorage.setItem('ringSize', ringSize.toString());
}

function savePosition() {
  localStorage.setItem('ringX', ringX.toString());
  localStorage.setItem('ringY', ringY.toString());
}

function loadSavedDim() {
  const saved = localStorage.getItem('dimOpacity');
  return saved ? parseInt(saved, 10) : 0;
}

function saveDim(value) {
  localStorage.setItem('dimOpacity', value.toString());
}

function loadSavedTemp() {
  const saved = localStorage.getItem('colorTemp');
  return saved ? parseInt(saved, 10) : 0;
}

function saveTemp(value) {
  localStorage.setItem('colorTemp', value.toString());
}

// DOM elements
let ring;
let brand;
let sliderLeft;
let sliderRight;
let bottomControls;
let help;
let appWindow;
let licenseModal;

// Initialize on DOM load
window.addEventListener("DOMContentLoaded", async () => {
  ring = document.getElementById("ring");
  brand = document.getElementById("brand");
  sliderLeft = document.getElementById("slider-left");
  sliderRight = document.getElementById("slider-right");
  bottomControls = document.getElementById("bottom-controls");
  help = document.getElementById("help");
  licenseModal = document.getElementById("license-modal");
  appWindow = getCurrentWindow();

  // Set window to fill screen (not fullscreen mode, just sized to screen)
  await appWindow.setSize({
    type: "Logical",
    width: window.screen.width,
    height: window.screen.height
  });
  await appWindow.setPosition({ type: "Logical", x: 0, y: 0 });

  // Apply initial size and position
  updateRingSize();
  updateRingPosition();

  // Setup click-through for non-ring areas
  setupClickThrough();

  // Setup drag to move ring
  setupDrag();

  // Setup keyboard controls
  setupKeyboard();

  // Setup scroll to resize
  setupScroll();

  // Setup background dim slider
  setupDimControl();

  // Setup temperature slider
  setupTempControl();

  // Setup help and quit buttons
  setupHelpButtons();

  // Setup licensing
  await setupLicensing();
});

function updateRingSize() {
  document.documentElement.style.setProperty("--ring-size", `${ringSize}px`);
  document.documentElement.style.setProperty("--ring-thickness", `${ringThickness}px`);
  document.documentElement.style.setProperty("--brand-font-size", `${Math.max(8, ringSize * 0.03)}px`);
}

function updateRingPosition() {
  // Simple 2D transform - avoid 3D transforms which can cause compositor artifacts on transparent windows
  ring.style.transform = `translate(${ringX - ringSize/2}px, ${ringY - ringSize/2}px)`;
  updateBrandPosition();
  updateSliderPositions();
  updateBottomControlsPosition();
  updateHelpPosition();
}

function updateBrandPosition() {
  if (!brand) return;
  // Position ON the ring at 12 o'clock (on the glowing part)
  const brandX = ringX;
  const brandY = ringY - ringSize/2 + ringThickness/2;
  brand.style.transform = `translate(${brandX}px, ${brandY}px) translate(-50%, -50%)`;
}

function updateSliderPositions() {
  // Left slider at 9 o'clock (on the ring)
  if (sliderLeft) {
    const leftX = ringX - ringSize/2 + ringThickness/2;
    const leftY = ringY;
    sliderLeft.style.transform = `translate(${leftX}px, ${leftY}px) translate(-50%, -50%)`;
  }

  // Right slider at 3 o'clock (on the ring)
  if (sliderRight) {
    const rightX = ringX + ringSize/2 - ringThickness/2;
    const rightY = ringY;
    sliderRight.style.transform = `translate(${rightX}px, ${rightY}px) translate(-50%, -50%)`;
  }
}

function updateBottomControlsPosition() {
  if (!bottomControls) return;
  // Position at 6 o'clock (on the ring)
  const controlsX = ringX;
  const controlsY = ringY + ringSize/2 - ringThickness/2;
  bottomControls.style.transform = `translate(${controlsX}px, ${controlsY}px) translate(-50%, -50%)`;
}

function updateHelpPosition() {
  if (!help) return;
  // Position inside the ring, near the bottom
  const helpX = ringX;
  const helpY = ringY + ringSize/2 - ringThickness - 60;
  help.style.transform = `translate(${helpX}px, ${helpY}px) translate(-50%, -50%)`;
}

// Click-through: ignore clicks on transparent areas, capture on ring
async function setupClickThrough() {
  let isIgnoring = true;
  appWindow.setIgnoreCursorEvents(true);

  // Poll global cursor position to toggle click-through
  // Uses native API that works even when window is ignoring events
  setInterval(async () => {
    try {
      const [x, y] = await invoke("get_cursor_position");
      const isOverRing = isPointOverRing(x, y);

      // Check UI elements at cursor position
      const elemAtPoint = document.elementFromPoint(x, y);
      const isOverUI = elemAtPoint && (elemAtPoint.closest('.ring-slider') || elemAtPoint.closest('#bottom-controls') || elemAtPoint.closest('#help') || elemAtPoint.closest('#license-modal'));

      const shouldCapture = isOverRing || isOverUI;

      if (shouldCapture && isIgnoring) {
        appWindow.setIgnoreCursorEvents(false);
        isIgnoring = false;
      } else if (!shouldCapture && !isIgnoring) {
        appWindow.setIgnoreCursorEvents(true);
        isIgnoring = true;
      }
    } catch (err) {
      // Cursor position fetch failed
    }
  }, 16); // ~60fps polling
}

function isPointOverRing(x, y) {
  // Ring center is at (ringX, ringY)
  const dx = x - ringX;
  const dy = y - ringY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Ring is a donut shape: outer radius - inner radius
  const outerRadius = ringSize / 2;
  const innerRadius = outerRadius - ringThickness;

  // Add some padding for the glow
  const glowPadding = 30;

  return distance <= outerRadius + glowPadding && distance >= innerRadius - glowPadding;
}

function resize(delta) {
  ringSize = Math.max(MIN_SIZE, Math.min(MAX_SIZE, ringSize + delta));
  ringThickness = Math.max(10, Math.min(100, ringSize * 0.1));
  updateRingSize();
  updateRingPosition(); // Re-center after resize
  saveSize();
}

// Drag to move ring element (from ring or help card)
function setupDrag() {
  let isDragging = false;
  let startMouseX, startMouseY;
  let startRingX, startRingY;

  function startDrag(e) {
    // Don't start drag on interactive elements
    if (e.target.closest('input, button, a, textarea')) return;

    if (e.button === 0) {
      isDragging = true;
      startMouseX = e.clientX;
      startMouseY = e.clientY;
      startRingX = ringX;
      startRingY = ringY;
      document.body.style.cursor = "grabbing";
    }
  }

  ring.addEventListener("mousedown", startDrag);

  window.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const dx = e.clientX - startMouseX;
      const dy = e.clientY - startMouseY;
      ringX = startRingX + dx;
      ringY = startRingY + dy;
      updateRingPosition();
    }
  });

  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      document.body.style.cursor = "";
      savePosition();
    }
  });
}

// Scroll to resize
function setupScroll() {
  window.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -SIZE_STEP : SIZE_STEP;
    resize(delta);
  }, { passive: false });
}

// Background dim control
function setupDimControl() {
  const slider = document.getElementById("dim-slider");

  // Load saved value
  const savedDim = loadSavedDim();
  slider.value = savedDim;
  updateDimOpacity(savedDim);

  // Handle slider changes
  slider.addEventListener("input", (e) => {
    const value = parseInt(e.target.value, 10);
    updateDimOpacity(value);
    saveDim(value);
  });
}

function updateDimOpacity(percent) {
  document.documentElement.style.setProperty("--dim-opacity", percent / 100);
}

// Temperature control (cool white to warm yellow)
function setupTempControl() {
  const slider = document.getElementById("temp-slider");

  // Load saved value
  const savedTemp = loadSavedTemp();
  slider.value = savedTemp;
  updateColorTemp(savedTemp);

  // Handle slider changes
  slider.addEventListener("input", (e) => {
    const value = parseInt(e.target.value, 10);
    updateColorTemp(value);
    saveTemp(value);
  });
}

function updateColorTemp(percent) {
  // 0 = cool white (slight blue), 100 = warm yellow
  // Interpolate from white to warm yellow
  const r = 255;
  const g = Math.round(255 - (percent * 0.15)); // slight decrease
  const b = Math.round(255 - (percent * 1.5));  // more decrease for warmth

  const color = `rgb(${r}, ${g}, ${b})`;
  document.documentElement.style.setProperty("--ring-color", color);
  document.documentElement.style.setProperty("--ring-glow", `rgba(${r}, ${g}, ${b}, 0.6)`);
}

// Control buttons
function setupHelpButtons() {
  document.getElementById("help-btn").addEventListener("click", () => {
    help.classList.toggle("hidden");
  });

  document.getElementById("quit-btn").addEventListener("click", () => {
    exit(0);
  });
}

// Keyboard controls
function setupKeyboard() {
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "Escape":
        exit(0);
        break;

      case "+":
      case "=":
        resize(SIZE_STEP);
        break;

      case "-":
      case "_":
        resize(-SIZE_STEP);
        break;

      case "h":
      case "H":
        help.classList.toggle("hidden");
        break;

      case "l":
      case "L":
        showLicenseModal();
        break;

      case "ArrowUp":
        e.preventDefault();
        nudgeRing(0, -NUDGE_STEP);
        break;

      case "ArrowDown":
        e.preventDefault();
        nudgeRing(0, NUDGE_STEP);
        break;

      case "ArrowLeft":
        e.preventDefault();
        nudgeRing(-NUDGE_STEP, 0);
        break;

      case "ArrowRight":
        e.preventDefault();
        nudgeRing(NUDGE_STEP, 0);
        break;
    }
  });
}

function nudgeRing(dx, dy) {
  ringX += dx;
  ringY += dy;
  updateRingPosition();
  savePosition();
}

// Licensing
async function setupLicensing() {
  // Increment use count
  const [isLicensed, useCount, maxFree] = await invoke("increment_use_count");

  // Update status display
  updateLicenseStatus(isLicensed, useCount, maxFree);

  // Check if we should show nag
  if (!isLicensed && useCount >= maxFree) {
    showLicenseModal();
  }

  // Setup modal event handlers
  const enterLicenseBtn = document.getElementById("enter-license-btn");
  const activateBtn = document.getElementById("activate-btn");
  const cancelLicenseBtn = document.getElementById("cancel-license-btn");
  const closeNagBtn = document.getElementById("close-nag-btn");
  const licenseInputSection = document.getElementById("license-input-section");
  const licenseKeyInput = document.getElementById("license-key-input");
  const licenseError = document.getElementById("license-error");
  const modalActions = document.querySelector(".modal-actions");

  enterLicenseBtn.addEventListener("click", () => {
    modalActions.classList.add("hidden");
    licenseInputSection.classList.remove("hidden");
    licenseKeyInput.focus();
  });

  cancelLicenseBtn.addEventListener("click", () => {
    modalActions.classList.remove("hidden");
    licenseInputSection.classList.add("hidden");
    licenseKeyInput.value = "";
    licenseError.classList.add("hidden");
  });

  activateBtn.addEventListener("click", async () => {
    const key = licenseKeyInput.value.trim();
    if (!key) {
      showLicenseError("Please enter a license key");
      return;
    }

    try {
      await invoke("activate_license", { licenseKey: key });
      hideLicenseModal();
      updateLicenseStatus(true, 0, 10);
    } catch (err) {
      showLicenseError(err);
    }
  });

  closeNagBtn.addEventListener("click", () => {
    hideLicenseModal();
  });

  function showLicenseError(message) {
    licenseError.textContent = message;
    licenseError.classList.remove("hidden");
  }
}

function showLicenseModal() {
  licenseModal.classList.remove("hidden");
}

function hideLicenseModal() {
  licenseModal.classList.add("hidden");
}

function updateLicenseStatus(isLicensed, useCount, maxFree) {
  const statusEl = document.getElementById("license-status");
  const licenseHelpItem = document.getElementById("license-help-item");

  if (isLicensed) {
    statusEl.textContent = "Thank you, Pro!";
    statusEl.className = "license-status pro";
    if (licenseHelpItem) licenseHelpItem.style.display = "none";
  } else {
    const remaining = Math.max(0, maxFree - useCount);
    statusEl.textContent = `${remaining} free uses remaining`;
    statusEl.className = "license-status trial";
    if (licenseHelpItem) licenseHelpItem.style.display = "";
  }
}
