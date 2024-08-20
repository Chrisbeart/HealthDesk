import { forgotPassword } from '../../../controllers/authController';

export async function POST(req) {
  return await forgotPassword(req);
}
