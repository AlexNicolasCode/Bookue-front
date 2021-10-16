<template>
    <div class="container">
        <BrandName class="container__title" />
        <form @submit="sendData" class="form">
            <input class="form__item" @change="user.name" v-if="isRegister" name="name" placeholder="name" />
            <input class="form__item" @change="user.email" name="email" placeholder="email" />
            <input class="form__item" @change="user.password" name="password" placeholder="password" />
            <LoginAndRegisterButton class="form__btn" :border="false" :title="title" :isHeader="false"/>
        </form>
    </div>
</template>

<script>
export default {
    props: ["isRegister", "title"],
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: ""
            }
        }
    },
    methods: {
        sendData() {
            if (this.isRegister) {
                console.log("register");
                return
            }

            console.log("login")
        },
    }
}
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container__title {
    margin-bottom: 16px;
}

.form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.form__item {
    margin: 4px;
    border: none;
    border-radius: 2.5px;
    width: 268px;
    height: 50px;
    background: var(--gray-color);
}

.form__btn {
    margin-top: 8px;
}

.form__item::placeholder {
    padding-left: 8px;
    color: var(--placeholder-color);
}
</style>