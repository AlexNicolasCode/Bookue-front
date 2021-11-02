<template>
    <div class="add-book">
        <Header :isLogged="true" :isBorder="true" :isHome="false"/>
        <div class="add-book__content">
            <label v-if="alerts.bookAdded">This book already exist</label>
            <form v-if="!isSetCurrentPage" class="add-book__form" @submit="submitForm">
                <input class="add-book__item" v-model="book.title" type="text" name="title" placeholder="Title">
                <label v-if="alerts.title">Title small</label>
                <input class="add-book__item" v-model="book.author" type="text" name="author" placeholder="Author">
                <label v-if="alerts.author">Author small</label>
                <input class="add-book__item" v-model="book.pages" type="number" name="pages" placeholder="Pages">
                <label v-if="alerts.pages">Please, set total pages of book</label>
                <textarea class="add-book__item add-book__description" v-model="book.description" type="text" name="description" placeholder="Description" />
                <label v-if="alerts.description">Description small</label>
                <button type="submit" class="add-book__btn">Next</button>
            </form>
            <form v-if="isSetCurrentPage" class="add-book__form" @submit="submitForm">
                <input class="add-book__item" v-model="book.currentPage" type="number" name="currentPage" placeholder="Current page">
                <label v-if="alerts.currentPage">Please, set the current page of book</label>
                <button type="submit" class="add-book__btn">Next</button>
            </form>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
import { createHttpLink } from 'apollo-link-http';
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import Cookies from "js-cookie";

import router from "../router";
import Header from "../components/Header/index.vue";

import "../styles/reset.css";
import "../styles/colors.css";

export default {
    name: 'AddBook',
    components: {
        Header
    },
    data() {
        return {
            book: {
                title: '',
                author: '',
                currentPage: '',
                pages: '',
                description: ''
            },
            isSetCurrentPage: false,
            alerts: {
                title: null,
                author: null,
                currentPage: null,
                pages: null,
                description: null,
                bookAdded: null
            }
        }
    },
    methods: {
        async submitForm(e) {
            e.preventDefault();

            if (!this.isValidBookData()) {
                return
            }

            if (!this.isSetCurrentPage) {
                this.isSetCurrentPage = !this.isSetCurrentPage
                return
            }

            if (!this.isValidBookCurrentPage()) {
                return
            }

            if (await this.createBook()) {
                this.redirectToHome();
            }
        },
        async createBook() {          
            const response = await this.clientApollo().mutate({ mutation: gql`mutation Mutation($title: String, $author: String, $description: String, $pages: String, $currentPage: String) {
                addBook(title: $title, author: $author, description: $description, currentPage: $currentPage, pages: $pages) {
                    id
                }}`,

                variables: {
                    title: this.book.title,
                    author: this.book.author,
                    description: this.book.description,
                    currentPage: `${this.book.currentPage ?? 0}`,
                    pages: `${this.book.pages}`
                }
            })

            if (!response.data.addBook) {
                this.isSetCurrentPage = !this.isSetCurrentPage
                this.alerts.bookAdded = true
                return false
            }

            return true
        },
        redirectToHome() {
            router.push({ path: "/home" })
        },
        isValidBookData() {
            if (this.isValidBookTitle() && this.isValidBookAuthor() && this.isValidBookDescription() && this.isValidBookPages()) {
                return true
            }

            return false
        },
        isValidBookTitle() {
            if (this.book.title.length < 3) {
                this.alerts.title = true
                return false
            }

            this.alerts.title = false
            return true
        },
        isValidBookAuthor() {
            if (this.book.author.length < 3) {
                this.alerts.author = true
                return false
            }

            this.alerts.author = false
            return true
        },
        isValidBookPages() {
            if (this.book.pages < 10) {
                this.alerts.pages = true
                return false
            }

            this.alerts.pages = false
            return true
        },
        isValidBookDescription() {
            if (this.book.description.length < 3 || this.book.description.length === 0) {
                this.alerts.description = true
                return false
            }

            this.alerts.description = false
            return true
        },
        isValidBookCurrentPage() {
            if (this.book.pages < this.book.currentPage) {
                this.alerts.currentPage = true
                return false
            }

            this.alerts.currentPage = false
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

            const cache = new InMemoryCache()
            return new ApolloClient({
                link: authLink.concat(httpLink),
                cache,
            })
        }
    }
}
</script>

<style scoped>
.add-book {

}

.add-book__content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
}

.add-book__form {
    display: flex;
    flex-direction: column;
}

.add-book__item {
    margin: 4px 0px;
    border: none;
    border-radius: 2.5px;
    width: 350px;
    height: 50px;
    background: var(--gray-color);
    border-radius: 2.5;
}

.add-book__item::placeholder {
    color: var(--placeholder-color);
}

.add-book__description {
    resize: none;
    height: 168px;
    padding: 16px;
}
.add-book__btn {
    margin-left: auto;
    margin-top: 8px;
    font-size: 16px;
    width: 80px;
    height: 40px;
    background: var(--primary-color);
    color: var(--white-color);
    border: none;
}

.add-book__btn:hover {
    background: none;
    border: 2.5px solid var(--primary-color);
    color: var(--primary-color);
    transition: 0.2s;
}

</style>