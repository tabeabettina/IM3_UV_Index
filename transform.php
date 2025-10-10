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


// extract.php einbinden (damit die Daten verfügbar sind)
include('extract.php');

// Array mit UV-Index für jede Stadt
$cities = [
    'Amsterdam'   => $amsterdam_data['now']['uvi'] ?? null,
    'Bern'        => $bern_data['now']['uvi'] ?? null,
    'Dublin'      => $dublin_data['now']['uvi'] ?? null,
    'Kopenhagen'  => $kopenhagen_data['now']['uvi'] ?? null,
    'Lissabon'    => $lissabon_data['now']['uvi'] ?? null,
    'Madrid'      => $madrid_data['now']['uvi'] ?? null,
    'Prag'        => $prag_data['now']['uvi'] ?? null,
    'Rom'         => $rom_data['now']['uvi'] ?? null,
];

// Zielarray erstellen
$transformedData = [];

foreach ($cities as $city => $uvi) {
    $transformedData[] = [
        'city'    => $city,
        'uvindex' => $uvi
    ];
}

// Ausgabe
// echo "<pre>";
// print_r($transformedData);
// echo "</pre>";



