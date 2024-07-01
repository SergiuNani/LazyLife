import Docxtemplater from "docxtemplater";
import TemplateDoc from "./assets/Template.txt";
import { saveAs } from "file-saver";

import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";

const loadFile = (url, callback) => {
    PizZipUtils.getBinaryContent(url, function(err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
};

export const DocxTemplaterX = (htmlContent) => {
    const Template = TemplateDoc;
    loadFile(Template, (error, content) => {
        if (error) {
            throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

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
        var FileName = `P099 ${dataToAdd["RMA code"]} - RMA Report (${dataToAdd["Client"]}) `;
        saveAs(out, `${FileName}.docx`);
    });
};
