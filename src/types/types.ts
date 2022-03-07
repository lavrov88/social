export type PhotosType = {
   small: string | null
   large: string | null
}
export type DataPhotosType = {
   photos: PhotosType
}

export type UserType = {
   name: string
   id: number
   photos: PhotosType
   status: string | null
   followed: boolean
}

export type ProfileType = {
   userId: number
   lookingForAJob: boolean
   lookingForAJobDescription: string
   fullName: string
   contacts: ProfileContactsType
   photos: PhotosType
}

type ProfileContactsType = {
   github: string
   vk: string
   facebook: string
   instagram: string
   twitter: string
   website: string
   youtube: string
   mainLink: string
}

export type LinkType = {
   url: string
   name: string
   disabled?: boolean
}

export type NavUserType = {
   id: number
   name: string
   photos: PhotosType
}