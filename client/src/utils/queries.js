import { gql } from '@apollo/client';

export const GET_ME = gql`
 {
  me {
        _id
        # username
        # email
        savedBooks {
            bookId
            authors
            image
            description
            title
            # link
        }
        
    }
}
`;

export const QUERY_SAVEDBOOKS = gql`
    query getSavedBook {
        savedBooks {
            _id
            authors
            description
            bookId
            image
            link
            title
        }
    }
`;