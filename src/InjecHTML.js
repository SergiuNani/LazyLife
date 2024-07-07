export function makeTextArea() {
    console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF ")


    chrome.runtime.sendMessage({ action: "getHTML" }, (response) => {
        const bodyHTML = response.bodyHTML;
        // setHtmlContent(bodyHTML);
        document.querySelector("#IDID").innerHTML = bodyHTML
        console.log(bodyHTML)
    });

    document.querySelector("#IDID").innerHTML = "piula"
}
