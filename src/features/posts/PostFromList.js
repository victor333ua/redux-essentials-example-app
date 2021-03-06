import {Box, Divider, Heading, IconButton, Text} from "@chakra-ui/react";
import React from "react";
import { useSelector } from 'react-redux';
import { MdAllOut } from "react-icons/md";
import { Link } from 'react-router-dom';
import { TimeAgo } from "./TimeAgo";
import { PostAuthor } from "./PostAuthor.js"
import { getPostById } from "./postsSlice.js";

export const PostFromList = ({ postId }) => {
    const post = useSelector(state => getPostById(state, postId));
   
    return (
        <Box
            key={post.title}
            spacing={2}
            border="1px solid"
            borderColor="gray.300"
            borderRadius="lg"
            p={2}
        >
            <Heading as="h6" size="md">
                {post.title}
            </Heading>
            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
            </div>
            <br />
            <Text>
                {`${post.content.substr(0, 40)}...`}
            </Text>
            <Divider />
            <Box d={'flex'} alignItems="baseline" p={2}>
                <IconButton
                    variant="outline"
                    colorScheme="teal"
                    as={Link}
                    to={`/exPost/${postId}`}
                    aria-label="Post"
                    icon={<MdAllOut />}
                    size="xs"
                />
            </Box>
        </Box>
    )
}
