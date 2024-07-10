let TempTable = [];
let MainObject4_DocxTemplater = {};

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

        TempTable.push(obj);
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
        TempTable[TempTable.length - 1].Data.push(textArr);
    }
}
function RefactorObjects(TempTable) {
    var Table1 = [];
    var Table2 = [];
    var counter = 1;
    var TotalCostFinal = 0;
    TempTable.forEach((obj) => {
        const dateToday = new Date();

        if (obj.Data.length > 1) {
            //Here we have groups which we sort and result into a matrix
            //Reordered only so that at the end they will be in order TD00 TD54 ...
            var reorderedDataField = obj.Data.sort((a, b) => {
                const valueA = a[1].trim().replace("TD", "");
                const valueB = b[1].trim().replace("TD", "");
                return valueA - valueB;
            });

            //Find out how many FailureCodes are there
            var FailureCodesTypes = [];
            reorderedDataField.forEach((arr) => {
                let code = arr[1];
                if (!FailureCodesTypes.includes(code)) {
                    FailureCodesTypes.push(code);
                }
            });
            //Create one Obj which includes all of the same FailureCodes
            FailureCodesTypes.forEach((failureCode) => {
                var sameCodeArr = reorderedDataField.filter(
                    (el) => el[1] == failureCode
                );
                var firstRow = sameCodeArr[0];
                var SN_collection = "";
                var QtyRepaired = 0;
                var totalCost = 0;
                var investigator = "";
                var investigatorMemory = "";
                sameCodeArr.forEach((oneRow) => {
                    SN_collection += ` ${oneRow[0]},`;
                    var isRepaired = oneRow[3].trim() === "true";
                    if (isRepaired) QtyRepaired++;
                    totalCost += parseFloat(oneRow[7]);
                    if (investigatorMemory != oneRow[4]) {
                        investigator += oneRow[4] + " ";
                        investigatorMemory = oneRow[4];
                    }
                });
                TotalCostFinal += totalCost;
                SN_collection = SN_collection.slice(0, -1);//Removes the last comma
                //MultiRows
                var tableObj1 = {};
                var tableObj2 = {};
                tableObj1["POS"] = counter;
                tableObj1["PartNumber"] = obj.PID;
                tableObj1["DriveName"] = obj.Description;
                tableObj1["SN"] = SN_collection;
                tableObj1["QTY"] = sameCodeArr.length;
                tableObj1["FailureDescription"] = firstRow[2];
                tableObj1["FailureCode"] = failureCode;
                tableObj1["QTY_Repaired"] = QtyRepaired;
                tableObj1["Cost"] = `${totalCost.toFixed(2)}`;
                tableObj1["Invoiced"] = `${totalCost.toFixed(2)} EUR`;

                var StringBuilder = firstRow[6].split(" ");
                StringBuilder.splice(1, 0, obj.Description.trim());
                StringBuilder = StringBuilder.join(" ");

                var commonAnalysisExplanation = "";

                if (sameCodeArr.length > 1) {
                    var index_string_cut = obj.Data[0][6].indexOf(obj.Data[0][0])
                    if (index_string_cut != -1) {
                        //Cut all the string from start till the PartNumber
                        commonAnalysisExplanation = obj.Data[0][6].slice(index_string_cut + 6)
                    } else {
                        //Couldnt find the PartNumber so we copyPasting the code
                        commonAnalysisExplanation = obj.Data[0][6]

                    }
                    StringBuilder = `The ${obj.Description}drive with SN: ${SN_collection} ---${commonAnalysisExplanation}`;
                }
                tableObj2["Analysis"] = StringBuilder;
                tableObj2["BY"] = investigator;
                tableObj2["DateToday"] = `${dateToday.getDate()}/${dateToday.getMonth() + 1
                    }/${dateToday.getFullYear()}`;
                counter++;
                Table1.push(tableObj1);
                Table2.push(tableObj2);
            });
        } else {
            //Single row
            var tableObj1 = {};
            var tableObj2 = {};
            tableObj1["POS"] = counter;
            tableObj1["PartNumber"] = obj.PID;
            tableObj1["DriveName"] = obj.Description;
            tableObj1["SN"] = " " + obj.Data[0][0];
            tableObj1["QTY"] = 1;
            tableObj1["FailureDescription"] = obj.Data[0][2];
            tableObj1["FailureCode"] = obj.Data[0][1];
            tableObj1["QTY_Repaired"] = obj.Data[0][3].trim() === "true" ? 1 : 0;
            tableObj1["Cost"] = parseFloat(obj.Data[0][7]).toFixed(2);
            tableObj1["Invoiced"] = parseFloat(obj.Data[0][7]).toFixed(2) + " EUR";
            TotalCostFinal += parseFloat(obj.Data[0][7]);
            var StringBuilder = obj.Data[0][6].split(" ");
            StringBuilder.splice(1, 0, obj.Description.trim());
            StringBuilder = StringBuilder.join(" ");

            tableObj2["Analysis"] = StringBuilder;
            tableObj2["BY"] = obj.Data[0][4];
            tableObj2["DateToday"] = `${dateToday.getDate()}/${dateToday.getMonth() + 1
                }/${dateToday.getFullYear()}`;
            counter++;
            Table1.push(tableObj1);
            Table2.push(tableObj2);
        }

        MainObject4_DocxTemplater["Table1"] = Table1;
        MainObject4_DocxTemplater["Table2"] = Table2;
    });
    MainObject4_DocxTemplater["TotalCost"] = TotalCostFinal.toFixed(2);
}

export function ExtractUsefulInfo(bodyHTML) {
    MainObject4_DocxTemplater = {};
    TempTable = [];
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(
        bodyHTML.replace(/<br>/g, " "),
        "text/html"
    );
    var HTML_XML = xmlDoc.querySelectorAll(".main_elem");

    //---------------------
    //Assumption that the first table found is the "Detalii RMA"------------------------------
    var tableRows_DetaliiRMA = HTML_XML[0]
        .querySelector("tbody")
        ?.querySelectorAll("tr");

    tableRows_DetaliiRMA?.forEach((tr) => {
        var th = tr.querySelector("th")?.innerText;
        var td = tr.querySelector("td")?.innerText;
        if (td == null) td = "";

        if (th) {
            MainObject4_DocxTemplater[th] = td;
        }
    });
    const dateToday = new Date();

    MainObject4_DocxTemplater["SignDate"] = `${dateToday.getDate()}/${dateToday.getMonth() + 1
        }/${dateToday.getFullYear()}`;

    // =================== Second Table MAIN =====================

    var secondTable = HTML_XML[1].querySelector("tbody")?.querySelectorAll("tr");

    secondTable?.forEach((tr) => {
        var td_all = tr.querySelectorAll("td");

        if (td_all.length > 9) {
            //we will include the arrays with 10 or 13 length and exclude the empty TD
            createObjectAndAppend(Array.from(td_all));
        }
    });
    RefactorObjects(TempTable);

    // =================== Third Table : NOTES =====================

    var thirdTable_Notes = HTML_XML[2].querySelector("tbody")?.querySelectorAll("tr");
    var thirdTableLen = thirdTable_Notes.length;

    var FinalDecision = "";
    var NotesString = "";
    thirdTable_Notes?.forEach((el, index) => {

        if (index < thirdTableLen - 3 && index != 0) {
            NotesString += el.querySelector("td span").innerText + "\n\n";
        }
        //final Decision
        if (index == thirdTableLen - 1) {
            FinalDecision = thirdTable_Notes[index].querySelector("td span").innerText;
        }


    })
    NotesString = NotesString.replace(/\n\n$/, "");//Remove the trailing empty lines 
    MainObject4_DocxTemplater["Notes"] = NotesString;
    MainObject4_DocxTemplater["FinalDecision"] = FinalDecision;


    return MainObject4_DocxTemplater;
}
