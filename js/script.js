const STATIONS = [
    { name: "Radio Clásica", frequency: 88.5, stream: "https://live.musopen.org:8085/streamvbr0" },
    { name: "SomaFM Groove Salad", frequency: 88.7, stream: "https://ice5.somafm.com/groovesalad-128-mp3" },
    { name: "SomaFM Drone Zone", frequency: 89.9, stream: "https://ice5.somafm.com/dronezone-128-mp3" },
    { name: "Radio Swiss Jazz", frequency: 91.5, stream: "https://stream.srg-ssr.ch/m/rsj/mp3_128" },
    { name: "Radio Swiss Classic", frequency: 93.3, stream: "https://stream.srg-ssr.ch/m/rsc_de/mp3_128" },
    { name: "BBC World Service", frequency: 96.3, stream: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service" }
];

let index = 0;
let playing = false;

const freq = document.getElementById("frequency");
const nameEl = document.getElementById("station");
const status = document.getElementById("status");
const audio = document.getElementById("audio");
const power = document.getElementById("power");

function updateUI() {
    freq.textContent = STATIONS[index].frequency.toFixed(1);
    nameEl.textContent = STATIONS[index].name;
    audio.src = STATIONS[index].stream;
    
    if (playing) {
        status.textContent = "Conectando…";
        audio.play().catch(e => console.log("Error al reproducir"));
    }
}

// Controladores de eventos
document.getElementById("prev").onclick = () => {
    index = (index - 1 + STATIONS.length) % STATIONS.length;
    updateUI();
};

document.getElementById("next").onclick = () => {
    index = (index + 1) % STATIONS.length;
    updateUI();
};

power.onclick = () => {
    if (!playing) {
        playing = true;
        power.classList.add("playing");
        status.textContent = "Conectando…";
        audio.play()
            .then(() => status.textContent = "♫ Reproduciendo")
            .catch(() => status.textContent = "Error de conexión");
    } else {
        playing = false;
        power.classList.remove("playing");
        audio.pause();
        status.textContent = "";
    }
};

// Manejo de errores de audio (Lo que faltaba)
audio.onerror = () => {
    if (playing) {
        status.textContent = "Estación fuera de línea";
        power.classList.remove("playing");
        playing = false;
    }
};

// Inicialización
updateUI();
