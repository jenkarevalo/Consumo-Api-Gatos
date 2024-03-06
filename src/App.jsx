import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [booksFact, setBooksFact] = useState(''); // Use more descriptive name
  const [booksImageUrl, setBooksImageUrl] = useState('');

  useEffect(() => {
    const fetchBooksFact = async () => {
      try {
        const response = await fetch('https://openlibrary.org/authors/OL1394244A/works.json?offset=50');
        const data = await response.json();
        setBooksFact(data.title);
      } catch (error) {
        console.error('Error fetching books fact:', error);
      }
    };
    fetchBooksFact();
  }, []);

  useEffect(() => {
    const generateBooksImage = async () => {
      try {
        const response = await fetch('https://source.unsplash.com/featured/?libros');
        if (response.ok) {
          const data = await response.blob(); // Handle data as blob
          const imageUrl = URL.createObjectURL(data); // Generate URL from blob
          setBooksImageUrl(imageUrl);
        } else {
          console.error('Error fetching books image:', response.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    };
    generateBooksImage();
  }, [booksFact]);

  return (
    <>
      <h1>Random Books</h1>
      {booksFact && <p>{booksFact}</p>}
      {booksImageUrl && (
        <img src={booksImageUrl} alt="random books" width={300} height={300} />
      )}
      {booksImageUrl && <p>Image generated based on the first word of the fact.</p>}
    </>
  );
}

export default App;
