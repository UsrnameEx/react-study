import React, {useRef, useState} from "react";
import './styles/App.css';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body: 'Описание'},
        {id: 2, title: 'Python', body: 'Описание'},
        {id: 3, title: 'PHP', body: 'Описание'}
    ]);

    const titleInputRef = useRef('');
    const bodyInputRef = useRef('');

    const addNewPost = (e) => {
        e.preventDefault();
        console.log(titleInputRef.current, bodyInputRef.current);
    }

    return (
        <div className="App">
            <form>
                <MyInput
                    type='text'
                    placeholder='Название поста'
                    ref={titleInputRef}
                ></MyInput>
                <MyInput
                    type='text'
                    placeholder='Описание поста'
                    ref={bodyInputRef}
                ></MyInput>
                <MyButton onClick={addNewPost}>Создать пост</MyButton>
            </form>
            <PostList posts={posts} title='Список постов'/>
        </div>
    );
}

export default App;
