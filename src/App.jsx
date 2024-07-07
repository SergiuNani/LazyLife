import Drunk from "/Drunk.png";
import Daniel1 from "/Daniel1.jpeg";
import Daniel2 from "/Daniel2.jpeg";
import Daniel3 from "/Daniel3.jpeg";
import Daniel4 from "/Daniel4.jpeg";
import Daniel5 from "/Daniel5.jpeg";

import { useState, useEffect, useRef } from "react";
import "./App.css";
import { ExtractUsefulInfo } from "./Functions";
import { HTML_raw_example } from "./testData";
import { DocxTemplaterX } from "./DocxTemplater";

function App() {

    const [DisplayOption, setDisplayOption] = useState(2)
    //   const [htmlContent, setHtmlContent] = useState([]);
    const firstMount = useRef(false);
    const [htmlContent, setHtmlContent] = useState(
        ExtractUsefulInfo(HTML_raw_example)
    );

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.ctrlKey && event.key.toLowerCase() === "q") {
                DocxTemplaterX(htmlContent);
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    // useEffect(() => {
    //   //This one is useless, and its here for convenience
    //   //Each time you save a new docx is saved
    //   if (firstMount.current) {
    //     DocxTemplaterX(htmlContent);
    //     console.log(11);
    //   } else {
    //     firstMount.current = true;
    //   }
    // }, [htmlContent]);

    const handleClick = () => {
        chrome.runtime.sendMessage({ action: "getHTML" }, (response) => {
            const bodyHTML = response.bodyHTML;
            // setHtmlContent(bodyHTML);
            setHtmlContent(ExtractUsefulInfo(bodyHTML));
        });
    };

    return (
        <section style={{ border: "1px solid blue", width: "800px", overflow: "hidden" }}>
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
            <div style={{
                display: "flex",
                gap: '1rem'
            }}>

                <img src={Daniel3} className="daniel" alt="Logo image here" />
                <img src={Daniel4} className="daniel" alt="Logo image here" />

            </div>
            {DisplayOption == 2 &&

                <div style={{
                    display: "flex",
                    gap: '1rem'
                }}>
                    <img src={Daniel2} className="daniel" alt="Logo image here" />
                    <img src={Daniel5} className="daniel" alt="Logo image here" />
                </div>
            }
            <div className="card">
                <button onClick={handleClick} style={{ fontSize: "1.2rem" }}>
                    CLICK ME
                </button>
                <button
                    onClick={() => {
                        DocxTemplaterX(ExtractUsefulInfo(HTML_raw_example));
                        console.log(33);
                    }}
                >
                    Demo
                </button>
            </div>
        </section>
    );
}

export default App;
