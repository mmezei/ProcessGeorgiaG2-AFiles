# ProcessGeorgiaG2-AFiles
Generates Georgia Form G2-A PDF Files Based on Input Data File - overcoming issues with the G2-A PDF form

## INSTRUCTIONS:
*For Acrobat Pro Only*
1. Copy the G2A folder to c:\Users\YourUserName\Desktop\G2A
1. Add rows to G2AData.csv
   Strict formatting rules are required apparently. We don't attempt to do it programmatically due to possible differences in input data (SS# vs TIN, etc.)
   - PAYERS NONRESIDENTIAL NR WH: No Dashes 1234567AB
   - PAYERS FEDERAL ID NUMBER: Must have Dashes 12-1234567
   - RECIPIENTS FEINID NUMBER: No Dashes 121234567
   - NO COMMAS IN DATA FIELDS/NUMBERS - it is used as the column delimiter.
1. Copy G2AData.csv and GenerateGeorgiaG2AFiles.js to  C:\Program Files (x86)\Adobe\Acrobat DC\Acrobat\Javascripts
1. Open Acrobat
1. Enable Javascript as follows in Edit/Preferences/JavaScript:
2. ![Screenshot 2022-05-23 205009](https://user-images.githubusercontent.com/19176762/169926800-f4125bc6-fa20-402a-b7bb-2495d6af0cff.png)
   - Enable Acrobat Javascript
   - Enable menu items Javascript execution policies
   - Enable global object security policy
   - Click Ok
   - Restart Acrobat
1. Open the G2A Pdf Form (only tested on form Rev. 05/27/16) from the G2A folder on your desktop
1. In Edit Menu click "Generate Georgia G2A Files"
1. Click dialogs as appropriate and pdf's will be added to the G2A folder on your desktop
