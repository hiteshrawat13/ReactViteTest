chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "FORM_DATA") {
        console.log("Form data received:", message.formsData);
    }
});
