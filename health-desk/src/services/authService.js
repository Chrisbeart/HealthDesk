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
    console.log('SignUp Params:', params); // Log die Parameter für Debugging
    const result = await cognito.signUp(params).promise();
    console.log('SignUp Result:', result); // Log das Ergebnis für Debugging

    return result;
  } catch (error) {
    console.error('SignUp Error:', error); // Fehlerprotokollierung
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
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.COGNITO_APP_CLIENT_ID,
    SecretHash: getSecretHash(email),
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password
    }
  };

  try {
    const result = await cognito.initiateAuth(params).promise();
    console.log('SignIn Result:', result); // Log das Ergebnis
    return result;
  } catch (error) {
    console.error('SignIn Error:', error); // Detaillierte Fehlerprotokollierung
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

const forgotPassword = async (email) => {
  const params = {
    ClientId: process.env.COGNITO_APP_CLIENT_ID,
    SecretHash: getSecretHash(email),
    Username: email
  };

  try {
    const result = await cognito.forgotPassword(params).promise();
    console.log('Forgot Password Result:', result); // Log das Ergebnis
    return result;
  } catch (error) {
    console.error('ForgotPassword Error:', error); // Detaillierte Fehlerprotokollierung
    throw new Error(`Forgot password request failed: ${error.message}`);
  }
};

const forgotPasswordSubmit = async (email, code, newPassword) => {
  const params = {
    ClientId: process.env.COGNITO_APP_CLIENT_ID,
    SecretHash: getSecretHash(email),
    Username: email,
    ConfirmationCode: code,
    Password: newPassword
  };

  try {
    const result = await cognito.confirmForgotPassword(params).promise();
    console.log('Forgot Password Submit Result:', result); // Log das Ergebnis
    return result;
  } catch (error) {
    console.error('ForgotPasswordSubmit Error:', error); // Detaillierte Fehlerprotokollierung
    throw new Error(`Password reset failed: ${error.message}`);
  }
};

export default {
  signUp,
  confirmSignUp,
  signIn,
  forgotPassword,
  forgotPasswordSubmit
};
