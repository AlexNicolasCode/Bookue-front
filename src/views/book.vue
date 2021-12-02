<template>
    <div class="book-page">
         <Header :isLogged="true" :isBorder="false" :isHome="true" title="Sign up"/>

         <main class="book-page__content">
            <section v-if="!isSettingCurrentPage" class="details__header-content">
                <h1 class="details__title">{{ book.title }}</h1>

                <div class="details__progress">
                    <p>Progress</p>
                    <p class="details__percentage">{{ book.currentPage / book.pages * 100 }}%</p>
                </div>
            </section>

             <section v-if="!isSettingCurrentPage" class="details">
                 <ul class="details__list">
                    <li class="details__item" v-for="(bookItem, label) in book" :key="label">
                        <label v-if="label !== 'id' && label !== '__typename'" class="details__label" :for="bookItem">{{ label }}</label>
                        <div v-if="label !== 'id' && label !== 'id' && label !== '__typename'" class="details__content">
                            <p v-if="!edit[label]" class="details__text">{{ bookItem }}</p>
                            <input v-if="edit[label]" class="details__input" v-model="book[label]" />
                            <button v-if="label !== 'id' && label !== 'currentPage'" class="details__edit-button" @click="editProps(label)">edit</button>
                            <button v-if="label !== 'id' && label === 'currentPage'" class="details__edit-button" @click="setCurrentPage(label)">edit</button>
                        </div>
                    </li>
                 </ul>
            </section>

            <section v-if="isSettingCurrentPage" class="current-page">
                <div class="current-page__content">
                    <p class="current-page__count">{{ book.currentPage }}</p>

                    <div class="current-page__options">
                        <button class="current-page__btn current-page__more" @click="morePage">
                            <img class="current-page__img" src="../assets/add.svg" alt="add button">
                        </button>

                        <button class="current-page__btn current-page__less" @click="lessPage">
                             <img class="current-page__img" src="../assets/less-current-page.svg" alt="add button">
                        </button>
                    </div>
                </div>
            </section>

            <section class="option">
                <button v-if="!isSettingCurrentPage" class="option__delete" @click="deleteBook">Delete</button>
                <button class="option__save" @click="saveUpdatedBook">Save</button>
            </section>
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
                title: false,
                author: false,
                description: false,
                currentPage: false,
                pages: false
            },
            editingMode: false,
            isSettingCurrentPage: false
        }
    },
    beforeMount() {
        this.getBookData()
    },
    mounted() {
        this.setHeadTitle()
    },
    methods: {
        setHeadTitle() {
            document.title = `${this.$route.query.title} - Bookue`
        },
        async getBookData() {
            const response = await this.clientApollo().query({ query: gql`query ($getbookID: String) {
                getBook(id: $getbookID) {
                    id
                    title
                    author
                    description
                    currentPage
                    pages
                }}`,

                variables: {
                    getbookID: this.$route.query.bookID,
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
            if (this.isSettingCurrentPage) {
                this.edit["currentPage"] = false
                this.book.currentPage = String(this.book.currentPage)
            }

            if (this.edit.title && this.edit.author && this.edit.description && this.edit.currentPage && this.edit.pages) {
                return
            }

            if (!this.isValidFields()) {
                return
            }

            if (!this.editingMode) {
                this.goToHomePage()
                return
            }

            const response = await this.clientApollo().mutate({ mutation: gql`mutation ($newTitle: String, $newAuthor: String, $newDescription: String, $newCurrentPage: String, $newPages: String, $updatebookID: String) {
                updateBook(newTitle: $newTitle, newAuthor: $newAuthor, newDescription: $newDescription, newCurrentPage: $newCurrentPage, newPages: $newPages, id: $updatebookID) {
                    id
                }}`,

                variables: {
                    updatebookID: this.book.id,
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
            const response = await this.clientApollo().mutate({ mutation: gql`mutation ($id: String!) {
                deleteBook(id: $id) {
                    id
                }}`,

                variables: {
                    id: this.$route.query.bookID,
                }
            })

            if (!response.data.deleteBook) {
                return
            }

            this.goToHomePage()
        },
        goToHomePage() {
            router.push({ path: "/" })
        },
        setCurrentPage(label) {
            this.isSettingCurrentPage = !this.isSettingCurrentPage
            this.editProps(label)
        },
        morePage() {
            if (Number(this.book.currentPage) === Number(this.book.pages)) {
                return
            }

            this.book.currentPage = Number(this.book.currentPage) + 1
        },
        lessPage() {
            if (Number(this.book.currentPage) === 0) {  
                return
            }

            this.book.currentPage = Number(this.book.currentPage) - 1
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
            if (Number(this.book.currentPage) < Number(this.book.pages) || Number(this.book.currentPage) === Number(this.book.pages)) {
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
        isValidFields() {
            const fields = [
                "title",
                "author",
                "currentPage",
                "pages"
            ]

            for (let i = 0; i < fields.length; i++) {
                if (!this.isValidBookUpdate(fields[i])) {
                    return false
                }
            }

            return true
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
.book-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.book-page__content {
    width: 365px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 90vh;
}

.details__header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 365px;
    height: auto;
}

.details__title {
    font-size: 30px;
    font-weight: 800;
}

.details__progress {
    width: 90px;
    height: 60px;
    font-size: 20px;
    text-align: right;
}

.details__percentage {
    font-weight: 800;
}

.details {
    font-size: 12px;
}

.details__list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 250px;
}

.details__item {
    height: 40px;
}

.details__item:first-child {
    display: none;
}

.details__item:last-child {
    display: none;
}

.details__label {
    text-transform: capitalize;    
    color: var(--placeholder-color);
}

.details__content {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
}

.details__text {
    font-weight: 600;
}

.details__edit-button {
    color: var(--primary-color);
    font-weight: 800;
    width: auto;
    height: auto;
}

.option {
    display: flex;
    width: 100%;
    height: 40px;
    margin-top: 60px;
}

.option__delete {
    line-height: 40px;
    width: 40px;
    height: 40px;
    margin-right: 24px;
    color: var(--placeholder-color);
    margin-left: auto
}

.option__save {
    width: 80px;
    height: 40px;
    font-size: 16px;
    border-radius: 2.5px;
    background: var(--primary-color);
    color: var(--white-color);
}

.current-page {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90vh;
}

.current-page__content {
    display: flex;
    height: 108px;
}

.current-page__count {
    display: flex;
    align-items: center;
    font-size: 60px;
    margin-right: 24px;
}

.current-page__options {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.current-page__btn {
    width: 50px;
    height: 50px;
    border-radius: 2.5px;
}

.current-page__more {
    background: var(--primary-color);
    margin-bottom: auto;
}

.current-page__less {
    border: solid var(--primary-color);
}

.current-page__img {
    height: 30px;
    width: 30px;
}
</style>