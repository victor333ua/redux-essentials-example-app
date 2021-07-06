import React, { useEffect } from 'react';
import { getAllUsers } from "../users/usersSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Box, Container, Heading, UnorderedList, Badge, useColorMode } from '@chakra-ui/react'
import { markAllAsRead, markAllAsOld, getAllNotesIds, getNoteById } from './slice.js'

export const NotificationsList = () => {
    const { colorMode } = useColorMode();
    const users = useSelector(getAllUsers);
    const notesIds = useSelector(getAllNotesIds);

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
    useEffect(() => {
        didUpdateOnly();
    });

    const Notification = ({ noteId }) => {
        const note = useSelector(state => getNoteById(state, noteId));
        const timeAgo = formatDistanceToNow(parseISO(note.date));
        const user = users.find(user => user.id === note.user) || 
        { name: 'Uknown User' };

        return (
            <Container 
                maxW="container.sm" 
                p={4} 
                borderRadius="lg"
                border="1px"
                borderColor="gray.500"
            >
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
            </Container>
        )
    };

    const list = notesIds.map(noteId => (
        <Notification  key={noteId} noteId={noteId} />
    ));

    return (
        <Container maxW="container.sm" paddingTop={4} marginTop={4}    >
            <Heading  size="md" textColor={colorMode === 'dark' ? "white" : "black"} >
                Notifications
            </Heading>
            <br/>   
            <UnorderedList spacing={5}>
                {list}
            </UnorderedList>
        </Container>
    )
}