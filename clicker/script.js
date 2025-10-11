let contador = 0;
const spanContador = document.getElementById('contador');
const boton = document.getElementById('boton');
const mensaje = document.getElementById('mensaje');

// Mensajes personalizados cada 50 clics hasta 1,000
const mensajesIniciales = {
  50: "🔥 ¡Vas con todo! 50 clics.",
  100: "💪 ¡Rompiendo récords! 100 clics.",
  150: "⚡ ¡Clicker imparable! 150 clics.",
  200: "🎯 ¡Nada te detiene! 200 clics.",
  250: "🚀 ¡Subiendo como cohete! 250 clics.",
  300: "👀 ¿Hasta dónde llegarás? 300 clics.",
  350: "🧠 Concentración total. 350 clics.",
  400: "😮 Esto ya es otro nivel. 400 clics.",
  450: "🤖 ¿Eres humano? 450 clics.",
  500: "🏆 ¡Medio camino a 1,000! 500 clics.",
  550: "🔥 ¡Sigues dándole! 550 clics.",
  600: "💥 Increíble resistencia. 600 clics.",
  650: "🎮 Eres un clicker pro. 650 clics.",
  700: "⚠️ ¡No pares ahora! 700 clics.",
  750: "🥵 El mouse pide descanso. 750 clics.",
  800: "👑 Clicker supremo. 800 clics.",
  850: "🤩 ¡Faltan 150! 850 clics.",
  900: "⚡ Última recta. 900 clics.",
  950: "🔔 ¡Casi lo logras! 950 clics.",
  1000: "🎉 ¡MIL CLICKS! ¡Eres una leyenda del click! 💯"
};

// Función para generar mensajes progresivamente exagerados
function generarMensajeAlentador(clicks) {
  const nivel = Math.floor((clicks - 1000) / 100);
  const emojis = ["🔥", "🚀", "👑", "💀", "💥", "⚡", "🌋", "🥵", "🧨", "🫡"];
  const frases = [
    "¡Increíble!",
    "¡Estás poseído por el clic!",
    "¡Rompiendo el espacio-tiempo!",
    "¡Tus dedos son de adamantium!",
    "¡¿Cómo sigues vivo?!",
    "¡Esto ya es historia!",
    "¡Clicker supremo de la galaxia!",
    "¡Te ganaste el respeto del universo!",
    "¡CLIC INMORTAL!",
    "¡YA ESTÁS FUERA DE CONTROL!"
  ];

  const emoji = emojis[nivel % emojis.length];
  const frase = frases[nivel % frases.length];

  return `${emoji} ${clicks} clics. ${frase}`;
}

boton.addEventListener('click', () => {
  contador++;
  spanContador.textContent = contador;

  if (contador <= 1000 && contador % 50 === 0 && mensajesIniciales[contador]) {
    mensaje.textContent = mensajesIniciales[contador];
  } else if (contador > 1000 && contador % 100 === 0 && contador <= 100000) {
    mensaje.textContent = generarMensajeAlentador(contador);
  }
});

document.getElementById("backToLobbyBtn").addEventListener("click", () => {
  window.location.href = "../../index.html"; 
});
