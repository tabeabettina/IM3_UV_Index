console.log("Hello, World!");

uv_amsterdam = [];
uv_bern = [];
// uv_rom = []; // Falls du eine Variable für Rom brauchst

const urls = [
    'https://im3-uv.ramisberger-tabea.ch/unload.php?city=amsterdam',
    'https://im3-uv.ramisberger-tabea.ch/unload.php?city=bern',
    'https://im3-uv.ramisberger-tabea.ch/unload.php?city=rom',
    // Füge hier weitere URLs hinzu
];

Promise.all(urls.map(url => fetch(url).then(res => res.json())))
    .then(([amsterdamData, bernData, romData /*, weitere Daten */]) => {
        uv_amsterdam = amsterdamData;
        uv_bern = bernData;

        // console.log('Amsterdam UV Index:', uv_amsterdam);
        // console.log('Bern UV Index:', uv_bern);
    
        // uv_rom = romData; // Falls du eine Variable für Rom brauchst
        // Hier kannst du mit den Daten weiterarbeiten
        // Chart einfügen (Daten usw.)//

        let myChart = document.querySelector('#myChart').getContext("2d");

        new Chart(myChart, {
            type: "line", // "line", "pie", "doughnut", "polarArea", "radar"
            data: {
                labels: ["heute", "gestern", "vorgestern", "vor 3 Tagen", "vor 4 Tagen", "vor 5 Tagen","vor 6 Tagen"],
                datasets:[
                    {
                        data: uv_amsterdam,
                        label: "uv-intensität amsterdam"
                    } ,         
                    {
                        data: uv_bern,
                        label: "uv-intensität"
                    }        
                ]
            }
        });





    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Chart einfügen (Daten usw.)//

