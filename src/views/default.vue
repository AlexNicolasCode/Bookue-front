<template>
    <div class="loading" />
</template>

<script>
import router from "../router";
import "../styles/colors.css"
import "../styles/reset.css"

export default {
    name: "Default",
    mounted() {
        this.redirect()
    },
    methods: {
        redirect() {
            if (localStorage.getItem("user")) {
                router.push({ path: "/home" });
                return
            }

            router.push({ path: "/login" });
        },
    }
}
</script>

<style scoped>
.loading {

}
</style>