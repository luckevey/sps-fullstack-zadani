/*-- Naplnění kategorií (musí být jako první)
INSERT INTO categories (name) VALUES ('Historie');
INSERT INTO categories (name) VALUES ('Sci-fi');
INSERT INTO categories (name) VALUES ('Beletrie');

-- Naplnění knih
-- IDs budou: 1 = Historie, 2 = Sci-fi, 3 = Beletrie

INSERT INTO books (title, author, year, category_id) VALUES ('1984', 'George Orwell', 1949, 2);
INSERT INTO books (title, author, year, category_id) VALUES ('Stoletý stařík', 'Jonas Jonasson', 2009, 3);
INSERT INTO books (title, author, year, category_id) VALUES ('Dějiny Evropy', 'Norman Davies', 1996, 1);
INSERT INTO books (title, author, year, category_id) VALUES ('Konec dětství', 'Arthur C. Clarke', 1953, 2);
INSERT INTO books (title, author, year, category_id) VALUES ('Pán prstenů', 'J.R.R. Tolkien', 1954, 3);*/