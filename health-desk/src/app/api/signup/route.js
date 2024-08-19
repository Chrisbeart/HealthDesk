import { signUp } from '../../../controllers/authController';

export async function POST(req) {
  try {
    console.log('Received POST request at /api/signup');
    const body = await req.json();
    console.log('Parsed Request Body:', body);

    const { username, password } = body;

    if (!username || !password) {
      console.log('Validation Error: Username and password are required');
      return new Response(
        JSON.stringify({ error: 'Username and password are required' }),
        { status: 400 }
      );
    }

    const response = await signUp({ body });

    console.log('SignUp API call successful, returning response:', response);

    // Prüfe, ob response.status definiert ist, andernfalls setze den Standardwert 200
    const status = response.status || 200;

    return new Response(JSON.stringify(response), { status: status });
  } catch (error) {
    console.error('Signup API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
