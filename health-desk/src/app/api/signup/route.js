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

    return new Response(JSON.stringify(response), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Signup API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
