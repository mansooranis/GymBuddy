import { useState } from "react";
import {View, ScrollView, StyleSheet, Text, TextInput, Button, Pressable, SafeAreaView } from "react-native";
import tw from 'twrnc';

export default function SignUp({navigation}){
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [repassword, setrePassword] = useState(null);
    const [name, setName] = useState(null);

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Text style={{fontSize:38}}>Sign Up</Text>
                    <View style = {{flexDirection:"column"}}>
                        <TextInput style={styles.inputbox} value={name} onChangeText={setName} placeholder={"full name"}/>
                        <TextInput style={styles.inputbox} value={email} onChangeText={setEmail} placeholder={"email"}/>
                        <TextInput style={styles.inputbox} value={username} onChangeText={setUsername} placeholder={"username"}/>
                        <TextInput secureTextEntry={true} style={styles.inputbox} value={password} onChangeText={setPassword} placeholder={"password"} />
                        <TextInput secureTextEntry={true} style={styles.inputbox} value={repassword} onChangeText={setrePassword} placeholder={"retype password"} />
                        <Pressable 
                            style={styles.buttonstyle}
                            onPress={() => console.log("I was pressed") }
                                >
                                <Text style={{textAlign:"center", padding:3}}>Submit</Text>
                        </Pressable>
                        <Pressable style={{marginTop:15}} onPress = {() => {navigation.push("Login")}}>
                            <Text style={tw`text-[#0096FF]`}>Already have an account? Sign in here</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        marginLeft: 28,
        marginTop:100
    },
    inputbox:{
        height:40,
        borderWidth:1,
        marginTop:25,
        width:250,
        borderColor:"black",
        borderRadius:4,
        paddingLeft:7,
    },
    buttonstyle:{
        borderWidth:1,
        borderColor:"black",
        marginTop:25,
        width: 100,
        textAlign:"center",
        height:25,
        borderColor:"black",
        backgroundColor:"#C1EFFF",
        borderRadius:4,
    }
})