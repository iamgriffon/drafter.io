import { createTRPCRouter, publicProcedure } from "../trpc";

export const championRouter = createTRPCRouter({
  fetchChampions: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.champion.findMany();
  }),
  updateDatabase: publicProcedure.mutation(async ({ ctx }) => {
    let championArray = [];

    const fetchVersions: string[] = await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then(res => res.json())
    const latestData = fetchVersions[0];

    console.log(latestData)

    // const parsedJSON: any = await fetch(
    //   `http://ddragon.leagueoflegends.com/cdn/${latestData}/data/en_US/champion.json`,
    // ).then((data) => data.json());
    // for (const key in parsedJSON.data) {
    //   championArray.push(parsedJSON.data[key]);
    // }
    // const CHAMPIONS_TO_DATABASE = championArray.map((champion) => {
    //   const { name, image } = champion;
    //   return {
    //     name,
    //     image: `http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${image.full}`,
    //   };
    // });
  }),
});
