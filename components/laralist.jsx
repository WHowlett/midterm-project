import React, { useEffect } from "react";
import { Badge, Box, Heading, SimpleGrid, Text, useToast, Link } from '@chakra-ui/react';
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import {FaTrash} from "react-icons/fa"
import { deleteLara } from "../api/lara";

const LaraList = () => {
    const [Laras, setLaras] = React.useState([]);
    const { user } = useAuth() || {};
    const toast = useToast();

    useEffect(
        () => {
            const refreshData = () => {
                if (!user) {
                    setLaras([]);
                    return;
                }
                const q = query(collection(db, "lara"), where("user", "==", user.uid));
                onSnapshot(q, (querySnapshot) => {
                    let ar = [];
                    querySnapshot.docs.forEach((doc) => {
                        ar.push({ id: doc.id, ...doc.data() });
                    });
                    setLaras(ar);
                });
            };
            refreshData();
        },
        [user]
    );

    const handleLaraDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this family members?")) {
            deleteLara(id);
            toast({ title: "Family murdered successfully!", status: "success" });
        }
    };

    return (
        <Box mt={5} textAlign="center" fontSize={['0.8em', '1em', '1.2em', '1.4em', '1.6em']}>
            <Heading mb="3px" fontSize={['1.4em', '1.4em', '1.4em', '1.6em', '1.8em']}>Lara Family List</Heading>
            <br />
            <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={4}>
                {Laras &&
                    Laras.map((lara) => (
                        <Box
                            p={3}
                            boxShadow="2xl"
                            shadow={"dark-lg"}
                            transition="0.2s"
                            _hover={{ boxShadow: "sm" }}
                            borderRadius="md"
                            bg="white">
                            <Heading>{lara.name}{""}</Heading>
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
                                onClick={() => handleLaraDelete(lara.id)}
                            >
                                <FaTrash />
                            </Badge>
                            <Text>{lara.realation}</Text>
                            <Text>{lara.birth}</Text>
                            <Link href={`/lara/${lara.id}`}>Click here to learn more...</Link>
                        </Box>
                    ))
                }
            </SimpleGrid>
        </Box>
    )
}

export default LaraList;