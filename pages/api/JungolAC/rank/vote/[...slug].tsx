import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const ranksJSON = require("./../../../../../rank.json");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  return new Promise<void>(async (resolve, reject) => {
    let { slug } = req.query;
    const newSl = slug as string[];
    if (newSl.length <= 2) {
      res.end(JSON.stringify({ State: "Fail" }));
      resolve();
    } else if (newSl.length >= 4) {
      res.end(
        JSON.stringify({
          State: "Fail",
        })
      );
      resolve();
    } else {
      const pid = newSl[0];
      const rankJ = newSl[1];
      const auth = newSl[2];

      if (auth.length != 128) {
        res.redirect("/404");
        resolve();
      }

      if (ranksJSON[pid] == undefined) {
        res.end("No problem found");
        resolve();
      }

      const dbKey = ranksJSON[pid] + " # " + pid;
      let data = await prisma.problemVote.findFirst({
        where: {
          name: dbKey,
        },
      });

      let votedBy = data?.votedBy as { auth: string; at: number }[];
      let ranks = data?.ranks as { [key: number]: number };
      let voter = -1;
      for (let i = 0; i < votedBy.length; i++) {
        if (votedBy[i].auth == auth) {
          voter = i;
        }
      }
      if (voter >= 0) {
        let me = votedBy[voter];
        ranks[me.at as number]--;
        ranks[rankJ as any as number]++;
        votedBy[voter].at = rankJ as any as number;
      } else {
        ranks[rankJ as any as number]++;
        votedBy.push({ at: rankJ as any as number, auth: auth });
      }

      await prisma.problemVote.update({
        where: {
          name: dbKey,
        },
        data: {
          votedBy: votedBy,
          ranks: ranks,
        },
      });

      console.log(`Voted by ${auth} on ${dbKey} with rank ${rankJ}`);
      res.end("Voted!");
      resolve();
    }
  });
}
