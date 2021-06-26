import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { SimpleGrid, Container, IconButton } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { PostFromList } from './PostFromList'
import { fetchPosts, getAllPosts, getPostsStatus } from './postsSlice.js';

export const PostsList = props => {
    const posts = useSelector(getAllPosts);
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
        }
    }, [postsStatus, dispatch])

    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));


    return (
        <Container maxW="container.md">
            <SimpleGrid
                columns={[1, 1, 1, 1]}
                spacing={[4, 4, 6]}
                 py="4"
                 position="relative"
            >
                {orderedPosts.map(post => (<PostFromList key={post.id} post={post} />))}
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
        </Container>
    )
}
