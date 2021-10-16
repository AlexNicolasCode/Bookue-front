<template>
    <div class="pages">
        <Header :isLogged="true" :isBorder="true" :isHome="false"/>
        <article class="pages__content">
            <p class="pages__text">
                If you still started this book, tell what’s the current page? Otherwise, 
                press <span style="color: var(--primary-color)">skip</span>
            </p>
            <form class="pages__form">
                <input type="number" class="pages__item" name="title" placeholder="Current page">
                <div class="pages__options">
                    <button class="pages__btn pages__save">Save</button>
                    <button class="pages__btn pages__skip">Skip</button>
                </div>
            </form>
        </article>
    </div>
</template>

<script>
import "../../../styles/colors.css";
import "../../../styles/reset.css";

export default {
    
}
</script>

<style>
.pages {

}

.pages__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90vh;
}

.pages__text {
    width: 249px;
    height: 72px;
    text-align: center; 
    font-size: 16px;   
}

.pages__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.pages__item {
    margin: 4px;
    border: none;
    border-radius: 2.5px;
    width: 358px;
    height: 50px;
    background: var(--gray-color);
    border-radius: 2.5;
}

.pages__item::placeholder {
    color: var(--placeholder-color);
}

.pages__btn {
    margin-top: 8px;
    font-size: 16px;
    width: 80px;
    height: 40px;
    background: var(--primary-color);
    color: var(--white-color);
    border: none;
    border-radius: 2.5px;
}


.pages__btn:hover {
    background: none;
    border: 2.5px solid var(--primary-color);
    color: var(--primary-color);
    transition: 0.2s;
}

.pages__skip {
    background: none;
    color: var(--primary-color);
}

</style>