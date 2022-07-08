import { rejects } from "assert";
import type { NextApiRequest, NextApiResponse } from "next";
import UPLOAD from "../../../../../../modules/uploadToGithub";

let banns: string[] = require("../../../../../../bans.json");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  return new Promise<void>((resolve, reject) => {
    let { auth, banned } = req.query;
    const at = process.env.ADMIN_TOKEN as string;
    auth = auth as string;
    banned = banned as string;
    if (auth == at) {
      if (!banns.includes(banned)) {
        res.status(200).end("A");
        resolve();
        return;
      }

      banns = banns.filter((b) => b != banned);

      UPLOAD(JSON.stringify(banns), "bans.json", "main")
        .then(() => {
          res.status(200).end("T");
          resolve();
        })
        .catch((e) => {
          res.status(401).end("E");
          resolve();
        });
    } else {
      res.status(404);
      resolve();
    }
  });
}
