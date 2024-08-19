CREATE DATABASE IF NOT EXISTS patient_data;

USE patient_data;

CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vorname VARCHAR(100),
    nachname VARCHAR(100),
    geburtsdatum DATE,
    geschlecht VARCHAR(10),
    nationalitaet VARCHAR(100),
    adresse VARCHAR(255),
    plz VARCHAR(20),
    stadt VARCHAR(100),
    land VARCHAR(100),
    telefon VARCHAR(20),
    email VARCHAR(100),
    versicherungsnummer VARCHAR(100),
    notfallkontakt VARCHAR(100),
    notfalltelefon VARCHAR(20),
    zimmernummer VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
