console.log("YouTube Autopause Bypass content script loaded.");

let popupTimeout = null;

function simulateHumanClick(button) {
  const evtOptions = { bubbles: true, cancelable: true };

  // Simulate full click sequence
  button.dispatchEvent(new MouseEvent("mouseover", evtOptions));
  button.dispatchEvent(new MouseEvent("mousedown", evtOptions));
  button.dispatchEvent(new MouseEvent("mouseup", evtOptions));
  button.dispatchEvent(new MouseEvent("click", evtOptions));
}

function tryDismissPopup() {
  // Search for any visible button that contains "Yes" text
  const buttons = Array.from(document.querySelectorAll('button'))
    .filter(btn => btn.innerText.trim().toLowerCase() === "yes");
	
  if (buttons.length === 0) return;

  const button = buttons[0];
  
  if (buttons[0].getClientRects().length === 0) return;

  console.log("trying to dismiss")
  const delay = Math.floor(Math.random() * 500) + 400;
  console.log(`YouTube pause popup detected. Clicking in ${delay}ms...`);
  popupTimeout = true;

  setTimeout(() => {
    if (document.body.contains(button)) {
      simulateHumanClick(button);
      console.log("YouTube auto-pause popup dismissed.");
    }
    popupTimeout = null;
  }, delay);
}

// MutationObserver watches DOM for popups
const observer = new MutationObserver(() => {
  if (!popupTimeout) {
    tryDismissPopup();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Initial run
tryDismissPopup();