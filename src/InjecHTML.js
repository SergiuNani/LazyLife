export function makeTextArea() {
    console.log("yeeee ")


    chrome.runtime.sendMessage({ action: "getHTML" }, (response) => {
        const bodyHTML = response.bodyHTML;
        // setHtmlContent(bodyHTML);
        document.querySelector("#IDID").innerHTML = bodyHTML
        console.log(bodyHTML)
    });

    document.querySelector("#IDID").innerHTML = "piula"
}
