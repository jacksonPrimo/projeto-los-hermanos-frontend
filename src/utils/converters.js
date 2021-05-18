const parseJwt = token => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayLoad = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c=>{
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
      )
    return JSON.parse(jsonPayLoad)
}
module.exports = { parseJwt }