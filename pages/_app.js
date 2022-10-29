import { ChakraProvider } from "@chakra-ui/react";
import Auth from "../components/Auth";
//import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
        <Auth />
        <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp