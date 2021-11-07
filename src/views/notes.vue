<template>
    <Header :isLogged="true" :title="book"/>

    <main>
        <ul v-if="notes">
            <li v-for="(note, index) in notes" :key="index">{{ note.text }}
                <button v-if="isTashMode" @click="deleteNote(note.id)">Delete</button>
            </li>
        </ul>

        <button v-if="!isAddingNote" @click="startNote">Plus</button>

        <textarea v-if="isAddingNote" v-model="newNote" />
        <button v-if="isAddingNote" @click="addNote">Add</button>
        <button v-if="isAddingNote" @click="discartNote">Discart</button>

        <button v-if="!isAddingNote" @click="handleNote">Tash</button>
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
            notes: null,
            newNote: null,
            isAddingNote: false,
            isTashMode: false
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
        startNote() {
            this.isAddingNote = true
        },
        discartNote() {
            this.isAddingNote = false
            this.cleanInputs()
        },
        async addNote() {
            const noteID = await this.saveBookNotes();
            this.notes = [...this.notes, { _id: noteID, text: newNote }]
            this.cleanInputs()
        },
        cleanInputs() {
            this.newNote = null
            this.isAddingNote = false
        },
        async saveBookNotes() {
            const response = await this.clientApollo().mutate({ mutation: gql`mutation Mutation($note: String, $bookId: String) {
                addNote(note: $note, bookID: $bookId) {
                    id
                }}`,

                variables: {
                    note: this.newNote,
                    bookId: this.$route.query.bookId,
                }
            })

            if (!response.data.updateBook) {
                return
            }

            return response.data.updateBook.id
        },
        handleNote() {
            this.isTashMode = !this.isTashMode
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