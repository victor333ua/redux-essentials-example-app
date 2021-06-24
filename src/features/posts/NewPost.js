import { React, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Textarea, Container, IconButton, Input, Stack, Heading } from "@chakra-ui/react";
import { MdSend } from 'react-icons/md';
import { unwrapResult } from "@reduxjs/toolkit";
import { addPost } from "./postsSlice.js";

export const NewPost = () => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [isLoading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const userId = useSelector(state => state.posts.users[0].id);

    const onAddPost = e => {
        e.preventDefault();
        if (title && content) {          
            try {
                setLoading(true);
                const result = dispatch( addPost({ title, content, user: userId }) );
                unwrapResult(result);
                setTitle('');
                setContent('');
            } catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        }
    };

    return (
        <Container maxW="container.lg">
            <Stack direction="column" spacing={4} mt={4}>
                <Heading>Add new post</Heading>
                <Input 
                    placeholder="add post's title"
                    size="lg"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <Textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Enter new post"
                    size="lg"
                    position="relative"
                />
                <IconButton
                    colorScheme="teal"
                    aria-label="New Post"
                    icon={<MdSend />}
                    position="absolute"
                    bottom={5}
                    right={10}
                    onClick={onAddPost}
                    zIndex={2}
                    isLoading={isLoading}
                />
            </Stack>
        </Container>
    );
};