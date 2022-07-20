<template>
    <header>
        <div v-if="isLoggedUser">
            <router-link to="/">
                <button class="header__back-button"></button>
            </router-link>
        </div>

        <section v-if="isLoggedUser && isHomePage">
            <div class="header__logo">
                logo
            </div>
        </section>
    </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: ['isLoggedUser', 'isHomePage'],
};
</script>
