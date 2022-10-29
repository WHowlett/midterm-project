import React from 'react';
import { Container, Box, Text, Center } from "@chakra-ui/react";

export default function Home() {
  
  return ( 
  <Container maxW="7xl" borderRadius="md" mb="50px">
    <Center>
      <Box>
        <br />
        <Text>
          This is a family tree in somewhat of a strange design but the purpose of this site is to understand how some functions works as well 
          using Full-Stack. Click on the menu to get around and add or motify information from the Firebase Database.
        </Text>
      </Box>
    </Center>
  </Container>
  );
  }
