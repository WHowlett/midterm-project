import React from "react";
import { Box, Stack, Textarea, Button, useColorModeValue, useToast, Heading, Input, Select } from '@chakra-ui/react';
import useAuth from "../hooks/useAuth";
import { addWayne } from "../api/wayne";


const AddWayne = () => {
    const [name, setName] = React.useState("");
    const [relation, setRelation] = React.useState("");
    const [birth, setBirth] = React.useState("");
    const [discription, setDiscription] = React.useState("");

    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    const { isLoggedIn, user } = useAuth();
    const handledWayneAdd = async () => {
        if (!isLoggedIn) {
            toast({
                title: "Please log in to add family to Wayne's side.",
                status: "error",
                duration: 9000,
                isClosable: true
            });
            return;
        }
        setIsLoading(true);
        const wayneData = {
            name,
            relation,
            birth,
            discription,
            userId: user.uid
        };
        await addWayne(wayneData);
        setIsLoading(false);
        setName;
        setRelation;
        setBirth;
        setDiscription;
        toast({
            title: "Family member saved successfully to Wayne side, Redirecting to the list....",
            status: "success"
        });
        await new Promise(r => setTimeout(r, 1500));
        window.location.assign("/waynelist"); //Will update once file been created.
    };

    return (
        <Box minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={4} w={'full'} maxW={'md'} bg={useColorModeValue('white', 'gray.700')} rounded={'xl'} boxShadow={'lg'} p={6} my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Enter information to add to Wayne Side
                </Heading>
                <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                </Input>
                <Select value={relation} onChange={(e) => setRelation(e.target.value)}>
                <option
                        value={"Scammer"}
                        styles={{ fontWeight: "bold" }}>
                        Chose the following:
                    </option>
                    <option
                        value={"Mother"}
                        styles={{ fontWeight: "bold" }}>
                        Mother
                    </option>
                    <option
                        value={"Father"}
                        styles={{ fontWeight: "bold" }}>
                        Father
                    </option>
                    <option
                        value={"Brother"}
                        style={{ fontWeight: "bold" }}>
                        Brother
                    </option>
                    <option
                        value={"Sister"}
                        style={{ fontWeight: "bold" }}>
                        Sister
                    </option>
                    <option
                        value={"Aunt"}
                        style={{ fontWeight: "bold" }}>
                        Aunt
                    </option>
                    <option
                        value={"Uncle"}
                        style={{ fontWeight: "bold" }}>
                        Uncle
                    </option>
                    <option
                        value={"Cousin"}
                        style={{ fontWeight: "bold" }}>
                        Cousin
                    </option>
                    <option
                        value={"Son"}
                        style={{ fontWeight: "bold" }}>
                        Son
                    </option>
                    <option
                        value={"Daughter"}
                        style={{ fontWeight: "bold" }}>
                        Daughter
                    </option>
                    <option
                        value={"Other"}
                        style={{ fontWeight: "bold" }}>
                        Other - See Discription
                    </option>
                </Select>
                <Input
                    placeholder="Date of Birth"
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}>
                </Input>
                <Textarea
                    placeholder="Discription or Notes - no limits"
                    value={discription}
                    onChange={(e) => setDiscription(e.target.value)}
                    >
                </Textarea>
                <Button
                    onClick={() => handledWayneAdd()}
                    colorScheme="blue"
                    variant="solid">
                        Click here to add
                    </Button>
            </Stack>
        </Box>
    )

}

export default AddWayne;