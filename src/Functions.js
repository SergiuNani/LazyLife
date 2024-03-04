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
  var xmlDoc = parser.parseFromString(bodyHTML, "text/html");
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
      console.log("🚀 ~ ExtractUsefulInfo ~ th_all:", th_all);
    } else {
      if (td_all.length > 9) {
        //we will include the arrays with 10 or 13 length and exclude the empty TD
        createObjectAndAppend(Array.from(td_all));
      }
    }
  });
  return MainTable;
}
