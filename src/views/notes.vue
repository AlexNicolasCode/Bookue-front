<template>
    <Header :isLogged="true"/>

    <main class="notes">
        <h1>{{ $route.query.title }}</h1>

        <ul class="notes__content" v-if="notes || isAddingNote">
            <li class="notes__item" v-for="(note, index) in notes" :key="index">
                <p :class="isTashMode ? 'notes__text--alert' : 'notes__text'" v-if="!isEditMode">{{ note.text }}</p>
                <textarea class="notes__text" v-if="isEditMode" :value="note.text"/>

                <div class="notes__options" v-if="isTashMode">
                    <button class="notes__btn notes__save-btn" v-if="isEditMode" @click="deleteNote(note.id)">
                        <img class="notes__img" src="../assets/save.svg" alt="Delete icon">
                    </button>

                    <button :class="isTashMode ? 'notes__btn notes__delete-btn--alert' : 'notes__btn notes__delete-btn'" v-if="isTashMode" @click="deleteNote(note.id)">
                        <img class="notes__img" src="../assets/remove.svg" alt="Delete icon">
                    </button>
                </div>
            </li>

            <li class="notes__item" v-if="isAddingNote">
                <textarea class="notes__text" v-model="newNote" @keyup.enter="addNote"/>
                <div class="notes__options">
                    <button class="notes__btn notes__save-btn" v-if="!isEditMode" @click="addNote">
                        <img class="notes__img" src="../assets/save.svg" alt="Delete icon">
                    </button>

                    <button class="notes__btn notes__delete-btn" v-if="!isTashMode" @click="cancelNote">
                        <img class="notes__img" src="../assets/remove.svg" alt="Delete icon">
                    </button>
                </div>
            </li>
        </ul>

        <p class="notes__not-found" v-if="!notes">This book have't note</p>

        <button class="notes__btn notes__add-btn" v-if="!isAddingNote && !isTashMode" @click="startNote">
            <img class="notes__img" src="../assets/add.svg" alt="Delete icon">
        </button>


        <button :class="isTashMode ? 'notes__btn notes__tash-btn--alert' : 'notes__btn notes__tash-btn'" v-if="notes && !isAddingNote" @click="handleNote">
             <img class="notes__img" src="../assets/trash.svg" alt="Delete icon">
        </button>
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
            newNote: "",
            isAddingNote: false,
            isTashMode: false,
            isEditMode: false
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
                if (!notes || notes[0] === undefined) {
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
        cancelNote() {
            this.isAddingNote = false;
            this.cleanInputs();
        },
        discartNote() {
            this.isAddingNote = false
            this.cleanInputs()
        },
        async addNote() {
            if (this.newNote) {
                await this.saveBookNotes();
                this.cleanInputs();
                this.isAddingNote = false
                this.getBookData();
            }
        },
        cleanInputs() {
            this.newNote = ""
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

<style>
.notes {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.notes__content {
    width: 365px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 24px;
}

.notes__item {
    margin-top: 16px
}

.notes__text {
    background-color: var(--gray-color);
    color: var(--primary-font-color);
    font-size: 16px;
    height: auto;
    padding: 30px;
    width: 305px;
}

.notes__text--alert {
    background-color: #F9ECE6;
    color: var(--primary-font-color);
    font-size: 16px;
    height: auto;
    padding: 30px;
    width: 305px;
}

.notes__btn {
    border-radius: 100px;
    height: 40px;
    width: 40px;
}

.notes__add-btn {
    background-color: var(--primary-color);
    margin-top: 24px;
}

.notes__save-btn {
    background-color: var(--primary-color);
    margin-right: 8px;
}

.notes__tash-btn {
    background-color: var(--strong-gray-color);
    position: absolute;
    right: 16px;
    bottom: 16px;
}

.notes__tash-btn--alert {
    background-color: var(--alert-color);
    position: absolute;
    right: 16px;
    bottom: 16px;
}

.notes__delete-btn {
    background-color: var(--primary-color);
}

.notes__delete-btn--alert {
    background-color: var(--alert-color);
}

.notes__img {
    width: 25px;
    height: 25px;
}

.notes__options {
    float: right;
    position: relative;
    margin-top: -16px;
}

.notes__not-found {
    color: var(--placeholder-color);
    margin-top: 16px;
}
</style>