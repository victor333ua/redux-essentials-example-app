import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Flex, Heading, IconButton, useColorMode, Button, Badge } from '@chakra-ui/react';
import { ColorModeSwitcher} from './ColorModeSwitcher';
import { MdHome, MdAndroid, MdRecordVoiceOver } from 'react-icons/md';
import { getAllNotes, getNewNotifications } from './notifications/slice.js';
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
    const { colorMode } = useColorMode();

    const dispatch = useDispatch();
    const notes = useSelector(getAllNotes);

    const qntUnReadNotes = notes.filter(note => note.isNew).length;

    const onGetNotifications = () => dispatch(getNewNotifications());
    
    return (
        <Box 
            as="header" 
            p={2}
            m={2} 
            bg={colorMode==='dark' ? 'gray.400' : 'gray.200' }
            border="1px"
            borderColor="gray.300"
            borderRadius="base"
        >
            <Container maxW="container.lg">
                <Heading fs="2xl" textAlign="center">Redux Essentials Example</Heading>
                <Flex justifyContent="space-between" pt={4}>
                    <Flex justifyContent="space-around">
                        <IconButton 
                            mr={2}
                            colorScheme="teal"
                            aria-label="Go Home"
                            icon={<MdHome/>}
                            as={Link}
                            to="/"
                            size="sm"
                        />
                        <IconButton 
                            mr={2}
                            colorScheme="teal"
                            aria-label="Users"
                            icon={<MdAndroid/>}
                            as={Link}
                            to="/Users"
                            size="sm"
                        />
                        <IconButton 
                             mr={2}
                            colorScheme="teal"
                            aria-label="Notifications"
                            icon={<MdRecordVoiceOver/>}
                            as={Link}
                            to="/Notifications"
                            size="sm"
                        />
                    </Flex>
                    <Flex justifyContent="flex-end">
                        <Flex mr={2} alignContent="flex-start">
                            <Badge 
                                h="min-content" 
                                fontSize="xx-small" 
                                colorScheme="cyan"
                                p={1} 
                             >
                                {`${qntUnReadNotes}`}
                            </Badge>
                            <Button           
                                size="sm"
                                colorScheme="teal"
                                onClick={onGetNotifications}
                            >
                                Refresh Notifications
                            </Button>
                        </Flex>
                        <ColorModeSwitcher size="sm"/>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
};
export { Header };
