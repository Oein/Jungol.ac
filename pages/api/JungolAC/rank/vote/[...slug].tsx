import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import WebLog from "../../../../../modules/webhook";

const ranksJSON = require("./../../../../../rank.json");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  return new Promise<void>(async (resolve, reject) => {
    let { slug, myThink } = req.query;
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

      if (ranksJSON[pid] == undefined) {
        res.end(JSON.stringify({ State: "Fail" }));
        resolve();
      }

      const dbKey = ranksJSON[pid] + " # " + pid;
      let data = await prisma.problemVote.findFirst({
        where: {
          name: dbKey,
        },
      });

      let votedBy = data?.votedBy as {
        auth: string;
        at: number;
        think: string | undefined;
      }[];
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
        votedBy[voter].think = myThink ? (myThink as string) : "";
      } else {
        ranks[rankJ as any as number]++;
        votedBy.push({
          at: rankJ as any as number,
          auth: auth,
          think: myThink ? (myThink as string) : "",
        });
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

      let g = "";
      for (let i = 0; i < auth.length; i++) {}

      WebLog([
        {
          name: "Voted Problem",
          value: dbKey,
          inline: true,
        },
        {
          name: "Rank",
          value: rankJ,
          inline: true,
        },
        {
          name: "Think",
          value: myThink as string,
          inline: false,
        },
        {
          name: "Time",
          value: `${new Date().toString()}`,
          inline: false,
        },
      ]);
      res.end("Voted!");
      resolve();
    }
  });
}
