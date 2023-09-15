const scanner = new Instascan.Scanner({ video: document.getElementById('scanner') });
scanner.addListener('scan', function (content) {
    // Cuando se escanea un código QR, se ejecuta esta función
    const decodedData = decodeURIComponent(content);
    document.getElementById('scan-result').textContent = `Datos decodificados: ${decodedData}`;
});

// Iniciar el escáner
Instascan.Camera.getCameras().then(cameras => {
    if (cameras.length > 0) {
        scanner.start(cameras[0]); // Usar la primera cámara encontrada
    } else {
        console.error('No se encontraron cámaras.');
    }
});
