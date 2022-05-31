import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export type LoginReponse = {
  success: boolean;
  data?: {
    token: string;
  };
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<LoginReponse>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`
    });

    return;
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(405).json({
      success: false,
      message: 'Email and Password are required.'
    });

    return;
  }

  const { NEXT_PUBLIC_ARCHIVEL_ENDPOINT } = process.env

  const response = await fetch(`${NEXT_PUBLIC_ARCHIVEL_ENDPOINT}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data: LoginReponse = await response.json();

  if (!response.ok) {
    return res.status(response.status).json({
      success: data.success,
      message: data.message
    });
  }

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('ARCHITOKEN', String(data.data?.token), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'strict',
      path: '/'
    })
  );

  return res.status(200).json(data);
}
