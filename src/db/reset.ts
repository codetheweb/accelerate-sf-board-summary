import { Client } from "pg";
import { parse } from "pg-connection-string";
import { migrate } from "./migrate";

export const reset = async (databaseUrl: string) => {
  const connectionConfig = parse(databaseUrl);

  // Connect to the postgres database so we can drop the application database
  const client = new Client({
    user: connectionConfig.user,
    password: connectionConfig.password,
    host: connectionConfig.host ?? undefined,
    port: connectionConfig.port
      ? parseInt(connectionConfig.port, 10)
      : undefined,
    database: "postgres",
  });

  await client.connect();

  const targetDatabaseName = connectionConfig.database as string;

  console.log(`Dropping database ${targetDatabaseName}...`);

  await client
    .query(`DROP DATABASE IF EXISTS ${targetDatabaseName}`)
    .catch((error: Error) => {
      if (error.message.includes("does not exist")) {
        return;
      }

      throw error;
    });
  await client.end();

  console.log("Running migrations...");
  await migrate(databaseUrl);

  console.log("🫧  database has been reset and migrated.");
};
