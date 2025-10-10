<?php

/* ============================================================================
   HANDLUNGSANWEISUNG (transform.php)
   0) Schau dir die Rohdaten genau an und plane exakt, wie du die Daten umwandeln möchtest (auf Papier)
   1) Binde extract.php ein und erhalte das Rohdaten-Array.
   2) Definiere Mapping Koordinaten → Anzeigename (z. B. Bern/Chur/Zürich).
   3) Konvertiere Einheiten (z. B. °F → °C) und runde sinnvoll (Celsius = (Fahrenheit - 32) * 5 / 9).
   4) Leite eine einfache "condition" ab (z. B. sonnig/teilweise bewölkt/bewölkt/regnerisch).
   5) Baue ein kompaktes, flaches Array je Standort mit den Ziel-Feldern.
   6) Optional: Sortiere die Werte (z. B. nach Zeit), entferne irrelevante Felder.
   7) Validiere Pflichtfelder (location, temperature_celsius, …).
   8) Kodieren: json_encode(..., JSON_PRETTY_PRINT) → JSON-String.
   9) GIB den JSON-String ZURÜCK (return), nicht ausgeben – für den Load-Schritt.
  10) Fehlerfälle als Exception nach oben weiterreichen (kein HTML/echo).
   ============================================================================ */

// Bindet das Skript extract.php für Rohdaten ein und speichere es in $data
include('extract.php');
$cities = [
    "amsterdam" => $amsterdam_data['now']['uvi'],
    "bern" => $bern_data['now']['uvi'],
    "dublin" => $dublin_data['now']['uvi'],
    "kopenhagen" => $kopenhagen_data['now']['uvi'],
    "lissabon" => $lissabon_data['now']['uvi'],
    "madrid" => $madrid_data['now']['uvi'],
    "prag" => $prag_data['now']['uvi'],
    "rom" => $rom_data['now']['uvi']
];


$transformedData[] = [];

// Jetzt über alle Städte iterieren und ins Zielarray schreiben
foreach ($cities as $city => $uvi) {
    $transformedData[] = [
        "city" => $city,
        "uvindex" => $uvi
    ];
}



// Optional: Ausgabe zur Kontrolle
// print_r($transformedData);



