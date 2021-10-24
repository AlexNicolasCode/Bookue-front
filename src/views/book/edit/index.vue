<template>
    <div class="book">
         <Header :isLogged="true" :isBorder="true" :isHome="false"/>
         <main class="book__content">
             <article>
                 <div class="book__head-content">
                    <h1 class="book__title">Sherlock Holmes</h1>
                    <div>
                        Progress
                        <span>66.6%</span>
                    </div>
                 </div>

                 <ul class="book__details">
                    <li v-for="item in list" class="book__item">
                        <label for="">{{ item.label }}</label>
                        <p>{{ item.name }}</p>
                        <button @change="() => editBook(item.label)">edit</button>
                    </li>
                 </ul>
             </article>
         </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list
        }
    }
}
</script>