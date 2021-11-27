import { createApp } from "./app";

async function main() {
  const app = await createApp({
    baseURL: "http://localhost:5005",
    port: 5005,
  });
  app.start();
}

main();
