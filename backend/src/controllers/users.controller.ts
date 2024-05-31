import { Request, Response } from "express";
import { emailValidator, numberValidator } from "../utils/validators";
interface IUser {
  email: string,
  number: string
}
const Users: IUser[] = [
  { email: 'jim@gmail.com', number: '221122' },
  { email: 'jam@gmail.com', number: '830347' },
  { email: 'john@gmail.com', number: '221122' },
  { email: 'jams@gmail.com', number: '349425' },
  { email: 'jams@gmail.com', number: '141424' },
  { email: 'jill@gmail.com', number: '822287' },
  { email: 'jill@gmail.com', number: '822286' }
]

export default class UsersController {

  async findAll(req: Request, res: Response) {
    setTimeout(()=>{
      try {
        const {email, number} = req.body
        const isEmailValid = emailValidator(email)
        const isNumberValid = numberValidator(number, 6)
        if(!isEmailValid){
          throw 'invalid email'
        }
        if(!isNumberValid){
          throw 'invalid number'
        }
        res.status(200).json(
          req.body.number === "" ?
          Users.filter(user => user.email === email)
          :
          Users.filter(user => user.email === email).filter(user => user.number === number)
        );
      } catch (err) {
        res.status(500).json({
          message: err
        });
      }
    }, 5000)
    
    
  }
}
