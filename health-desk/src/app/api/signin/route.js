import { signIn } from '../../../controllers/authController';

export async function POST(req) {
  const body = await req.json();
  return await signIn(body);
}
