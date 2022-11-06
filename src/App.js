import React, {useEffect, useMemo, useRef, useState} from "react";
import './styles/App.css';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import {usePosts} from './hooks/usePosts';
import axios from 'axios';
import PostService from './API/PostService';
import Loader from './components/UI/loader/Loader';

function App() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});

    const [isPostsLoading, setIsPostsLoading] = useState(false);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setVisible(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const [visible, setVisible] = useState(false);

    const getPosts = async () => {
        setIsPostsLoading(true);
        setTimeout(async () => {
            const posts = await PostService.getAll();
            setPosts(posts);
            setIsPostsLoading(false);
        }, 1000);
    }

    useEffect(() => {
        getPosts();
    }, []);

    const sortAndSearchPosts = usePosts(posts, filter.sort, filter.query);

    return (
        <div className="App">
            <MyButton style={{marginTop: '30px'}} onClick={e => setVisible(true)}>
                Создать пост
            </MyButton>
            <MyModal
                visible={visible}
                setVisible={setVisible}
            >
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {
                isPostsLoading
                    ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
                    : <PostList posts={sortAndSearchPosts} remove={removePost} title='Список постов'/>
            }

        </div>
    );
}

export default App;
