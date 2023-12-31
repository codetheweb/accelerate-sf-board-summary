import { reset } from "@/db/reset";
import { loadEnvFromFile } from "@/lib/load-env-from-file";

const main = async () => {
  loadEnvFromFile();

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  await reset(process.env.DATABASE_URL);
};

void main();
