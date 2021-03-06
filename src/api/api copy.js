import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "398d65df-f6f7-4c97-bcae-4a9af02f64f4"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },

    followUser(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },

    unfollowUser(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data;
            });
    },
    getStatus(userId) {
       return instance.get(`profile/status/${userId}`)
          .then(response => {
             return response.data;
          })
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, {status: status})
            .then(response => {
                return response.data;
            })
    },
    savePhoto(file) {
       const formData = new FormData()
       formData.append('image', file)
      return instance.put(`profile/photo/`, formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      })
          .then(response => {
              return response.data;
          })
  },
  saveProfile(profile) {
     return instance.put(`profile/`, profile)
  }
}

export const authAPI = {
   checkAuth() {
      return instance.get(`auth/me`)
         .then(response => {
            return response.data;
         });
   },
   login(email, password, rememberMe = false, captcha) {
      return instance.post(`auth/login`, {email, password, rememberMe, captcha})
         .then(response => {
            return response.data;
         });
   },
   logout() {
      return instance.delete(`auth/login`)
         .then(response => {
            return response.data;
         });
   }
}

export const securityAPI = {
   getCaptchaUrl() {
      return instance.get(`security/get-captcha-url`)
         .then(response => {
            return response.data;
         });
   }
}