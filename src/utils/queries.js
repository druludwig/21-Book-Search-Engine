const { gql } = require('@apollo/client')

export const GET_ME = gql` {
    me {
        _id
        username
        email
        bookCount
        addBook{
            bookId
            title
            authors
            decription
            image
            link
        }
    }
}`