import { confirmSignUp } from '../../../controllers/authController';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await confirmSignUp(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
