import { headers } from "next/headers";
const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

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
  const headersList = headers();
  const contentType = headersList.get("Content-Type");
  console.log(headersList);
  console.log(contentType);

  // const obj = path.parse(inputPath);
  // const outputPath = path.join(outputDir, `${obj.name}.avif`);
  console.log(req.body);

  if (!req.body) return;
  const responseFile: ReadableStream<any> = req.body;
  // return req.json().then((bd) => {
  console.log(JSON.stringify(req.body));

  const response: ResponseInit = new Response(responseFile, {
    status: 200,
  });
  return response;
  // });
};
