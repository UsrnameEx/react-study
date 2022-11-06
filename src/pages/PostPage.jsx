import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useFetching} from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';

const PostPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [getPost, isPostsLoading, postError] = useFetching(async () => {

        const response = await PostService.getById(params.id);
        setPost(response.data);
    });

    const [getComments, isCommentsLoading, commentsError] = useFetching(async () => {
        const response = await PostService.getCommentsById(params.id);
        setComments(response.data);
    });

    useEffect(() => {
        getPost();
        getComments();
    }, []);

    return (
        <div>
            {
                isPostsLoading
                    ? <Loader/>
                    : <h1>Страница поста {params.id}</h1>
            }
            {
                isCommentsLoading
                    ? <Loader/>
                    : <div>
                        {comments.map(comment =>
                            <div>
                                <h5>{comment.email}</h5>
                                <div>{comment.body}</div>
                            </div>
                        )}
                    </div>
            }
        </div>
    );
};

export default PostPage;