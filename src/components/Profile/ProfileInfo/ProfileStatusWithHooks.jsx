import React, { useEffect, useState } from 'react';
import s from './ProfileStatus.module.css';

const ProfileStatusWithHooks = (props) => {

   let [editMode, setEditMode] = useState(false)
   let [status, setStatus] = useState(props.statys)

   const activateEditMode = () => {
      setEditMode(true)
   }

   const cancelEditStatus = () => {
      setEditMode(false)
   }

   const sumbitNewStatus = () => {
      setEditMode(false)
      props.updateUserStatus(status)
   }

   const onStatusChange = (e) => {
      setStatus(e.target.value)
   }

   useEffect( () => {
      setStatus(props.status)
   }, [props.status])

   return (
      <div>
         {!editMode &&
            <div onDoubleClick={activateEditMode} className={s.profile__user_status}>
               <span>{props.status || '...'}</span>
            </div>
         }
         {editMode &&
            <div className={s.profile__user_status}>
               <input onChange={onStatusChange}
                  autoFocus={true}
                  value={status}>
               </input>
               <div className={s.profile__user_status_btns}>
                  <button onClick={sumbitNewStatus}>Update status</button>
                  <button onClick={cancelEditStatus}>Cancel</button>
               </div>
            </div>
         }
      </div>
   )
}

export default ProfileStatusWithHooks;