import { parse } from "pg-connection-string";
import * as postgresMigrations from "postgres-migrations";
import * as zg from "zapatos/generate";
import path from "node:path";

interface MigrateOptions {
  silent?: boolean;
  shouldGenerateTypes?: boolean;
}

export const migrate = async (
  databaseUrl: string,
  { silent = false, shouldGenerateTypes = true }: MigrateOptions = {}
) => {
  const migrationsDirectory = path.join(
    process.cwd(),
    "src/db/migrations"
  );
  const zapatosDirectory = path.join(process.cwd(), "src/db");

  if (!silent) {
    console.log("Migrating database...");
  }

  const connectionConfig = parse(databaseUrl);
  const dbConfig = {
    user: connectionConfig.user ?? "",
    password: connectionConfig.password ?? "",
    host: connectionConfig.host ?? "",
    port: connectionConfig.port ? parseInt(connectionConfig.port, 10) : 5432,

    database: connectionConfig.database ?? "",
    ensureDatabaseExists: true,
    defaultDatabase: "postgres",
  };

  // Run migrations. Creates database if needed.
  await postgresMigrations.migrate(dbConfig, migrationsDirectory);

  if (shouldGenerateTypes) {
    if (!silent) {
      console.log("Generating types...");
    }

    // Generate typings
    await zg.generate({
      db: {
        connectionString: databaseUrl,
      },
      outDir: zapatosDirectory,
    });
  }
};
