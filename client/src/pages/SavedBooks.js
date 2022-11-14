import React, { useState } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import BookList from '../components/BookList';

import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const SavedBooks = () => {
  const [userData, setUserData] = useState({});  
  const { loading, data} = useQuery(GET_ME);

  if (data){
    setUserData(data);
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {loading ? (
            <div>Loading...</div>
          ):(
            userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'
          )}
        </h2>
        <BookList books={userData}/>
      </Container>
    </>
  );
};

export default SavedBooks;
