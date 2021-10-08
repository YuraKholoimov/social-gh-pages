import * as axios from 'axios'

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {"API-KEY" : "74a2af3c-45fa-4c81-b701-0275dea0591d"}
})
//-----------------------------------  USERS API
const usersApi = {
  getUsersApi(currentPage, pageSize) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },

  unFollow(userId) {return instance.delete(`follow/${userId}`)
        .then((response) => {
          return response.data;
    });
  },

  follow(userId) {return instance.post(`follow/${userId}`)
        .then((response) => {
        return response.data;
    });
  },

  profile(userId) {
    console.warn('getProfile is used')
    return profileAPI.getProfile(userId)
  }
};

//-----------------------------------  AUTH API
export const authAPI = {
  me() {
    return instance.get("auth/me")
    .then((response) => {
        return response.data
      }
    )
  },
  loginPost(email, password, rememberMe=false) {
    return instance.post('auth/login', {email,password,rememberMe})
  },
  logoutDelete() {
    return instance.delete(`auth/login`)
  }
}

//-----------------------------------  PROFILE API
export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`)
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`)
  },
  updateStatus(status) {
    return instance.put(`profile/status`, {status: status})
  }

}

export default usersApi


