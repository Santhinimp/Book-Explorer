import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Container, TextField, Grid, CircularProgress, Typography
} from '@mui/material';
import BookCard from './BookCard';
import { fetchBooks } from './api';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const debounceRef = useRef(null);

  // Debounced input with useRef
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setBooks([]);
      setPage(1);
      setHasMore(true);
    }, 500);
  }, [searchTerm]);

  // Fetch books from API
  useEffect(() => {
    if (!searchTerm) return;
    setLoading(true);
    fetchBooks(searchTerm, page).then((newBooks) => {
      if (newBooks.length === 0) {
        setHasMore(false);
      }
      setBooks(prev => [...prev, ...newBooks]);
      setLoading(false);
    });
  }, [searchTerm, page]);

  // Infinite scroll using IntersectionObserver
  const lastBookRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <Container sx={{ mt: 4 }}>
      <TextField
        fullWidth
        label="Search Books"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={2}>
        {books.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} key={`${book.key}-${index}`} ref={index === books.length - 1 ? lastBookRef : null}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Grid container justifyContent="center" sx={{ mt: 3 }}>
          <CircularProgress />
        </Grid>
      )}

      {!loading && !books.length && searchTerm && (
        <Typography variant="body1" sx={{ mt: 3, textAlign: 'center' }}>
          No results found.
        </Typography>
      )}
    </Container>
  );
};

export default App;
