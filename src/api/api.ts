import axios from 'axios';
import { ProfileType } from '../types/types';

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

    followUser(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },

    unfollowUser(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    }
}

export const profileAPI = {
   async getProfile(userId: number) {
      let response
      try {
         response = await instance.get(`profile/${userId}`)
      }
      catch(e) {
         console.log(e);
         response = {}
      }
      return response.data;
   },
    getStatus(userId: number) {
       return instance.get(`profile/status/${userId}`)
          .then(response => {
             return response.data;
          })
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status})
            .then(response => {
                return response.data;
            })
    },
    savePhoto(file: any) {
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
  saveProfile(profile: ProfileType) {
     return instance.put(`profile/`, profile)
  }
}

type CheckAuthResponseType = {
   data: {
      id: number
      email: string
      login: string
   }
   resultCode: number
   messages: Array<string>
}
type LoginResponseType = {
   resultCode: number
   messages: Array<string>
   data: {
      userId: number
   }
}
type LogoutResponseType = {
   resultCode: number
    messages: Array<string>
    data: {}
}

export const authAPI = {
   checkAuth() {
      return instance.get<CheckAuthResponseType>(`auth/me`)
         .then(response => {
            return response.data;
         });
   },
   login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
      return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
         .then(response => {
            return response.data;
         });
   },
   logout() {
      return instance.delete<LogoutResponseType>(`auth/login`)
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