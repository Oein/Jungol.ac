// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  return new Promise<void>((resolve, reject) => {
    let { sluga } = req.query;
    const newSl = sluga as string[];
    if (newSl.length <= 1) {
      res.end("Required 2 parameters");
      resolve();
    }

    if (newSl.length >= 3) {
      res.end("Required 2 parameters");
      resolve();
    }
  });
}
