function generarCodigoQR() {
    // Verifica si todos los campos requeridos están llenos
    const camposRequeridos = document.querySelectorAll('[required]');
    let todosLlenos = true;

    camposRequeridos.forEach(campo => {
        if (!campo.value) {
            todosLlenos = false;
        }
    });

    if (todosLlenos) {
        // Todos los campos requeridos están llenos, genera el código QR
        const numeroDocumento = document.getElementById('CI').value;
        const codigoQRDiv = document.getElementById('codigoQR');
        codigoQRDiv.innerHTML = "";

        const qrcode = new QRCode(codigoQRDiv, {
            text: numeroDocumento,
            width: 128,
            height: 128
        });
    } else {
        // No todos los campos requeridos están llenos, muestra un mensaje de error o toma otra acción apropiada
        alert("Por favor, complete todos los campos requeridos antes de generar el código QR.");
    }
}