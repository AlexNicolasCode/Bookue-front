<template>
    <div class="container">
        <BrandName class="container__title" />
        <div v-if="isInvalidForm && isRegister">This account already exist.</div>
        <div v-if="isInvalidForm && !isRegister">Invalid login, check your email and password.</div>
        <form @submit="submitForm" class="form">
            <input class="form__item" v-model="user.name" v-if="isRegisterForm" name="name" placeholder="name" />
            <label v-if="isNameAlert">Name invalid</label>
            <input class="form__item" v-model="user.email" name="email" type="email" placeholder="email" />
            <label v-if="isEmailAlert">Email invalid</label>
            <input class="form__item" v-model="user.password" name="password" type="password" placeholder="password" />
            <label v-if="isPasswordAlert">Password invalid. Please, set a password with more than 3 letters, numbers or simbols</label>
            <LoginAndRegisterButton class="form__btn" @click="submitForm" :border="false" :title="title" :isHeader="false"/>
        </form>
    </div>
</template>

<script>
import gql from "graphql-tag";
import Cookies from 'js-cookie';

import LoginAndRegisterButton from "../LoginAndRegisterButton/index.vue";
import BrandName from "../BrandName/index.vue";
import { apolloClient } from "../../services/Apollo/ApolloClient";
import router from "../../router";

export default {
    name: 'UserForm',
    components: {
        LoginAndRegisterButton,
        BrandName
    },
    props: ["isRegisterForm", "title"],
    data() {
        return {
            user: {
                name: null,
                email: null,
                password: null
            },
            isInvalidForm: false,
            isNameAlert: false,
            isNameAlert: false,
            isEmailAlert: false,
            isPasswordAlert: false,
            isRegister: this.isRegisterForm,
        }
    },
    mounted() {
        if (this.isLogged()) {
            this.redirectToHome()  
        }
    },
    methods: {
        redirectToHome() {
            router.push({ path: "/home" });
        },
        isLogged() {
            return Cookies.get("user")
        },
        submitForm(event) {
            event.preventDefault();
            if (this.isRegister) {
                this.registerUser()
                return
            }

            this.loginUser()
        },
        async loginUser() {
            if (!this.isValidUserEmail() || !this.isValidPassword()) {
                return
            }

            const token = await this.getLoginToken()

            if (!token) {
                this.isInvalidForm = true
                return
            }

            this.isInvalidForm = false
            await this.saveTokenInLocalStorage(token)
            this.redirectToHome()
        },
        async getLoginToken() {
            const user = await apolloClient.query({ query: gql`query ($password: String!, $email: String!) {
                loginUser(password: $password, email: $email) {
                    token
                }}`,

                variables: {
                    email: this.user.email, 
                    password: this.user.password,
                },
            })
            const token = user.data.loginUser.token;
            return token
        },
        async registerUser() {
            if (!this.isValidUserName() && !this.isValidUserEmail() && !this.isValidPassword()) {
                return
            }

            const token = await this.getCreateAccountToken()
            if (!token) {
                this.isInvalidForm = true
                return
            }

            this.isInvalidForm = false
            await this.saveTokenInLocalStorage(token)
            this.redirectToHome()
        },
        async getCreateAccountToken() {
            const user = await apolloClient.mutate({ mutation: gql`mutation ($password: String!, $email: String!, $name: String!) {
                signUpUser(password: $password, email: $email, name: $name) {
                    token
                }}`,

                variables: {
                    name: this.user.name,
                    email: this.user.email, 
                    password: this.user.password,
                },
            })
            const token = user.data.signUpUser.token;
            return token
        },
        saveTokenInLocalStorage(token) {
            Cookies.set("user", token)
        },
        isValidUserName() {
            if (this.user.name.length < 3) {
                this.isNameAlert = true
                return false
            }

            this.isNameAlert = false
            return true
        },
        isValidUserEmail() {
            const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (this.user.email.length < 3 || !regexEmail.test(String(this.user.email).toLowerCase())) {
                this.isEmailAlert = true
                return false
            }

            this.isEmailAlert = false
            return true
        },
        isValidPassword() {
            if (this.user.password.length < 3) {
                this.isPasswordAlert = true
                return false
            }

            this.isPasswordAlert = false
            return true
        },
    }
}
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container__title {
    margin-bottom: 16px;
}

.form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.form__item {
    margin: 4px;
    border: none;
    border-radius: 2.5px;
    width: 268px;
    height: 50px;
    background: var(--gray-color);
}

.form__btn {
    margin-top: 8px;
}

.form__item::placeholder {
    padding-left: 8px;
    color: var(--placeholder-color);
}
</style>