import Docxtemplater from "docxtemplater";
import OfficialClaimTemplate from "./assets/officialClaim.txt";
import testDoc from "./assets/textDoc.txt";
import { saveAs } from "file-saver";

import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";

const loadFile = (url, callback) => {
  PizZipUtils.getBinaryContent(url, function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

export const DocxTemplaterXX = () => {
  // const Template = OfficialClaimTemplate;
  const Template = testDoc;

  loadFile(Template, (error, content) => {
    if (error) {
      throw error;
    }
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.setData({
      // signing_location: "Toulouse",
      // signing_date: `OPAOPAOPA`,
      // first_name: "Sébastien",
      // last_name: "François",
      // birth_date: "19 août 1994",
      // claim_type: "Casse",
      // incident_location: "3 rue Ella Maillart, 31300 Toulouse",
      // incident_timestamp: new Date().getFullYear(),
      bike_name: "Vélo de champion",
      table1: Table_obj,
      // customer_name: "Morio",
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
    saveAs(out, "xxxxx.docx");
  });
};

const Table_obj = {
  fixedColumns: [null, "Example 1", null, "Example 2"],
  widths: [100, 150, 320, 100],
  header: ["Source", "Hazard", "Handling", "Protection"],
  subheader: ["The source", "The Hazard", "The Handling", "The Protection"],
  chunkSize: 6,
  data: [
    [
      "A1",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
    [
      "B1",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
    [
      "C1",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
    [
      "A1",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
    [
      "B1",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
    [
      "B1",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
    [
      "C1",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
    [
      "A1",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
    [
      "B1",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
    [
      "D1",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  ],
};

export const DocxTemplaterX = () => {
  const Template = testDoc;

  loadFile(Template, (error, content) => {
    if (error) {
      throw error;
    }
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.setData({
      bike_name: "Vélo de champion",
      table1: Table_obj,
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
    saveAs(out, "xxxxx.docx");
  });
};
