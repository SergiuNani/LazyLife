import React from "react";
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
import OfficialClaimTemplate from "./assets/officialClaim.txt";
import { ExtractUsefulInfo } from "./Functions";
import { HTML_original } from "./testData";

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

    generateDoc((tableContent) => {
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
        incident_description: tableContent, // Inserting table content here
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
  });
};

const generateDoc = (callback) => {
  const doc = new Document({
    sections: [
      {
        children: [
          new Table({
            rows: [
              // Define your table rows and cells here
              // Example:
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Cell 1" })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Cell 2" })],
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
    const reader = new FileReader();
    reader.onload = () => {
      const tableContent = reader.result;
      callback(tableContent);
    };
    reader.readAsArrayBuffer(blob);
  });
};

export default PrebuildGenerate;
