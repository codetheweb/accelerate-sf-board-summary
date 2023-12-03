import { migrate } from "@/db/migrate";
import { loadEnvFromFile } from "@/lib/load-env-from-file";

const main = async () => {
  loadEnvFromFile();

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  await migrate(process.env.DATABASE_URL);
};

void main();
