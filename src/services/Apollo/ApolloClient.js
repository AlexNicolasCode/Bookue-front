import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context';
import Cookies from 'js-cookie';

const httpLink = createHttpLink({
  uri: new URL(import.meta.env.VITE_BOOKUE_API),
})

const token = Cookies.get("user")
const authLink = setContext((_, { headers }) => {
  return {
   headers: {
    ...headers,
    Authorization: token ?? '',
   },
  }
 })

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
})

