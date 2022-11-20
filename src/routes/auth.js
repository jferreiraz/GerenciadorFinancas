import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"
import { firebase } from '../config';

import Login from "./src/Login"  // "../../PagesLogin/SignIn"

import Register from "./index"  // "../../PagesLogin/Register";
import Home from "./index"

const Stack = createStackNavigator();

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





