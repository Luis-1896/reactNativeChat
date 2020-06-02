import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import {Component} from 'react';
import LoginScreen from "./src/screens/Auth/Login";
import SignupScreen from "./src/screens/Auth/SignUp";
import HomeScreen from "./src/screens/Home/HomeScreen";
import ListUserScreen from "./src/screens/Users/ListUsers";
import ChatScreen from "./src/screens/Users/Chat";

import Meteor from 'meteor-react-native/src/Meteor';
import {AsyncStorage} from 'react-native';


export type RootStackParamList={
    LoginScreen: React.FunctionComponent;
    SignupScreen: React.FunctionComponent;
    HomeScreen: React.FunctionComponent;
    InicioScreen: React.FunctionComponent;
    SettingsScreen: React.FunctionComponent;
    ListUsersScreen: React.FunctionComponent;
    ChatScreen: React.FunctionComponent;
}

const Stack = createStackNavigator<RootStackParamList>();

class App extends Component{

    componentDidMount() {
        //Meteor.connect('ws://10.0.0.21:3000/websocket',{AsyncStorage});
        Meteor.connect('ws://35.193.145.51:80/websocket',{AsyncStorage});
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown:false,
                        gestureEnabled: false
                    }}

                >
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="SignupScreen" component={SignupScreen} />
                    <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                    <Stack.Screen name="ListUsersScreen" component={ListUserScreen} />
                    <Stack.Screen name="ChatScreen" component={ChatScreen} />

                </Stack.Navigator>
            </NavigationContainer>
        );
    }


}

export default App;
