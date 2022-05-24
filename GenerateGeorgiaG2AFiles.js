
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
