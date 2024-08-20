import authService from '../services/authService.js';

export const signUp = async (req) => {
  try {
    console.log('Received Request Body for signUp:', req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      console.log('Validation Error: Username and password are required');
      return { error: 'Username and password are required', status: 400 };
    }

    const result = await authService.signUp(username, password);

    console.log('SignUp successful, returning result:', result);
    return res.status(200).json(result);
  } catch (error) {
    console.error('SignUp Error:', error);

    if (error.code === 'UsernameExistsException') {
      return { error: 'An account with the given email already exists.', status: 409 };
    }

    return { error: error.message, status: 500 };
  }
};

// Die anderen Funktionen bleiben unverändert.





export const confirmSignUp = async (req) => {
  try {
    const { username, code } = await req.json();

    if (!username || !code) {
      return new Response(JSON.stringify({ error: 'Username and code are required' }), { status: 400 });
    }

    const result = await authService.confirmSignUp(username, code);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('ConfirmSignUp Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};


export const signIn = async (body) => {
  try {
    console.log('Received Request Body for signIn:', body);
    const { username, password } = body;

    if (!username || !password) {
      console.log('Validation Error: Username and password are required');
      return new Response(JSON.stringify({ error: 'Username and password are required' }), { status: 400 });
    }

    const result = await authService.signIn(username, password);
    console.log('SignIn successful, returning result:', result);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('SignIn Error:', error); // Detaillierte Fehlerprotokollierung
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};


export const forgotPassword = async (req) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
    }

    const result = await authService.forgotPassword(email);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('ForgotPassword Error:', error); // Protokolliert den genauen Fehler
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};



export const forgotPasswordSubmit = async (req) => {
  try {
    const { email, code, newPassword } = await req.json();

    if (!email || !code || !newPassword) {
      return new Response(JSON.stringify({ error: 'Email, verification code, and new password are required' }), { status: 400 });
    }

    const result = await authService.forgotPasswordSubmit(email, code, newPassword);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('ForgotPasswordSubmit Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};


export const getUserAttributes = async (req) => {
  try {
    const { accessToken } = req.body;  // Stelle sicher, dass das AccessToken korrekt übergeben wird

    if (!accessToken) {
      return new Response(JSON.stringify({ error: 'AccessToken is required' }), { status: 400 });
    }

    const result = await authService.getUserAttributes(accessToken);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('GetUserAttributes Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};