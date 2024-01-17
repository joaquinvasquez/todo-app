import { UserModel } from '../models/local/user.js'

export class UserController {
  static createUser = async (req, res, next) => {
    try {
      const newUser = await UserModel.createUser()
      res.status(201).json(newUser)
    } catch (err) {
      next(err)
    }
  }
}
