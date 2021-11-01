<template>
    <div class="home">
        <Header :isLogged="true" :isBorder="true" :isHome="true" title="Sign up"/>
        <ul class="home__list">
            <Book v-for="(item, index) in list" :key="index"/>
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
        isLoginExpired: () => {
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