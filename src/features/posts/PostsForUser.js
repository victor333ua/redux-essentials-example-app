import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom"
import { getPostsByUserId } from "./postsSlice.js";
import { getUserById } from '../users/usersSlice.js'
import { ListItem, Container, Heading, UnorderedList, ListIcon } from "@chakra-ui/layout";
import { MdOpenInNew } from 'react-icons/md'
import { useColorMode } from "@chakra-ui/react";

export const PostsForUser = () => {
    const { userId } = useParams();

    const { colorMode } = useColorMode();
    const userPosts = useSelector(state => getPostsByUserId(state, userId));
    const user = useSelector(state => getUserById(state, userId));

    const list = userPosts.map(post => (
        <ListItem 
            key={post.id} 
            d="block"
            as={Link} 
            to={`/exPost/${post.id}`} 
            >
                <ListIcon as={MdOpenInNew} color="blue.500" />
                {post.title}
        </ListItem>    
    ));

    return (
        <Container maxW="container.md">
            <Heading as="h4" size="md" textColor={colorMode === 'dark' ? "white" : "black"}>
                {`Posts from ${user.name}`}
            </Heading>
            <br/>   
            <UnorderedList spacing={5} >
                {list}
            </UnorderedList>
        </Container>
    )


}