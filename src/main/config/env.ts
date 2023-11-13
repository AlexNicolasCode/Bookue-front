export default {
  BOOKUE_API_URL: process.env.NEXT_PUBLIC_BOOKUE_API_URL ?? 'http://localhost:8000/graphql/',
  SCREEN: {
    DETAILS: process.env.NEXT_PUBLIC_DETAILS_SCREEN === 'enable' ? true : false,
    NOTES: process.env.NEXT_PUBLIC_NOTES_SCREEN === 'enable' ? true : false,
    ADD_BOOK: process.env.NEXT_PUBLIC_ADD_BOOK_SCREEN === 'enable' ? true : false,
    HOME: process.env.NEXT_PUBLIC_HOME_SCREEN === 'enable' ? true : false,
    SIGN_UP: process.env.NEXT_PUBLIC_SIGN_UP_SCREEN === 'enable' ? true : false,
    SIGN_IN: process.env.NEXT_PUBLIC_SIGN_IN_SCREEN === 'enable' ? true : false,
  }
}
