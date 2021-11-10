<template>
    <div class="home">
        <Header :isLogged="true" :isBorder="true" :isHome="true" title="Sign up"/>
        <ul class="home__list">
            <Book v-for="(book, index) in bookList" :key="index" :book="book" />
        </ul>
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
import Book from "../components/Book/index.vue"
import "../styles/colors.css"
import "../styles/reset.css"
import router from '../router'

export default {
    name: 'Home',
    components: {
        Book,
        Header
    },
    data() {
    	return {
		    bookList: null,
            isLogged: null,
        }
    },
    beforeMount() {
        this.validateLogin()
        this.setHeadTitle()
    },
    mounted() {
        this.autoLogin()
        this.fetchBookList()
    },
    methods: {
        setHeadTitle() {
            document.title = "Home - Bookue"
        },
        autoLogin() {
            if (!this.isLogged) {
                this.redirectToLogin()
            }
        },
        redirectToLogin() {
            router.push({ path: "/login" })
        },
        validateLogin() {
            this.isLoginInvalid()
            this.isLoginExpired()
        },
        async isLoginExpired() {
            const user = await this.clientApollo().query({ query: gql`{
                autoLogin {
                    name
                }}`, 
            })

            if (!user.data.autoLogin) {
                this.isLogged = false
                return
            }

            this.isLogged = true
        },
        isLoginInvalid() {
            this.isLogged = Cookies.get("user") ? true : false
        },
        async fetchBookList() {
            const response = await this.clientApollo().query({ query: gql`{
                    getAllBooks {
                        id
                        title
                        author
                        description
                        currentPage
                        pages
                    }
                }`})
            const allBooks = response.data.getAllBooks
            this.bookList = allBooks
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
    },
}
</script>

<style scoped>
.home {

}

.home__list {
    margin-top: 32px;
}
</style>
