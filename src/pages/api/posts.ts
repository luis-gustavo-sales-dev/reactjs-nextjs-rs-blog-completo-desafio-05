import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { url } = JSON.parse(req.body);
    // console.log(req.body)
    // console.log(url)
    if (url) {
      const response = await fetch(
        `${url}&access_token=${process.env.PRISMIC_ACCESS_TOKEN}`
      );
      res.status(200).json(await response.json());
    }
  }
};
