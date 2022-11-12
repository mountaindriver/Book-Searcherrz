import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me(_id: ID!) {
        user(_id: $_id){
            username
            email
            password
            savedBooks {
                bookId
            }
        }
    }
`;