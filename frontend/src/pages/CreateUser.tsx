import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
      email
      role
      active
      createdAt
    }
  }
`

const CreateUserPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'USER'
  })
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createUser({ variables: { input: formData } })
  }

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <select name="role" value={formData.role} onChange={handleSelectChange}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button type="submit">Create User</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <p>ID: {data.createUser.id}</p>
          <p>Username: {data.createUser.username}</p>
          <p>Email: {data.createUser.email}</p>
          <p>Role: {data.createUser.role}</p>
          <p>Active: {data.createUser.active ? 'Yes' : 'No'}</p>
          <p>Created At: {data.createUser.createdAt}</p>
        </div>
      )}
    </div>
  )
}

export default CreateUserPage
