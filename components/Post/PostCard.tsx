import React from 'react'
import { PostCardType } from '../../utils/typeDef'
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { trimText } from '../../utils/utils';

const PostCard: React.FC<PostCardType> = ({ title, author, cover, date, likes, summary, authorProfile }) => {

  return (
    <div className='w-[100%] flex flex-col gap-2 cursor-pointer h-[12rem] max-h-[20vh]'>
      <div className='flex justify-between'>
        <div className='w-[100%] flex gap-5 items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Avatar alt="Travis Howard" src={authorProfile} sx={{ width: "2.2rem", height: "2.2rem" }} />
            <span className='text-[.98rem] text-black'>{author}</span>
          </div>
          <div className='flex gap-5'>
            <span className='text-[.98rem] text-black'>{date}</span>
            <div className='flex gap-1 items-center'>
              <FavoriteIcon />
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='w-[100%] flex justify-between'>
        <div className='flex flex-col gap-2 w-[100%] md:w-[65vw]'>
          <h1 className='font-bold text-[0.98rem]'>{title}</h1>
          <span className='text-[0.75rem] hidden md:flex'>{trimText(summary, 120)}..</span>
          <span className='text-[0.75rem] flex md:hidden'>{trimText(summary, 80)}...</span>
        </div>
        <div className='w-[12rem] h-[12rem] md:w-[25rem] md:h-[25rem]'>
          <img className='max-h-[70%] md:max-h-[35%]' src={cover} />
        </div>
      </div>
    </div>
  )
}

export default PostCard