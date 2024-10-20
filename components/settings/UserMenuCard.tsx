import React from 'react'
import "../../styles/common.css"
import { Link } from 'react-router-dom'
import { UserListItemProp } from '../../utils/typeDef'
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { newRequest } from '../../utils/createRequest';

const UserMenuCard: React.FC = () => {

  const logoutHandler = async () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    await newRequest.get("/api/auth/logout");
    window.location.reload();
  }

  return (
    <div id='shadow__one' className='absolute w-[13rem] h-[35vh] bg-white flex flex-col gap-3 px-5 pt-5'>
      <Item to={`/user/23232`} text='Profile' children={<Person3OutlinedIcon />} />
      <div className='w-[100%] opacity-[40%] hover:opacity-[100%] flex gap-2 h-[2.2rem]' onClick={logoutHandler}>
        <LockOutlinedIcon />
        <span className='text-[.9rem]'>Logout</span>
      </div>
    </div>
  )
}

const Item: React.FC<UserListItemProp> = ({ to, text, children }) => {
  return (
    <Link to={to}>
      <div className='w-[100%] opacity-[40%] hover:opacity-[100%] flex gap-2 h-[2.2rem]'>
        {children}
        <span className='text-[.9rem]'>{text}</span>
      </div>
    </Link>
  )
}

export default UserMenuCard