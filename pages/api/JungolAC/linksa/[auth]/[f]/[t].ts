// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { rejects } from "assert";
import type { NextApiRequest, NextApiResponse } from "next";
import UPLOAD from "../../../../../../modules/uploadToGithub";

let sal = require("../../../../../../solvedaclink.json");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  return new Promise<void>((resolve, reject) => {
    const { auth, f, t } = req.query;
    const at = process.env.ADMIN_TOKEN as string;
    if (auth == at) {
      sal[f as string] = t as any as number;
      // res.end(JSON.stringify(sal));
      UPLOAD(JSON.stringify(sal) as string, "solvedaclink.json", "main")
        .then((d) => {
          res.end("T");
          resolve();
        })
        .catch((e) => {
          console.error(e);
          res.end("F");
          resolve();
        });
    } else res.end("F");
    // res.end(`${auth} ${f} ${t}`);
  });
}
