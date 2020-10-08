import '../styles/globals.css'
import '@uiw/react-md-editor'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@material-ui/core'
import client from '../libs/client'
import theme from '../components/theme'

const MyApp = ({ Component, pageProps }) => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  })

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp
