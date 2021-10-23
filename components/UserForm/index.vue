<template>
    <div class="container">
        <BrandName class="container__title" />
        <div v-if="isInvalidForm && isRegisterForm">This account already exist.</div>
        <div v-if="isInvalidForm && !isRegisterForm">Invalid login, check your email and password.</div>
        <form @submit="submitForm" class="form">
            <input class="form__item" @change="user.name" v-if="isRegister" name="name" placeholder="name" />
            <label v-if="isNameAlert">Name invalid</label>
            <input class="form__item" @change="user.email" name="email" type="email" placeholder="email" />
            <label v-if="isEmailAlert">Email invalid</label>
            <input class="form__item" @change="user.password" name="password" type="password" placeholder="password" />
            <label v-if="isPasswordAlert">Password invalid. Please, set a password with more than 3 letters, numbers or simbols</label>
            <LoginAndRegisterButton class="form__btn" :border="false" :title="title" :isHeader="false"/>
        </form>
    </div>
</template>

<script>
export default {
    props: ["isRegisterForm", "title"],
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: ""
            },
            isInvalidForm: false,
            isNameAlert: false,
            isNameAlert: false,
            isEmailAlert: false,
            isPasswordAlert: false
        }
    },
    mounted() {
        if (!this.isLogin()) {
            this.$router.push("/home");
        }
    },
    methods: {
        isLogin: () => {
            return localStorage.getItem("user") ? true : false
        },
        submitForm: () => {
            if (isRegisterForm) {
                this.registerUser()
                return
            }

            this.loginUser()
        },
        loginUser: async () => {
            if (!this.validateUserEmail() || !this.validateUserPassword()) {
                return
            }

            const response = await client.query({ query: gql`{
                loginUser(email: ${this.user.email}, password: ${this.user.password}) {
                    token
                }
            }` })
            const token = response.data.token;

            if (!token) {
                return false
            }

            await saveTokenInLocalStorage(token)
            return true
        },
        registerUser: async () => {
            if (!this.validateUserName() && !this.validateUserEmail() && !this.validateUserPassword()) {
                return
            }

            const response = await client.query({ query: gql`{
                signUpUser(name: ${this.user.name}, email: ${this.user.email}, password: ${this.user.password}) {
                    token
                }
            }`})
            const token = response.data.token;

            if (!token) {
                return false
            }

            await saveTokenInLocalStorage(token)
            return true
        },
        saveTokenInLocalStorage: ({ token }) => {
            localStorage.setItem("user", token)
        },
        validateUserName() {
            if (this.user.name.length < 3) {
                isNameAlert = true
                return false
            }

            isNameAlert = false
            return true
        },
        validateUserEmail() {
            const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (this.user.email.length < 3 || !regexEmail.test(String(this.user.email).toLowerCase())) {
                isEmailAlert = true
                return false
            }

            isEmailAlert = false
            return true
        },
        validateUserPassword() {
            if (this.user.password.length < 3) {
                isPasswordAlert = true
                return false
            }

            isPasswordAlert = false
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