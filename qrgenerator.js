function generarCodigoQR() {
    // Obtiene el número de documento ingresado por el usuario
    const numeroDocumento = document.getElementById('CI').value;
    // Obtiene el elemento donde se mostrará el código QR
    const codigoQRDiv = document.getElementById('codigoQR');

    // Crea el código QR con qrcode.js
    const qrcode = new QRCode(codigoQRDiv, {
        text: numeroDocumento, // Datos que se convertirán en QR
        width: 128, // Ancho del código QR
        height: 128 // Alto del código QR
    });
}