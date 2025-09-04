ALTER TABLE "events" RENAME COLUMN "start_date" TO "startDate";--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "created_by" SET DATA TYPE text;