import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'POST') {
    const { url } = req.body;
    if (url) {
      const response = await fetch(
        `${url}&access_token=${process.env.PRISMIC_ACCESS_TOKEN}`
      );
      res.status(200).json(await response.json());
    }
  }
};
