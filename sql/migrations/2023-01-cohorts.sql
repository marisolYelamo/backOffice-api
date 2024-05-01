CREATE TABLE "cohort" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "label" varchar(50) UNIQUE NOT NULL,
  "discordRoleId"  varchar(128) UNIQUE,
  "discordChannelsIds" varchar(128)[] DEFAULT array[]::varchar[],
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "commission" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "cohortId" int NOT NULL,
  "discordRoleId"  varchar(128) UNIQUE,
  "discordChannelsIds" varchar(128)[] DEFAULT array[]::varchar[],
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "user_commission" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "CommissionId" int NOT NULL,
  "UserId" int NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);


ALTER TABLE "commission" ADD FOREIGN KEY ("cohortId") REFERENCES "cohort" ("id") ON DELETE CASCADE;

ALTER TABLE "user_commission" ADD FOREIGN KEY ("CommissionId") REFERENCES "commission" ("id") ON DELETE CASCADE;


ALTER TABLE cohort DROP CONSTRAINT "cohort_discordRoleId_key";
ALTER TABLE commission DROP CONSTRAINT "commission_discordRoleId_key";