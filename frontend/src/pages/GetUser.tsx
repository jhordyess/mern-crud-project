import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'

const GET_USER = gql`
  query GetUser($at: String!) {
    getUser(at: $at) {
      id
      username
      email
      role
      active
      createdAt
    }
  }
`

const GetUserPage: React.FC = () => {
  const [token, setToken] = useState('')
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { at: token },
    skip: !token
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value)
  }

  return (
    <div>
      <h1>Get User</h1>
      <input type="text" placeholder="Enter token" value={token} onChange={handleInputChange} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <p>ID: {data.getUser.id}</p>
          <p>Username: {data.getUser.username}</p>
          <p>Email: {data.getUser.email}</p>
          <p>Role: {data.getUser.role}</p>
          <p>Active: {data.getUser.active ? 'Yes' : 'No'}</p>
          <p>Created At: {data.getUser.createdAt}</p>
        </div>
      )}
    </div>
  )
}

export default GetUserPage
