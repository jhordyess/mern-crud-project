import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

const Layout: FC<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/get-users">Get Users</Link>
          </li>
          <li>
            <Link to="/get-user">Get User</Link>
          </li>
          <li>
            <Link to="/create-user">Create User</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  )
}

export default Layout
