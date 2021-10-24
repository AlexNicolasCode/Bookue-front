<template>
    <div>
        <Header :isLogged="false" :isBorder="true" title="Sign up"/>
        <UserForm :isRegisterForm="false" title="Sign In"/>
    </div>
</template>

<script>
import UserForm from "../components/UserForm/index.vue"
import Header from "../components/Header/index.vue"
import "../styles/colors.css"
import "../styles/reset.css"

export default {
    name: 'login',
    components: {
        UserForm,
        Header
    },
    data() {
        return {

        }
    }
}
</script>
