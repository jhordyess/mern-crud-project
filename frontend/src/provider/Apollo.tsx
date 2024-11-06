import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import type { FC, ReactNode } from 'react'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
})

export const MyApolloProvider: FC<{
  children: ReactNode
}> = ({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>
