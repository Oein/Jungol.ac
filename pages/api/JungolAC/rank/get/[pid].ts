// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();

const ranks = require("./../../../../../rank.json");
const solvedAcLink = require("../../../../../solvedaclink.json");

type Data = {
  ProblemRank: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return new Promise<void>(async (resolve, reject) => {
    try {
      let { pid } = req.query;
      pid = pid.toString();
      if (typeof pid != "string") {
        pid = pid as string;
      }
      if (ranks[pid] == undefined) {
        res.status(200).json({ ProblemRank: 0 });
      }

      if (solvedAcLink[pid] != undefined) {
        axios
          .get(
            `https://solved.ac/api/v3/problem/show?problemId=${
              solvedAcLink[pid] as string
            }`
          )
          .then((d) => {
            res.status(200).json({
              ProblemRank: d.data.level,
            });
            resolve();
          })
          .catch(async (e) => {
            const dbKey = ranks[pid as string] + " # " + pid;
            const data = await prisma.problemVote.findFirst({
              where: {
                name: dbKey,
              },
            });
            const votes = data?.ranks as { [key: number]: number };
            let allC = 0;
            let cont = 0;
            for (let i = 1; i <= 30; i++) {
              allC += votes[i] * i;
              cont += votes[i];
            }
            if (cont == 0) cont = 1;
            allC /= cont;
            allC = Math.round(allC);
            res.status(200).json({ ProblemRank: allC });
            resolve();
          });
      } else {
        const dbKey = ranks[pid] + " # " + pid;
        const data = await prisma.problemVote.findFirst({
          where: {
            name: dbKey,
          },
        });
        const votes = data?.ranks as { [key: number]: number };
        let allC = 0;
        let cont = 0;
        for (let i = 1; i <= 30; i++) {
          allC += votes[i] * i;
          cont += votes[i];
        }
        if (cont == 0) cont = 1;
        allC /= cont;
        allC = Math.round(allC);
        res.status(200).json({ ProblemRank: allC });
        resolve();
      }
    } catch {
      res.status(200).json({ ProblemRank: 0 });
      resolve();
    }
  });
}
