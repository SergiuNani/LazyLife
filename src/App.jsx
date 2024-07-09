import Drunk from "/Drunk.png";
import Daniel1 from "/Daniel1.jpeg";
import Daniel2 from "/Daniel2.jpeg";
import Daniel3 from "/Daniel3.jpeg";
import Daniel4 from "/Daniel4.jpeg";
import Daniel5 from "/Daniel5.jpeg";
import { handleAutocomplete, handleIncreaseSize, handleDefectFilling, testChromeAPI, } from "./InjecHTML.js"

import { useState, useEffect, useRef } from "react";
import "./App.css";
import { ExtractUsefulInfo } from "./Functions";
import { HTML_raw_example } from "./testData";
import { DocxTemplaterX } from "./DocxTemplater";

function App() {

    const [DisplayOption, setDisplayOption] = useState(2)
    const [Mode, setMode] = useState("dev") // dev vs user

    const [htmlContent, setHtmlContent] = useState([]);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const firstMount = useRef(false);
    // const [htmlContent, setHtmlContent] = useState(
    //     ExtractUsefulInfo(HTML_raw_example)
    // );

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.ctrlKey && event.key.toLowerCase() === "q") {
                // DocxTemplaterX(htmlContent);
            } else if (event.ctrlKey && event.key.toLowerCase() === "d") {
                event.preventDefault()
                if (Mode == "dev") {
                    setMode("user")
                } else {
                    setMode("dev")

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
        });
    };
    useEffect(() => {
        ///Necessary
        if (firstMount.current) {
            DocxTemplaterX(htmlContent);
        }
    }, [htmlContent]);

    useEffect(() => {
        const img = new Image();
        img.src = Daniel1;
        img.onload = () => {
            setImageSize({ width: img.width, height: img.height });
            firstMount.current = true
        };
        img.onerror = () => {
            console.log("Error loading the image.");
            setDisplayOption(0) //user has played with the picture
        };
    }, []);

    useEffect(() => {
        if (firstMount.current && (imageSize.width != 750 || imageSize.height != 1334)) {
            console.log("Put the image back dawg. U think a hacker now. Im 69 moves ahead bruh!")
            console.log(imageSize.width)
            setDisplayOption(0) //user has played woth the picture
        }
    }, [firstMount.current])

    return (
        DisplayOption ?
            <section style={{ border: "1px solid blue", width: "800px", overflow: "hidden" }}>

                <section className="card">
                    {/* =================== Buttons ===================== */}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: 'row'
                    }}>

                        <button onClick={handleClick} >
                            Generate Doc
                        </button>
                        <button onClick={handleAutocomplete}>
                            AutoComplete
                        </button>
                        <button onClick={handleDefectFilling}>
                            Complete based on Defect
                        </button>
                        <button onClick={handleIncreaseSize}>
                            Increase Size
                        </button>
                    </div>

                    {Mode == "dev" &&
                        <section style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: 'column'
                        }}>

                            <button
                                onClick={() => {
                                    DocxTemplaterX(ExtractUsefulInfo(HTML_raw_example));
                                    console.log(33);
                                }} >
                                Download Demo </button>



                            <button onClick={testChromeAPI}>
                                TestAPIChrome </button>
                            <p> - The test button will print a msg in the Console. If the message is not printed then the other buttons will also not work</p>
                        </section>
                    }

                </section>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "2rem",
                    }}
                >
                    <h1>Lazy Life V2</h1>
                    <img src={Drunk} className="logo" alt="Logo image here" />
                </div>
                <img src={Daniel1} alt="Logo image here" />
                {DisplayOption == 2 &&
                    <div>

                        <div style={{
                            display: "flex",
                            gap: '1rem'
                        }}>

                            <img src={Daniel3} className="daniel" alt="Logo image here" />
                            <img src={Daniel4} className="daniel" alt="Logo image here" />

                        </div>
                        <div style={{
                            display: "flex",
                            gap: '1rem'
                        }}>
                            <img src={Daniel2} className="daniel" alt="Logo image here" />
                            <img src={Daniel5} className="daniel" alt="Logo image here" />
                        </div>
                    </div>
                }
            </section> : <div style={{
                fontSize: "3rem"
            }}>Put the image back dawg. U think a hacker now. Im 69 moves ahead bruh!</div>

    );
}

export default App;
