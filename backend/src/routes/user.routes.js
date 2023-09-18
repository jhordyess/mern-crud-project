import BaseRouter from './base.routes.js'
import UserCtrl from '../controllers/user.controller.js'

export default BaseRouter([
  { method: 'POST', path: '/register', func: new UserCtrl().register },
  { method: 'POST', path: '/login', func: new UserCtrl().login }
])
