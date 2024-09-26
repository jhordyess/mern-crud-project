import BaseRouter from './base.routes'
import UserCtrl from '../controllers/user.controller'

export default BaseRouter([
  { method: 'POST', path: '/register', func: new UserCtrl().register },
  { method: 'POST', path: '/login', func: new UserCtrl().login }
])
