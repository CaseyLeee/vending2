import Cookies from 'js-cookie'

const TokenKey = 'vending_token'
const RolesKey = 'vending_roles'
const NameKey = 'vending_name'
const UserKey = 'vending_user'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}



export function getRoles() {
  return Cookies.get(RolesKey)
}

export function setRoles(roles) {
  return Cookies.set(RolesKey, roles)
}

export function removeRoles() {
  return Cookies.remove(RolesKey)
}

export function getName() {
  return Cookies.get(NameKey)
}

export function setName(name) {
  return Cookies.set(NameKey, name)
}

export function removeName() {
  return Cookies.remove(NameKey)
}
export function setUserinfo(user) {
  return Cookies.set(UserKey, user)
}
export function getUserinfo() {
  return Cookies.get(UserKey)
}
export function removeUserinfo() {
  return Cookies.remove(UserKey)
}


