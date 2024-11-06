import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import type { FC, ReactNode } from 'react'

const URI = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:3000/graphql'

const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache()
})

export const MyApolloProvider: FC<{
  children: ReactNode
}> = ({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>
