import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { SeachProps } from '../utils/typeDef';

const SearchBox: React.FC<SeachProps> = ({ value, setValue, OnSearchHandler }) => {
    return (
        <div className='flex items-center bg-[#fafafa] h-[2.4rem] rounded-full px-2 gap-2 w-[8.8rem]'>
            <SearchIcon style={{ width: "1.2rem", opacity: "50%" }} />
            <input className='focus:outline-none text-[0.92rem] bg-transparent w-[6rem]' value={value} placeholder='Seach Blogg0' onKeyDown={(e) => { if (e.key === "Enter") { OnSearchHandler() } }} onChange={(e) => setValue(e.target.value)} />
        </div>
    )
}
export default SearchBox