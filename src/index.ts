import { createApp } from "./app";

async function main() {
  const app = await createApp({
    baseURL: "http://localhost:3000",
    port: 3000,
  });
  app.start();
}

main();
