//crea elemento
const video = document.createElement("video");

//nuestro camvas
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

//div donde llegara nuestro canvas
const btnScanQR = document.getElementById("btn-scan-qr");

//lectura desactivada
let scanning = false;

//funcion para encender la camara
const encenderCamara = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      scanning = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

//funciones para levantar las funiones de encendido de la camara
function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}

//apagara la camara
const cerrarCamara = () => {
  video.srcObject.getTracks().forEach((track) => {
    track.stop();
  });
  canvasElement.hidden = true;
  btnScanQR.hidden = false;
};

const activarSonido = () => {
  var audio = document.getElementById('audioScaner');
  audio.play();
}

//callback cuando termina de leer el codigo QR
qrcode.callback = (respuesta) => {
  if (respuesta) {
    searchInGoogleSheets(respuesta);
    const respuestaContainer = document.getElementById("respuesta-container");
    respuestaContainer.innerHTML = respuesta; // Establece la respuesta como contenido HTML del elemento
    activarSonido();
    cerrarCamara();
  }
};
//evento para mostrar la camara sin el boton 
window.addEventListener('load', (e) => {
  encenderCamara();
})

function searchInGoogleSheets(respuesta) {
  fetch('https://script.google.com/macros/s/AKfycbywFACiD4gGF79jbdG931iV1lDDYEi5aW-3-6MHoIIFtKX21dephomgElcX0h-HcWgBYQ/exec?valor=' + encodeURIComponent(respuesta))
      .then(response => response.json())
      .then(data => {
          const resultDiv = document.getElementById('result');
          resultDiv.textContent = data.result;
      });
}

function buscarManualmente() { 
  event.preventDefault();
  const valor = document.getElementById('valor').value;
  searchInGoogleSheets(valor);
  const respuestaContainer = document.getElementById("respuesta-container");
  respuestaContainer.innerHTML = valor;
};