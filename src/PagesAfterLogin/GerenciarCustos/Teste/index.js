import { View, Text, StyleSheet, SafeAreaView, TextInput, Button, TouchableOpacity } from "react-native";
import { async } from "@firebase/util";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { dbacess } from "../../../config";
import { collection, query, getDocs } from "firebase/firestore";
//import { SafeAreaView } from "react-native-safe-area-context";


import { id123123 } from "../../../PagesLogin/SignIn";

//import { auth } from "../../../routes/auth"
import { getIdToken } from "firebase/auth";
import { User } from "firebase/auth";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

//userid = await auth.currentUser();

const user = auth.currentUser;

if (user !== null) {
    const email = user.email;
    const emailVerified = user.emailVerified;
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
} else {
  // No user is signed in.
}

if (user !== null) {
    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Email: " + profile.email);
    });
  }



const token = onAuthStateChanged

const MoreDetails = () => {
    const [details, setDetails] = useState({
        fname: "",
        age: "",
        currLoc: "",
    });

    const handleChange = (value, name) => {
        setDetails({
            ...details,
            [name]: value,
        });
    };

    const handleSubmit = async () => {

        const q = query(collection(dbacess, "users"));
        const querySnapshot = await getDocs(q);
        const queryData = querySnapshot.docs.map((detail) => ({
            ...detail.data(),
            id: detail.id,
        }));
        console.log(queryData);
        queryData.map(async (v) => {
            await setDoc(doc(dbacess, `users/${user.uid}/more-details`, details.fname), {
                fname: details.fname,
                age: details.age,
                currentLocation: details.currLoc,
            });
        })
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text>FULL Name</Text>
            <TextInput
                id="fname"
                value={details.fname}
                //onChange={handleChange}
                onChangeText={(value) => handleChange(value, "fname")}
                name="fname"
                />
            <Text>Age</Text>
            <TextInput

                value={details.age}
                //onChange={handleChange}
                onChangeText={(value) => handleChange(value, "age")}
                id="age"
                name="age"
            />

            <Text>Current location</Text>
            <TextInput
                id="currLoc"
                value={details.currLoc}
                onChangeText={(value) => handleChange(value, "currLoc")}
                //onChange={handleChange}
                name="currLoc"
            ></TextInput>
            <TouchableOpacity
                //onClick={handleSubmit}
                onPress={() => handleSubmit()}
                >
                <Text>Submit</Text>
                </TouchableOpacity>
                <Text>{user.uid}</Text>
        </SafeAreaView>
    );
}


function SignUp(props) {
    const [details, setDetails] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (value, name) => {
        setDetails({
            ...details,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        console.log(details);
        await setDoc(doc(dbacess, "users", user.uid), {
            name: details.name,
            email: details.email,
            message: details.message,
        });
        setDetails({
            name: "",
            email: "",
            message: "",
        });
        props.setVisible(true)
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text>
                Sign Up
            </Text>
            <Text>Name</Text>
                <TextInput
                    id="name"
                    value={details.name}
                    onChangeText={(value) => handleChange(value, "name")}
                    //onChange={handleChange}
                    name="name"
                />
            <Text>Email</Text>
                <TextInput
                    value={details.email}
                    onChangeText={(value) => handleChange(value, "email")}
                    //onChange={handleChange}
                    id="email"
                    name="email"
                />

            <Text>Message</Text>
                <TextInput
                    id="message"
                    //onChange={handleChange}
                    onChangeText={(value) => handleChange(value, "message")}
                    value={details.message} 
                    name="message"
                />
                <TouchableOpacity
                    //onClick={handleSubmit}
                    onPress={() => handleSubmit()}
                >
                    <Text> Submit </Text>
                </TouchableOpacity>

        </SafeAreaView>
    );
}

function Teste() {
    const [visible, setVisible] = useState(false);
    return (
        <>
            {visible === true ? <MoreDetails /> : <SignUp setVisible={setVisible} />}
        </>
    )
}

export default Teste;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35,
    },
    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#cccccc",
    },
    loader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
    },
  });