import express from 'express'
const router = express.Router()
import {createProject, getAllProjects, getProject, updateProject, deleteProject, createTask, updateTask, addUser} from '../controllers/projectsController.js'

router.route('/').post(createProject).get(getAllProjects)
router.route('/:id').get(getProject).patch(updateProject).delete(deleteProject).post(createTask)
router.route('/:id/taskUpdate').patch(updateTask)
router.route('/:id/addUser').patch(addUser)
export default router