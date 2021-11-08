<template>
    <li class="book">
        <article class="book__content">
            <div class="book__apresentation">
                <h2 class="book__title">{{ book.title }}</h2>
                <h3 class="book__author">{{ book.author }}</h3>
                <p class="book__pages">{{ book.currentPage }}/{{ book.pages }}</p>
            </div>

            <div class="book__description">
                <p class="book__text">{{ book.description }}</p>
            </div>

            <div class="book__options">
                <router-link :to="notesPage"><button class="book__btn book__notes">Notes</button></router-link>
                <router-link :to="detailsPage"><button class="book__btn book__details">Details</button></router-link>
            </div>
        </article>
    </li>
</template>

<script>
export default {
	name: "UserForm",
	props:  ["book"],
    data() {
        return {
            detailsPage: `/book?bookId=${this.book.id}`,
            notesPage: `/book/notes?title=${this.book.title}&bookID=${this.book.id}`
        }
    }
}
</script>

<style>
.book {
    display: flex;
    justify-content: center;
    height: 160px;
}

.book__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 357px;
    height: 139px;
}

.book__apresentation {
    display: flex;
    justify-content: space-between;
}

.book__title {
    font-weight: 700;
}

.book__pages {

}

.book__description {

}

.book__text {
    color: var(--placeholder-color);
    text-align: justify;
}

.book__options {
    display: flex;
    width: 150px;
    height: 40px;
}

.book__btn {
    width: 80px;
    height: 40px;
    border-radius: 2.5px;
    border: none;
    outline: none;
}

.book__notes {
    background: var(--primary-color);
    color: var(--white-color);
}

.book__details {
    border: none;
    background: none;
    color: var(--primary-color);
}
</style>
