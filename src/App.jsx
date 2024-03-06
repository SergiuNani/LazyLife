import Drunk from "/Drunk.png";
import { useState, useEffect } from "react";
import "./App.css";
import { ExtractUsefulInfo } from "./Functions";
import { HTML_original } from "./testData";
import { renderHtmlContent } from "./AppHelper";
import { DocxTemplaterX } from "./DocxTemplater";

function App() {
  // const [htmlContent, setHtmlContent] = useState([]);
  const [htmlContent, setHtmlContent] = useState(
    ExtractUsefulInfo(HTML_original)
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
        <img src={Drunk} className="logo" alt="Vite logo" />
      </div>
      <div className="card">
        <button onClick={handleClick}>CLICK ME</button>

        <button onClick={DocxTemplaterX(htmlContent)}>WordPreBuild</button>
        <button
          onClick={() => {
            const arr = ExtractUsefulInfo(HTML_original);
            setHtmlContent(arr);
          }}
        >
          ShowExtraction
        </button>

        {/* <div>{renderHtmlContent(htmlContent)}</div> */}
      </div>
    </>
  );
}

export default App;
