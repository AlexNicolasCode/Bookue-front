<template>
    <div class="add-book">
        <Header :isLogged="true" :isBorder="true" :isHome="false"/>
        <div class="add-book__content">
            <form class="add-book__form">
                <input class="add-book__item" type="text" name="title" placeholder="Title">
                <input class="add-book__item" type="text" name="author" placeholder="Author">
                <input class="add-book__item" type="text" name="pages" placeholder="Pages">
                <textarea class="add-book__item add-book__description" type="text" name="description" placeholder="Description" />
                <button class="add-book__btn">Next</button>
            </form>
        </div>
    </div>
</template>

<script>
import "../../styles/colors.css"
import "../../styles/reset.css"

export default {
    data() {
        return {
            list: ["dkadksa", "dksakdsa", "kdkasdksa", "kdaskda", "kdskdsa"]
        }
    }    
}
</script>

<style scoped>
.add-book {

}

.add-book__content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
}

.add-book__form {
    display: flex;
    flex-direction: column;
}

.add-book__item {
    margin: 4px 0px;
    border: none;
    border-radius: 2.5px;
    width: 350px;
    height: 50px;
    background: var(--gray-color);
    border-radius: 2.5;
}

.add-book__item::placeholder {
    color: var(--placeholder-color);
}

.add-book__description {
    resize: none;
    height: 168px;
    padding: 16px;
}
.add-book__btn {
    margin-left: auto;
    margin-top: 8px;
    font-size: 16px;
    width: 80px;
    height: 40px;
    background: var(--primary-color);
    color: var(--white-color);
    border: none;
}

.add-book__btn:hover {
    background: none;
    border: 2.5px solid var(--primary-color);
    color: var(--primary-color);
    transition: 0.2s;
}

</style>