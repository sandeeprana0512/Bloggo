import React, { useEffect, useState } from 'react'
import { newRequest } from '../utils/createRequest'
import { useQuery } from '../utils/queryHook'
import { Link } from 'react-router-dom'
import PostCard from '../components/Post/PostCard'
import LineWaveLoader from '../utils/Loaders'
import { getUser } from '../utils/checkUser'

const Home: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<any>([]);
  const [followPosts, setFollowPosts] = useState<any>([]);
  const query = useQuery();
  const [selectedTag, setSelectedTag] = useState<string | null>(query.get("tag") == null ? "none" : query.get("tag"));

  const getPosts = async () => {
    const posts = await newRequest.get(`/api/post/?tag=${selectedTag}`);
    return posts;
  }

  useEffect(() => {
    setLoading(true);

    getUser().then(d => {
      const follows = d.follows;
      follows.forEach((item: any) => {
        setFollowPosts([...followPosts, item]);
      })
    })

    getPosts().then((data) => {
      setPosts(data.data);
      setLoading(false);
    });
  }, [selectedTag])

  return (
    <div className='w-[100vw] h-[90vh] flex flex-col items-center overflow-x-hidden'>
      <div className='mt-5 flex gap-0 md:gap-4'>
        <Link to="/"><span className='h-fit rounded-full px-4 cursor-pointer' style={{ backgroundColor: selectedTag === "Top Posts" ? "#fafafa" : "transparent" }} onClick={() => setSelectedTag("none")}>Top Posts</span></Link>
        <Link to="/?tag=tech"><span className='h-fit rounded-full px-4 cursor-pointer' style={{ backgroundColor: selectedTag === "Tech" ? "#fafafa" : "transparent" }} onClick={() => setSelectedTag("tech")}>Tech</span></Link>
        <Link to="/?tag=coding"><span className='h-fit rounded-full px-4 cursor-pointer' style={{ backgroundColor: selectedTag === "Coding" ? "#fafafa" : "transparent" }} onClick={() => setSelectedTag("coding")}>Coding</span></Link>
        <Link to="/?tag=life-style"><span className='h-fit rounded-full px-4 cursor-pointer' style={{ backgroundColor: selectedTag === "Life Style" ? "#fafafa" : "transparent" }} onClick={() => setSelectedTag("life-style")}>Lifestyle</span></Link>
      </div>

      {loading ? <div>
        <LineWaveLoader />
      </div> : <div>
        <div className='mt-10 w-[100vw] md:w-[100%] flex flex-col items-center gap-8'>
          {posts.map((post: any) => <div key={post._id} className='w-[90%] md:w-[40%]'><Link to={`/post/${post._id}`} ><PostCard author={post.author.name} authorProfile={post.author.icon} cover={post.cover} date={post.updatedAt.substring(0, 10)} likes={post.likes} postID={post._id} summary={post.summary} title={post.title} />
          </Link></div>)}
        </div>
      </div>}

    </div>
  )
}

export default Home