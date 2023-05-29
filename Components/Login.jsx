import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase-config";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const Login = () => {
  logEvent(analytics, "page_view");
  useEffect(() => {
    const UID = localStorage.getItem("UID");
    if (UID) {
      navigate("/scan", { replace: true });
    }
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    if (!email || !password) {
      return;
    }
    e.preventDefault();
    console.log(email, password);
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("UID", userCredential.user.uid);
        toast({
          title: "Login successful.",
          description: "You are now logged in.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/scan", { replace: true });
      })
      .catch((error) => {
        toast({
          title: "An error occurred.",
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
    setLoading(false);
    setEmail("");
    setPassword("");
  };
  const handleShowClick = () => setShowPassword(!showPassword);
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={handleLogin}
                isLoading={loading}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link
          color="teal.500"
          onClick={() => navigate("/signup", { replace: true })}
        >
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
