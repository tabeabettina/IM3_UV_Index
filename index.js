// --- Arrays für UV-Daten ---
let uvData = {
  Amsterdam: [],
  Bern: [],
  Dublin: [],
  Kopenhagen: [],
  Lissabon: [],
  Madrid: [],
  Prag: [],
  Rom: []
};

// --- URLs für UV-Daten ---
const urls = {
  Amsterdam: 'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Amsterdam',
  Bern: 'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Bern',
  Dublin: 'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Dublin',
  Kopenhagen: 'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Kopenhagen',
  Lissabon: 'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Lissabon',
  Madrid: 'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Madrid',
  Prag: 'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Prag',
  Rom: 'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Rom'
};

// --- Städte-Positionen auf der Karte ---
const cities = [
  { name: "Amsterdam", top: 32, left: 51 },
  { name: "Bern", top: 54, left: 55 },
  { name: "Dublin", top: 24, left: 30 },
  { name: "Kopenhagen", top: 21, left: 63 },
  { name: "Lissabon", top: 80, left: 16 },
  { name: "Madrid", top: 76, left: 30 },
  { name: "Prag", top: 43, left: 68 },
  { name: "Rom", top: 74, left: 65 }
];

// --- DOM-Elemente ---
const mapContainer = document.querySelector(".europa-container");
const welcomeBox = document.getElementById("welcomeBox");
const infoBox = document.getElementById("infoBox");
const cityNameElem = document.getElementById("cityName");
const uvCircle = document.getElementById("uvCircle");
const uvValueElem = document.getElementById("uvValue");
const uvInfoElem = document.getElementById("uvInfo");

const markerColor = "rgba(144, 250, 246, 1)";

// --- UV-Daten vom Server laden ---
Promise.all(
  Object.keys(urls).map(city => fetch(urls[city]).then(res => res.json()))
).then(results => {
  Object.keys(uvData).forEach((city, index) => {
    uvData[city] = results[index];
  });

  // --- Marker auf Karte platzieren ---
  cities.forEach(city => {
    const marker = document.createElement("div");
    marker.classList.add("marker");
    marker.dataset.city = city.name;
    marker.style.top = `${city.top}%`;
    marker.style.left = `${city.left}%`;
    marker.style.backgroundColor = markerColor;

    // Hover-Effekt
    marker.addEventListener("mouseenter", () => {
      marker.style.boxShadow = `0 0 20px ${markerColor}`;
    });
    marker.addEventListener("mouseleave", () => {
      marker.style.boxShadow = "none";
    });

    // --- Klick-Event für InfoBox ---
    marker.addEventListener("click", () => {
      const cityName = city.name;
      const data = uvData[cityName];
      const currentUV = (data && data.length > 0) ? data[data.length - 1] : 0;

      // Farbe nach UV-Wert
      let color;
      let glow;
      let infoText = "";
      if (currentUV <= 2) {
        color = "rgba(0, 200, 0, 1)";
        glow = "0 0 20px rgba(0, 200, 0, 0.8)";
        infoText = "Brrr... hemmer Winter?!?";
      } else if (currentUV <= 4) {
        color = "rgba(255, 255, 65, 1)";
        glow = "0 0 25px rgba(255, 255, 65, 0.8)";
        infoText = "Es chonnt langsam, sueche mer doch mal en Sonneplatz :)";
      } else if (currentUV <= 6) {
        color = "rgba(253, 174, 89, 1)";
        glow = "0 0 25px rgba(253, 174, 89, 0.9)";
        infoText = "Perfekt zom bruun wärde, aber regelmässig icreme!";
      } else if (currentUV <= 9) {
        color = "rgba(250, 66, 66, 1)";
        glow = "0 0 30px rgba(250, 66, 66, 0.9)";
        infoText = "Onchillig, me werd eher rot als brun :(";
      } else {
        color = "rgba(129, 7, 7, 1)";
        glow = "0 0 35px rgba(129, 7, 7, 1)";
        infoText = "Vöu z'vöu Sonne – Bleiben Sie zu Hause!!!";
      }

      // Welcome Box verstecken, InfoBox zeigen
      welcomeBox.classList.add("hidden");
      infoBox.classList.remove("hidden");

      // Inhalte aktualisieren
      cityNameElem.textContent = cityName;
      uvCircle.style.backgroundColor = color;
      uvValueElem.textContent = `Aktuelle UV-Strahlung: ${currentUV}`;
      uvInfoElem.textContent = infoText;

      // kleiner "Pop"-Effekt
      uvCircle.animate([{ transform: "scale(0.8)" }, { transform: "scale(1)" }], {
        duration: 300,
        easing: "ease-out"
      });
    });

    mapContainer.appendChild(marker);
  });

}).catch(error => {
  console.error("Fehler beim Laden der UV-Daten:", error);
});













// --- Leere Arrays für Daten ---
// let uv_amsterdam = [];
// let uv_bern = [];
// let uv_dublin = [];
// let uv_kopenhagen = [];
// let uv_lissabon = [];
// let uv_madrid = [];
// let uv_prag = [];
// let uv_rom = [];

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

// const cities = [
//   { name: "Amsterdam", top: 32, left: 51 },
//   { name: "Bern", top: 54, left: 55 },
//   { name: "Dublin", top: 24, left: 30 },
//   { name: "Kopenhagen", top: 21, left: 63 },
//   { name: "Lissabon", top: 80, left: 16 },
//   { name: "Madrid", top: 76, left: 30 },
//   { name: "Prag", top: 43, left: 70 },
//   { name: "Rom", top: 74, left: 65 },
// ];

// const mapContainer = document.querySelector(".europa-container");
// const markerColor = "rgba(144, 250, 246, 1)";

// // --- Infobox Elemente im HTML ---
// const welcomeBox = document.getElementById("welcomeBox");
// const infoBox = document.getElementById("infoBox");
// const cityNameElem = document.getElementById("cityName");
// const uvCircle = document.getElementById("uvCircle");
// const uvValueElem = document.getElementById("uvValue");
// const uvInfoElem = document.getElementById("uvInfo");

// // --- Daten laden ---
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

//     // --- Marker auf Karte platzieren ---
//     cities.forEach(city => {
//       const marker = document.createElement("div");
//       marker.classList.add("marker");
//       marker.dataset.city = city.name;
//       marker.style.top = `${city.top}%`;
//       marker.style.left = `${city.left}%`;
//       marker.style.backgroundColor = markerColor;

//       // Hover-Effekt
//       marker.addEventListener("mouseenter", () => {
//         marker.style.boxShadow = `0 0 20px ${markerColor}`;
//       });
//       marker.addEventListener("mouseleave", () => {
//         marker.style.boxShadow = "none";
//       });

//       // --- Klick-Event für Infobox ---
//       marker.addEventListener("click", () => {
//         const cityName = city.name;
//         const data = cityData[cityName];

//         if (!data || data.length === 0) return;

//         const currentUV = data[data.length - 1]; // letzter (aktueller) Wert

//         // Farbe nach UV-Wert
//         let color;
//         if (currentUV <= 2) color = "rgb(145, 255, 186)";        // 🌿 Grün: 0–2
//         else if (currentUV <= 4) color = "rgb(255, 255, 120)";   // ☀️ Gelb: 3–4
//         else if (currentUV <= 6) color = "rgb(255, 190, 120)";   // 🟧 Orange: 5–6
//         else if (currentUV <= 9) color = "rgb(255, 120, 120)";   // 🔥 Rot: 7–9
//         else color = "rgb(180, 0, 0)";                           // 🩸 Dunkelrot: 10+

//         // Welcome Box verstecken, InfoBox zeigen
//         welcomeBox.classList.add("hidden");
//         infoBox.classList.remove("hidden");

//         // Inhalte aktualisieren
//         cityNameElem.textContent = cityName;
//         uvCircle.style.backgroundColor = color;
//         uvValueElem.textContent = `Aktueller UV-Index: ${currentUV}`;


//         const uvInfoElem = document.getElementById("uvInfo");

//         let infoText = "";
//         if (currentUV <= 2) {
//           infoText = "Unbedenklich – Sonne geniessen 😎";
//         } else if (currentUV <= 4) {
//           infoText = "Leichte Vorsicht – Sonnencreme empfohlen 🧴";
//         } else if (currentUV <= 6) {
//           infoText = "Mässig stark – Cap und Sonnencreme nicht vergessen! 🧢";
//         } else if (currentUV <= 9) {
//           infoText = "Sehr stark! Schatten aufsuchen, Haut schützen ☀️";
//         } else {
//           infoText = "Extrem gefährlich – Sonne meiden! 🛑";
//         }

//         uvInfoElem.textContent = infoText;




//         // kleiner visueller "Pop"-Effekt
//         uvCircle.animate([{ transform: "scale(0.8)" }, { transform: "scale(1)" }], {
//           duration: 300,
//           easing: "ease-out"
//         });
//       });

//       mapContainer.appendChild(marker);
//     });
//   })
//   .catch(error => {
//     console.error("Fehler beim Laden der Daten:", error);
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
//     'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Amsterdam',
//     'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Bern',
//     'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Dublin',
//     'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Kopenhagen',
//     'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Lissabon',
//     'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Madrid',
//     'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Prag',
//     'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Rom'
// ];


// // Alle Städte mit Positionen
// const cities = [
//   { name: "Amsterdam", top: 35, left: 51 },
//   { name: "Bern", top: 54, left: 55 },
//   { name: "Dublin", top: 28, left: 26 },
//   { name: "Kopenhagen", top: 22, left: 65 },
//   { name: "Lissabon", top: 75, left: 10 },
//   { name: "Madrid", top: 72, left: 29 },
//   { name: "Prag", top: 43, left: 70 },
//   { name: "Rom", top: 68.5, left: 65 },
// ];

// const mapContainer = document.querySelector(".europa-container");

// // 🎨 Eine einheitliche Farbe für alle Marker
// const markerColor = "rgba(144, 250, 246, 1)"; // ein kräftiges Korallenrot

// cities.forEach(city => {
//   const marker = document.createElement("div");
//   marker.classList.add("marker");
//   marker.dataset.city = city.name;

//   // Positionierung in Prozent
//   marker.style.top = `${city.top}%`;
//   marker.style.left = `${city.left}%`;

//   // Einheitliche Farbe
//   marker.style.backgroundColor = markerColor;

//   // Hover-Effekt (aufleuchten)
//   marker.addEventListener("mouseenter", () => {
//     marker.style.boxShadow = `0 0 20px ${markerColor}`;
//   });
//   marker.addEventListener("mouseleave", () => {
//     marker.style.boxShadow = "none";
//   });

//   mapContainer.appendChild(marker);
// });






// uv_amsterdam = [];
// uv_bern = [];
// uv_dublin = [];
// uv_kopenhagen = [];
// uv_lissabon = [];
// uv_madrid = [];
// uv_prag = [];
// uv_rom = [];

// const urls = [
//     'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Amsterdam',
//     'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Bern',
//     'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Dublin',
//     'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Kopenhagen',
//     'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Lissabon',
//     'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Madrid',
//     'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Prag',
//     'https://im3-uv.ramisberger-tabea.ch/unload.php?city=Rom'
// ];

// Promise.all(urls.map(url => fetch(url).then(res => res.json())))
//     .then(([amsterdamData, bernData, dublinData, kopenhagenData, lissabonData, madridData, pragData, romData]) => {
//         uv_amsterdam = amsterdamData;
//         uv_bern = bernData;
//         uv_dublin = dublinData;
//         uv_kopenhagen = kopenhagenData;
//         uv_lissabon = lissabonData;
//         uv_madrid = madridData;
//         uv_prag = pragData;
//         uv_rom = romData;

      

//         let myChart = document.querySelector('#myChart').getContext("2d");

//         new Chart(myChart, {
//             type: "line", 
//             data: {
//                 labels: ["vor 6 Tagen", "vor 5 Tagen", "vor 4 Tagen", "vor 3 Tagen", "vorgestern", "gestern","heute"],
//                 datasets:[
//                     {
//                         data: uv_amsterdam,
//                         label: "Amsterdam"
//                     } ,         
//                     {
//                         data: uv_bern,
//                         label: "uv-intensität bern"
//                     } ,      
//                     {
//                         data: uv_dublin,
//                         label: "uv-intensität dublin"
//                     } ,         
//                     {
//                         data: uv_kopenhagen,
//                         label: "uv-intensität kopenhagen"
//                     } ,         
//                     {
//                         data: uv_lissabon,
//                         label: "uv-intensität lissabon"
//                     } ,         
//                     {
//                         data: uv_madrid,
//                         label: "uv-intensität madrid"
//                     } ,         
//                     {
//                         data: uv_prag,
//                         label: "uv-intensität prag"
//                     } ,         
//                     {
//                         data: uv_rom,
//                         label: "uv-intensität rom"
//                     }      
//                 ]
//             }
//         });

        

// const cities = [
//   { name: "Amsterdam", top: 35, left: 51, uv: uv_amsterdam = [0] },
//   { name: "Bern", top: 54, left: 55, uv: uv_bern[1] },
//   { name: "Dublin", top: 28, left: 26, uv: uv_dublin[2] },
//   { name: "Kopenhagen", top: 22, left: 65, uv: uv_kopenhagen[3] },
//   { name: "Lissabon", top: 75, left: 10, uv: uv_lissabon[4] },
//   { name: "Madrid", top: 72, left: 29, uv: uv_madrid[5] },
//   { name: "Prag", top: 43, left: 70, uv: uv_prag[6] },
//   { name: "Rom", top: 68.5, left: 65, uv: uv_rom[7] },
// ];

// console.log(cities);

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
//   if (city.uv < 2) color = "rgb(145, 255, 186)";
//   else if (city.uv < 6) color = "rgb(255, 255, 120)";
//   else color = "rgb(255, 120, 120)";
//   marker.style.backgroundColor = color;

//   // Hover-Effekt (aufleuchten)
//   marker.addEventListener("mouseenter", () => {
//     marker.style.boxShadow = `0 0 20px ${color}`;
//   });
//   marker.addEventListener("mouseleave", () => {
//     marker.style.boxShadow = "none";
//   });

//   mapContainer.appendChild(marker);
// });





//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });


