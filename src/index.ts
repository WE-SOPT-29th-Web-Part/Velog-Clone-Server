import { createApp } from "./app";

async function main() {
  const app = await createApp({
    port: 3000,
  });
  app.start();
}

main();
