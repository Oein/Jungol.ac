// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import queryStr from "querystring";
type Data = {
  State: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return new Promise<void>((resolve, reject) => {
    let { slug }: any = req.query;
    const newSl = slug as string[];
    if (newSl.length <= 1) {
      res.end(JSON.stringify({ State: "Fail" }));
      resolve();
    } else if (newSl.length >= 3) {
      res.end(
        JSON.stringify({
          State: "Fail",
        })
      );
      resolve();
    } else {
      const id = newSl[0];
      const pw = newSl[1];

      axios({
        method: "post",
        url: "http://jungol.co.kr/bbs/login_check.php",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: queryStr.stringify({
          mb_id: id,
          mb_password: pw,
          url: "http://jungol.co.kr/empty",
        }),
      })
        .then((data) => {
          res.end(JSON.stringify({ State: "Fail" }));
          resolve();
        })
        .catch((e) => {
          res.end(JSON.stringify({ State: "Suce," + id }));
          resolve();
        });
    }
  });
}
