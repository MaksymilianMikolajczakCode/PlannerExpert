import { DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN, 
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_ERROR,
  LOGIN_USER_BEGIN, 
  LOGIN_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CREATE_PROJECT_BEGIN,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
  CLEAR_VALUES,
  GET_PROJECTS_BEGIN,
  GET_PROJECTS_SUCCESS,
  GET_PROJECT_BEGIN,
  GET_PROJECT_BEGIN_NO_LOADING,
  GET_PROJECT_SUCCESS,
  EDIT_PROJECT_BEGIN,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_ERROR,
  DELETE_PROJECT_BEGIN,
  DELETE_PROJECT_SUCCESS,
  CREATE_TASK_BEGIN,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  EDIT_TASK_BEGIN,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  ADD_USER_BEGIN,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  CLEAR_FILTERS,
 } from "./actions"
import { initialState } from './appContext'


const reducer = (state, action) => {
    if(action.type === DISPLAY_ALERT){
        return{ ...state,
            showAlert:true, 
            alertType:'danger', 
            alertText: action.payload.text
        }
    }
    if (action.type === CLEAR_ALERT) {
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      }
    }
    if (action.type === REGISTER_USER_BEGIN) {
        return { ...state, isLoading: true }
      }
      if (action.type === REGISTER_USER_SUCCESS) {
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          isLoading: false,
          showAlert: true,
          alertType: 'success',
          alertText: 'User Created! Redirecting...',
        }
      }
      if (action.type === REGISTER_USER_ERROR) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        }
    }

    if (action.type === LOGIN_USER_BEGIN) {
      return {
        ...state,
        isLoading: true,
      }
    }
    if (action.type === LOGIN_USER_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        showAlert: true,
        alertType: 'success',
        alertText: 'Login Successful! Redirecting...',
      }
    }
    if (action.type === LOGIN_USER_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }

    if (action.type === LOGOUT_USER) {
      return {
        ...initialState,
        user: null,
        token: null,
      }
    }

    if (action.type === TOGGLE_SIDEBAR) {
      return { ...state, showSidebar: !state.showSidebar }
    }

    if (action.type === UPDATE_USER_BEGIN) {
      return { ...state, isLoading: true }
    }
    
    if (action.type === UPDATE_USER_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        token:action.payload.token,
        user: action.payload.user,
        showAlert: true,
        alertType: 'success',
        alertText: 'User Profile Updated!',
      }
    }
    if (action.type === UPDATE_USER_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }
    if (action.type === HANDLE_CHANGE) {
      return { ...state, [action.payload.name]: action.payload.value }
    }
    if (action.type === CREATE_PROJECT_BEGIN) {
      return { ...state, isLoading: true }
    }
    if (action.type === CREATE_PROJECT_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'New Project Created!',
      }
    }
    if (action.type === CREATE_PROJECT_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }
    if (action.type === CLEAR_VALUES) {
      const initialState = {
        projectTitle: '',
        description: '',
        taskTitle: ''
      }
      return { ...state, ...initialState }
    }
    if (action.type === GET_PROJECTS_BEGIN) {
      return { ...state, isLoading2: true, showAlert: false }
    }
    if (action.type === GET_PROJECTS_SUCCESS) {
      return {
        ...state,
        isLoading2: false,
        projects: action.payload.projects,
        totalProjects: action.payload.totalProjects
      }
    }
    if (action.type === GET_PROJECT_BEGIN) {
      return { ...state, isLoading: true, showAlert: false }
    }
    if (action.type === GET_PROJECT_BEGIN_NO_LOADING) {
      return { ...state, isLoading: false, showAlert: false }
    }
    if (action.type === GET_PROJECT_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        project: action.payload.project,
        projectTitle: action.payload.project.projectTitle,
        description: action.payload.project.description
      }
    }
    if (action.type === EDIT_PROJECT_BEGIN) {
      return {
        ...state,
        isLoading: true,
      }
    }
    if (action.type === EDIT_PROJECT_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Project Updated!',
      }
    }
    if (action.type === EDIT_PROJECT_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }
    if (action.type === DELETE_PROJECT_BEGIN) {
      return { ...state}
    }
    if (action.type === DELETE_PROJECT_SUCCESS) {
      return { ...state, showAlert: true, alertType: 'success', alertText: 'Project Deleted!'}
    }
    if (action.type === CREATE_TASK_BEGIN) {
      return { ...state, isLoading3: true }
    }
    if (action.type === CREATE_TASK_SUCCESS) {
      return {
        ...state,
        isLoading3: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'New Task Created!',
      }
    }
    if (action.type === CREATE_TASK_ERROR) {
      return {
        ...state,
        isLoading3: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }
    if (action.type === EDIT_TASK_BEGIN) {
      return {
        ...state,
        isLoading3: true,
      }
    }
    if (action.type === EDIT_TASK_SUCCESS) {
      return {
        ...state,
        isLoading3: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Task Updated!',
      }
    }
    if (action.type === EDIT_TASK_ERROR) {
      return {
        ...state,
        isLoading3: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }
    if (action.type === ADD_USER_BEGIN) {
      return {
        ...state,
        isLoading3: true,
      }
    }
    if (action.type === ADD_USER_SUCCESS) {
      return {
        ...state,
        isLoading3: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Added new user!',
      }
    }
    if (action.type === ADD_USER_ERROR) {
      return {
        ...state,
        isLoading3: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }
    if (action.type === CLEAR_FILTERS) {
      return {
        ...state,
        search: '',
        sort: 'latest',
      }
    }
  throw new Error(`no such action :${action.type}`)
}
export default reducer