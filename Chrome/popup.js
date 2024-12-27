document.addEventListener("DOMContentLoaded", () => {
    const extractFormButton = document.getElementById("extractform");
    if (extractFormButton) {
        extractFormButton.addEventListener("click", () => {
            // Query the active tab
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs.length > 0) {
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        files: ["content.js"],
                    });
                } else {
                    console.error("No active tab found.");
                }
            });
        });
    } else {
        console.error("Button with ID 'extractForm' not found.");
    }

    document.querySelector(".version").innerHTML=`version `+chrome.runtime.getManifest().version
});
