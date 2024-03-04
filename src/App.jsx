import Drunk from "/Drunk.png";
import { useState } from "react";
import { saveAs } from "file-saver";
import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  VerticalAlign,
  TextDirection,
  BorderStyle,
} from "docx";
import "./App.css";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import OfficialClaimTemplate from "./assets/officialClaim.txt";
import { ExtractUsefulInfo, generateDoc } from "./Functions";
import { HTML_original } from "./testData";
import { renderHtmlContent } from "./AppHelper";
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
        <button onClick={PrebuildGenerate}>WordPreBuild</button>
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

const loadFile = (url, callback) => {
  PizZipUtils.getBinaryContent(url, function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const PrebuildGenerate = () => {
  const Template = OfficialClaimTemplate;

  loadFile(Template, (error, content) => {
    if (error) {
      throw error;
    }
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const Table_obj = {
      headers: ["Header 1", "Header 2", "Header 3"],
      rows: [
        ["Row 1 Cell 1", "Row 1 Cell 2", "Row 1 Cell 3"],
        ["Row 2 Cell 1", "Row 2 Cell 2", "Row 2 Cell 3"],
        ["Row 3 Cell 1", "Row 3 Cell 2", "Row 3 Cell 3"],
      ],
    };

    doc.setData({
      signing_location: "Toulouse",
      signing_date: `OPAOPAOPA`,
      first_name: "Sébastien",
      last_name: "François",
      birth_date: "19 août 1994",
      claim_type: "Casse",
      incident_location: "3 rue Ella Maillart, 31300 Toulouse",
      incident_timestamp: new Date().getFullYear(),
      bike_name: "Vélo de champion",
      incident_description: {
        // Pass the table object as an object
        headers: Table_obj.headers,
        rows: Table_obj.rows,
      },
      customer_name: "Morio",
    });

    try {
      doc.render();
    } catch (error) {
      console.log("ERROR chief:", error);
      throw error;
    }
    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(out, "déclaration_circonstanciée.docx");
  });
};

const Table_obj = {
  customer_name: "Franck",
  tableXml: `
  
  
  <w:tbl>
  <w:tblPr>
    <w:jc w:val="left"/>
    <w:tblInd w:type="dxa" w:w="12"/>
    <w:tblBorders>
      <w:top w:color="00000A" w:space="0" w:sz="18" w:val="single"/>
      <w:left w:val="nil"/>
      <w:bottom w:color="00000A" w:space="0" w:sz="18" w:val="single"/>
      <w:insideH w:color="00000A" w:space="0" w:sz="18" w:val="single"/>
      <w:right w:val="nil"/>
      <w:insideV w:val="nil"/>
    </w:tblBorders>
    <w:tblCellMar>
      <w:top w:type="dxa" w:w="0"/>
      <w:left w:type="dxa" w:w="108"/>
      <w:bottom w:type="dxa" w:w="0"/>
      <w:right w:type="dxa" w:w="108"/>
    </w:tblCellMar>
  </w:tblPr>
  <w:tblGrid>
    <w:gridCol w:w="1797"/>
    <w:gridCol w:w="2444"/>
    <w:gridCol w:w="2458"/>
    <w:gridCol w:w="1790"/>
  </w:tblGrid>
  <w:tr>
    <w:trPr>
      <w:cantSplit w:val="false"/>
    </w:trPr>
    <w:tc>
      <w:tcPr>
        <w:tcW w:type="dxa" w:w="1797"/>
        <w:tcBorders>
          <w:top w:color="00000A" w:space="0" w:sz="18" w:val="single"/>
          <w:left w:val="nil"/>
          <w:bottom w:color="00000A" w:space="0" w:sz="18" w:val="single"/>
          <w:right w:val="nil"/>
        </w:tcBorders>
        <w:shd w:fill="4472C4" w:val="clear"/>
      </w:tcPr>
      <w:p>
        <w:pPr>
          <w:pStyle w:val="style0"/>
          <w:tabs>
            <w:tab w:leader="none" w:pos="955" w:val="center"/>
          </w:tabs>
          <w:spacing w:after="0" w:before="0" w:line="100" w:lineRule="atLeast"/>
          <w:contextualSpacing w:val="false"/>
          <w:jc w:val="center"/>
          <w:rPr>
            <w:b/>
            <w:bCs/>
            <w:color w:val="FFFFFF"/>
            <w:lang w:val="en-US"/>
          </w:rPr>
        </w:pPr>
        <w:r>
          <w:rPr>
            <w:b/>
            <w:bCs/>
            <w:color w:val="FFFFFF"/>
            <w:lang w:val="en-US"/>
          </w:rPr>
          <w:t>COLUMN1</w:t>
        </w:r>
      </w:p>
    </w:tc>
    <w:tc>
      <w:tcPr>
        <w:tcW w:type="dxa" w:w="2444"/>
        <w:tcBorders>
          <w:top w:color="00000A" w:space="0" w:sz="18" w:val="single"/>
          <w:left w:val="nil"/>
          <w:bottom w:color="00000A" w:space="0" w:sz="18" w:val="single"/>
          <w:right w:val="nil"/>
        </w:tcBorders>
        <w:shd w:fill="4472C4" w:val="clear"/>
      </w:tcPr>
      <w:p>
        <w:pPr>
          <w:pStyle w:val="style0"/>
          <w:spacing w:after="0" w:before="0" w:line="100" w:lineRule="atLeast"/>
          <w:contextualSpacing w:val="false"/>
          <w:jc w:val="center"/>
          <w:rPr>
            <w:b/>
            <w:bCs/>
            <w:color w:val="FFFFFF"/>
            <w:lang w:val="en-US"/>
          </w:rPr>
        </w:pPr>
        <w:r>
          <w:rPr>
            <w:b/>
            <w:bCs/>
            <w:color w:val="FFFFFF"/>
            <w:lang w:val="en-US"/>
          </w:rPr>
          <w:t>COLUMN2</w:t>
        </w:r>
      </w:p>
    </w:tc>
    <w:tc>
      <w:tcPr>
        <w:tcW w:type="dxa" w:w="2458"/>
        <w:tcBorders>
          <w:top w:color="00000A" w:space="0" w:sz="18" w:val="single"/>
          <w:left w:val="nil"/>
          <w:bottom w:color="00000A" w:space="0" w:sz="18" w:val="single"/>
          <w:right w:val="nil"/>
        </w:tcBorders>
        <w:shd w:fill="4472C4" w:val="clear"/>
      </w:tcPr>
      <w:p>
        <w:pPr>
          <w:pStyle w:val="style0"/>
          <w:spacing w:after="0" w:before="0" w:line="100" w:lineRule="atLeast"/>
          <w:contextualSpacing w:val="false"/>
          <w:jc w:val="center"/>
          <w:rPr>
            <w:b/>
            <w:bCs/>
            <w:color w:val="FFFFFF"/>
            <w:lang w:val="en-US"/>
          </w:rPr>
        </w:pPr>
        <w:r>
          <w:rPr>
            <w:b/>
            <w:bCs/>
            <w:color w:val="FFFFFF"/>
            <w:lang w:val="en-US"/>
          </w:rPr>
          <w:t>COLUMN3</w:t>
        </w:r>
      </w:p>
    </w:tc>
    <w:tc>
      <w:tcPr>
        <w:tcW w:type="dxa" w:w="1790"/>
        <w:tcBorders>
          <w:top w:color="00000A" w:space="0" w:sz="18" w:val="single"/>
          <w:left w:val="nil"/>
          <w:bottom w:color="00000A" w:space="0" w:sz="18" w:val="single"/>
          <w:right w:val="nil"/>
        </w:tcBorders>
        <w:shd w:fill="4472C4" w:val="clear"/>
      </w:tcPr>
      <w:p>
        <w:pPr>
          <w:pStyle w:val="style0"/>
          <w:spacing w:after="0" w:before="0" w:line="100" w:lineRule="atLeast"/>
          <w:contextualSpacing w:val="false"/>
          <w:jc w:val="center"/>
          <w:rPr>
            <w:b/>
            <w:bCs/>
            <w:color w:val="FFFFFF"/>
            <w:lang w:val="en-US"/>
          </w:rPr>
        </w:pPr>
        <w:r>
          <w:rPr>
            <w:b/>
            <w:bCs/>
            <w:color w:val="FFFFFF"/>
            <w:lang w:val="en-US"/>
          </w:rPr>
          <w:t>COLUMN4</w:t>
        </w:r>
      </w:p>
    </w:tc>
  </w:tr>
  <w:tr>
    <w:trPr>
      <w:cantSplit w:val="false"/>
    </w:trPr>
    <w:tc>
      <w:tcPr>
        <w:tcW w:type="dxa" w:w="1797"/>
        <w:tcBorders>
          <w:top w:val="nil"/>
          <w:left w:val="nil"/>
          <w:bottom w:val="nil"/>
          <w:right w:val="nil"/>
        </w:tcBorders>
        <w:shd w:fill="FFFFFF" w:val="clear"/>
      </w:tcPr>
      <w:p>
        <w:pPr>
          <w:pStyle w:val="style0"/>
          <w:spacing w:after="0" w:before="0" w:line="100" w:lineRule="atLeast"/>
          <w:contextualSpacing w:val="false"/>
          <w:jc w:val="center"/>
          <w:rPr>
            <w:lang w:val="en-US"/>
          </w:rPr>
        </w:pPr>
        <w:r>
          <w:rPr>
            <w:lang w:val="en-US"/>
          </w:rPr>
          <w:t> #table1  t1data1 </w:t>
        </w:r>
      </w:p>
    </w:tc>
    <w:tc>
      <w:tcPr>
        <w:tcW w:type="dxa" w:w="2444"/>
        <w:tcBorders>
          <w:top w:val="nil"/>
          <w:left w:val="nil"/>
          <w:bottom w:val="nil"/>
          <w:right w:val="nil"/>
        </w:tcBorders>
        <w:shd w:fill="FFFFFF" w:val="clear"/>
      </w:tcPr>
      <w:p>
        <w:pPr>
          <w:pStyle w:val="style32"/>
          <w:spacing w:after="0" w:before="0" w:line="100" w:lineRule="atLeast"/>
          <w:contextualSpacing w:val="false"/>
          <w:jc w:val="center"/>
          <w:rPr>
            <w:lang w:val="en-US"/>
          </w:rPr>
        </w:pPr>
        <w:r>
          <w:rPr>
            <w:lang w:val="en-US"/>
          </w:rPr>
          <w:t> t1data2 </w:t>
        </w:r>
      </w:p>
    </w:tc>
    <w:tc>
      <w:tcPr>
        <w:tcW w:type="dxa" w:w="2458"/>
        <w:tcBorders>
          <w:top w:val="nil"/>
          <w:left w:val="nil"/>
          <w:bottom w:val="nil"/>
          <w:right w:val="nil"/>
        </w:tcBorders>
        <w:shd w:fill="FFFFFF" w:val="clear"/>
      </w:tcPr>
      <w:p>
        <w:pPr>
          <w:pStyle w:val="style32"/>
          <w:spacing w:after="0" w:before="0" w:line="100" w:lineRule="atLeast"/>
          <w:contextualSpacing w:val="false"/>
          <w:jc w:val="center"/>
          <w:rPr>
            <w:lang w:val="en-US"/>
          </w:rPr>
        </w:pPr>
        <w:r>
          <w:rPr>
            <w:lang w:val="en-US"/>
          </w:rPr>
          <w:t> t1data3 </w:t>
        </w:r>
      </w:p>
    </w:tc>
    <w:tc>
      <w:tcPr>
        <w:tcW w:type="dxa" w:w="1790"/>
        <w:tcBorders>
          <w:top w:val="nil"/>
          <w:left w:val="nil"/>
          <w:bottom w:val="nil"/>
          <w:right w:val="nil"/>
        </w:tcBorders>
        <w:shd w:fill="FFFFFF" w:val="clear"/>
      </w:tcPr>
      <w:p>
        <w:pPr>
          <w:pStyle w:val="style32"/>
          <w:spacing w:after="0" w:before="0" w:line="100" w:lineRule="atLeast"/>
          <w:contextualSpacing w:val="false"/>
          <w:jc w:val="center"/>
          <w:rPr>
            <w:lang w:val="en-US"/>
          </w:rPr>
        </w:pPr>
        <w:r>
          <w:rPr>
            <w:lang w:val="en-US"/>
          </w:rPr>
          <w:t> t1data4  /table1 </w:t>
        </w:r>
      </w:p>
    </w:tc>
  </w:tr>
  <w:tr>
    <w:trPr>
      <w:cantSplit w:val="false"/>
    </w:trPr>
    <w:tc>
      <w:tcPr>
        <w:tcW w:type="dxa" w:w="1797"/>
        <w:tcBorders>
          <w:top w:color="00000A" w:space="0" w:sz="6" w:val="double"/>
          <w:left w:val="nil"/>
          <w:bottom w:color="00000A" w:space="0" w:sz="18" w:val="single"/>
          <w:right w:val="nil"/>
        </w:tcBorders>
        <w:shd w:fill="FFFFFF" w:val="clear"/>
      </w:tcPr>
      <w:p>
        <w:pPr>
          <w:pStyle w:val="style0"/>
          <w:spacing w:after="0" w:before="0" w:line="100" w:lineRule="atLeast"/>
          <w:contextualSpacing w:val="false"/>
          <w:jc w:val="center"/>
          <w:rPr>
            <w:b/>
            <w:color w:val="00000A"/>
            <w:lang w:val="en-US"/>
          </w:rPr>
        </w:pPr>
        <w:r>
          <w:rPr>
            <w:b/>
            <w:color w:val="00000A"/>
            <w:lang w:val="en-US"/>
          </w:rPr>
          <w:t>TOTAL</w:t>
        </w:r>
      </w:p>
    </w:tc>
    <w:tc>
      <w:tcPr>
        <w:tcW w:type="dxa" w:w="2444"/>
        <w:tcBorders>
          <w:top w:color="00000A" w:space="0" w:sz="6" w:val="double"/>
          <w:left w:val="nil"/>
          <w:bottom w:color="00000A" w:space="0" w:sz="18" w:val="single"/>
          <w:right w:val="nil"/>
        </w:tcBorders>
        <w:shd w:fill="FFFFFF" w:val="clear"/>
      </w:tcPr>
      <w:p>
        <w:pPr>
          <w:pStyle w:val="style32"/>
          <w:spacing w:after="0" w:before="0" w:line="100" w:lineRule="atLeast"/>
          <w:contextualSpacing w:val="false"/>
          <w:jc w:val="center"/>
          <w:rPr>
            <w:b/>
            <w:color w:val="00000A"/>
            <w:lang w:val="en-US"/>
          </w:rPr>
        </w:pPr>
        <w:r>
          <w:rPr>
            <w:b/>
            <w:color w:val="00000A"/>
            <w:lang w:val="en-US"/>
          </w:rPr>
          <w:t> t1total1 </w:t>
        </w:r>
      </w:p>
    </w:tc>
    <w:tc>
      <w:tcPr>
        <w:tcW w:type="dxa" w:w="2458"/>
        <w:tcBorders>
          <w:top w:color="00000A" w:space="0" w:sz="6" w:val="double"/>
          <w:left w:val="nil"/>
          <w:bottom w:color="00000A" w:space="0" w:sz="18" w:val="single"/>
          <w:right w:val="nil"/>
        </w:tcBorders>
        <w:shd w:fill="FFFFFF" w:val="clear"/>
      </w:tcPr>
      <w:p>
        <w:pPr>
          <w:pStyle w:val="style32"/>
          <w:spacing w:after="0" w:before="0" w:line="100" w:lineRule="atLeast"/>
          <w:contextualSpacing w:val="false"/>
          <w:jc w:val="center"/>
          <w:rPr>
            <w:b/>
            <w:color w:val="00000A"/>
            <w:lang w:val="en-US"/>
          </w:rPr>
        </w:pPr>
        <w:r>
          <w:rPr>
            <w:b/>
            <w:color w:val="00000A"/>
            <w:lang w:val="en-US"/>
          </w:rPr>
          <w:t> t1total2 </w:t>
        </w:r>
      </w:p>
    </w:tc>
    <w:tc>
      <w:tcPr>
        <w:tcW w:type="dxa" w:w="1790"/>
        <w:tcBorders>
          <w:top w:color="00000A" w:space="0" w:sz="6" w:val="double"/>
          <w:left w:val="nil"/>
          <w:bottom w:color="00000A" w:space="0" w:sz="18" w:val="single"/>
          <w:right w:val="nil"/>
        </w:tcBorders>
        <w:shd w:fill="FFFFFF" w:val="clear"/>
      </w:tcPr>
      <w:p>
        <w:pPr>
          <w:pStyle w:val="style32"/>
          <w:spacing w:after="0" w:before="0" w:line="100" w:lineRule="atLeast"/>
          <w:contextualSpacing w:val="false"/>
          <w:jc w:val="center"/>
          <w:rPr>
            <w:b/>
            <w:color w:val="00000A"/>
            <w:lang w:val="en-US"/>
          </w:rPr>
        </w:pPr>
        <w:r>
          <w:rPr>
            <w:b/>
            <w:color w:val="00000A"/>
            <w:lang w:val="en-US"/>
          </w:rPr>
          <w:t> </w:t>
        </w:r>
        <w:bookmarkStart w:id="0" w:name="_GoBack2"/>
        <w:bookmarkEnd w:id="0"/>
        <w:r>
          <w:rPr>
            <w:b/>
            <w:color w:val="00000A"/>
            <w:lang w:val="en-US"/>
          </w:rPr>
          <w:t>t1total3 </w:t>
        </w:r>
      </w:p>
    </w:tc>
  </w:tr>
</w:tbl>
  
  `,
};
