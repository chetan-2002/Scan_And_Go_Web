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
import React, { useEffect, useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase-config";
import { Helmet } from "react-helmet";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
// const CAiOutlineMail = chakra(AiOutlineMail);
const CAiTwotoneMail = chakra(AiTwotoneMail);
const Signup = () => {
  useEffect(() => {
    logEvent(analytics, "page_view");
    const UID = localStorage.getItem("UID");
    if (UID) {
      navigate("/scan", { replace: true });
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const toast = useToast();
  const navigate = useNavigate();
  const handleSignup = (e) => {
    if (!email || !password || !name || !enrollmentNo) {
      return;
    }
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("UID", userCredential.user.uid);
        addDoc(collection(db, "users"), {
          name: name,
          email: email,
          uid: userCredential.user.uid,
          enrollmentno: enrollmentNo,
        })
          .then(() => {
            toast({
              title: "Account created successfully!",
              // description: "Account created successfully!",
              status: "success",
              duration: 4000,
              isClosable: true,
            });
          })
          .catch((error) => {
            toast({
              title: "An error occurred.",
              description: error.message,
              status: "error",
              duration: 4000,
              isClosable: true,
            });
          });
        updateProfile(userCredential.user, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
        navigate("/scan", { replace: true });
      })
      .catch((error) => {
        toast({
          title: "An error occurred.",
          description: error.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
    setLoading(false);
    setEmail("");
    setPassword("");
    setName("");
    setEnrollmentNo("");
  };
  return (
    <>
      <Helmet>
        {`
        <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-CM3SWTD04Z"
      ></script>
      <script>
        window.dataLayer = window.dataLayer || []; function gtag()
        {dataLayer.push(arguments);}
        gtag('js', new Date()); gtag('config', 'G-CM3SWTD04Z');
      </script>
        `}
      </Helmet>
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
                      type="text"
                      placeholder="Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CAiTwotoneMail color="gray.300" />}
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
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="number"
                      placeholder="Enrollment Number"
                      onChange={(e) => {
                        setEnrollmentNo(e.target.value);
                      }}
                    />
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                  onClick={handleSignup}
                  isLoading={loading}
                >
                  Sign Up
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          Already a User?{" "}
          <Link
            color="teal.500"
            onClick={() => {
              navigate("/", { replace: true });
            }}
          >
            Login
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export default Signup;
