// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const ranks = require("./../../../../rank.json");

type Data = {
  ProblemRank: string;
  ProblemName: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { pid } = req.query;
  pid = pid.toString();
  const dbKey = ranks[pid] + " # " + pid;
  res.status(200).json({ ProblemRank: "", ProblemName: "" });
}
