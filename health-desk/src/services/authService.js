import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import cognito from '../config/aws-config.js';
import crypto from 'crypto';

const getSecretHash = (email) => {
  const secret = process.env.COGNITO_APP_CLIENT_SECRET;
  const clientId = process.env.COGNITO_APP_CLIENT_ID;

  return crypto.createHmac('sha256', secret)
    .update(email + clientId)
    .digest('base64');
};

const signUp = async (email, password) => {
  if (!email) {
    throw new Error('Email must not be null or empty');
  }

  const params = {
    ClientId: process.env.COGNITO_APP_CLIENT_ID, 
    SecretHash: getSecretHash(email),
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email
      }
    ]
  };

  try {
    console.log('SignUp Params:', params);
    const result = await cognito.signUp(params).promise();
    console.log('SignUp Result:', result);
    return result;
  } catch (error) {
    console.error('SignUp Error:', error);
    throw new Error(`Registration failed: ${error.message}`);
  }
};

const confirmSignUp = async (email, code) => {
  const params = {
    ClientId: process.env.COGNITO_APP_CLIENT_ID,
    SecretHash: getSecretHash(email),
    Username: email,
    ConfirmationCode: code
  };

  try {
    const result = await cognito.confirmSignUp(params).promise();
    console.log('Confirm SignUp Result:', result); // Log das Ergebnis
    return result;
  } catch (error) {
    console.error('ConfirmSignUp Error:', error); // Detaillierte Fehlerprotokollierung
    throw new Error(`Confirmation failed: ${error.message}`);
  }
};

const signIn = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email and password must not be null or empty');
  }

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',  // Der Authentifizierungsfluss für Benutzername und Passwort
    ClientId: process.env.COGNITO_APP_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: getSecretHash(email),  // SecretHash wird korrekt übergeben
    }
  };

  try {
    console.log('SignIn Params:', params);
    const result = await cognito.initiateAuth(params).promise();
    console.log('SignIn Result:', result);
    return result;
  } catch (error) {
    console.error('SignIn Error:', error);
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

const forgotPassword = async (email) => {
  const params = {
    ClientId: process.env.COGNITO_APP_CLIENT_ID,
    SecretHash: getSecretHash(email),
    Username: email,
  };

  try {
    const result = await cognito.forgotPassword(params).promise();
    console.log('ForgotPassword Result:', result);
    return result;
  } catch (error) {
    console.error('ForgotPassword Error:', error);
    throw new Error(`Password reset request failed: ${error.message}`);
  }
};

const forgotPasswordSubmit = async (email, verificationCode, newPassword) => {
  const params = {
    ClientId: process.env.COGNITO_APP_CLIENT_ID,
    SecretHash: getSecretHash(email),
    Username: email,
    ConfirmationCode: verificationCode,
    Password: newPassword
  };

  try {
    const result = await cognito.confirmForgotPassword(params).promise();
    console.log('ForgotPasswordSubmit Result:', result);
    return result;
  } catch (error) {
    console.error('ForgotPasswordSubmit Error:', error);
    throw new Error(`Password reset failed: ${error.message}`);
  }
};

const getUserAttributes = async (accessToken) => {
  const params = {
    AccessToken: accessToken
  };

  try {
    const result = await cognito.getUser(params).promise();
    console.log('GetUserAttributes Result:', result);
    return result;
  } catch (error) {
    console.error('GetUserAttributes Error:', error);
    throw new Error(`Failed to get user attributes: ${error.message}`);
  }
};

const checkIfUserExists = async (email) => {
  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: email,
  };

  try {
    const result = await cognito.adminGetUser(params).promise();
    console.log('User exists:', result);
    return true;
  } catch (error) {
    if (error.code === 'UserNotFoundException') {
      console.log('User not found');
      return false;
    }
    console.error('Error checking if user exists:', error);
    throw new Error(`Error checking if user exists: ${error.message}`);
  }
};


export default {
  signUp,
  confirmSignUp,
  signIn,
  forgotPassword,
  forgotPasswordSubmit,
  getUserAttributes,
  checkIfUserExists
};
