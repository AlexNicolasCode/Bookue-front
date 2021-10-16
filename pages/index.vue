<template>
    <div class="home">
        <Header :isLogged="true" :isBorder="true" :isHome="true" title="Sign up"/>
        <ul class="home__list">
            <Book v-for="item in list" />
        </ul>
    </div>
</template>

<script>
import "../styles/colors.css"
import "../styles/reset.css"

export default {
    data() {
        return {
            list: ["dkadksa", "dksakdsa", "kdkasdksa", "kdaskda", "kdskdsa"]
        }
    }    
}
</script>

<style scoped>
.home {

}

.home__list {
    margin-top: 32px;
}
</style>