<template>
    <div class="home">
        <Header :isLogged="true" :isBorder="true" :isHome="true" title="Sign up"/>
        <ul class="home__list">
            <Book v-for="(item, index) in list" :key="index"/>
        </ul>
    </div>
</template>

<script>
import "../styles/colors.css"
import "../styles/reset.css"

export default {
    mounted() {
        if (!this.isLogin()) {
            this.$router.push("/login");
        }
    },
    methods: {
        isLogin: () => {
            return localStorage.getItem("user") ? true : false
        },
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