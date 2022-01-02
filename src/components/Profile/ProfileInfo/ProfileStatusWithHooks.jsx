import React, { useEffect, useState } from 'react';
import Button from '../../Common/Button/Button';
import s from './ProfileStatus.module.css';

const ProfileStatusWithHooks = (props) => {
   let [editMode, setEditMode] = useState(false)
   let [status, setStatus] = useState(props.status)

   const activateEditMode = () => {
      if (props.isOwner) {
         setEditMode(true)
      }
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
               {props.isOwner && <div className={s.profile__user_status__popup}>Double click to edit status</div>}
            </div>
         }
         {editMode &&
            <div className={s.profile__user_status}>
               <input onChange={onStatusChange}
                  autoFocus={true}
                  value={status}>
               </input>
               <div className={s.profile__user_status_btns}>
                  <Button action={sumbitNewStatus} text='Update status' />
                  <Button action={cancelEditStatus} type='danger' text='Cancel' />
               </div>
            </div>
         }
      </div>
   )
}

export default ProfileStatusWithHooks;