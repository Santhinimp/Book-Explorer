import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';

const BookCard = ({ book, onFavourite }) => {
  const title = book.title || 'No Title';
  const author = book.author_name?.[0] || 'Unknown Author';
  const coverId = book.cover_i;
  const imageUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : 'https://via.placeholder.com/150x200?text=No+Image';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardMedia component="img" height="200" image={imageUrl} alt={title} />
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="body2" color="text.secondary">{author}</Typography>
        {onFavourite && (
          <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={onFavourite}>
            Add to Favourites
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default BookCard;
