console.log({
    amsterdamData,
    bernData,
    dublinData,
    kopenhagenData,
    lissabonData,
    madridData,
    pragData,
    romData
});

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
                labels: ["heute", "gestern", "vorgestern", "vor 3 Tagen", "vor 4 Tagen", "vor 5 Tagen","vor 6 Tagen"],
                datasets:[
                    {
                        data: uv_amsterdam,
                        label: "uv-intensität amsterdam"
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

    // Chart einfügen (Daten usw.)//

