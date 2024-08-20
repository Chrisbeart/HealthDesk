import { forgotPasswordSubmit } from '../../../controllers/authController';

export async function POST(req) {
  return await forgotPasswordSubmit(req);
}
