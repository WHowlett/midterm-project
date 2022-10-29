import React from "react";
import { Box, Button, Link, Text, useColorMode, Menu, MenuButton, MenuList, MenuItem, MenuDivider, } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun} from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
const Auth = () => {
    const { isLoggedIn, user } = useAuth();
    const handleAuth = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;

                const credential = GoogleAuthProvider.credentialFromError(error);

            });
    };
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" p={5} >
            <Menu>
                <MenuButton as={Button}>
                    Family Tree Menu 👪
                </MenuButton>
                <MenuList>
                    <MenuItem><Link href="/waynelist">Wayne Family List</Link></MenuItem>
                    <MenuItem><Link href="/laralist">Lara Family List</Link></MenuItem>
                    <MenuDivider />
                    <MenuItem><Link href="/addlara">Add Family to Lara</Link></MenuItem>
                    <MenuItem><Link href="/addwayne">Add Family to Wayne</Link></MenuItem>
                    <MenuDivider />
                    <MenuItem><Link href="/infolist">View Contact List</Link></MenuItem>
                    <MenuItem><Link href="/addinfo">Add Contact information</Link></MenuItem>
                </MenuList>
            </Menu>
            <Box >
                <Text as="h3" fontSize={"xl"}>Family Tree</Text>
            </Box>
            <Box textAlign="right">
                {" "}
                {isLoggedIn && (
                    <>
                        <Text color="green.500">{user.email}</Text>
                        <Link color="red.500" onClick={() => auth.signOut()}>
                            Logout
                        </Link>
                    </>
                )}
                {!isLoggedIn && (
                    <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
                        Login with Google
                    </Button>
                )}
            </Box>
        </Box>
    );
};
export default Auth;