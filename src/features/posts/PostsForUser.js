import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom"
import { getAllPosts, getUserById } from "./postsSlice.js";
import { ListItem, Container, Heading, UnorderedList, ListIcon } from "@chakra-ui/layout";
import { MdOpenInNew } from 'react-icons/md'

export const PostsForUser = () => {
    const { userId } = useParams();

    const allPosts = useSelector(getAllPosts);
    const userPosts = allPosts.filter(post => post.user === userId);
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
            <Heading as="h4" size="md">
                {`Posts from ${user.name}`}
            </Heading>
            <br/>   
            <UnorderedList spacing={5} >
                {list}
            </UnorderedList>
        </Container>
    )


}