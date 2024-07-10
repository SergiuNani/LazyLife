import Drunk from "/Drunk.png";
import {
    handleAutocomplete,
    handleIncreaseSize,
    handleDefectFilling,
    testChromeAPI,
    ModifyBackground
} from "./InjecHTML.js";

import { useState, useEffect, useRef } from "react";
import "./App.css";
import { ExtractUsefulInfo } from "./Functions";
import { HTML_raw_example } from "./testData";
import { DocxTemplaterX } from "./DocxTemplater";

function App() {
    const [DisplayOption, setDisplayOption] = useState(1);
    const [Mode, setMode] = useState("dev"); // dev vs user
    const [htmlContent, setHtmlContent] = useState([]);
    const firstMount = useRef(false);
    // const [htmlContent, setHtmlContent] = useState(
    //     ExtractUsefulInfo(HTML_raw_example)
    // );

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.altKey && event.key === "1") {
                setDisplayOption(1);
                localStorage.setItem("LazyLife", 1);
            } else if (event.altKey && event.key === "2") {
                setDisplayOption(2);
                localStorage.setItem("LazyLife", 2);
            } else if (event.altKey && event.key === "3") {
                setDisplayOption(3);
                localStorage.setItem("LazyLife", 3);
            } else if (event.ctrlKey && event.key.toLowerCase() === "d") {
                setDisplayOption(1);
                event.preventDefault();
                if (Mode == "dev") {
                    setMode("user");
                } else {
                    setMode("dev");
                }
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [Mode]);

    const handleClick = () => {
        chrome.runtime.sendMessage({ action: "getHTML" }, (response) => {
            const bodyHTML = response.bodyHTML;
            setHtmlContent(ExtractUsefulInfo(bodyHTML));
            ModifyBackground()
        });
    };
    useEffect(() => {
        ///Necessary
        if (firstMount.current) {
            DocxTemplaterX(htmlContent);
        } else {
            firstMount.current = true
        }
    }, [htmlContent, firstMount.current]);


    return DisplayOption ? (
        <section
            style={{ border: "1px solid blue", width: "800px", overflow: "hidden" }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: " 0 4rem",
                }}
            >
                <img src={Drunk} className="logo" alt="Logo image here" />
                <h1>Lazy Life V2</h1>
            </div>

            <section className="card">
                {/* =================== Buttons ===================== */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                    }}
                >
                    <button onClick={handleClick}>Generate Doc</button>
                    <button onClick={handleAutocomplete}>AutoComplete</button>
                    <button onClick={handleDefectFilling}>
                        Complete based on Defect
                    </button>
                    <button onClick={handleIncreaseSize}>Increase Size</button>
                </div>
            </section>

            {DisplayOption == 1 && Mode == "dev" && (
                //Deug mode
                <section
                    style={{
                        justifyContent: "center",
                    }}
                >
                    <button
                        onClick={() => {
                            DocxTemplaterX(ExtractUsefulInfo(HTML_raw_example));
                            console.log(33);
                        }}
                    >
                        {" "}
                        Download Demo{" "}
                    </button>

                    <button onClick={testChromeAPI}> TestAPIChrome </button>

                    <div
                        style={{
                            borderTop: "1px solid grey",
                            marginTop: "2rem",
                        }}
                    >
                        <ul>
                            <li>
                                Generate Doc - you need to be over the RMA website and the
                                extention will take all the useful info and generate a RMA
                                Report - downloadable DOCX file
                            </li>
                            <li>
                                {" "}
                                AutoComplete - If you are over the RMA website this button will
                                autofill all the empty slots with the group leader info (groups
                                are sorted based on PartNumber){" "}
                            </li>
                            <li>
                                {" "}
                                Complete based on Defect - Autofills all the empty slots based
                                on the same Defect code and the parent row needs to be found
                                upwards (If the useful info is found at the bottom of the group
                                the upper rows will remain emtpy even if they have the same
                                Defect code)
                            </li>
                            <li>
                                {" "}
                                Download Demo- Generates a DOC file based on some HTML which is
                                saved locally{" "}
                            </li>

                            <li>
                                {" "}
                                TestAPIChrome- The test button will print a msg in the Console.
                                If the message is not printed then the other buttons will also
                                not work
                            </li>
                        </ul>
                    </div>
                </section>
            )}
        </section>
    ) : (
        <div
            style={{
                fontSize: "3rem",
            }}
        >
            Put the image back dawg. U think a hacker now. Im 69 moves ahead bruh!
        </div>
    );
}

export default App;
