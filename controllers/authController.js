import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../errors/badRequest.js'
import UnauthenticatedError from '../errors/unAuth.js'
const register = async (req, res) => {
    const {username, email, password} = req.body

    if (!username || !email || !password)
    {throw new BadRequestError('please provide all values')}
    const userExists = await User.findOne({email})
    if (userExists) {
        throw new BadRequestError('Email already in use')
    }
    const user = await User.create({username, email ,password})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ 
        user:{
            email:user.email, 
            username:user.username, 
            project:user.project
        },
            token })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
      throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({ email }).select('+password')
  
    if (!user) {
      throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({ user, token })
  }

  const updateUser = async (req, res) => {
    const { email,  username} = req.body
    if (!email || !username) {
      throw new BadRequestError('Please provide all values')
    }
  
    const user = await User.findOne({ _id: req.user.userId })
  
    user.email = email
    user.username = username
  
    await user.save()
  
    // various setups
    // in this case only id
    // if other properties included, must re-generate
  
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
      user,
      token
    })
  }

export { register, login, updateUser}