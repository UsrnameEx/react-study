import React, {useMemo, useRef, useState} from "react";
import './styles/App.css';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body: 'JavaScript - язык программирования'},
        {id: 2, title: 'Python', body: 'Python - язык программирования'},
        {id: 3, title: 'PHP', body: 'PHP - язык программирования'}
    ]);

    const [selectedSort, setSelectedSort] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const sortedPosts = useMemo(() => {
        console.log('get sorted posts');

        if (selectedSort) {
            return [...posts.sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))];
        }

        return posts;
    }, [selectedSort, posts]);

    const sortAndSearchPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery, sortedPosts]);

    const sortPosts = (sort) => {
        setSelectedSort(sort);
    }

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    return (
        <div className="App">
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            <div>
                <MyInput
                    value={searchQuery}
                    placeholder='Поиск'
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue='Сортировка по'
                    options={[
                        {value: 'title', name: 'По названию'},
                        {value: 'body', name: 'По описанию'}
                    ]}
                />
            </div>
            {
                sortAndSearchPosts.length !== 0
                    ? <PostList posts={sortAndSearchPosts} remove={removePost} title='Список постов'/>
                    : <h1 style={{textAlign: 'center'}}>Посты не найдены!</h1>
            }
        </div>
    );
}

export default App;
