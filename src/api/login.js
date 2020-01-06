export function login(username, password) {
  return this.$axios.post(
    'api/api/login/login',
    {
      name: username,
      password: password
    }
  )
}
export function loginByToken(tokenId) {
  return this.$axios.post(
    'api/api/login/loginByToken',
    response => {
      // eslint-disable-next-line eqeqeq
      if (response.code == '200') {
        this.$store.commit('setToken', response.data.token)
        this.$store.commit('setName', response.data.name)
        this.$store.commit('setJurisdiction', response.data.jurisdiction)
        this.$router.push({ path: '/home' })
      } else {
        this.$router.push({ path: '/login' })
      }
    }
  )
}

export function logout() {
  return this.$axios.post(
    'api/api/login/loginOut',
    response => {

    }
  )
}

export function getServerTime() {
  return this.$axios.get(
    'api/api/date',
    response => {

    }
  )
}

export function getUserInfo() {
  return this.$axios.get(
    'api/api/user/info',
    response => {

    }
  )
}

export function getRoutes() {
  return this.$axios.get(
    'api/api/user/router',
    response => {

    }
  )
}
