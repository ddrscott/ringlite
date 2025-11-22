const { getCurrentWindow } = window.__TAURI__.window;
const { exit } = window.__TAURI__.process;
const { invoke } = window.__TAURI__.core;

// Ring state
const DEFAULT_SIZE = 400;
const MIN_SIZE = 100;
const MAX_SIZE = 1600;
const SIZE_STEP = 20;
const NUDGE_STEP = 10;
const PADDING = 200; // Extra space for glow effect

let ringSize = loadSavedSize();
let ringThickness = ringSize * 0.1;

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

function saveSize() {
  localStorage.setItem('ringSize', ringSize.toString());
}

// DOM elements
let ring;
let help;
let appWindow;
let licenseModal;

// Initialize on DOM load
window.addEventListener("DOMContentLoaded", async () => {
  ring = document.getElementById("ring");
  help = document.getElementById("help");
  licenseModal = document.getElementById("license-modal");
  appWindow = getCurrentWindow();

  // Apply initial size
  updateRingSize();
  await updateWindowSize();

  // Setup drag to move window
  setupDrag();

  // Setup keyboard controls
  setupKeyboard();

  // Setup scroll to resize
  setupScroll();

  // Setup licensing
  await setupLicensing();

  // Hide help after 5 seconds
  setTimeout(() => {
    help.classList.add("hidden");
  }, 5000);
});

function updateRingSize() {
  document.documentElement.style.setProperty("--ring-size", `${ringSize}px`);
  document.documentElement.style.setProperty("--ring-thickness", `${ringThickness}px`);
}

async function updateWindowSize() {
  const windowSize = ringSize + PADDING;
  try {
    await appWindow.setSize({
      type: "Logical",
      width: windowSize,
      height: windowSize
    });
  } catch (err) {
    console.error("Failed to resize window:", err);
  }
}

async function resize(delta) {
  ringSize = Math.max(MIN_SIZE, Math.min(MAX_SIZE, ringSize + delta));
  // Scale thickness with size (roughly 10% of diameter)
  ringThickness = Math.max(10, Math.min(100, ringSize * 0.1));
  updateRingSize();
  await updateWindowSize();
  saveSize();
}

// Drag to move window
function setupDrag() {
  ring.addEventListener("mousedown", async (e) => {
    if (e.button === 0) {
      await appWindow.startDragging();
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

// Keyboard controls
function setupKeyboard() {
  window.addEventListener("keydown", async (e) => {
    switch (e.key) {
      case "Escape":
        await exit(0);
        break;

      case "+":
      case "=":
        await resize(SIZE_STEP);
        break;

      case "-":
      case "_":
        await resize(-SIZE_STEP);
        break;

      case "h":
      case "H":
        help.classList.toggle("hidden");
        break;

      case "ArrowUp":
        e.preventDefault();
        await nudgeWindow(0, -NUDGE_STEP);
        break;

      case "ArrowDown":
        e.preventDefault();
        await nudgeWindow(0, NUDGE_STEP);
        break;

      case "ArrowLeft":
        e.preventDefault();
        await nudgeWindow(-NUDGE_STEP, 0);
        break;

      case "ArrowRight":
        e.preventDefault();
        await nudgeWindow(NUDGE_STEP, 0);
        break;
    }
  });
}

async function nudgeWindow(dx, dy) {
  try {
    const pos = await appWindow.outerPosition();
    await appWindow.setPosition({
      type: "Physical",
      x: pos.x + dx,
      y: pos.y + dy
    });
  } catch (err) {
    console.error("Failed to nudge window:", err);
  }
}

// Licensing
async function setupLicensing() {
  // Increment use count
  const [isLicensed, useCount, maxFree] = await invoke("increment_use_count");

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
      const email = await invoke("activate_license", { licenseKey: key });
      hideLicenseModal();
      console.log("License activated for:", email);
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
