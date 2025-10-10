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


// URLs für die Städte
$urls = [
    'Amsterdam'   => "https://currentuvindex.com/api/v1/uvi?latitude=52.3676&longitude=4.9041",
    'Bern'        => "https://currentuvindex.com/api/v1/uvi?latitude=46.9480&longitude=7.4474",
    'Dublin'      => "https://currentuvindex.com/api/v1/uvi?latitude=53.331&longitude=-6.2489",
    'Kopenhagen'  => "https://currentuvindex.com/api/v1/uvi?latitude=55.6761&longitude=12.5683",
    'Lissabon'    => "https://currentuvindex.com/api/v1/uvi?latitude=38.7169&longitude=-9.1399",
    'Madrid'      => "https://currentuvindex.com/api/v1/uvi?latitude=40.4165&longitude=-3.7026",
    'Prag'        => "https://currentuvindex.com/api/v1/uvi?latitude=50.0880&longitude=14.4208",
    'Rom'         => "https://currentuvindex.com/api/v1/uvi?latitude=41.9028&longitude=12.4964",
];

// Funktion, um Daten von der API abzurufen
function getCityData($url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    return json_decode($response, true);
}

// Daten für alle Städte abrufen
$amsterdam_data   = getCityData($urls['Amsterdam']);
$bern_data        = getCityData($urls['Bern']);
$dublin_data      = getCityData($urls['Dublin']);
$kopenhagen_data  = getCityData($urls['Kopenhagen']);
$lissabon_data    = getCityData($urls['Lissabon']);
$madrid_data      = getCityData($urls['Madrid']);
$prag_data        = getCityData($urls['Prag']);
$rom_data         = getCityData($urls['Rom']);



// echo "<pre>";
// var_dump($amsterdam_data, $bern_data, $dublin_data, $kopenhagen_data, $lissabon_data, $madrid_data, $prag_data, $rom_data);
// echo "</pre>";
