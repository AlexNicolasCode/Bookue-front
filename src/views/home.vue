<template>
    <div class="home">
        <Header :isLogged="true" :isBorder="true" :isHome="true" title="Sign up"/>
        <ul class="home__list">
            <Book v-for="(book, index) in bookList" :key="index" :book="bookList" />
        </ul>
    </div>
</template>

<script>
import Header from "../components/Header/index.vue"
import Book from "../components/Book/index.vue"
import "../styles/colors.css"
import "../styles/reset.css"
import { apolloClient } from '../services/Apollo/ApolloClient'

export default {
    name: 'Home',
    components: {
        Book,
        Header
    },
    data() {
    	return {
		    bookList: null
    	}
    },
    mounted() {
        this.autoLogin()
    },
    methods: {
        autoLogin: () => {
            if (this.isLoginInvalid() || this.isLoginExpired()) {
                router.push({ path: "/login" })
                return
            }
        },
        isLoginExpired: async () => {
            await apolloClient.query({ query: gql`{
                autoLogin {
                    name
                    email
                }}`, 
            }).then((res) => {
                const user = res.data.autoUser;

                if (!user) {
                    return true
                }

                return false
            })
        },
        getAllBooks: async () => {
            const response = await client.query({ query: gql`{
                getAllBooks {
                    id
                    title
                    author
                    description
                    currentPages
                    pages
                }
            }`})
            const allBooks = response.data.getAllBooks
            
            if (!allBooks) {
            	localStorage.removeItem("user")
            	router.push("/login");
            	return
            }
            
            this.bookList = allBooks
        },
        isLoginInvalid: () => {
            const token = localStorage.getItem("user") ? true : false
            if (!token) {
                return true
            }

            return false
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
