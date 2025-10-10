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



$urls = [
    'Amsterdam' => "https://currentuvindex.com/api/v1/uvi?latitude=52.3676&longitude=4.9041",
    'Bern' => "https://currentuvindex.com/api/v1/uvi?latitude=46.9480&longitude=7.4474",
    'Dublin' => "https://currentuvindex.com/api/v1/uvi?latitude=53.331&longitude=-6.2489",
    'Kopenhagen' => "https://currentuvindex.com/api/v1/uvi?latitude=55.4048&longitude=12.3524",
    'Lissabon' => "https://currentuvindex.com/api/v1/uvi?latitude=38.4331&longitude=-9.0900",
    'Madrid' => "https://currentuvindex.com/api/v1/uvi?latitude=40.4165&longitude=-3.7026",
    'Prag' => "https://currentuvindex.com/api/v1/uvi?latitude=50.0880&longitude=-14.4208",
    'Rom' => "https://currentuvindex.com/api/v1/uvi?latitude=41.9028&longitude=12.4964"
];

function getCityData($url) {
 
    $ch = curl_init($url);

    // Optionen setzen
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Anfrage ausführen
    $response = curl_exec($ch);

    // Verbindung schließen
    curl_close($ch);

    return json_decode($response, true);
}

$amsterdam_data = getCityData($urls['Amsterdam']);
$bern_data = getCityData($urls['Bern']);
$dublin_data = getCityData($urls['Dublin']);
$kopenhagen_data = getCityData($urls['Kopenhagen']);
$lissabon_data = getCityData($urls['Lissabon']);
$ljubljana_data = getCityData($urls['Ljubljana']);
$madrid_data = getCityData($urls['Madrid']);
$prag_data = getCityData($urls['Prag']);

