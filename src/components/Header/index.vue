<template>
    <header>
        <LoginAndRegisterButton v-if="!isLogged" :border="isBorder" :title="title" :isHeader="true"/>
        <div v-if="isLogged" class="home">
            <button v-if="!isHome" class="home__back-button">
                <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.95313 9.28L0.133125 4.68L4.95313 0.0999994H7.25313L2.41313 4.68L7.25313 9.28H4.95313Z" fill="#04B2D9"/>
                </svg>
            </button>
            <BrandName />
            <svg v-if="isHome" class="home__addTask" width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="8" x2="16" y2="8" stroke="#04B2D9" stroke-width="2"/>
                <line x1="8" y1="16" x2="8" stroke="#04B2D9" stroke-width="2"/>
            </svg>
        </div>
    </header>
</template>

<script>
import LoginAndRegisterButton from "../LoginAndRegisterButton/index.vue";
import BrandName from "../BrandName/index.vue";
export default {
    name: "Header",
    components: {
        LoginAndRegisterButton,
        BrandName
    },
    props: ["isBorder", "isLogged", "title", "isHome"]
}
</script>

<style>
.home__title {
    display: flex;
    width: 100%;
}

.home__back-button {
    background: none;
    border: none;
    position: absolute;
    top: 20px;
    left: 20px;
}

.home__addTask {
    position: absolute;
    top: 20px;
    right: 20px;
}
</style>