<template>
        <header v-if="isLoggedUser">
            <router-link to="/">
                <button class="header__back-button"></button>
            </router-link>

            <section v-if="isHomePage">
                <div class="header__logo">
                    logo
                </div>
            </section>
        </header>
        <header v-else>
            <div class="header__login-button">
                login
            </div>

            <div class="header__register-button">
                register
            </div>
        </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: ['isLoggedUser', 'isHomePage'],
};
</script>
