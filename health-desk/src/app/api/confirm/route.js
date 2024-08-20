import { confirmSignUp } from '../../../controllers/authController';

export async function POST(req) {
  return await confirmSignUp(req);
}
