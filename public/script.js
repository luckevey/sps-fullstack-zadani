const bookForm = document.getElementById('book-form');
const bookTable = document.getElementById('books-table');
const categorySelect = document.getElementById('category_id');

const categoryForm = document.getElementById('category-form');
const categoryList = document.getElementById('category-table');
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const categorySearchInput = document.getElementById('category-search-input');
const categorySearchForm = document.getElementById('category-search-form');

// Funkce pro validaci roku
function isValidYear(year) {
  const currentYear = new Date().getFullYear();
  return Number.isInteger(year) && year >= 1400 && year <= currentYear + 1;
}

// === FUNKCE PRO KNIHY ===

function loadBooks(filter = '') {
  fetch('/api/books')
    .then(res => res.json())
    .then(books => {
      const filteredBooks = books.filter(book => {
        const search = filter.toLowerCase();
        return (
          book.title.toLowerCase().includes(search) ||
          book.author.toLowerCase().includes(search) ||
          (book.year && book.year.toString().includes(search)) ||
          (book.category_name && book.category_name.toLowerCase().includes(search)) ||
          (book.description && book.description.toLowerCase().includes(search))
        );
      });

      bookTable.innerHTML = '';
      filteredBooks.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.year || ''}</td>
          <td>${book.category_name || ''}</td>
          <td>${book.description || ''}</td>
          <td>
            <button onclick="editBook(${book.id})">Upravit</button>
            <button onclick="deleteBook(${book.id})">Smazat</button>
          </td>
        `;
        bookTable.appendChild(row);
      });
    })
    .catch(err => console.error('Chyba při načítání knih:', err));
}

function editBook(id) {
  fetch(`/api/books/${id}`)
    .then(res => res.json())
    .then(book => {
      document.getElementById('book-id').value = book.id;
      document.getElementById('title').value = book.title;
      document.getElementById('author').value = book.author;
      document.getElementById('year').value = book.year || '';
      document.getElementById('category_id').value = book.category_id || '';
      document.getElementById('description').value = book.description || '';
    });
}

function deleteBook(id) {
  if (confirm('Smazat tuto knihu?')) {
    fetch(`/api/books/${id}`, { method: 'DELETE' })
      .then(() => loadBooks());
  }
}

bookForm.addEventListener('submit', e => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const yearStr = document.getElementById('year').value.trim();
  const description = document.getElementById('description').value.trim();
  const categoryId = document.getElementById('category_id').value;

  // Kontrola na nesmyslné znaky (mezery, tečky atd.)
  const invalidPattern = /^[\s\.\-_,;:]*$/;
  if (
    !title || invalidPattern.test(title) ||
    !author || invalidPattern.test(author) ||
    !description || invalidPattern.test(description)
  ) {
    alert('Vyplňte správně název, autora a popis knihy.');
    return;
  }

  // Validace roku
  let year = null;
  if (yearStr !== '') {
    year = parseInt(yearStr);
    if (!isValidYear(year)) {
      alert(`Zadej platný rok vydání mezi 1400 a ${new Date().getFullYear() + 1}.`);
      return;
    }
  }

  const data = {
    title,
    author,
    year,
    category_id: categoryId ? parseInt(categoryId) : null,
    description
  };

  const id = document.getElementById('book-id').value;
  const method = id ? 'PUT' : 'POST';
  const url = id ? `/api/books/${id}` : '/api/books';

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(() => {
    bookForm.reset();
    loadBooks();
  });
});

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  loadBooks(searchInput.value);
});

searchInput.addEventListener('input', () => {
  loadBooks(searchInput.value);
});

// === FUNKCE PRO KATEGORIE ===

function loadCategories(filter = '') {
  fetch('/api/categories')
    .then(res => res.json())
    .then(categories => {
      const search = filter.toLowerCase();

      const filtered = categories.filter(cat =>
        cat.name.toLowerCase().includes(search)
      );

      // Select pro formulář knih
      categorySelect.innerHTML = filtered.map(cat =>
        `<option value="${cat.id}">${cat.name}</option>`
      ).join('');

      // Tabulka kategorií
      categoryList.innerHTML = filtered.map(cat =>
        `<tr>
          <td>${cat.id}</td>
          <td>${cat.name}</td>
          <td><button onclick="deleteCategory(${cat.id})">Smazat</button></td>
        </tr>`
      ).join('');
    });
}

categoryForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('category-name').value.trim();
  const invalidPattern = /^[\s\.\-_,;:]*$/;
  if (!name || invalidPattern.test(name)) {
    alert('Zadejte platný název kategorie.');
    return;
  }

  fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  }).then(() => {
    categoryForm.reset();
    loadCategories();
  });
});

function deleteCategory(id) {
  if (confirm('Smazat tuto kategorii?')) {
    fetch(`/api/categories/${id}`, { method: 'DELETE' })
      .then(() => loadCategories());
  }
}

categorySearchInput.addEventListener('input', () => {
  loadCategories(categorySearchInput.value);
});

// === INIT ===
loadBooks();
loadCategories();
