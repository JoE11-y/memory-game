import * as pexels from "pexels";

const client = pexels.createClient(process.env.NEXT_PUBLIC_API_KEY || "");

export async function getImages(mode: string = "easy") {
  // const number = mode == "easy" ? 18 : 36;
  const result = await client.photos.search({
    query: "objects",
    per_page: 6,
    page: randomNumber(1, 10),
  });
  return result as any;
}

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
