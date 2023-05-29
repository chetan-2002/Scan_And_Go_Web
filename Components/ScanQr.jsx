import { Box, Text, useToast } from "@chakra-ui/react";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { db } from "../firebase-config";
import Lottie from "react-lottie";
import animationData from "../assets/success.json";
import { useNavigate } from "react-router-dom";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase-config";

const ScanQr = () => {
  const [data, setData] = useState(null);
  const [scan, setScan] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    if (localStorage.getItem("UID") === null) {
      navigate("/", { replace: true });
    }
    const last_scan_time = localStorage.getItem("last_scan_time");
    var time_difference =
      (new Date().getTime() - new Date(last_scan_time).getTime()) / 1000;
    time_difference = time_difference / 60;
    time_difference = Math.round(time_difference);
    if (time_difference < 45) {
      toast({
        title: "You can scan QR code only once in 45 minutes.",
        description:
          "Please try again after " + (45 - time_difference) + " minutes.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (data !== null) {
      localStorage.setItem("last_scan_time", new Date().toUTCString());
      const uid = localStorage.getItem("UID");
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const snapshot = getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            addDoc(collection(db, "attendance"), {
              name: doc.data().name,
              email: doc.data().email,
              enrollmentno: doc.data().enrollmentno,
              date: new Date().toUTCString(),
              time: new Date().toLocaleTimeString(),
              collegeName: data.toUpperCase(),
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
      // setData(null);
      setScan(false);
    }
  }, [data]);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "6px",
          paddingBottom: "6px",
          fontSize: "1.5rem",
          backgroundColor: "teal",
          color: "white",
          fontWeight: "bold",
        }}
      >
        <Text>Scan QR</Text>
      </Box>
      <Box
        marginTop={{ base: "8rem", md: "0" }}
        display={{ lg: "none" }}
        width={"100%"}
      >
        {scan === true ? (
          <>
            <QrReader
              onResult={(result, error) => {
                if (result) {
                  setData(result?.text);
                }
              }}
            />
          </>
        ) : (
          <>
            <Lottie options={defaultOptions} height={400} width={400} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default ScanQr;
