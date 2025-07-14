// api.js
export const fetchBooks = async (query, page = 1) => {
  const response = await fetch(`https://openlibrary.org/search.json?q=${query}&page=${page}`);
  const data = await response.json();
  return data.docs || [];
};