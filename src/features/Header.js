import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Flex, Heading, IconButton, useColorMode } from '@chakra-ui/react';
import { ColorModeSwitcher} from './ColorModeSwitcher';
import { MdHome } from 'react-icons/md';

const Header = () => {
    const { colorMode } = useColorMode();
    
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
                    <IconButton 
                        colorScheme="teal"
                        aria-label="Go Home"
                        icon={<MdHome/>}
                        as={Link}
                        to="/"
                        size="sm"
                    />
                    <ColorModeSwitcher size="sm"/>
                </Flex>
            </Container>
        </Box>
    );
};
export { Header };
