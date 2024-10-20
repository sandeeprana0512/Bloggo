import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { newRequest } from '../../utils/createRequest';
import LineWaveLoader from '../../utils/Loaders';
import { Avatar } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
const CLIENT_URL = import.meta.env.VITE_APP_CLIENT_URL;

const PostPage: React.FC = () => {

  const { postId } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<any>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [followed, setFollowed] = useState<boolean>(false);
  let userId: any = "";
  let token: any = "";
  const check = localStorage.getItem("currentUser");
  if (check !== null) {
    userId = JSON.parse(localStorage.getItem("currentUser") || " ")?._id;
    token = JSON.parse(localStorage.getItem("currentUser") || " ")?.token;
  }

  const getPost = async () => {
    const postData = await newRequest.get(`/api/post/get-post/${postId}`);
    return postData.data;
  }

  const likePost = async () => {
    if (check !== null && userId) {

      const res = await newRequest.post(`/api/post/like-post/${userId}/${postId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const resLikes = await getPost()
      setLikes(resLikes.likes);
      if (res.data == "unliked post") setLiked(false);
      else setLiked(true);

    } else {
      alert("login to like this post");
    }
  }

  const followUser = async () => {
    if (check !== null && userId) {
      const res = await newRequest.post(`api/user/user-follow/${userId}/${post.author._id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.msg == "followed user") {
        setFollowed(true);
      } else {
        setFollowed(false);
      }

    } else {
      alert("login to follow the user");
    }
  }

  useEffect(() => {
    setLoading(true);
    getPost().then((data) => {
      setLoading(false);
      const likedBy: string[] = [];
      data.likedBy?.forEach((item: any) => likedBy.push(item._id));
      setLiked(likedBy.includes(userId));
      setLikes(data.likes);
      if (data.author.followers.includes(userId)) setFollowed(true)
      else setFollowed(false)
      setPost(data);
    }).catch(e => console.log(e));
  }, [])

  return (
    <div className='w-[100%] h-[90vh] flex justify-center overflow-x-hidden pb-5'>
      {loading ? <LineWaveLoader /> :
        <div className='w-[90%] md:w-[40%] mx-auto flex items-center mt-10 flex-col'>
          <h1 className='font-bold text-[1.9rem] w-[100%]'>{post.title}</h1>
          <div className='w-[100%] flex gap-3 mt-5 items-center'>
            <div><Avatar alt="Travis Howard" src={post.author.icon} sx={{ width: "2.2rem", height: "2.2rem" }} /></div>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-3'>
                <span>{post.author.name}</span>
                <span className='cursor-pointer' onClick={followUser}>{followed ? "Unfollow" : "Folllow"}</span>
              </div>

              <div className='flex gap-3'>
                <span>{post.updatedAt.substring(0, 10)}</span>
              </div>
            </div>
          </div>

          <div className='w-[100%] flex gap-3 mt-5 items-center border-y-2 py-1 justify-between'>
            <div className='flex gap-2'>
              <span>{likes}</span>
              <div className='cursor-pointer' onClick={() => likePost()}>{liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}</div>
            </div>

            <div className='flex gap-2'>
              <span>Share</span>
              <div className='cursor-pointer' onClick={() => {
                navigator.clipboard.writeText(`${CLIENT_URL}${location.pathname}`);
                alert("copied link to clipboard");
              }} ><ShareIcon /></div>
            </div>
          </div>

          <div className='w-[100%] mt-5'>
            <img src={post.cover} className='w-[100%]' />
            <div className='mt-5' dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {(post && post.tags.length > 0) && <div className='w-[100%] flex flex-col justify-start items-start my-5'>
            <span>Tags</span>
            <div className='flex gap-4 mt-3'>
              {post && post?.tags?.map((tag: string) => <div key={tag} className='px-2 rounded-full bg-[#F4D7D7]' >{tag}</div>)}
            </div>
          </div>}
        </div>
      }
    </div>
  )
}

export default PostPage