import React, { useEffect, useState } from 'react'
import logo from "../assets/images/logo.png";
import SearchBox from './SearchBox';
import ButtonMain from './Buttons/ButtonMain';
import Avatar from '@mui/material/Avatar';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UserMenuCard from './settings/UserMenuCard';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../main';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/userReducer';
import { newRequest } from '../utils/createRequest';

const Header: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.value);
  const [search, setSearch] = useState<string>("");

  const validateUser = async (id: string, token: string) => {
    const res = await newRequest.post("/api/user/user/validate", {
      _id: id, token: token
    });

    return res.data;
  }

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      dispatch(logout());
    } else {
      const userData = {
        ...JSON.parse(localStorage.getItem("currentUser") || "")
      }

      if (userData._id) {
        validateUser(userData._id, userData.token).then(() => {
          dispatch(login(userData));
        }).catch((e) => {
          console.log(e);
          alert("logged out user");
          localStorage.removeItem("currentUser");
        });
      } else {
        alert("logged out user");
        dispatch(logout());
        localStorage.removeItem("currentUser");
      }
    }
  }, [])


  const searchHandler = (): void => {
    if (search.length > 0) {
      navigate(`/search/${search}`);
      setSearch("");
    } else {
      console.log("empty seach box");
    }
  }

  return (
    <div className='w-[100vw] h-[3.8rem] bg-white flex items-center border-b-[1px] border-[#C9C9C9] justify-between px-5'>
      <div className='flex justify-center items-center gap-4'>
        <Link to={'/'}><img src={logo} className='w-[24px]' /></Link>
        <SearchBox value={search} setValue={setSearch} OnSearchHandler={searchHandler} />
      </div>
      {!user.loggedIn ? <SignInBar /> : <LoggedInUserBar />}
    </div>
  )
}



const SignInBar = () => {
  return (
    <div className='flex items-center gap-4'>
      <Link to={"/login"}><span className='text-[.6rem]'>Sign In</span></Link>
      <Link to={"/create-account"}><ButtonMain /></Link>
    </div>
  )
}

const LoggedInUserBar = () => {

  const user = useSelector((state: RootState) => state.user.value);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className='flex items-center gap-5'>
      <Link to={"/create-new-post"}>
        <div className='flex items-center justify-between gap-1'>
          <DriveFileRenameOutlineIcon sx={{ width: "2.4rem" }} />
          <span className='text-[.92rem]'>Write</span>
        </div>
      </Link>

      <div className='relative cursor-pointer'>
        <div onClick={() => setShowMenu(!showMenu)} className='flex items-center justify-between gap-1' >
          <Avatar alt="Travis Howard" src={user.icon} sx={{ width: "2.4rem", height: "2.4rem" }} />
          <KeyboardArrowDownIcon />
        </div>
        <div className='absolute right-[13rem] top-[3.2rem]'>
          {showMenu && <UserMenuCard />}
        </div>
      </div>
    </div>
  )
}


export default Header