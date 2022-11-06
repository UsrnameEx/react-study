import About from '../pages/About';
import Posts from '../pages/Posts';
import PostPage from '../pages/PostPage';

export const routes = [
    {path: '/about', component: <About/>},
    {path: '/', component: Posts},
    {path: '/posts/:id', component: PostPage},
]