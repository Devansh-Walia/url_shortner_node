CREATE TABLE IF NOT EXISTS "url" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"url_id" text NOT NULL,
	"short_url" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
