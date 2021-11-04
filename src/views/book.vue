<template>
    <div class="book">
         <Header :isLogged="true" :isBorder="false" :isHome="true" title="Sign up"/>

         <main class="book__content">
            <button @click="deleteBook">Delete</button>

             <article>
                 <div class="book__head-content">
                    <h1 class="book__title">{{ book.title }}</h1>
                    <div>
                        Progress
                        <span>{{ book.currentPage / book.pages * 100 }}%</span>
                    </div>
                 </div>

                 <ul class="book__details">
                    <li class="book__item">
                        <p v-if="!edit.title" class="book__text">{{ book.title }}</p>
                        <input v-if="edit.title" class="book__input" v-model="book.title" />
                        <button @click="editProps('title')">edit</button>
                    </li>
                    <li class="book__item">
                        <p v-if="!edit.author" class="book__text">{{ book.author }}</p>
                        <input v-if="edit.author" class="book__input" v-model="book.author" />
                        <button @click="editProps('author')">edit</button>
                    </li>
                    <li class="book__item">
                        <p v-if="!edit.description" class="book__text">{{ book.description }}</p>
                        <input v-if="edit.description" class="book__input" v-model="book.description" />
                        <button @click="editProps('description')">edit</button>
                    </li>
                    <li class="book__item">
                        <p v-if="!edit.currentPage" class="book__text">{{ book.currentPage }}</p>
                        <input v-if="edit.currentPage" class="book__input" v-model="book.currentPage" />
                        <button @click="editProps('currentPage')">edit</button>
                    </li>
                    <li class="book__item">
                        <p v-if="!edit.pages" class="book__text">{{ book.pages }}</p>
                        <input v-if="edit.pages" class="book__input" v-model="book.pages" />
                        <button @click="editProps('pages')">edit</button>
                    </li>
                 </ul>
            </article>

            <button @click="saveUpdatedBook">Save</button>
         </main>
    </div>
</template>

<script>
import gql from 'graphql-tag'
import Cookies from 'js-cookie'
import { InMemoryCache } from "apollo-cache-inmemory"
import ApolloClient from "apollo-client"
import { setContext } from "apollo-link-context"
import { createHttpLink } from "apollo-link-http"

import Header from "../components/Header/index.vue"
import router from '../router'

export default {
    name: 'Book',
    components: {
        Header
    },
    data() {
        return {
            book: {
                id: null,
                title: null,
                author: null,
                description: null,
                currentPage: null,
                pages: null
            },
            edit: {
                title: null,
                author: null,
                description: null,
                currentPage: null,
                pages: null
            },
            editingMode: false
        }
    },
    beforeMount() {
        this.getBookData()
    },
    methods: {
        async getBookData() {
            const response = await this.clientApollo().query({ query: gql`query ($getBookId: String) {
                getBook(id: $getBookId) {
                    pages
                    currentPage
                    description
                    author
                    title
                    id
                }}`,

                variables: {
                    getBookId: this.$route.query.bookId,
                }
            })

            const book = response.data.getBook;
            if (!book) {
                return
            }

            this.book = book;
        },
        editProps(label) {
            if (!this.isValidBookUpdate(label)) {
                return
            }

            if (!this.editingMode) {
                this.editingMode = true
            }

            this.edit[label] = !this.edit[label]
        },
        async saveUpdatedBook() {
            if (this.edit.title && this.edit.author && this.edit.description && this.edit.currentPage && this.edit.pages) {
                return
            }

            if (!this.editingMode) {
                this.goToHomePage()
                return
            }

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

            this.goToHomePage()
        },
        async deleteBook() {
            const response = await this.clientApollo().mutate({ mutation: gql`mutation Mutation($deleteBookId: String) {
                deleteBook(id: $deleteBookId) {
                    id
                }}`,

                variables: {
                    deleteBookId: this.book.id,
                }
            })

            if (!response.data.deleteBook) {
                return
            }

            this.goToHomePage()
        },
        goToHomePage() {
            router.push({ path: "/home" })
        },
        isValidBookUpdate(label) {
            const optionsToValidate = {
                "title": this.isValidTitle,
                "author": this.isValidAuthor,
                "currentPage": this.isValidCurrentPage,
                "pages": this.isValidTotalPage
            }

            if (label !== "description" && !optionsToValidate[label]()) {
                return false
            }

            return true
        },
        isValidTitle() {
            console.log(this.book.title)
            if (this.book.title.length > 3) {
                return true
            }

            return false
        },
        isValidAuthor() {
            if (this.book.author.length > 3) {
                return true
            }

            return false
        },
        isValidCurrentPage() {
            if (Number(this.book.currentPage) < Number(this.book.pages)) {
                return true
            }

            return false
        },
        isValidTotalPage() {
            if (Number(this.book.pages) > 0) {
                return true
            }

            return false
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