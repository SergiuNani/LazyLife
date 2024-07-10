export const testChromeAPI = async () => {
    try {
        // Query the active tab in the current window
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        // Check if a tab is found
        if (!tab) {
            console.error("No active tab found");
            return;
        }

        // Execute script in the current tab
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                console.log("Chrome API works");
            }
        });
    } catch (error) {
        console.error("Error executing script: ", error);
    }
}

export const ModifyBackground = async () => {
    try {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                document.querySelector("body").style.background = "#444"
            }
        });
    } catch (error) {
        console.error("Error executing script: ", error);
    }
}
export const handleIncreaseSize = async () => {
    try {
        // Query the active tab in the current window
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        // Check if a tab is found
        if (!tab) {
            console.error("No active tab found");
            return;
        }
        // Execute script in the current tab
        await chrome.scripting.executeScript({
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
        });
    } catch (error) {
        console.error("Error executing script: ", error);
    }
}



export const handleAutocomplete = async () => {
    try {
        // Query the active tab in the current window
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        // Check if a tab is found
        if (!tab) {
            console.error("No active tab found");
            return;
        }
        // Execute script in the current tab
        await chrome.scripting.executeScript({
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
                    if (tr.children.length == 13) {
                        //Leader
                        //
                        GroupLeaderArray = tr.children;

                    } else if (tr.children.length == 10) {
                        //Simole row in the group
                        //
                        Array.from(tr.children).forEach((subElem, index) => {
                            if (index != 0 && index != 9 && index != 3) {
                                var ElementOfInterest = subElem.querySelector("span")
                                if (ElementOfInterest.innerText == "" || ElementOfInterest.innerText === "\u00A0") {
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

                                    if (index == 6) {
                                        //Official Analysis - we will look into the string and detect the ProductID and change it with the correct one
                                        //
                                        var firstPID = GroupLeaderArray[3].querySelector("span").innerText
                                        var actualPID = tr.children[0].querySelector("span").innerText
                                        filling = filling.replace(firstPID, actualPID)
                                    }

                                    inputElement.value = filling

                                    ElementOfInterest.appendChild(inputElement);

                                    const EnterEvent = new KeyboardEvent('keydown', {
                                        key: 'Enter',
                                        code: 'Enter',
                                        which: 13,
                                        keyCode: 13,
                                    });
                                    inputElement.dispatchEvent(EnterEvent); //This works  only if the element is an Input type

                                }
                                // debugger
                                // } else if (index == 3 && tr.children[6].querySelector("span").innerText === "\u00A0") {
                            } else if (index == 3 && (tr.children[6].querySelector("span").innerText === "\u00A0" || tr.children[6].querySelector("span").innerText === "")) {
                                //We will check that checkbox only if the Official Analysis has text in it 

                                var checkStatusGroup = GroupLeaderArray[6].querySelector("input").checked
                                subElem.querySelector("input").checked = checkStatusGroup
                            }

                        })
                    }
                });

            }
        });
    } catch (error) {
        console.error("Error executing script: ", error);
    }
}


export const handleDefectFilling = async () => {
    try {
        // Query the active tab in the current window
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        // Check if a tab is found
        if (!tab) {
            console.error("No active tab found");
            return;
        }
        // Execute script in the current tab
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                document.querySelector("body").style.background = "#444"

                var table = Array.from(document.querySelectorAll(".main_center .main_elem")[1].querySelectorAll("tr"));
                table = table.filter(el => el.children.length > 9);
                table = table.slice(1);// Removing the first element which is the table header
                // This function will work as follows:
                // We will take the table and sort it in groups (based on PartNumber) and the first row will represent the leader which will have the key information which
                // will be later filled in the other empty slots

                var currentGroupLeaderIndex;
                table.forEach((tr, tableIndex) => {
                    if (tr.children.length == 13) {
                        GroupLeaderArray = tr.children;
                        currentGroupLeaderIndex = tableIndex

                    } else if (tr.children.length == 10) {
                        currentDefectCode = tr.children[1].querySelector("span").innerText.trim()
                        for (var i = currentGroupLeaderIndex; i < tableIndex; i++) {
                            var prevRow = Array.from(table[i].children)
                            var rowLength = prevRow.length
                            var iterationDefentCode = ""

                            if (rowLength == 13) {
                                prevRow = prevRow.slice(3)
                            }
                            iterationDefentCode = prevRow[1].querySelector("span").innerText.trim()

                            if (iterationDefentCode == currentDefectCode) {
                                i = tableIndex //end loop
                                Array.from(tr.children).forEach((subElem, index) => {
                                    if (index != 0 && index != 9 && index != 3) {
                                        var ElementOfInterest = subElem.querySelector("span")
                                        if (ElementOfInterest.innerText == "" || ElementOfInterest.innerText === "\u00A0") {
                                            ElementOfInterest.setAttribute("data-value", '\u00A0');

                                            // Create the input element
                                            const inputElement = document.createElement('input');
                                            inputElement.setAttribute('type', 'edit');
                                            inputElement.setAttribute('id', 'd-sndefect-2');
                                            inputElement.setAttribute('class', 'Spanac');
                                            inputElement.setAttribute('value', '');
                                            inputElement.setAttribute('onkeydown', 'return ipe_process_key(this);');
                                            // Append the input element to the span element
                                            // var filling = GroupLeaderArray[index + 3].querySelector("span").innerText
                                            var filling = prevRow[index].querySelector("span").innerText

                                            if (index == 6) {
                                                //Official Analysis - we will look into the string and detect the ProductID and change it with the correct one
                                                //
                                                var firstPID = prevRow[0].querySelector("span").innerText
                                                var actualPID = tr.children[0].querySelector("span").innerText
                                                filling = filling.replace(firstPID, actualPID)
                                            }

                                            inputElement.value = filling

                                            ElementOfInterest.appendChild(inputElement);

                                            const EnterEvent = new KeyboardEvent('keydown', {
                                                key: 'Enter',
                                                code: 'Enter',
                                                which: 13,
                                                keyCode: 13,
                                            });
                                            inputElement.dispatchEvent(EnterEvent); //This works  only if the element is an Input type

                                        }
                                    } else if (index == 3 && (tr.children[6].querySelector("span").innerText === "\u00A0" || tr.children[6].querySelector("span").innerText === "")) {
                                        //We will check that checkbox only if the Official Analysis has text in it

                                        var checkStatusGroup = prevRow[3].querySelector("input").checked
                                        subElem.querySelector("input").checked = checkStatusGroup
                                    }

                                })

                                // =============================  The end ur looking for===============================
                            }
                        }

                    }
                });

            }
        });
    } catch (error) {
        console.error("Error executing script: ", error);
    }
}



