import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './Pages/HomePage';
import LogIn from './Pages/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './Pages/SignupPage';
import { useState } from 'react';
import { UserContext } from './UserContext';


const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value = {{user, setUser}}>
      <NavigationContainer>
        <Stack.Navigator>
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
          options = {{headerShown:false}}
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
