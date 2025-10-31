
// -------------------------------
// 🌤️ UV-Index Visualisierung (Eurotan Subpage)
// -------------------------------

// --- Datenspeicher für Städte ---
let uv_amsterdam = [];
let uv_bern = [];
let uv_dublin = [];
let uv_kopenhagen = [];
let uv_lissabon = [];
let uv_madrid = [];
let uv_prag = [];
let uv_rom = [];

// --- URLs für Datenabruf ---
const urls = [
  'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Amsterdam',
  'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Bern',
  'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Dublin',
  'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Kopenhagen',
  'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Lissabon',
  'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Madrid',
  'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Prag',
  'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Rom'
];

let chartInstance;

// --- Feste Farben für Diagramm-Linien ---
const cityColors = {
  Amsterdam: "#E74C3C",
  Bern: "#27AE60",
  Dublin: "#2980B9",
  Kopenhagen: "#8E44AD",
  Lissabon: "#F39C12",
  Madrid: "#16A085",
  Prag: "#D35400",
  Rom: "#2C3E50"
};

// -------------------------------
// 📊 Daten laden & Chart erstellen
// -------------------------------
Promise.all(urls.map(url => fetch(url).then(res => res.json())))
.then(([amsterdamData, bernData, dublinData, kopenhagenData, lissabonData, madridData, pragData, romData]) => {
    uv_amsterdam = amsterdamData;
    uv_bern = bernData;
    uv_dublin = dublinData;
    uv_kopenhagen = kopenhagenData;
    uv_lissabon = lissabonData;
    uv_madrid = madridData;
    uv_prag = pragData;
    uv_rom = romData;

    const cityData = {
        Amsterdam: uv_amsterdam,
        Bern: uv_bern,
        Dublin: uv_dublin,
        Kopenhagen: uv_kopenhagen,
        Lissabon: uv_lissabon,
        Madrid: uv_madrid,
        Prag: uv_prag,
        Rom: uv_rom
    };

    // -------------------------------
    // 🧭 Chart.js Setup
    // -------------------------------
    const ctx = document.querySelector('#myChart').getContext("2d");

    chartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: [
                "vor 10 Tagen","vor 9 Tagen","vor 8 Tagen","vor 7 Tagen",
                "vor 6 Tagen","vor 5 Tagen","vor 4 Tagen","vor 3 Tagen",
                "vorgestern","gestern"
            ],
            datasets: []
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: 10 },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: "UV-Index", font: { size: 16, weight: "bold" } }
                },
                x: { ticks: { font: { size: 12 } } }
            },
            plugins: { legend: { labels: { font: { size: 14 } } } }
        }
    });

    // -------------------------------
    // 🗺️ Karte mit UV-Markern
    // -------------------------------
    const cities = [
        { name: "Amsterdam", top: 34, left: 51, uv: uv_amsterdam.at(-1) },
        { name: "Bern", top: 55, left: 55, uv: uv_bern.at(-1) },
        { name: "Dublin", top: 25, left: 26, uv: uv_dublin.at(-1) },
        { name: "Kopenhagen", top: 21, left: 65, uv: uv_kopenhagen.at(-1) },
        { name: "Lissabon", top: 79, left: 10, uv: uv_lissabon.at(-1) },
        { name: "Madrid", top: 75, left: 26, uv: uv_madrid.at(-1) },
        { name: "Prag", top: 43, left: 70, uv: uv_prag.at(-1) },
        { name: "Rom", top: 74, left: 67, uv: uv_rom.at(-1) }
    ];

    const mapContainer = document.querySelector(".europa-container");

    cities.forEach(city => {
        const marker = document.createElement("div");
        marker.classList.add("marker");
        marker.dataset.city = city.name;
        marker.style.top = `${city.top}%`;
        marker.style.left = `${city.left}%`;

        let color;
        if (city.uv <= 2) color = "rgb(0, 200, 0)";
        else if (city.uv <= 4) color = "rgb(255, 230, 0)";
        else if (city.uv <= 6) color = "rgb(255, 165, 0)";
        else if (city.uv <= 9) color = "rgb(255, 0, 0)";
        else color = "rgb(139, 0, 0)";

        marker.style.backgroundColor = color;

        marker.addEventListener("mouseenter", () => marker.style.boxShadow = `0 0 20px ${color}`);
        marker.addEventListener("mouseleave", () => marker.style.boxShadow = "none");

        mapContainer.appendChild(marker);
    });

    // -------------------------------
    // 📋 Dropdown-Menü Logik
    // -------------------------------
    const locationButton = document.getElementById("locationButton");
    const dropdownMenu = document.getElementById("dropdownMenu");

    locationButton.addEventListener("click", event => {
        event.stopPropagation();
        dropdownMenu.classList.toggle("show");
    });

    dropdownMenu.addEventListener("click", event => {
        if(event.target.tagName === "LI") {
            const city = event.target.dataset.city;
            locationButton.textContent = city + " ▼";
            dropdownMenu.classList.remove("show");
            updateChart(city);
        }
    });

    document.addEventListener("click", event => {
        if(!locationButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove("show");
        }
    });

    // -------------------------------
    // 📈 Chart aktualisieren
    // -------------------------------
    function updateChart(city) {
        if(city === "Vergleichen") {
            const datasets = Object.keys(cityData).map(cityName => ({
                label: `UV-Index ${cityName}`,
                data: cityData[cityName],
                borderWidth: 2,
                borderColor: cityColors[cityName],
                backgroundColor: "transparent",
                tension: 0.3
            }));
            chartInstance.data.datasets = datasets;
            chartInstance.update();

            document.querySelectorAll(".marker").forEach(marker => marker.style.display = "block");
            return;
        }

        const uvValues = cityData[city];
        if(!uvValues) return;

        chartInstance.data.datasets = [{
            label: `UV-Index ${city}`,
            data: uvValues,
            borderWidth: 2,
            borderColor: cityColors[city],
            backgroundColor: "rgba(75,192,192,0.2)",
            tension: 0.3,
            fill: true
        }];
        chartInstance.update();

        document.querySelectorAll(".marker").forEach(marker => {
            marker.style.display = (marker.dataset.city === city) ? "block" : "none";
        });
    }

    // -------------------------------
    // 🟢 Buttons Funktion
    // -------------------------------
    const karteButton = document.querySelector(".karte-button");
    const analyseButton = document.querySelector(".analyse-button");

    karteButton.addEventListener("click", () => window.location.href = "index.html");
    analyseButton.addEventListener("click", () => console.log("Analyse Button geklickt"));

    // -------------------------------
    // 🟢 Standardmäßig: Amsterdam anzeigen
    // -------------------------------
    updateChart("Amsterdam");

})
.catch(error => console.error("Fehler beim Laden der Daten:", error));










// uv_amsterdam = [];
// uv_bern = [];
// uv_dublin = [];
// uv_kopenhagen = [];
// uv_lissabon = [];
// uv_madrid = [];
// uv_prag = [];
// uv_rom = [];

// const urls = [
//   'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Amsterdam',
//   'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Bern',
//   'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Dublin',
//   'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Kopenhagen',
//   'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Lissabon',
//   'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Madrid',
//   'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Prag',
//   'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Rom'
// ];

// let chartInstance;

// Promise.all(urls.map(url => fetch(url).then(res => res.json())))
//   .then(([amsterdamData, bernData, dublinData, kopenhagenData, lissabonData, madridData, pragData, romData]) => {
//     uv_amsterdam = amsterdamData;
//     uv_bern = bernData;
//     uv_dublin = dublinData;
//     uv_kopenhagen = kopenhagenData;
//     uv_lissabon = lissabonData;
//     uv_madrid = madridData;
//     uv_prag = pragData;
//     uv_rom = romData;

//     const ctx = document.querySelector('#myChart').getContext("2d");
//     chartInstance = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: ["vor 6 Tagen", "vor 5 Tagen", "vor 4 Tagen", "vor 3 Tagen", "vorgestern", "gestern", "heute"],
//         datasets: []
//       }
//     });

//     // Dropdown-Menü Funktionalität
//     const locationButton = document.getElementById("locationButton");
//     const dropdownMenu = document.getElementById("dropdownMenu");

//     locationButton.addEventListener("click", () => {
//       dropdownMenu.classList.toggle("hidden");
//     });

//     const cityData = {
//       Amsterdam: uv_amsterdam,
//       Bern: uv_bern,
//       Dublin: uv_dublin,
//       Kopenhagen: uv_kopenhagen,
//       Lissabon: uv_lissabon,
//       Madrid: uv_madrid,
//       Prag: uv_prag,
//       Rom: uv_rom
//     };

//     // Klick auf Stadtname im Dropdown
//     dropdownMenu.addEventListener("click", (event) => {
//       if (event.target.tagName === "LI") {
//         const city = event.target.dataset.city;
//         locationButton.textContent = city + " ▼";
//         dropdownMenu.classList.add("hidden");

//         console.log("Ausgewählte Stadt:", city);

//         updateChart(city);
//       }
//     });

//     // Schließt das Menü, wenn außerhalb geklickt wird
//     document.addEventListener("click", (event) => {
//       if (!locationButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
//         dropdownMenu.classList.add("hidden");
//       }
//     });

//     // 🎨 Zufallsfarbe für jede Linie (bei "Vergleichen")
//     function randomColor() {
//       const r = Math.floor(Math.random() * 255);
//       const g = Math.floor(Math.random() * 255);
//       const b = Math.floor(Math.random() * 255);
//       return `rgba(${r}, ${g}, ${b}, 1)`;
//     }

//     // 📊 Chart-Aktualisierung
//     function updateChart(city) {
//       if (city === "Vergleichen") {
//         // Alle Städte gleichzeitig anzeigen
//         const datasets = Object.keys(cityData).map(cityName => ({
//           label: `UV-Index ${cityName}`,
//           data: cityData[cityName],
//           borderWidth: 2,
//           borderColor: randomColor(),
//           backgroundColor: "transparent",
//           tension: 0.3
//         }));

//         chartInstance.data.datasets = datasets;
//         chartInstance.update();

//         // Alle Marker sichtbar machen
//         document.querySelectorAll(".marker").forEach(marker => {
//           marker.style.display = "block";
//         });

//         return; // Abbrechen, da Vergleich fertig
//       }

//       // Eine einzelne Stadt anzeigen
//       const uvValues = cityData[city];

//       if (!uvValues) {
//         console.error("Keine Daten für Stadt:", city);
//         return;
//       }

//       chartInstance.data.datasets = [
//         {
//           label: `UV-Index ${city}`,
//           data: uvValues,
//           borderWidth: 2,
//           borderColor: "rgba(75, 192, 192, 1)",
//           backgroundColor: "rgba(75, 192, 192, 0.2)",
//           tension: 0.3,
//           fill: true
//         }
//       ];

//       chartInstance.update();

//       // Nur Marker der gewählten Stadt anzeigen
//       const markers = document.querySelectorAll(".marker");
//       markers.forEach(marker => {
//         marker.style.display = (marker.dataset.city === city) ? "block" : "none";
//       });
//     }

//     // 🗺️ Marker für die Karte
//     const cities = [
//       { name: "Amsterdam", top: 35, left: 51, uv: uv_amsterdam[uv_amsterdam.length - 1] },
//       { name: "Bern", top: 54, left: 55, uv: uv_bern[uv_bern.length - 1] },
//       { name: "Dublin", top: 28, left: 26, uv: uv_dublin[uv_dublin.length - 1] },
//       { name: "Kopenhagen", top: 25, left: 65, uv: uv_kopenhagen[uv_kopenhagen.length - 1] },
//       { name: "Lissabon", top: 75, left: 10, uv: uv_lissabon[uv_lissabon.length - 1] },
//       { name: "Madrid", top: 72, left: 29, uv: uv_madrid[uv_madrid.length - 1] },
//       { name: "Prag", top: 43, left: 70, uv: uv_prag[uv_prag.length - 1] },
//       { name: "Rom", top: 68.5, left: 65, uv: uv_rom[uv_rom.length - 1] },
//     ];

//     const mapContainer = document.querySelector(".europa-container");

//     cities.forEach(city => {
//       const marker = document.createElement("div");
//       marker.classList.add("marker");
//       marker.dataset.city = city.name;

//       marker.style.top = `${city.top}%`;
//       marker.style.left = `${city.left}%`;

//       let color;
//       if (city.uv < 2) color = "rgb(145, 255, 186)";
//       else if (city.uv < 6) color = "rgb(255, 255, 120)";
//       else color = "rgb(255, 120, 120)";
//       marker.style.backgroundColor = color;

//       marker.addEventListener("mouseenter", () => {
//         marker.style.boxShadow = `0 0 20px ${color}`;
//       });
//       marker.addEventListener("mouseleave", () => {
//         marker.style.boxShadow = "none";
//       });

//       mapContainer.appendChild(marker);
//     });

//     // 🔹 Standardanzeige beim Laden
//     updateChart("Bern");

//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });










// uv_amsterdam = [];
// uv_bern = [];
// uv_dublin = [];
// uv_kopenhagen = [];
// uv_lissabon = [];
// uv_madrid = [];
// uv_prag = [];
// uv_rom = [];

// const urls = [
//   'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Amsterdam',
//   'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Bern',
//   'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Dublin',
//   'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Kopenhagen',
//   'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Lissabon',
//   'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Madrid',
//   'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Prag',
//   'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Rom'
// ];

// let myChart;
// let chartInstance;

// Promise.all(urls.map(url => fetch(url).then(res => res.json())))
//   .then(([amsterdamData, bernData, dublinData, kopenhagenData, lissabonData, madridData, pragData, romData]) => {
//     uv_amsterdam = amsterdamData;
//     uv_bern = bernData;
//     uv_dublin = dublinData;
//     uv_kopenhagen = kopenhagenData;
//     uv_lissabon = lissabonData;
//     uv_madrid = madridData;
//     uv_prag = pragData;
//     uv_rom = romData;



//     const ctx = document.querySelector('#myChart').getContext("2d");
//     chartInstance = new Chart(ctx, {
//       type: "line", // "line", "pie", "doughnut", "polarArea", "radar"
//       data: {
//         labels: ["vor 6 Tagen", "vor 5 Tagen", "vor 4 Tagen", "vor 3 Tagen", "vorgestern", "gestern", "heute"],
//         datasets: []
//       }
//     });

//     // Dropdown-Menü Funktionalität


//     const locationButton = document.getElementById("locationButton");
//     const dropdownMenu = document.getElementById("dropdownMenu");

//     locationButton.addEventListener("click", () => {
//       dropdownMenu.classList.toggle("hidden");
//     });

//     const cityData = {
//       Amsterdam: uv_amsterdam,
//       Bern: uv_bern,
//       Dublin: uv_dublin,
//       Kopenhagen: uv_kopenhagen,
//       Lissabon: uv_lissabon,
//       Madrid: uv_madrid,
//       Prag: uv_prag,
//       Rom: uv_rom
//     };

//     // Klick auf Stadtname im Dropdown
//     dropdownMenu.addEventListener("click", (event) => {
//       if (event.target.tagName === "LI") {
//         const city = event.target.dataset.city;
//         locationButton.textContent = city + " ▼";
//         dropdownMenu.classList.add("hidden");

//         console.log("Ausgewählte Stadt:", city);

//         updateChart(city);
//         // Hier später: Funktion aufrufen, um das Diagramm zu aktualisieren
//         // updateChart(city);
//       }
//     });



//     // Schließt das Menü, wenn außerhalb geklickt wird
//     document.addEventListener("click", (event) => {
//       if (!locationButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
//         dropdownMenu.classList.add("hidden");
//       }
//     });

//     // Chart-Aktualisierung
//     function updateChart(city) {
//       const uvValues = cityData[city];

//       if (!uvValues) {
//         console.error("Keine Daten für Stadt:", city);
//         return;
//       }

//       chartInstance.data.datasets = [
//         {
//           label: `UV-Index ${city}`,
//           data: uvValues,
//           borderWidth: 2,
//           borderColor: "rgba(75, 192, 192, 1)",
//           backgroundColor: "rgba(75, 192, 192, 0.2)",
//           tension: 0.3,
//           fill: true
//         }
//       ];

//       chartInstance.update();

//       // ✅ Nur Marker der gewählten Stadt anzeigen
//       const markers = document.querySelectorAll(".marker");
//       markers.forEach(marker => {
//         if (marker.dataset.city === city) {
//           marker.style.display = "block"; // sichtbar
//         } else {
//           marker.style.display = "none"; // ausblenden
//         }
//       });
//     }

    
//     const cities = [
//       { name: "Amsterdam", top: 35, left: 51, uv: uv_amsterdam = [0] },
//       { name: "Bern", top: 54, left: 55, uv: uv_bern[1] },
//       { name: "Dublin", top: 28, left: 26, uv: uv_dublin[2] },
//       { name: "Kopenhagen", top: 25, left: 65, uv: uv_kopenhagen[3] },
//       { name: "Lissabon", top: 75, left: 10, uv: uv_lissabon[4] },
//       { name: "Madrid", top: 72, left: 29, uv: uv_madrid[5] },
//       { name: "Prag", top: 43, left: 70, uv: uv_prag[6] },
//       { name: "Rom", top: 68.5, left: 65, uv: uv_rom[7] },
//     ];

//     console.log(cities);

//     const mapContainer = document.querySelector(".europa-container");

//     cities.forEach(city => {
//       const marker = document.createElement("div");
//       marker.classList.add("marker");
//       marker.dataset.city = city.name;

//       // Positionierung in Prozent
//       marker.style.top = `${city.top}%`;
//       marker.style.left = `${city.left}%`;

//       // Farbe abhängig vom UV-Index
//       let color;
//       if (city.uv < 2) color = "rgb(145, 255, 186)";
//       else if (city.uv < 6) color = "rgb(255, 255, 120)";
//       else color = "rgb(255, 120, 120)";
//       marker.style.backgroundColor = color;

//       // Hover-Effekt (aufleuchten)
//       marker.addEventListener("mouseenter", () => {
//         marker.style.boxShadow = `0 0 20px ${color}`;
//       });
//       marker.addEventListener("mouseleave", () => {
//         marker.style.boxShadow = "none";
//       });

//       mapContainer.appendChild(marker);
//     });

//     updateChart("Bern");

//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
