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
  return req.formData().then((data) => {
    console.log(data);
    console.log(data.get("file"));

    const response: ResponseInit = new Response(data, {
      status: 200,
    });
    return response;
  });
};
