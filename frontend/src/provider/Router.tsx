import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/layout'
import { CreateUserPage, GetUsersPage, GetUserPage, LoginPage } from '@/pages'

export const RouterMain = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/get-users" element={<GetUsersPage />} />
        <Route path="/get-user" element={<GetUserPage />} />
        <Route path="/create-user" element={<CreateUserPage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
)
