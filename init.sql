CREATE TABLE IF NOT EXISTS tasks (
  ID SERIAL PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  category VARCHAR(255) NULL
);

INSERT INTO tasks (label)
VALUES  ('Coder une todolist avec Next js');
