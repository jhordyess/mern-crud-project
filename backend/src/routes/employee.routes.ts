import BaseRouter from './base.routes'
import EmployeeCtl from '../controllers/employee.controller'
import { checkToken } from '../middleware/auth'

export default BaseRouter([
  {
    method: 'GET',
    path: '/',
    mWare: checkToken,
    func: new EmployeeCtl().listAllEmployees
  },
  {
    method: 'POST',
    path: '/',
    mWare: checkToken,
    func: new EmployeeCtl().createEmployee
  },
  {
    method: 'PUT',
    path: '/update/:id',
    mWare: checkToken,

    func: new EmployeeCtl().updateEmployee
  },
  {
    method: 'DELETE',
    path: '/drop/:id',
    mWare: checkToken,
    func: new EmployeeCtl().dropEmployee
  },
  {
    method: 'GET',
    path: '/list/:id',
    mWare: checkToken,
    func: new EmployeeCtl().listByUserId
  },
  {
    method: 'GET',
    path: '/search/:name',
    mWare: checkToken,

    func: new EmployeeCtl().searchEmployee
  }
])
