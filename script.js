// console.log({
//     bernData,
//     dublinData,
//     kopenhagenData,
//     lissabonData,
//     madridData,
//     pragData,
//     romData
// });



uv_amsterdam = [];
uv_bern = [];
uv_dublin = [];
uv_kopenhagen = [];
uv_lissabon = [];
uv_madrid = [];
uv_prag = [];
uv_rom = [];

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

      

        let myChart = document.querySelector('#myChart').getContext("2d");

        new Chart(myChart, {
            type: "line", // "line", "pie", "doughnut", "polarArea", "radar"
            data: {
                labels: ["vor 6 Tagen", "vor 5 Tagen", "vor 4 Tagen", "vor 3 Tagen", "vorgestern", "gestern","heute"],
                datasets:[
                    {
                        data: uv_amsterdam,
                        label: "Amsterdam"
                    } ,         
                    {
                        data: uv_bern,
                        label: "uv-intensität bern"
                    } ,      
                    {
                        data: uv_dublin,
                        label: "uv-intensität dublin"
                    } ,         
                    {
                        data: uv_kopenhagen,
                        label: "uv-intensität kopenhagen"
                    } ,         
                    {
                        data: uv_lissabon,
                        label: "uv-intensität lissabon"
                    } ,         
                    {
                        data: uv_madrid,
                        label: "uv-intensität madrid"
                    } ,         
                    {
                        data: uv_prag,
                        label: "uv-intensität prag"
                    } ,         
                    {
                        data: uv_rom,
                        label: "uv-intensität rom"
                    }      
                ]
            }
        });





    })
    .catch(error => {
        console.error('Error:', error);
    });



    
    // Marker für jede Stadt hinzufügen
// Positionen der Städte auf der Karte (geschätzt in %)
const cityPositions = {
  "Amsterdam":  { top: 23, left: 46 },
  "Bern":       { top: 42, left: 50 },
  "Dublin":     { top: 26, left: 35 },
  "Kopenhagen": { top: 18, left: 55 },
  "Lissabon":   { top: 65, left: 30 },
  "Madrid":     { top: 55, left: 33 },
  "Prag":       { top: 32, left: 56 },
  "Rom":        { top: 58, left: 58 }
};

const mapContainer = document.querySelector(".europa-container");

fetch("https://im3-uv.ramisberger-tabea.ch/unload.php?all=true")
  .then(res => res.json())
  .then(data => {
    data.forEach(cityData => {
      const { city, uvindex } = cityData;

      // Falls Stadt keine Position hat, überspringen
      if (!cityPositions[city]) return;

      const pos = cityPositions[city];
      const marker = document.createElement("div");
      marker.classList.add("marker");
      marker.dataset.city = city;

      // Positionierung in Prozent (passt sich bei Skalierung an)
      marker.style.top = `${pos.top}%`;
      marker.style.left = `${pos.left}%`;

      // Farbe abhängig vom UV-Index
      let color;
      if (uvindex < 3) color = "rgb(145, 255, 186)";
      else if (uvindex < 6) color = "rgb(255, 255, 120)";
      else color = "rgb(255, 120, 120)";
      marker.style.backgroundColor = color;

      // Hover-Effekt mit Info
      marker.addEventListener("mouseenter", () => {
        marker.style.boxShadow = `0 0 15px ${color}`;
      });
      marker.addEventListener("mouseleave", () => {
        marker.style.boxShadow = "none";
      });

      mapContainer.appendChild(marker);
    });
  })
  .catch(err => console.error("Fehler beim Laden der Daten:", err));











//     const cities = [
//   { name: "Amsterdam", top: 20, left: 45, uv: 2.5 },
//   { name: "Bern", top: 35, left: 50, uv: 3.8 },
//   { name: "Dublin", top: 25, left: 35, uv: 1.9 },
//   { name: "Kopenhagen", top: 15, left: 55, uv: 2.2 },
//   { name: "Lissabon", top: 65, left: 30, uv: 5.7 },
//   { name: "Madrid", top: 55, left: 33, uv: 6.3 },
//   { name: "Prag", top: 30, left: 55, uv: 3.1 },
//   { name: "Rom", top: 55, left: 58, uv: 6.9 },
// ];

// const mapContainer = document.querySelector(".europa-container");

// cities.forEach(city => {
//   const marker = document.createElement("div");
//   marker.classList.add("marker");
//   marker.dataset.city = city.name;

//   // Positionierung in Prozent
//   marker.style.top = `${city.top}%`;
//   marker.style.left = `${city.left}%`;

//   // Farbe abhängig vom UV-Index
//   let color;
//   if (city.uv < 3) color = "rgb(145, 255, 186)";
//   else if (city.uv < 6) color = "rgb(255, 255, 120)";
//   else color = "rgb(255, 120, 120)";
//   marker.style.backgroundColor = color;

//   // Hover-Effekt (aufleuchten)
//   marker.addEventListener("mouseenter", () => {
//     marker.style.boxShadow = `0 0 15px ${color}`;
//   });
//   marker.addEventListener("mouseleave", () => {
//     marker.style.boxShadow = "none";
//   });

//   mapContainer.appendChild(marker);
// });



const locationButton = document.getElementById("locationButton");
const dropdownMenu = document.getElementById("dropdownMenu");

locationButton.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
});

// Klick auf Stadtname im Dropdown
dropdownMenu.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    const city = event.target.dataset.city;
    locationButton.textContent = city + " ▼";
    dropdownMenu.classList.add("hidden");

    console.log("Ausgewählte Stadt:", city);
    // Hier später: Funktion aufrufen, um das Diagramm zu aktualisieren
    // updateChart(city);
  }
});

// Schließt das Menü, wenn außerhalb geklickt wird
document.addEventListener("click", (event) => {
  if (!locationButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownMenu.classList.add("hidden");
  }
});
