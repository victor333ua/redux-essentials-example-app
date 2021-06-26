import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { ListItem, Heading, UnorderedList, Container, ListIcon } from "@chakra-ui/layout";
import { getAllUsers } from "../posts/postsSlice.js";
import { MdInput} from 'react-icons/md'

export const UsersList = () => {
    const users = useSelector(getAllUsers);

    const list = users.map(user => (
        <ListItem key={user.id} d="block" as={Link} to={`/posts/${user.id}`} >
            <ListIcon as={MdInput} color="blue.500" />
            {user.name}
        </ListItem>    
    ));

    return (
        <Container maxW="container.md">
            <Heading as="h4" size="md">
                Users
            </Heading>
            <br/>   
            <UnorderedList spacing={5}>
                {list}
            </UnorderedList>
        </Container>
    )

}