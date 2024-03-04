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

let DetaliiRMA = {};
let MainTable = [];

function createObjectAndAppend(arr) {
  if (arr.length == 13) {
    //Create a new object
    var obj = {};
    var ArrayOfObjects = [];
    var textArr = [];

    obj["PID"] = arr[0].querySelector("span").innerText;
    obj["Description"] = arr[1].querySelector("span").innerText;

    arr = arr.slice(3).slice(0, -1);
    arr.forEach((el, index) => {
      textArr[index] = el.querySelector("span").innerText;
      if (index == 3) {
        textArr[index] = el.querySelector("input").checked.toString();
      }
    });
    ArrayOfObjects.push(textArr);

    obj["Data"] = ArrayOfObjects;

    MainTable.push(obj);
  } else if (arr.length == 10) {
    //take the last object and add to it

    var textArr = [];
    arr = arr.slice(0, -1);

    arr.forEach((el, index) => {
      textArr[index] = el.querySelector("span").innerText;
      if (index == 3) {
        textArr[index] = el.querySelector("input").checked.toString();
      }
    });
    MainTable[MainTable.length - 1].Data.push(textArr);
  }
}

export function ExtractUsefulInfo(bodyHTML) {
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(
    bodyHTML.replace(/<br>/g, " "),
    "text/html"
  );
  var HTML_XML = xmlDoc.querySelectorAll(".main_elem");

  //---------------------
  //Assumption that the first table found is the "Detalii RMA"
  var tableRows_DetaliiRMA = HTML_XML[0]
    .querySelector("tbody")
    ?.querySelectorAll("tr");

  tableRows_DetaliiRMA?.forEach((tr) => {
    var th = tr.querySelector("th")?.innerText;
    var td = tr.querySelector("td")?.innerText;
    if (td == null) td = "";

    if (th) {
      DetaliiRMA[th] = td;
    }
  });

  //---------------------
  //Assumption: the second .main_elem is the data table

  var secondTable = HTML_XML[1].querySelector("tbody")?.querySelectorAll("tr");

  secondTable?.forEach((tr) => {
    var th_all = tr.querySelectorAll("th");
    var td_all = tr.querySelectorAll("td");
    if (th_all.length > 2) {
      //Table Head
      // console.log("🚀 ~ ExtractUsefulInfo ~ th_all:", th_all);
    } else {
      if (td_all.length > 9) {
        //we will include the arrays with 10 or 13 length and exclude the empty TD
        createObjectAndAppend(Array.from(td_all));
      }
    }
  });
  return MainTable;
}

//========================================DOCX github API
export const generateDoc = async (htmlContent) => {
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
  console.log(htmlContent);

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "example.docx");
    console.log("Document created successfully");
  });
};
