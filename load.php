<?php
include('transform.php');
require_once('config.php');
try{
    $pdo = new PDO($dsn, $username, $password, $options);

    $sql = "insert into IM3_UV (city, uvindex) values (?, ?)";

    $stmt = $pdo->prepare($sql);
    foreach ($transformedData as $item) {
   
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

// print_r($item);
//     echo "<br>";


