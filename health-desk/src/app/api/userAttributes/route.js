import { getUserAttributes } from '../../../controllers/authController';

export async function GET(req) {
  const response = await getUserAttributes(req);
  return new Response(JSON.stringify(response), { status: 200 });
}
