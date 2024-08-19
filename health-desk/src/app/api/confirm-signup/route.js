import { confirmSignUp } from '../../../controllers/authController';

export async function POST(req) {
  const body = await req.json();
  const response = await confirmSignUp(body);
  return new Response(JSON.stringify(response), { status: 200 });
}
