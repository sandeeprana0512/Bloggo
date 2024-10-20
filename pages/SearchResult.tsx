import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostCard from '../components/Post/PostCard'
import LineWaveLoader from '../utils/Loaders'
import { useParams } from 'react-router-dom';
import { newRequest } from '../utils/createRequest';

const SearchResult: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<any>([]);
    const { query } = useParams();

    const getPosts = async () => {
        const res = await newRequest.get(`/api/post/?tag=none`);
        return res.data;
    }

    useEffect(() => {
        setLoading(true);
        getPosts().then(data => {
            const d: any[] = [];
            data.forEach((item: any) => {
                const title = item.title.toLowerCase().split(" ").join("").replace(/[\/,-]/g, "");
                if (title.includes((query || "").toLowerCase().split(" ").join(""))) d.push(item);
            });
            setPosts(d);
            setLoading(false);
        })
    }, [])

    return (
        <div className='w-[100vw] h-[90vh] flex flex-col items-center overflow-x-hidden'>
            <div className='mt-5 flex gap-0 md:gap-4'>
                <span>Seach Results for<span className='font-bold ml-1'>{query}</span></span>
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

export default SearchResult