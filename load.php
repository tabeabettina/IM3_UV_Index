<?php

include('transform.php');
require_once('config.php');

try{
    $pdo = new PDO($dsn, $username, $password, $options);

    $sql = "insert into IM3_UV (city, uvindex) values (?, ?)";

    $stmt = $pdo->prepare($sql);
    foreach ($transformedData as $item) {
        // print_r($item);
        //  echo "<br>";
         if (empty($item)) {
             continue; // Überspringt leere Einträge
         }
        $stmt->execute([
            $item['city'],
            $item['uvindex']
        ]);
    }

    echo "Daten erfolgreich eingefügt.";
    
} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}


/*

try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query mit Platzhaltern für das Einfügen von Daten
    $sql = "INSERT INTO weather_data (location, temperature_celsius, rain, showers, snowfall, cloud_cover, weather_condition) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Bereitet die SQL-Anweisung vor
    $stmt = $pdo->prepare($sql);

    // Fügt jedes Element im Array in die Datenbank ein
    foreach ($dataArray as $item) {
        $stmt->execute([
            $item['location'],
            $item['temperature_celsius'],
            $item['rain'],
            $item['showers'],
            $item['snowfall'],
            $item['cloud_cover'],
            $item['condition']
        ]);
    }

    echo "Daten erfolgreich eingefügt.";
} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}
*/