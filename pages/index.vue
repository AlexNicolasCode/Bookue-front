<template>
    <div class="loading">
        
    </div>
</template>

<script>
import "../styles/colors.css"
import "../styles/reset.css"

export default {
    mounted() {
        if (this.isLogin()) {
            this.$router.push("/home");
            return
        }

        this.$router.push("/login");
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