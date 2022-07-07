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
    let { slug }: any = req.query;
    const newSl = slug as string[];

    if (newSl.length == 2 && newSl[0] == "isAdmin") {
      const at = process.env.ADMIN_TOKEN as string;
      if (newSl[1] == at) {
        res.end("T");
      } else res.end("F");
      resolve();
    }

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

      client({
        method: "post",
        url: "http://jungol.co.kr/bbs/login_check.php",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: queryStr.stringify({
          mb_id: id,
          mb_password: pw,
        }),
      })
        .then((data) => {
          if ((data.data as string).includes("마이페이지")) {
            let h = decodeURI(data.data as string);
            let h2 = h.slice(h.indexOf("마이페이지"));
            let h3 = h2.slice(
              "마이페이지\"' onMouseOut='this.innerHTML=\"".length
            );
            let h4 = encodeURI(h3.slice(0, h3.indexOf('"')));
            res.end(JSON.stringify({ State: "Suce," + id, UserName: h4 }));
            resolve();
          } else {
            res.end(JSON.stringify({ State: "Fail" }));
            resolve();
          }
        })
        .catch((e) => {
          console.log(e);
          res.end(JSON.stringify({ State: "Fail" }));
          resolve();
        });
    }
  });
}
