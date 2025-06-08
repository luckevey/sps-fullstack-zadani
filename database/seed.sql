-- Naplnění kategorií (musí být jako první)
-- AUTOINCREMENT in 'categories' table starts from #1
INSERT INTO categories (name) VALUES ('Historie');  -- #1
INSERT INTO categories (name) VALUES ('Sci-fi');    -- #2
INSERT INTO categories (name) VALUES ('Beletrie');  -- #3

-- Naplnění knih
-- IDs budou: 1 = Historie, 2 = Sci-fi, 3 = Beletrie

INSERT INTO books (title, author, `year`, category_id, description)
VALUES
('1984', 'George Orwell', 1949, 2, 'Dystopický román o totalitní společnosti, která neustále sleduje své občany.'),
('Stoletý stařík', 'Jonas Jonasson', 2009, 3, 'Humorný příběh o staříkovi, který utíká z domova důchodců a mimoděk se zaplete do mezinárodní aféry'),
('Dějiny Evropy', 'Norman Davies', 1996, 1, 'Rozsáhlá a čtivá publikace mapující historii Evropy od starověku po současnost.'),
('Konec dětství', 'Arthur C. Clarke', 1953, 2, 'Sci-fi klasika o kontaktu lidstva s mimozemskou civilizací a překvapivém vývoji lidstva.'),
('Pán prstenů', 'J.R.R. Tolkien', 1954, 3, ' Epická fantasy sága o cestě malého hobita, který nese osud světa v jednom prstenu.');