-- CREATE TABLE "restaurants" (
-- 	"id" varchar(255) NOT NULL,
-- 	CONSTRAINT "restaurants_pk" PRIMARY KEY ("id")
-- ) WITH (
--   OIDS=FALSE
-- );



-- CREATE TABLE "users" (
-- 	"id" serial NOT NULL,
-- 	"name" varchar(255) NOT NULL,
-- 	"username" varchar(255) NOT NULL UNIQUE,
-- 	"password" varchar(255) NOT NULL,
-- 	CONSTRAINT "users_pk" PRIMARY KEY ("id")
-- ) WITH (
--   OIDS=FALSE
-- );



-- CREATE TABLE "favorites" (
-- 	"user_id" int NOT NULL,
-- 	"restaurant_id" varchar(255) NOT NULL,
-- 	CONSTRAINT "favorites_pk" PRIMARY KEY ("user_id","restaurant_id")
-- ) WITH (
--   OIDS=FALSE
-- );





-- ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
-- ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk1" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id");

