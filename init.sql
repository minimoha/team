CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL
);

INSERT INTO users (firstname, lastname, email, password, role, department, address)
VALUES  ('admin', 'admin', 'admin@role.com', 'admin@1$', 'admin', 'admin', '1, admin');

CREATE TABLE gifs (
  ID SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  authorid INTEGER NOT NULL,
  FOREIGN KEY (authorid) REFERENCES users (id)
);

CREATE TABLE articles (
  ID SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  article VARCHAR(255) NOT NULL,
  created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  authorid INTEGER NOT NULL,
  FOREIGN KEY (authorid) REFERENCES users (id)
);

CREATE TABLE articlecomment (
  ID SERIAL PRIMARY KEY,
  articleid INTEGER NOT NULL,
  comment VARCHAR(255) NOT NULL,
  created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  authorid INTEGER NOT NULL,
  FOREIGN KEY (authorid) REFERENCES users (id),
  FOREIGN KEY (articleid) REFERENCES articles (id)
);

CREATE TABLE gifcomment (
  ID SERIAL PRIMARY KEY,
  gifid INTEGER NOT NULL,
  comment VARCHAR(255) NOT NULL,
  created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  authorid INTEGER NOT NULL,
  FOREIGN KEY (authorid) REFERENCES users (id),
  FOREIGN KEY (gifid) REFERENCES gifs (id)
);
