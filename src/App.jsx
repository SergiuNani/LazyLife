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
import { ExtractUsefulInfo } from "./Functions";
function App() {
  const [htmlContent, setHtmlContent] = useState([]);
  // const [htmlContent, setHtmlContent] = useState(ExtractUsefulInfo());

  const handleClick = () => {
    chrome.runtime.sendMessage({ action: "getHTML" }, (response) => {
      const bodyHTML = response.bodyHTML;
      setHtmlContent(bodyHTML);
    });
  };
  const renderHtmlContent = () => {
    return htmlContent.map((item, index) => (
      <div
        key={index}
        style={{
          fontSize: "0.7rem",
          // border: `1px solid green`,
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fonWeight: "700",
            color: "#008000",
          }}
        >
          <p>PID: {item.PID} |</p>
          <p>| Description: {item.Description} |</p>
          <p>| Data: </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {item.Data.map((el, idx) => (
            <section
              key={idx + "45"}
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontWeight: "700",
                  color: "#FF0000",
                }}
              >
                {idx + 1}
                {"-"}
              </p>
              {el.map((mini, id) => (
                <div
                  key={id}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      padding: "0.2rem",
                    }}
                  >
                    {mini}
                  </p>
                  <p style={{ color: "orange" }}> | </p>
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    ));
  };
  return (
    <>
      <div>
        <h1>Lazy Life</h1>
        <img src={Drunk} className="logo" alt="Vite logo" />
      </div>
      <div className="card">
        <button onClick={handleClick}>CLICK ME</button>
        <button onClick={generateDoc}>To Word</button>
        <button onClick={PrebuildGenerate}>WordPreBuild</button>
        <button
          onClick={() => {
            const arr = ExtractUsefulInfo();

            setHtmlContent(arr);
          }}
        >
          ShowExtraction
        </button>

        <div>{renderHtmlContent()}</div>
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
    const zip = new PizZip(content); // Asserting content as not undefined or null
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
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
      incident_description:
        "Faits et actions avant, pendant, après le sinistre",
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
const generateDoc = async () => {
  const doc = new Document({
    sections: [
      {
        children: [
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "bottom to top" }),
                      new Paragraph({}),
                    ],
                    textDirection: TextDirection.BOTTOM_TO_TOP_LEFT_TO_RIGHT,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: "top to bottom" }),
                      new Paragraph({}),
                    ],
                    textDirection: TextDirection.TOP_TO_BOTTOM_RIGHT_TO_LEFT,
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah",
                        heading: HeadingLevel.HEADING_1,
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "This text should be in the middle of the cell",
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Text above should be vertical from bottom to top",
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Text above should be vertical from top to bottom",
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Blah Blah Blah Blah Blah ",
                        heading: HeadingLevel.HEADING_1,
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "This text should be in the middle of the cell",
                      }),
                    ],
                    borders: {
                      top: {
                        style: BorderStyle.DASH_DOT_STROKED,
                        size: 1,
                        color: "ff0000",
                      },
                      bottom: {
                        style: BorderStyle.THICK_THIN_MEDIUM_GAP,
                        size: 5,
                        color: "889900",
                      },
                    },
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Text above should be vertical from bottom to top",
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Text above should be vertical from top to bottom",
                      }),
                    ],
                    borders: {
                      top: {
                        style: BorderStyle.DASH_DOT_STROKED,
                        size: 3,
                        color: "FF0000",
                      },
                      bottom: {
                        style: BorderStyle.DOUBLE,
                        size: 3,
                        color: "0000FF",
                      },
                      left: {
                        style: BorderStyle.DASH_DOT_STROKED,
                        size: 3,
                        color: "00FF00",
                      },
                      right: {
                        style: BorderStyle.DASH_DOT_STROKED,
                        size: 3,
                        color: "#ff8000",
                      },
                    },
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "example.docx");
    console.log("Document created successfully");
  });
};
