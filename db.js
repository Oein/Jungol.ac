const rank = require("./rank.json");
const rankKeys = Object.keys(rank);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function db() {
  for (let i = 0; i < rankKeys.length; i++) {
    const dbKey = rank[rankKeys[i]] + " # " + rankKeys[i];
    prisma.problemVote
      .create({
        data: {
          ranks: {
            B5: 0,
            B4: 0,
            B3: 0,
            B2: 0,
            B1: 0,
            S5: 0,
            S4: 0,
            S3: 0,
            S2: 0,
            S1: 0,
            G5: 0,
            G4: 0,
            G3: 0,
            G2: 0,
            G1: 0,
            P5: 0,
            P4: 0,
            P3: 0,
            P2: 0,
            P1: 0,
            D5: 0,
            D4: 0,
            D3: 0,
            D2: 0,
            D1: 0,
            R5: 0,
            R4: 0,
            R3: 0,
            R2: 0,
            R1: 0,
            MS: 0,
          },
          nowRank: "UK",
          name: dbKey,
        },
      })
      .then((v) => {
        console.log("Inserted", dbKey);
      });
  }
}

db().then((x) => {
  console.log("Done!");
});
