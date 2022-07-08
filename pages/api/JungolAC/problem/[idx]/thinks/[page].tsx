// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const ranksJSON = require("./../../../../../../rank.json");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  return new Promise<void>(async (resolve, reject) => {
    let { idx, page } = req.query;
    idx = idx as string;
    const pageNum = page as any as number;
    const dbKey = ranksJSON[idx] + " # " + idx;
    const dbd = await prisma.problemVote.findFirst({
      where: {
        name: dbKey,
      },
    });
    let abcd = dbd?.votedBy.slice(
      Math.min(pageNum * 10, dbd.votedBy.length - 10),
      Math.min(pageNum * 10 + 10, dbd.votedBy.length)
    );
    res.status(200).end(encodeURI(JSON.stringify(abcd)));
  });
}
