<template>
    <header>
        test
        <div v-if="isLoggedUser">
            <router-link to="/">
                <button class="header__back-button"></button>
            </router-link>

            <router-link to="/add-book">
                add-book
            </router-link>
        </div>
    </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: ['isLoggedUser'],
};
</script>
