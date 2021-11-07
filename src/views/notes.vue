<template>
    <Header :isLogged="true" :title="book"/>

    <main>
        <ul v-if="notes">
            <li v-for="(note, index) in notes" :key="index">{{ note.text }}</li>
        </ul>
    </main>
</template>

<script>
import gql from "graphql-tag";
import Cookies from "js-cookie";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";

import Header from "../components/Header/index.vue";

export default {
    name: "Notes",
    components: {
        Header
    },
    data() {
        return {
            notes: null
        }
    },
    beforeMount() {
        this.getBookData()
    },
    methods: {
        async getBookData() {
            try {
                const response = await this.clientApollo().query({ query: gql`query GetBook($bookId: String) {
                    getNotes(bookID: $bookId) {
                        id
                        text
                    }}`,
    
                    variables: {
                        bookId: this.$route.query.bookId,
                    }
                })
    
                const notes = response.data.getNotes
                if (!response) {
                    return
                }

                this.notes = notes;
            } catch(e) {
                return
            }


        },
        async saveBookNotes() {
            const response = await this.clientApollo().mutate({ mutation: gql`mutation ($newTitle: String, $newAuthor: String, $newDescription: String, $newCurrentPage: String, $newPages: String, $updateBookId: String) {
                updateBook(newTitle: $newTitle, newAuthor: $newAuthor, newDescription: $newDescription, newCurrentPage: $newCurrentPage, newPages: $newPages, id: $updateBookId) {
                    id
                }}`,

                variables: {
                    updateBookId: this.book.id,
                    newTitle: this.book.title,
                    newAuthor: this.book.author,
                    newDescription: this.book.description,
                    newCurrentPage: this.book.currentPage,
                    newPages: this.book.pages
                }
            })

            if (!response.data.updateBook) {
                return
            }
        },
        clientApollo() {
            const httpLink = createHttpLink({
                uri: new URL(import.meta.env.VITE_BOOKUE_API),
            })

            const token = Cookies.get("user")
            const authLink = setContext((_, { headers }) => {
                return {
                    headers: {
                        ...headers,
                        Authorization: token ?? '',
                    },
                }
            })

            const cache = new InMemoryCache();
            return new ApolloClient({
                link: authLink.concat(httpLink),
                cache, 
            })
        }
    }
}
</script>