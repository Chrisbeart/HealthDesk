import authService from '../services/authService.js';

export const signUp = async (req, res) => {
  try {
    console.log('Received Request Body for signUp:', req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      console.log('Validation Error: Username and password are required');
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const result = await authService.signUp(username, password);

    console.log('SignUp successful, returning result:', result);
    
    // Anstatt auf `status` zuzugreifen, returniere direkt das Ergebnis
    return res.status(200).json(result);
  } catch (error) {
    console.error('SignUp Error:', error);

    if (error.code === 'UsernameExistsException') {
      return res.status(409).json({ error: 'An account with the given email already exists.' });
    }

    return res.status(500).json({ error: error.message });
  }
};



export const confirmSignUp = async (req, res) => {
  try {
    console.log('Received Request Body for confirmSignUp:', req.body);
    const { username, code } = req.body;

    if (!username || !code) {
      console.log('Validation Error: Username and code are required');
      return res.status(400).json({ error: 'Username and code are required' });
    }

    const result = await authService.confirmSignUp(username, code);
    console.log('ConfirmSignUp successful, returning result:', result);
    res.status(200).json(result);
  } catch (error) {
    console.error('ConfirmSignUp Error:', error); // Detaillierte Fehlerprotokollierung
    res.status(500).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    console.log('Received Request Body for signIn:', req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      console.log('Validation Error: Username and password are required');
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const result = await authService.signIn(username, password);
    console.log('SignIn successful, returning result:', result);
    res.status(200).json(result);
  } catch (error) {
    console.error('SignIn Error:', error); // Detaillierte Fehlerprotokollierung
    res.status(500).json({ error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    console.log('Received Request Body for forgotPassword:', req.body);
    const { username } = req.body;

    if (!username) {
      console.log('Validation Error: Username is required');
      return res.status(400).json({ error: 'Username is required' });
    }

    const result = await authService.forgotPassword(username);
    console.log('ForgotPassword successful, returning result:', result);
    res.status(200).json(result);
  } catch (error) {
    console.error('ForgotPassword Error:', error); // Detaillierte Fehlerprotokollierung
    res.status(500).json({ error: error.message });
  }
};

export const forgotPasswordSubmit = async (req, res) => {
  try {
    console.log('Received Request Body for forgotPasswordSubmit:', req.body);
    const { username, code, newPassword } = req.body;

    if (!username || !code || !newPassword) {
      console.log('Validation Error: Username, code, and newPassword are required');
      return res.status(400).json({ error: 'Username, code, and newPassword are required' });
    }

    const result = await authService.forgotPasswordSubmit(username, code, newPassword);
    console.log('ForgotPasswordSubmit successful, returning result:', result);
    res.status(200).json(result);
  } catch (error) {
    console.error('ForgotPasswordSubmit Error:', error); // Detaillierte Fehlerprotokollierung
    res.status(500).json({ error: error.message });
  }
};
