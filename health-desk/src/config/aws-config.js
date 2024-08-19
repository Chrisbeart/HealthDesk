import AWS from 'aws-sdk';
import dotenv from 'dotenv';

// Lade die Umgebungsvariablen aus der .env-Datei
dotenv.config(); // Dies muss nur einmal aufgerufen werden, und zwar möglichst früh im Server-Code

// Konfiguration von AWS mit den Umgebungsvariablen
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const cognito = new AWS.CognitoIdentityServiceProvider();

export default cognito;
