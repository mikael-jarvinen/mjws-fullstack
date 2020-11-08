import '../styles/globals.css'
import { ThemeProvider } from '@material-ui/core'
import theme from '../components/theme'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  React.useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>M.J. Web&Software</title>
        <meta name='application-name'  content='M.J. Web&Software kotisivut'/>
        <meta name='author' content='M.J. Web&Software'/>
        <meta name='keywords' content='nettisivut, SEO, wordpress, SPA'/>
        <meta name='description' content='Räätälöidyt, hakukoneoptimoidut
          ja laadukkaat nettisivut edulliseen hintaa. Tuotan moderneja,
          responsiivisia sivustoja wordpressillä ja myös itse koodaten. Itse
          koodatut sivut tuotan React- tai Next.js teknologioilla'/>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
