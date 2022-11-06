import React, {useMemo, useRef, useState} from "react";
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

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body: 'JavaScript - язык программирования'},
        {id: 2, title: 'Python', body: 'Python - язык программирования'},
        {id: 3, title: 'PHP', body: 'PHP - язык программирования'}
    ]);

    const [filter, setFilter] = useState({sort: '', query: ''});
    
    const sortAndSearchPosts = usePosts(posts, filter.sort, filter.query);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setVisible(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const [visible, setVisible] = useState(false);

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
            <PostList posts={sortAndSearchPosts} remove={removePost} title='Список постов'/>
        </div>
    );
}

export default App;
