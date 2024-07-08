export const handleIncreaseSize = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            document.querySelector("body").style.background = "#444"

            var allSmallButtons = document.querySelectorAll(".main_center .main_elem")[1].querySelectorAll("sub a")
            var defaultSize = allSmallButtons[0].style.fontSize
            allSmallButtons.forEach(oneEl => {
                if (defaultSize == "2px") {

                    oneEl.style.fontSize = "15px"
                } else {
                    oneEl.style.fontSize = "2px"

                }
            })

        }
    })
};

export const handleAutocomplete = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            document.querySelector("body").style.background = "#444"

            var table = Array.from(document.querySelectorAll(".main_center .main_elem")[1].querySelectorAll("tr"));
            table = table.filter(el => el.children.length > 9);
            table = table.slice(1);// Removing the first element which is the table header
            // This function will work as follows:
            // We will take the table and sort it in groups (based on PartNumber) and the first row will represent the leader which will have the key information which
            // will be later filled in the other empty slots

            var GroupLeaderArray; // the TR which has 13 elements
            table.forEach(tr => {
                // console.log(tr.children[0].innerText);
                if (tr.children.length == 13) {
                    //Leader
                    //
                    GroupLeaderArray = tr.children;

                    console.log("=============================  End Group =============================== ")
                } else if (tr.children.length == 10) {
                    //Simole row in the group
                    //
                    Array.from(tr.children).forEach((subElem, index) => {
                        if (index != 0 && index != 9 && index != 3) {
                            var ElementOfInterest = subElem.querySelector("span")
                            // console.log(ElementOfInterest.innerText)
                            if (ElementOfInterest.innerText == "" || ElementOfInterest.innerText === "\u00A0") {
                                console.log(ElementOfInterest)
                                // ElementOfInterest.innerText = "xxxx"
                                ElementOfInterest.setAttribute("data-value", '\u00A0');

                                // Create the input element
                                const inputElement = document.createElement('input');
                                inputElement.setAttribute('type', 'edit');
                                inputElement.setAttribute('id', 'd-sndefect-2');
                                inputElement.setAttribute('class', 'Spanac');
                                inputElement.setAttribute('value', '');
                                inputElement.setAttribute('onkeydown', 'return ipe_process_key(this);');
                                // Append the input element to the span element
                                var filling = GroupLeaderArray[index + 3].querySelector("span").innerText
                                inputElement.value = filling

                                ElementOfInterest.appendChild(inputElement);

                                const EnterEvent = new KeyboardEvent('keydown', {
                                    key: 'Enter',
                                    code: 'Enter',
                                    which: 13,
                                    keyCode: 13,
                                });
                                inputElement.dispatchEvent(EnterEvent);

                            }
                        } else if (index == 3) {
                            //Repaired Checkbox
                        }

                    })
                    console.log("===================  End row =====================i")
                }
            });

            // ========= ** Dont delete ** ===========
            //
            // const EnterEvent = new KeyboardEvent('keydown', {
            //     key: 'Enter',
            //     code: 'Enter',
            //     which: 13,
            //     keyCode: 13,
            // });

            // document.querySelector("#buttonWWW").click();
            // document.getElementById('TextAreaId').dispatchEvent(EnterEvent);
        }
    })

};






export const handleDecomplete = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            document.querySelector("body").style.background = "#444"

            var exampleInput = document.querySelector(".Spanac")
            console.log(exampleInput)


            const EnterEvent = new KeyboardEvent('keydown', {
                key: 'Enter',
                code: 'Enter',
                which: 13,
                keyCode: 13,
            });
            exampleInput.dispatchEvent(EnterEvent);

        }
    })
};

