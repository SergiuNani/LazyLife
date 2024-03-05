import Drunk from "/Drunk.png";
import { useState } from "react";
import "./App.css";
import { ExtractUsefulInfo, generateDoc } from "./Functions";
import { HTML_original } from "./testData";
import { renderHtmlContent } from "./AppHelper";
import { DocxTemplaterX } from "./DocxTemplater";
import { generateDocument } from "./generic";

function App() {
  // const [htmlContent, setHtmlContent] = useState([]);
  const [htmlContent, setHtmlContent] = useState(
    ExtractUsefulInfo(HTML_original)
  );

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
        <button
          onClick={() => {
            generateDoc(htmlContent);
          }}
        >
          To Word
        </button>
        <button onClick={DocxTemplaterX}>WordPreBuild</button>
        <button onClick={generateDocument}>XXX</button>
        <button
          onClick={() => {
            const arr = ExtractUsefulInfo(HTML_original);
            setHtmlContent(arr);
          }}
        >
          ShowExtraction
        </button>

        <div>{renderHtmlContent(htmlContent)}</div>
        {/* <div>{htmlContent}</div> */}
      </div>
    </>
  );
}

export default App;
