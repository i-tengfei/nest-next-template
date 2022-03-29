import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { initializeApollo } from 'src/client/apollo/client'
import Hello from '../src/client/queries/hello.gql'
import styles from './index.module.css'

const Index: NextPage = () => {
  const { data } = useQuery(Hello)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Nest + Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js</a> +{' '}
          <a href="https://nestjs.com">Nest.js</a>!
        </h1>

        <p className={styles.description}>
          <code className={styles.code}>Hello {data.hello.Hello}</code>
        </p>

        <div className={styles.grid}>
          <a href="https://docs.nestjs.com" className={styles.card}>
            <h2>Nest.js Documentation &rarr;</h2>
            <p>Find in-depth information about Nest.js features and API.</p>
          </a>

          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Next.js Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        Powered by{' '}
        <a href="https://nestjs.com" target="_blank" rel="noopener noreferrer">
          <span className={styles.logo}>
            <Image src="/nest.svg" alt="Nest.js Logo" width={16} height={16} />
          </span>
        </a>
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          <span className={styles.logo}>
            <Image src="/next.svg" alt="Next.js Logo" width={16} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Index

export async function getServerSideProps() {
  const client = initializeApollo()
  await client.query({ query: Hello })

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
  }
}
