// INSTRUCTIONS:
// * First note all comments below
//
// 1. Copy the G2A folder to c:\Users\YourUserName\Desktop\G2A
//
// 2. Add rows to G2AData.csv
//    Strict formatting rules are required apparently. We don't attempt to do it programmatically due to possible differences in input data (SS# vs TIN, etc.)
//    * PAYERS NONRESIDENTIAL NR WH: No Dashes 1234567AB
//    * PAYERS FEDERAL ID NUMBER: Must have Dashes 12-1234567
//    * RECIPIENTS FEINID NUMBER: No Dashes 121234567
//    * NO COMMAS IN DATA FIELDS/NUMBERS - it is used as the column delimiter.
//
// 3. Copy G2AData.csv and GenerateGeorgiaG2AFiles.js to  C:\Program Files (x86)\Adobe\Acrobat DC\Acrobat\Javascripts
//
// 4. Open Acrobat
//
// 5. Enable Javascript as follows in Edit/Preferences/JavaScript:
//    * Enable Acrobat Javascript
//    * Enable menu items Javascript execution policies
//    * Enable global object security policy
//    * Click Ok
//    * Restart Acrobat
//
// 6. Open the G2A Pdf Form (only tested on form Rev. 05/27/16) from the G2A folder on your desktop
//
// 7. In Edit Menu click "Generate Georgia G2A Files"
//
// 8. Click dialogs as appropriate and pdf's will be added to the G2A folder on your desktop
//
var GenerateGeorgiaG2AFiles = app.trustedFunction(function () {
  var fileName =
    "/C/Program Files (x86)/Adobe/Acrobat DC/Acrobat/Javascripts/G2AData.csv";
  var fileStream = util.readFileIntoStream(fileName);
  var fileString = util.stringFromStream(fileStream, "utf-8");
  var rows = fileString.split("\n");
  var fieldCount = rows[0].split(",").length;
  var actFieldNames = [];

  // Anomoly #1 - We need to map to get the actual field names because the
  //              fields with the names like (RECIPIENTS NAME/ADDRESS) have
  //              leading spaces and have non-ascii quote characters - one of
  //              which is causing issues in the loads.
  // Anomoly #2 - Fields reported by the application as "PRINT" is actually
  //              named YEAR - it is not clear why it is defined as PRINT
  //              internally - and inconsistently as such.
  for (var i = 0; i < fieldCount; i++) {
    var fieldName = this.getNthFieldName(i);
    if (fieldName == "PRINT") {
      fieldName = "YEAR";
    }
    actFieldNames.push(fieldName);
  }

  for (var i = 1; i < rows.length; i++) {
    this.resetForm();
    fields = rows[i].split(",");
    for (var f = 0; f < fields.length; f++) {
      field = this.getField(actFieldNames[f]);
      field.value = fields[f];
    }

    // We name the PDF based on the PAYERS FEDERAL ID NUMBER - hopefully that
    // is good behavior...
    this.saveAs(fields[1] + ".pdf");
  }
});
var AddG2AMenuItem = app.trustedFunction(function () {
  app.addMenuItem({
    cName: "GenerateGeorgiaG2AFiles",
    cUser: "Generate Georgia G2A Files",
    cParent: "Edit",
    nPos: -1,
    cExec: "GenerateGeorgiaG2AFiles();",
  });
});
AddG2AMenuItem();
