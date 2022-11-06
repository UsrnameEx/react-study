import React, {useEffect, useState} from "react";
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/modal/MyModal';
import {usePosts} from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import {useFetching} from '../hooks/useFetching';
import {getPageCount} from '../components/utils/pages';
import Pagination from '../components/UI/pagination/Pagination';

function Posts() {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});

    const [totalPages, setTotalPages] = useState(0);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const [getPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(page, limit);
        setPosts(response.data);

        const totalCount = response.headers['x-total-count'];

        setTotalPages(getPageCount(totalCount, limit));
    });

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setVisible(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getPosts();
    }, [page]);


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
                postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            {
                isPostsLoading
                    ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
                    : <PostList posts={sortAndSearchPosts} remove={removePost} title='Список постов'/>
            }
            <Pagination
                page={page}
                changePage={setPage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Posts;
