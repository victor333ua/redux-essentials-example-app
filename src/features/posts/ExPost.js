import {useSelector} from "react-redux";
import {Box, Heading, Text} from "@chakra-ui/react";
import React from "react";
import { useParams } from 'react-router-dom'

export const ExPost = () => {
    const { postId } = useParams();

    const post = useSelector(state =>
        state.posts.posts.find(post => post.id === postId)
    );

    if (!post) {
        return (
          <section>
            <h2>Post not found!</h2>
          </section>
        )
      }
    

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
            <Text>
                {post.content}
            </Text>
        </Box>
    )
}
