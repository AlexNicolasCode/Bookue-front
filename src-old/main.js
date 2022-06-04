import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApollo from 'vue-apollo'
import { apolloClient } from './services/Apollo/ApolloClient'

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

const app = createApp(App)

app.use(router, VueApollo, apolloProvider)
app.mount('#app')
