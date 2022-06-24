// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const ranks = require("./../../../../rank.json");

type Data = {
  ProblemRank: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { pid } = req.query;
  pid = pid.toString();
  if (ranks[pid] == undefined) {
    res.end("No problem found");
  }
  const dbKey = ranks[pid] + " # " + pid;
  const data = await prisma.problemVote.findFirst({
    where: {
      name: dbKey,
    },
  });
  const votes = data?.ranks as { [key: number]: number };
  let allC = 0;
  let cont = 0;
  for (let i = 0; i <= 30; i++) {
    allC += votes[i] * i;
    cont += votes[i];
  }
  if (cont == 0) cont = 1;
  allC /= cont;
  allC = Math.round(allC);
  res.status(200).json({ ProblemRank: allC });
}
