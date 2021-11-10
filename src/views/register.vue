<template>
    <div>
        <Header :isLogged="false" :isBorder="true" title="Sign In"/>
        <UserForm :isRegisterForm="true" title="Sign Up"/>
    </div>
</template>

<script>
import "../styles/colors.css"
import "../styles/reset.css"
import Header from "../components/Header/index.vue"
import UserForm from "../components/UserForm/index.vue"

export default {
    name: 'Register',
    components: {
        Header,
        UserForm
    },
    beforeMount() {
        this.setHeadTitle()
    },
    methods: {
        setHeadTitle() {
            document.title = "Register - Bookue"
        }
    }
}
</script>
