<template>
    <div class="home">
        <Header :isLogged="true" :isBorder="true" :isHome="true" title="Sign up"/>
        <ul class="home__list">
            <Book v-for="(book, index) in bookList" :key="index" :book="book" />
        </ul>
    </div>
</template>

<script>
import Header from "../components/Header/index.vue"
import Book from "../components/Book/index.vue"
import "../styles/colors.css"
import "../styles/reset.css"
import { apolloClient } from '../services/Apollo/ApolloClient'
import router from '../router'
import gql from 'graphql-tag'

export default {
    name: 'Home',
    components: {
        Book,
        Header
    },
    data() {
    	return {
		    bookList: null,
            isLogged: null
    	}
    },
    beforeMount() {
        this.validateLogin()
    },
    mounted() {
        this.getAllBooks()
    },
    methods: {
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
            const user = await apolloClient.query({ query: gql`{
                autoLogin {
                    name
                }}`, 
            })

            if (!user.data.autoLogin) {
                this.isLogged = false
            }

            this.isLogged = true
        },
        isLoginInvalid() {
            this.isLogged = localStorage.getItem("user") ? false : true
        },
        async getAllBooks() {
            const response = await apolloClient.query({ query: gql`{
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
            
            if (!allBooks) {
                localStorage.removeItem("user")
                return
            }
            
            this.bookList = allBooks
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
