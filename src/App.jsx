import Drunk from "/Drunk.png";
import { useState, useEffect, useRef } from "react";
import "./App.css";
import { ExtractUsefulInfo } from "./Functions";
import { HTML_original } from "./testData";
import { DocxTemplaterX } from "./DocxTemplater";

function App() {
    const [htmlContent, setHtmlContent] = useState([]);
    const firstMount = useRef(false);
    // const [htmlContent, setHtmlContent] = useState(
    //     ExtractUsefulInfo(HTML_original)
    // );

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.ctrlKey && event.key.toLowerCase() === "q") {
                // DocxTemplaterX(htmlContent);
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    useEffect(() => {
        if (firstMount.current) {
            DocxTemplaterX(htmlContent);
        } else {
            firstMount.current = true;
        }
    }, [htmlContent]);
    const handleClick = () => {
        chrome.runtime.sendMessage({ action: "getHTML" }, (response) => {
            const bodyHTML = response.bodyHTML;
            // setHtmlContent(bodyHTML);
            setHtmlContent(ExtractUsefulInfo(bodyHTML));
        });
    };

    return (
        <>
            <div>
                <h1>Lazy Life</h1>
                <img src={Drunk} className="logo" alt="Logo image here" />
            </div>
            <div className="card">
                <button onClick={handleClick} style={{ fontSize: "1.2rem" }}>
                    CLICK ME
                </button>
                <button
                    onClick={() => {
                        DocxTemplaterX(ExtractUsefulInfo(HTML_original));
                    }}
                >
                    Demo
                </button>
            </div>
        </>
    );
}

export default App;
