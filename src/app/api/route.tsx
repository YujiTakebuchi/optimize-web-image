import { headers } from "next/headers";
const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

const convert = async (input: ArrayBuffer | null) => {
  // const obj = path.parse(input);
  // const outputPath = path.join(outputDir, `${obj.name}.avif`);
  const bufferData = await sharp(input).toFormat("avif").toBuffer();
  console.log(bufferData);
};

export const GET = async (request: Request) => {
  const headersList = headers();
  const referer = headersList.get("referer");
  const headersObj: HeadersInit = { referer: referer ?? "" };
  const respnse: ResponseInit = new Response("Hello, Next.js!", {
    status: 200,
    headers: headersObj,
  });
  return respnse;
};

export const POST = async (req: Request) => {
  return req.formData().then((data) => {
    console.log(data);
    console.log(data.get("file"));
    const file = data.get("file") as File;
    if (!file) return;
    const arrayBuffer = file.arrayBuffer().then((abData) => {
      convert(abData);
    });

    const response: ResponseInit = new Response(data, {
      status: 200,
    });
    return response;
  });
};
