import Project from '../models/Project.js'
import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../errors/badRequest.js'
import NotFoundError from '../errors/notFound.js'
import checkPermissions from '../utils/checkPermissions.js'
const createProject = async (req, res) => {
  const { projectTitle, description } = req.body

  if (!projectTitle || !description) {
    throw new BadRequestError('Please Provide All Values')
  }

  req.body.owner = req.user.userId

  const project = await Project.create(req.body)
  res.status(StatusCodes.CREATED).json({ project })
}

const getAllProjects = async (req, res) => {
  const {sort, search} = req.query

  const queryObject = { owner : req.user.userId}
  if (search) {
    queryObject.projectTitle = { $regex: search, $options: 'i' }
  }

  let result = Project.find(queryObject)

  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('projectTitle')
  }
  if (sort === 'z-a') {
    result = result.sort('-projectTitle')
  }

  const projects = await result
  // const projects = await Project.find({ owner: req.user.userId })
  const totalProjects = await Project.countDocuments(queryObject)
  res.status(StatusCodes.OK).json({ projects, totalProjects })
}

const getProject = async (req,res) => {
  const {id: projectId } = req.params
  const project = await Project.findOne({_id : projectId}).populate('owner', 'username')
  const ids = project.owner.map((item) => { return (item._id)})
  checkPermissions(req.user, ids)
  res.status(StatusCodes.OK).json({ project })
}

const updateProject = async (req, res) => {
  const { id } = req.params
  const { projectTitle, description } = req.body

  if (!projectTitle || !description) {
    throw new BadRequestError('Please provide all values')
  }
  const project = await Project.findOne({ _id: id })

  if (!project) {
    throw new NotFoundError(`No job with id :${id}`)
  }
  // check permissions

  checkPermissions(req.user, project.owner)

  const updatedProject = await Project.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updatedProject })
}

const deleteProject = async (req, res) => {
  const { id } = req.params
  const project = await Project.findOne({ _id: id })

  if (!project) {
    throw new CustomError.NotFoundError(`No project with id : ${id}`)
  }

  checkPermissions(req.user, project.owner)

  await project.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! Project removed' })
}

const createTask = async (req,res) => {
  const { id} = req.params
  const { taskTitle} = req.body

  if (!taskTitle) {
    throw new BadRequestError('Please provide all values')
  }
  if(taskTitle > 50) {
    throw new BadRequestError('Name too long')
  }
  const project = await Project.findOne({ _id: id })

  if (!project) {
    throw new NotFoundError(`No job with id :${id}`)
  }

  checkPermissions(req.user, project.owner)
  const updatedProject = await Project.findByIdAndUpdate({ _id: id}, {$push: {task: req.body}}, {
      new: true,
      runValidators: true,
  })
  res.status(StatusCodes.OK).json({ updatedProject })
}

const updateTask = async (req, res) => {
  const { id } = req.params
  const { taskId, taskData } = req.body

  if (!taskData.taskTitle || !taskData.status || !taskData.person || !taskData.date) {
    throw new BadRequestError('Please provide all values')
  }
  const project = await Project.findOne({ _id: id })

  if (!project) {
    throw new NotFoundError(`No job with id :${id}`)
  }
  // check permissions

  checkPermissions(req.user, project.owner)

  const updateTask = project.task.id(taskId)
  updateTask.taskTitle = taskData.taskTitle
  updateTask.status = taskData.status
  updateTask.person = taskData.person
  updateTask.date = taskData.date
  const updatedTask = await project.save()
  res.status(StatusCodes.OK).json({ updatedTask })
}

const addUser = async (req, res) => {
  const { id } = req.params
  const { newUser } = req.body

  if (!newUser) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({username: newUser})
  if (!user) {
    throw new NotFoundError(`No user with username :${newUser}`)
  }
  const project = await Project.findOne({ _id: id })
  const alreadyInvited = await Project.findOne({owner: user._id, _id:id})
  if (!project) {
    throw new NotFoundError(`No project with id :${id}`)
  }
 if (alreadyInvited) {
   throw new BadRequestError('User already invited!')
 }
  // check permissions

  checkPermissions(req.user, project.owner)
  const updatedProject = await Project.findOneAndUpdate({ _id: id }, {$push: {owner: user._id}}, {new: true})

  res.status(StatusCodes.OK).json({ updatedProject })
}


export { createProject, getAllProjects, getProject, updateProject, deleteProject, createTask, updateTask, addUser}