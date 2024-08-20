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

CREATE TABLE IF NOT EXISTS psychosocial_support (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT,
    currentHealth TEXT,
    psychologicalSupport TEXT,
    socialSupport TEXT,
    spiritualSupport TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id)
);

CREATE TABLE IF NOT EXISTS resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT,
    resources TEXT,
    supportNetwork TEXT,
    copingStrategies TEXT,
    previousTherapies TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id)
);

CREATE TABLE IF NOT EXISTS lifestyle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT,
    dailyRoutine TEXT,
    nutrition TEXT,
    physicalActivity TEXT,
    sleepPattern TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id)
);

CREATE TABLE IF NOT EXISTS care_plan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT,
    name VARCHAR(255),
    goal TEXT,
    measures TEXT,
    responsibilities VARCHAR(255),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id)
);

CREATE TABLE IF NOT EXISTS evaluation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT,
    name VARCHAR(255),
    responsible VARCHAR(255),
    frequency VARCHAR(50),
    notes TEXT,
    nurse TEXT,
    management TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id)
);

CREATE TABLE IF NOT EXISTS health_status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT,
    currentHealthStatus TEXT,
    medicalHistory TEXT,
    allergies TEXT,
    medications TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE
);
