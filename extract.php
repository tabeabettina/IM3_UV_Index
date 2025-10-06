<?php

/* ============================================================================
   HANDLUNGSANWEISUNG (extract.php)
   1) Lade Konfiguration/Constants (API-URL, Parameter, ggf. Zeitzone).
   2) Baue die Request-URL (Query-Params sauber via http_build_query).
   3) Initialisiere cURL (curl_init) mit der Ziel-URL.
   4) Setze cURL-Optionen (RETURNTRANSFER, TIMEOUT, HTTP-Header, FOLLOWLOCATION).
   5) Führe Request aus (curl_exec) und prüfe Transportfehler (curl_error).
   6) Prüfe HTTP-Status & Content-Type (JSON erwartet), sonst früh abbrechen.
   7) Dekodiere JSON robust (json_decode(..., true)).
   8) Normalisiere/prüfe Felder (defensive Defaults, Typen casten).
   9) Gib die Rohdaten als PHP-Array ZURÜCK (kein echo) für den Transform-Schritt.
  10) Fehlerfälle: Exception/Fehlerobjekt nach oben reichen (kein HTML ausgeben).
   ============================================================================ */

function fetchUVData()
{
    $url = "https://currentuvindex.com/api/v1/uvi?latitude=40.6943&longitude=-73.9249";

    // Initialisiert eine cURL-Sitzung
$ch = curl_init($url);

    // Setzt Optionen
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Führt die cURL-Sitzung aus und erhält den Inhalt
$response = curl_exec($ch);

    // Schließt die cURL-Sitzung
curl_close($ch);
print_r($response);

    // Dekodiert die JSON-Antwort und gibt Daten zurück
return json_decode($response, true);
}

// Gibt die Daten zurück, wenn dieses Skript eingebunden ist
return fetchUVData();

//Array

$cities = [
    [
        "city" => "Amsterdam",
        "latitude" => 52.3676,
        "longitude" => 4.9041
    ],
    [
        "city" => "Bern",
        "latitude" => 46.9480,
        "longitude" => 7.4474
    ],
    [
        "city" => "Berlin",
        "latitude" => 52.5200,
        "longitude" => 13.4050
    ],
    [
        "city" => "Bratislava",
        "latitude" => 48.1482,
        "longitude" => 17.1067
    ],
    [
        "city" => "Brussels",
        "latitude" => 50.8503,
        "longitude" => 4.3517
    ],
    [
        "city" => "Budapest",
        "latitude" => 47.4979,
        "longitude" => 19.0402
    ]
];

foreach ($cities as $city) {
    $data = fetchUVData($city['latitude'], $city['longitude']);
    echo "City: " . $city['city'] . " - UV Index: " . $data['uv_index'] . "\n";
}
