const { execSync } = require("child_process");

function run(command) {
  console.log(`> ${command}`);
  execSync(command, { stdio: "inherit" });
}

try {
  const dbUrl =
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    "";

  const isPostgres = dbUrl.startsWith("postgres://") || dbUrl.startsWith("postgresql://");

  if (isPostgres) {
    console.log("Detected PostgreSQL connection. Generating PostgreSQL Prisma Client...");
    try {
      run("npx prisma generate --schema prisma/schema.postgresql.prisma");
    } catch (err) {
      if (err.message && (err.message.includes("query_engine") || err.message.includes("EPERM"))) {
        console.warn("Notice: Prisma engine file locked by running process. Continuing with existing client...");
      } else {
        throw err;
      }
    }

    // If deploying on Vercel and db is configured, auto-sync schema
    if (process.env.VERCEL || process.env.AUTO_MIGRATE === "true") {
      try {
        console.log("Synchronizing PostgreSQL schema with database...");
        run("npx prisma db push --schema prisma/schema.postgresql.prisma --accept-data-loss");
      } catch (err) {
        console.warn("Notice: Prisma db push warning/skip:", err.message);
      }
    }
  } else {
    console.log("Generating SQLite Prisma Client...");
    try {
      run("npx prisma generate --schema prisma/schema.prisma");
    } catch (err) {
      if (err.message && (err.message.includes("query_engine") || err.message.includes("EPERM"))) {
        console.warn("Notice: Prisma engine file locked by running dev process. Continuing with existing client...");
      } else {
        throw err;
      }
    }
  }

  console.log("Building Next.js application...");
  run("npx next build");

  console.log("Build completed successfully!");
} catch (error) {
  console.error("Build failed:", error);
  process.exit(1);
}
