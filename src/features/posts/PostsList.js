import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { SimpleGrid, IconButton, Container } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { PostFromList } from './PostFromList'
import { fetchPosts, getAllPostsIds, getPostsStatus } from './postsSlice.js';
import { fetchUsers } from '../users/usersSlice.js'

export const PostsList = () => {
    const postsIds = useSelector(getAllPostsIds);
    const history = useHistory();
    const postsStatus = useSelector(getPostsStatus);
    const dispatch = useDispatch();

    const linkToAddPost = e => {
        history.push("/newPost");
        e.preventDefault();
    }

    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts());
            dispatch(fetchUsers());
        }
    }, [postsStatus, dispatch]);

    const content = 
        postsIds.map(postId => (<PostFromList key={postId} postId={postId} />));

    return ( postsStatus === 'completed' 
        ? (
            <>
                <SimpleGrid
                    columns={[1, 1, 1, 1]}
                    spacing={[4, 4, 6]}
                    py="4"
                    position="relative"
                >
                    {content}
                </SimpleGrid>
                <IconButton
                    colorScheme="teal"
                    aria-label="New Post"
                    icon={<ChatIcon />}
                    position="absolute"
                    bottom={5}
                    right={5}
                    onClick={linkToAddPost}                   
                />
            </>
        ) 
        : null
    )
}
