import axios from 'axios';
import { DataPhotosType, PhotosType, ProfileType, UserType } from '../types/types';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "398d65df-f6f7-4c97-bcae-4a9af02f64f4"
    }
})

type GetUsersType = {
   items: UserType[]
   totalCount: number
   error: string | null
}

export const usersAPI = {
   getUsers(currentPage = 1, pageSize = 10) {
      return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
         .then(response => {
            return response.data;
         });
   },

   followUser(userId: number) {
      return instance.post<ResponseType>(`follow/${userId}`)
         .then(response => {
            return response.data;
         })
   },

   unfollowUser(userId: number) {
      return instance.delete<ResponseType>(`follow/${userId}`)
         .then(response => {
            return response.data;
         })
   }
}

export const profileAPI = {
   async getProfile(userId: number) {
      let response
      // try {
         response = await instance.get<ProfileType>(`profile/${userId ? userId : '18732'}`)
      // }
      // catch(e) {
         // return {}
      // }
      return response.data
   },
    getStatus(userId: number) {
       return instance.get<string>(`profile/status/${userId ? userId : '18732'}`)
          .then(response => {
             return response.data;
          })
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status/`, {status: status})
            .then(response => {
                return response.data;
            })
    },
    savePhoto(file: any) {
       const formData = new FormData()
       formData.append('image', file)
      return instance.put<ResponseType<DataPhotosType>>(`profile/photo/`, formData, {
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

type ResponseType<D = {}> = {
   data: D
   messages: Array<string>
   resultCode: number
}

type CheckAuthResponseDataType = {
   id: number
   email: string
   login: string
}
type LoginResponseDataType = {
   userId: number
}

export const authAPI = {
   checkAuth() {
      return instance.get<ResponseType<CheckAuthResponseDataType>>(`auth/me`)
         .then(response => {
            return response.data;
         });
   },
   login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
      return instance.post<ResponseType<LoginResponseDataType>>(`auth/login`, {email, password, rememberMe, captcha})
         .then(response => {
            return response.data;
         });
   },
   logout() {
      return instance.delete<ResponseType>(`auth/login`)
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