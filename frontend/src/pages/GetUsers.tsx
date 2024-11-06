import { useQuery, gql } from '@apollo/client'

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      username
      email
      role
      active
      createdAt
    }
  }
`

const GetUsersPage: React.FC = () => {
  const { data, loading, error } = useQuery(GET_USERS)

  return (
    <div>
      <h1>Get Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.getUsers.map((user: any) => (
            <li key={user.id}>
              <p>ID: {user.id}</p>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <p>Active: {user.active ? 'Yes' : 'No'}</p>
              <p>Created At: {user.createdAt}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default GetUsersPage
