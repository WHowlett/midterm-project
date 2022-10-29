import React from "react";
import useAuth from "../../hooks/useAuth";
import { Box, Heading, Text, Badge, useToast, Accordion, AccordionItem, AccordionButton, AccordionPanel, Center, Link, Button, Stack, Input, Textarea, Select } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/index";
import { editWayne, deleteWayne } from "../../api/wayne";

const WayneItem = ({ itemData }) => {
    const [name, setName] = React.useState("");
    const [relation, setRelation] = React.useState("");
    const [birth, setBirth] = React.useState("");
    const [discription, setDiscription] = React.useState("");

    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast;

    const { user } = useAuth() || {};

    const handleWayneEdit = async () => {
        setIsLoading(true);

        const wayneData = {

            relation: relation,
            discription: discription,
            id: itemData.id,
        }

        console.log("Wayne list:" + wayneData);

        await editWayne(wayneData);

        setIsLoading(false);
        setRelation("");
        setDiscription("");

        toast({
            title: "Update successful. The page will now refresh.",
            status: "success"
        });
        await new Promise(r => setTimeout(r, 1500));
        window.location.reload();
    };

    const handleWayneDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this family members?")) {
            deleteWayne(id);
        }
        await new Promise(r => setTimeout(r, 1500));
        window.location.assign("/waynelist");
    };

    if (!user) {
        return;
    }

    return (
        <Box ml="3%" mr="3%">
            <Box mt={5} padding="10px" textAlign="center" boxShadow="base" ml="25%" mr="25%" borderRadius="md" bg="white">
                <br />
                <Heading as="h3" fontSize={"xl"}>
                    {itemData.name}
                </Heading>
                <Text>
                    {itemData.relation}
                </Text>
                <Text>
                    {itemData.birth}
                </Text>
                <Text>
                    Description: {itemData.discription}
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
                                <Select value={relation} onChange={(e) => setRelation(e.target.value)}>
                                    <option
                                        value={"Scammer"}
                                        styles={{ fontWeight: "bold" }}>
                                        Chose from the following:
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
                                <Textarea
                                    placeholder="Description"
                                    value={discription}
                                    onChange={(e) => setDiscription(e.target.value)}
                                />
                                <Button
                                    onClick={() => handleWayneEdit()}
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
                >Kill Family Member</Button>
            </Center>
            <Button><Link href="/waynelist">Back</Link></Button>
        </Box>
    )

}

export async function getServerSideProps(context) {
    let itemData = null;
    const docRef = doc(db, 'wayne', context.params.id)
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

export default WayneItem;