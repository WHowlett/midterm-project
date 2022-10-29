import React from "react";
import { Box, Stack, Textarea, Button, useColorModeValue, useToast, Heading, Input, Select} from '@chakra-ui/react';
import useAuth from "../hooks/useAuth";
import { addContact } from "../api/contact";

const AddContact = () => {
    const [name, setName] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [number, setNumber] = React.useState("");

    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();

    const { isLoggedIn, user } = useAuth();

    const handleContactAdd = async () => {
        if (!isLoggedIn) {
            toast(
                {
                    title: "Please log in to add contact.",
                    status: "error",
                    duration: 9000,
                    isClosable: true
                }
            );
            return;
        }
        setIsLoading(true);
        const contactData = {
            name,
            location,
            address,
            number,
            userId: user.uid
        };
        await addContact(contactData);
        setIsLoading(false);
        setName;
        setLocation;
        setAddress;
        setNumber;
        toast({
            title: "Contact saved successfully. Redirecting to the list...",
            status: "success"
        });

        await new Promise(r => setTimeout(r, 1500));
        window.location.assign("/infolist"); //will assign once page is set

    };

    return (
        <Box minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Enter Contact Information
                </Heading>
                <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Select value={location} onChange={(e) => setLocation(e.target.value)}>
                <option
                        value={"Scam"}
                        style={{ fontWeight: "bold" }}
                    >
                        Pick one of the following:
                    </option>
                    <option
                        value={"United State"}
                        style={{ fontWeight: "bold" }}
                    >
                        Inside United State
                    </option>
                    <option
                        value={"Outside USA"}
                        style={{ fontWeight: "bold" }}
                    >
                        Outside United State
                    </option>
                </Select>;
                <Textarea
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}>
                </Textarea>
                <Input
                placeholder="Phone Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                >
                </Input>
                <Button
                onClick={() => handleContactAdd()}
                colorScheme="blue"
                variant="solid"
                >
                    Click here to add
                </Button>
            </Stack>
        </Box>
    );
};

export default AddContact;
