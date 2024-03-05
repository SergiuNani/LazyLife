import fs from "fs";
import Docxtemplater from "docxtemplater";
// import PizZip from "pizzip";
// import unzipper from "unzipper";
import testDoc from "./assets/textDoc.txt";

export async function generateDocument() {
  const fs = require("fs");
  const SlidesModule = require("docxtemplater-slides-module");

  const doc = new Docxtemplater(zip, {
    modules: [new SlidesModule()],
  });
  doc.render({
    mainTitle: "My title",
    users: [
      { name: "Franck", phone: "+665432131" },
      { name: "Jim", phone: "+6234468468" },
      { name: "Joe", phone: "+78788787" },
      { name: "Hugh", phone: "03566456465" },
    ],
    foo: "bar",
  });

  const buffer = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });

  fs.writeFile("test.docx", buffer);
}
