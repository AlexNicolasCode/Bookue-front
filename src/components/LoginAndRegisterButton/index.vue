<template>
    <button @click="submitForm" :class="Btn">{{ title }}</button>    
</template>

<style>
.aligns {
    position: absolute;
    top: 16px;
    right: 16px
}

.btn {
    font-size: 20px;
    width: 125px;
    height: 50px;
    border-radius: 2.5px;
    outline: none;
}

.default-btn {
    background: var(--primary-color);
    color: var(--white-color);
    border: none;
}

.default-btn:hover {
    background: none;
    border: 2.5px solid var(--primary-color);
    color: var(--primary-color);
    transition: 0.2s;
}

.btn-with-border {
    background: none;
    border: 2.5px solid var(--primary-color);
    color: var(--primary-color);
}

.btn-with-border:hover {
    background: var(--primary-color);
    color: var(--white-color);
    transition: 0.2s;
}
</style>

<script>

export default {
    props: ["title", "border", "right", "isHeader"],
    data() {
        return {
            Btn: {
                "aligns": this.isHeader,
                "btn": true,
                "default-btn": !this.border,
                "btn-with-border": this.border,
            }
        }
    },
}
</script>