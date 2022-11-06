import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './UI/navbar/Navbar';
import Posts from '../pages/Posts';
import About from '../pages/About';
import Error from '../pages/Error';
import PostPage from '../pages/PostPage';

const AppRouter = () => {
    return (
        <div>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Posts/>}/>
                    <Route path='/posts/:id' element={<PostPage/>}/>
                    <Route path='/about' element={<About/>}/>
                    <Route path="*" element={<Error/>}/>
                </Routes>

            </Router>
        </div>
    );
};

export default AppRouter;