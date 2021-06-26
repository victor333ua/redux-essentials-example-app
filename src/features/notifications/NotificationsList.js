import React, { useEffect } from 'react';
import { getAllUsers } from "../posts/postsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Box, Container, Heading, UnorderedList, Badge } from '@chakra-ui/react'
import { markAllAsRead, markAllAsOld } from './slice.js'

export const NotificationsList = () => {
    const users = useSelector(getAllUsers);
    const notes = useSelector(state => state.notifications);

    const dispatch = useDispatch();
    const didUpdateOnly = () => dispatch(markAllAsRead());
    const didUnMountOnly = () => dispatch(markAllAsOld());

 // work only after unmounting
 // it's take place when we leave the page   
    useEffect(() => {
        return didUnMountOnly;
    }, []);

 // after every rendering
 // when we on the page and refresh notes
 // will be rendering twice   
    useEffect(() => {
        didUpdateOnly();
    });

    const list = notes.map(note => {
        const timeAgo = formatDistanceToNow(parseISO(note.date));
        const user = users.find(user => user.id === note.user) || 
        { name: 'Uknown User' };

        return (
            <Box key={note.id} w="100%" p={1} borderRadius="lg"  borderWidth="1px">
                {note.isNew && (
                    <Badge m={0.3} fontSize="xs" colorScheme="cyan">
                         New
                    </Badge>
                )}
                <Box d="flex"  alignItems="baseline">
                    <Box 
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="sm"
                        textTransform="uppercase"
                        px="2"
                    >
                        {user.name}
                    </Box>
                    <Box pl={4}>
                        {note.message}
                    </Box>
                </Box>
                <Box mt={0.3} fontStyle="italic" pl={4} fontSize="xs" >
                    {`${timeAgo} ago`}
                </Box>
            </Box>
        )
    })

    return (
        <Container maxW="container.md">
            <Heading as="h4" size="md">
                Notifications
            </Heading>
            <br/>   
            <UnorderedList spacing={5}>
                {list}
            </UnorderedList>
        </Container>
    )
}