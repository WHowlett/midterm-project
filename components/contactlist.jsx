import React, { useEffect } from "react";
import { Badge, Box, Heading, SimpleGrid, Text, useToast, Link } from "@chakra-ui/react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { deleteContact } from "../api/contact";
import {FaTrash } from "react-icons/fa";

const ViewContact = () => {
    const [ number, setContacts ] = React.useState([]);
    const { user } = useAuth() || {};
    const toast = useToast();

    useEffect(
        () => {
            const refreshData = () => {
                if (!user) {
                    setContacts([]);
                    return;
                }
                const q = query(collection(db, "info"), where("user", "==", user.uid));
                onSnapshot(q, (querySnapshot) => {
                    let ar = [];
                    querySnapshot.docs.forEach((doc) => {
                        ar.push({ id: doc.id, ...doc.data() });
                    });
                    setContacts(ar);
                });
            };
            refreshData();
        },
        [user]
    );

    const handledContactDelete = async (id) => {
        if (confirm("Are you sure you want to delete this contact?")) {
            deleteContact(id);
            toast({
                title: "Contact deleted successfully.",
                status: "success"
            });
        }
    };

    return (
        <Box mt={5} textAlign="center" fontSize={['0.8em', '1em', '1.2em', '1.4em', '1.6em']}>
            <Heading mb="3px" fontSize={['1.4em', '1.4em', '1.4em', '1.6em', '1.8em']}>
                Contacts
            </Heading>
            <Box>
                <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={2}>
                    {number &&
                        number.map((info) => (
                            <Box p={3}
                            boxShadow="2xl"
                            shadow={"dark-lg"}
                            transition="0.2s"
                            _hover={{ boxShadow: "sm" }}>
                                
                                <Heading as="h3" fontSize={"xl"}>
                                    {info.name}{""}
                                </Heading>
                                <Badge
                                    color="red.500"
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="right"
                                    size="xs"
                                    onClick={() => handledContactDelete(info.id)}
                                >
                                    <FaTrash />
                                </Badge>
                                <Text>
                                    {info.address}
                                </Text>
                                <Link href={`/contact/${info.id}`}>
                                Click here for more information!</Link>
                            </Box>
                        ))
                    }
                </SimpleGrid>
            </Box>
        </Box>
    )

}

export default ViewContact;