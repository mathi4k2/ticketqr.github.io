# ticketqr.github.io
Este proyecto, en el index.html: genera un codigo QR a traves del numero de cedula ingresado, los datos del formulario son
enviados a una sheet de google donde se guardan segun el atributo name del input del formulario, es decir:
la columna debera tener como titulo el mismo name que tenga el input para que el input se guarde en esa columna.

En el consulta.hmtl: tiene un escaner de codigos QR o una barra de busqueda manual que consulta el numero de cedula a
la sheet y recibe e imprime la respuesta en pantalla.
Los scripts de google sheets utilizados fueron:

Script de registro de entradas:
// Original code from https://github.com/jamiewilson/form-to-google-sheets
// Updated for 2021 and ES6 standards

const sheetName = 'hoja'
const scriptProp = PropertiesService.getScriptProperties()

function initialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName)

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const nextRow = sheet.getLastRow() + 1

    const newRow = headers.map(function(header) {
      return header === 'Date' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}

Script de consulta de clientes:
function doGet(e) {
  // Captura el valor enviado desde la página web
  var valor = e.parameter.valor;
  
  // Llama a la función de búsqueda y verifica si el valor se encuentra
  var result = searchValueInColumnC(valor);
  
  // Convierte el resultado en formato JSON
  var response = {
    result: result
  };
  
  // Devuelve la respuesta en formato JSON
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}

function searchValueInColumnC(valor){
  const text = valor;
  const sheetName = "hoja";
  const rangeLoc = "C1:C";
 
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  const range = sheet.getRange(rangeLoc);
 
  const values = range.getValues();
  
  for (var i = 0; i < values.length; i++) {
    if (values[i][0] == text) {
      return "Cliente registrado.";
    }
  }
 
  return "Cliente no registrado.";
}
