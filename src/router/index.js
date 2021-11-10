import { createRouter, createWebHistory } from 'vue-router'
import Default from '../views/default.vue'
import Home from '../views/home.vue'
import Login from '../views/login.vue'
import Register from '../views/Register.vue'
import AddBook from '../views/add-book.vue'
import Book from '../views/book.vue'
import Notes from '../views/notes.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'default',
      component: Default
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/add-book',
      name: 'AddBook',
      component: AddBook
    },
    {
      path: '/book',
      name: 'Book',
      component: Book
    },
    {
      path: '/book/notes',
      name: 'Notes',
      component: Notes
    },
  ]
})

export default router