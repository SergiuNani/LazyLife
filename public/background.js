chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // if (request.action === "getHTML") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const activeTab = tabs[0];
            chrome.scripting.executeScript(
                {
                    target: { tabId: activeTab.id },
                    function: () => {
                        let bodyHTML = document.querySelector("body .main_center")?.innerHTML;
                        return bodyHTML;
                    },
                },
                (results) => {
                    const bodyHTML = results[0].result;
                    sendResponse({ bodyHTML });
                }
            );
        } else {
            sendResponse({ bodyHTML: null });
        }
    });
    // } else if (request.action === "clickButtonWWW") {
    //     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //         if (tabs.length > 0) {
    //             const activeTab = tabs[0];
    //             chrome.scripting.executeScript(
    //                 {
    //                     target: { tabId: activeTab.id },
    //                     function: () => {
    //                         let button = document.getElementById("buttonWWW");
    //                         if (button) {
    //                             button.click();
    //                         }
    //                     },
    //                 }
    //             );
    //         }
    //     });
    // }

    return true; // Indicates that sendResponse will be asynchronously called
});
