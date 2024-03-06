import Docxtemplater from "docxtemplater";
import testDoc from "./assets/textDoc.txt";
import TemplateDoc from "./assets/Template.txt";
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

export const DocxTemplaterX = (htmlContent) => {
  // const Template = OfficialClaimTemplate;
  const Template = TemplateDoc;
  const date = new Date();
  loadFile(Template, (error, content) => {
    if (error) {
      throw error;
    }
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // const dataToAdd = {
    //   cl_name: "Sergiu",
    //   RMA: "5454465faefaef44",
    //   Data: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    //   employeeList: [
    //     { id: 28521, name: "FranPUAAAAAAAAAAk", age: 34, city: "Melbourne" },
    //     { id: 84973, name: "Chloe", age: 28, city: "Perth" },
    //     { id: 10349, name: "Hank", age: 68, city: "Hobart" },
    //     { id: 44586, name: "Gordon", age: 47, city: "Melbourne" },
    //   ],
    //   cl_nr: "PPOP",
    // };
    const dataToAdd = htmlContent;

    doc.setData(dataToAdd);

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
