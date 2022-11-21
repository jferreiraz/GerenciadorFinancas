import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
//import { createStackNavigator } from "@react-navigation/stack"
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { firebase } from '../config';

//import Login from "./src/Login"  // "../../PagesLogin/SignIn"

import Register from "./index"  // "../../PagesLogin/Register";
import Home from "./index"

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const Stack = createNativeStackNavigator();

function App(){
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if(initializing) setInitializing(false)
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    if (!user){
        return(
            <Stack.Navigator>
                <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerStyle: {
                        height:150,
                        borderBottomLeftRadius:50,
                        borderBottomRightRadius:50
                    }
                }}
                />
            </Stack.Navigator>
        );
    }

    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerStyle: {
                        height:150,
                        borderBottomLeftRadius:50,
                        borderBottomRightRadius:50
                    }
                }}
                />
        </Stack.Navigator>
    )
}

export default () => {
return (
    <NavigationContainer>
        <App />
    </NavigationContainer>
)

}





