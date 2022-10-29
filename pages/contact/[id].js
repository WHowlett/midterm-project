import React from "react";
import useAuth from "../../hooks/useAuth";
import { Box, Heading, Text, useToast, Accordion, AccordionItem, AccordionButton, AccordionPanel, Center, Button, Stack, Textarea , Select, Input, Link} from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/index";
import { editContact, deleteContact } from "../../api/contact";

const InfoItem = ({ itemData }) => {
    const [name, setName] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [number, setNumber] = React.useState("");

    const [isLoading, setIsLoading] = React.useState("");
    const toast = useToast;
    const { user } = useAuth() || {};

    const handleInfoEdit = async () => {
        setIsLoading(true);

        const infoData = {
            location: location,
            address: address,
            number, number,
            id: itemData.id,
        }

        await editContact(infoData);
        setIsLoading(false);
        setLocation("");
        setAddress("");
        setNumber("");

        toast({
            title: "Update successful. The page will now refresh.",
            status: "success"
        });
        await new Promise(r => setTimeout(r, 1500));
        window.location.reload();
    };

    const handleInfoDelete = async (id) => {
        if (confirm("Are you sure you want to delete this contact info?")) {
            deleteContact(id);
        }
        await new Promise(r => setTimeout(r, 1500));
        window.location.assign("/infolist");
    };

    if (!user) {
        return;
    }

    return (
        <Box Box ml="3%" mr="3%">
            <Box mt={5} padding="10px" textAlign="center" boxShadow="base" ml="25%" mr="25%" borderRadius="md" bg="white">
                <br />
                <Heading as="h3" fontSize={"xl"}>
                    {itemData.name}
                </Heading>
                <Text>
                    {itemData.location}
                </Text>
                <Text>
                    {itemData.address}
                </Text>
                <Text>
                    {itemData.number}
                </Text>
            </Box>
            <br />
            <Accordion ml="25%" mr="25%">
                <AccordionItem>
                    <AccordionButton>
                        <Center h={["50px"]} w={["8000px"]}>
                            <Button bg="cyan.300" borderRadius="md" boxShadow="base">Edit</Button>
                        </Center>
                    </AccordionButton>
                    <AccordionPanel>
                        <Box margin={"0 auto"} display="block" mt={5}>
                            <Stack direction="column">
                                <Select value={location} onChange={(e) => setLocation(e.target.value)}>
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
                                    onClick={() => handleInfoEdit()}
                                    bg="cyan.300"
                                    variant="solid"
                                >
                                    Save
                                </Button>
                            </Stack>
                        </Box>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <Center>
                <Button
                    onClick={() => handleWayneDelete(itemData.id)}
                    bg="red.500"
                    color="white"
                    mt="15px"
                    variant="solid"
                >Kill somone info</Button>
            </Center>
            <Button><Link href="/infolist">Back</Link></Button>
        </Box>
    )


}

export async function getServerSideProps(context) {
    let itemData = null;
    const docRef = doc(db, 'info', context.params.id)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        itemData = docSnap.data();
        itemData.id = context.params.id;
        console.log("itemData contents:")
        console.log(itemData);
    }
    return {
        props: {
            itemData
        }
    }
}
export default InfoItem;