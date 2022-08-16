import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import HomePage from './Pages/HomePage';
import LogIn from './Pages/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './Pages/SignupPage';
import { useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import Conversations from './Pages/Conversations';
import ChatPage from './Pages/ChatPage';


const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(()=> {
    const getuser = async () => {
        setUser(await AsyncStorage.getItem("userId"));
    }
    getuser();
  },[])
  return (
    <UserContext.Provider value = {{user, setUser}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName= {user?"Home":"Login"}>
          <Stack.Screen 
            name="Signup"
            component={SignUp}
            options = {{headerShown:false}}
            />
          <Stack.Screen 
            name="Login"
            component={LogIn}
            
            options = {{headerShown:false}}
          />
          <Stack.Screen
          name = "Home"
          component={HomePage}
          options = {{headerShown:true}}
          />
          <Stack.Screen 
            name="Conversations"
            component={Conversations}
            options = {{headerShown:true}}
            />
          <Stack.Screen 
            name="ChatPage"
            component={ChatPage}
            options = {{headerShown:true}}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
