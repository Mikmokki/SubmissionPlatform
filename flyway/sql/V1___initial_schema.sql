/* Create your schema here */
DROP TABLE IF EXISTS submission;
CREATE TABLE submission (
  id SERIAL PRIMARY KEY,
  token TEXT NOT NULL,
  exercise TEXT NOT NULL,
  code TEXT NOT NULL,
  correct BOOLEAN NOT NULL
);

