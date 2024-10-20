import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Layout: React.FC = () => {
    return (
        <main className='max-w-[100vw]'>
            <div><Header /></div>
            <Outlet />
        </main>
    )
}

export default Layout