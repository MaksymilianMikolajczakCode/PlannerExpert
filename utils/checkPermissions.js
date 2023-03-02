import UnauthenticatedError from '../errors/unAuth.js'

const checkPermissions = (requestUser, resourceUserId) => {
    // if (requestUser.role === 'admin') return
    const ids = resourceUserId.map((item) => { return (item.toString())})
    if (ids.includes(requestUser.userId)) return
    throw new UnauthenticatedError('Not authorized to access this route')
  }
  

  export default checkPermissions