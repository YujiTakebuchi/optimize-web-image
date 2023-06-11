import { headers } from "next/headers";
const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

export const GET = async (request: Request) => {
  // const headersList = headers();
  // const referer = headersList.get("referer");
  return new Response("Hello, Next.js!", {
    status: 200,
    // headers: { referer: referer },
  });
};

export const POST = async (inputFile: File) => {
  // const obj = path.parse(inputPath);
  // const outputPath = path.join(outputDir, `${obj.name}.avif`);
  const convertedFile = await sharp()
    .composite([
      {
        input: inputFile,
        blend: "dest-in",
      },
    ])
    .png();
  console.log(convertedFile);
};
