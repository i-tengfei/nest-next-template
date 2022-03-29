import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { useApollo } from 'src/client/apollo/client'
import '../src/client/styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState)
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
