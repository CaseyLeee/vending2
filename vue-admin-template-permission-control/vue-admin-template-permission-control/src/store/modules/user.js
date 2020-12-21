import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      let formData = new FormData()
      formData.append('account', username.trim())
      formData.append('password', password)

      login(formData).then(response => {
        const { data, message } = response
        commit('SET_TOKEN', message)

        commit('SET_ROLES', data.type)
        commit('SET_NAME', data.name)
        setToken(message)
        setRoles(data.type)
        setName(data.name)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {

      // const { data } = response

      // if (!data) {
      //   reject('Verification failed, please Login again.')
      // }

      // const { roles, name, avatar } = data

      // roles must be a non-empty array
      // if (!roles || roles.length <= 0) {
      //   reject('getInfo: roles must be a non-null array!')
      // }
      let roles = []

      if (state.roles == "1") {

        roles.push("admin")

      }
      else if (state.roles == "0"){
        roles.push("normal")
      }

      commit('SET_ROLES', roles)
      // commit('SET_NAME', name)
      // commit('SET_AVATAR', avatar)
      resolve({ "roles": roles })
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      // removeToken() // must remove  token  first
      // resetRouter()
      // commit('RESET_STATE')

      // resolve()
      // }).catch(error => {
      //   reject(error)
      // })

      const promise = Promise.resolve()
      promise.then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')

        resolve()
      })

      return promise

    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

