import { db } from "@/server/db";

export async function fetchChampions() {
  let championArray = [];

  const fetchVersions: any = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json",
  ).then((data) => data.json());

  const lastest = fetchVersions[0];

  const parsedJSON: any = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/${lastest}/data/en_US/champion.json`,
  ).then((data) => data.json());
  for (const key in parsedJSON.data) {
    championArray.push(parsedJSON.data[key]);
  }
  const CHAMPIONS_TO_DATABASE = championArray.map((champion) => {
    const { name, image } = champion;
    return {
      name,
      image: `http://ddragon.leagueoflegends.com/cdn/${lastest}/img/champion/${image.full}`,
    };
  });

  const deleteChampions = await db.champion.deleteMany({});

  const creation = await db.champion.createMany({
    data: CHAMPIONS_TO_DATABASE,
  });

  console.log("Deleted?", deleteChampions);
  console.log("Created?", creation);
}

await fetchChampions();
