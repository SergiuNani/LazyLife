import { useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

import Template from "./assets/textDoc.txt";
// const fs = require("fs");
// const path = require("path");
// const PizZip = require("pizzip");
// const Docxtemplater = require("docxtemplater");

export const generateDocument = () => {
  fetch(Template)
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      const zip = new PizZip(buffer);
      const outputDocument = new Docxtemplater(zip);

      // const dataToAdd = {}; // Set your data here

      const dataToAdd = {
        employeeList: [
          { id: 28521, name: "Frank", age: 34, city: "Melbourne" },
          { id: 84973, name: "Chloe", age: 28, city: "Perth" },
          { id: 10349, name: "Hank", age: 68, city: "Hobart" },
          { id: 44586, name: "Gordon", age: 47, city: "Melbourne" },
        ],
      };
      outputDocument.setData(dataToAdd);

      try {
        // Attempt to render the document (Add data to the template)
        outputDocument.render();

        // Create a Blob containing the output data
        const outputDocumentBlob = new Blob(
          [outputDocument.getZip().generate({ type: "uint8array" })],
          {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          }
        );

        // Create a URL for the Blob
        const url = window.URL.createObjectURL(outputDocumentBlob);

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "OUTPUT.docx"); // Set the filename

        // Simulate click to trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error(`ERROR Filling out Template:`);
        console.error(error);
      }
    })
    .catch((error) => {
      console.error(`ERROR Loading Template:`);
      console.error(error);
    });
};
