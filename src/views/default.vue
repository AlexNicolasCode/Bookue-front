<template>
    <div class="loading">
        kdakdsa
    </div>
</template>

<script>
import router from "../router";
import "../styles/colors.css"
import "../styles/reset.css"

export default {
    name: "Default",
    mounted() {
        console.log(localStorage.getItem("user") ? true : false)
        // if (this.isLogin()) {
        //     router.push({ path: "/home" });
        //     return
        // }

        router.push({ path: "/login" });
    },
    methods: {
        isLogin: () => {
            return localStorage.getItem("user") ? true : false
        }
    }
}
</script>

<style scoped>
.loading {

}
</style>