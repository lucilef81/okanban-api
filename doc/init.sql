-- schéma initial de la DB okanban

-- table list

DROP TABLE IF EXISTS "list";

CREATE TABLE "list" (
    "id" SERIAL PRIMARY KEY, -- PRIMARY KEY implique UNIQUE et NOT NULL, pas besoin de les réécrire
    "name" TEXT UNIQUE NOT NULL,
    "position" INT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP
);

-- table card

DROP TABLE IF EXISTS "card";

CREATE TABLE "card" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "color" INT,
    "list_id" INT NOT NULL REFERENCES "list"("id"), -- syntaxe d'une clé étrangère
    "position" INT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP
);

-- table tag

DROP TABLE IF EXISTS "tag";

CREATE TABLE "tag" (
    "id" SERIAL PRIMARY KEY,
    "label" TEXT UNIQUE NOT NULL,
    "color" INT,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP
);

-- table de liaison card <> tag

DROP TABLE IF EXISTS "cards_have_tags";

CREATE TABLE "cards_have_tags" (
    "id" SERIAL PRIMARY KEY,
    "tag_id" INT NOT NULL REFERENCES "tag"("id"),
    "card_id" INT NOT NULL REFERENCES "card"("id"),
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP
);

-- Pour ceux qui ont décidé de ne pas rajouter de champ id à la table de liaison

/*
CREATE TABLE cards_have_tags (
    "tag_id" INT NOT NULL REFERENCES "tag"("id"),
    "card_id" INT NOT NULL REFERENCES "card"("id"),
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP,
    PRIMARY KEY ("tag_id", "card_id")
);
*/
