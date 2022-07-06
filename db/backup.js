const rank = require("../rank.json");
const rankKeys = Object.keys(rank);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { writeFileSync } = require("fs");

const backUpJSON = {};

async function db() {
  for (let i = 0; i < rankKeys.length; i++) {
    const dbKey = rank[rankKeys[i]] + " # " + rankKeys[i];
    let pb = await prisma.problemVote.findFirst({
      where: {
        name: dbKey,
      },
    });
    if (!pb) return;
    backUpJSON[dbKey] = {
      r: pb.ranks,
      v: pb.votedBy,
    };

    console.log(`${dbKey} Done ${i + 1} / ${rankKeys.length}`);
  }
}

db().then((x) => {
  writeFileSync(
    __dirname + "/backUP_" + new Date().getTime().toString() + ".json",
    JSON.stringify(backUpJSON)
  );
});
