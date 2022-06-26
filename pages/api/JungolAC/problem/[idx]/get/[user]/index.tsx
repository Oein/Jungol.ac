// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import queryStr from "querystring";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
type Data = {
  State: string;
  UserName: string | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar }));
  return new Promise<void>((resolve, reject) => {
    let { idx, user }: any = req.query;
    res.end(idx + " / " + user);
    resolve();
  });
}
