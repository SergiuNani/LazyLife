export const handleAutocomplete = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            document.querySelector("body").style.background = "#444"

            const EnterEvent = new KeyboardEvent('keydown', {
                key: 'Enter',
                code: 'Enter',
                which: 13,
                keyCode: 13,
            });

            document.querySelector("#buttonWWW").click();
            document.getElementById('TextAreaId').dispatchEvent(EnterEvent);
        }
    })

};
