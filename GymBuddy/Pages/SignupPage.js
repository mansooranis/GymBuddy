import { useContext, useState } from "react";
import {View, ScrollView, StyleSheet, Text, TextInput, Button, Pressable, SafeAreaView, Modal } from "react-native";
import tw from 'twrnc';
import { UserContext } from "../UserContext";
import BannerAlert from "./Components/BannerAlert";
const axios = require('axios').default;

const URL = require("../url").API_URL

export default function SignUp({navigation}){
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [repassword, setrePassword] = useState(null);
    const [name, setName] = useState(null);
    const {user, setUser} = useContext(UserContext);
    const [banner, setBanner] = useState(false)
    const [bannermsg, setBannermsg] = useState("")

    const submitUser = async () => {
        setBanner(false)
        if (password !== repassword){
            setBannermsg("Password does not match!")
            setBanner(true)
            setTimeout(() => {
                setBanner(false)
            }, 4000);
            return
        }
        await axios.post(URL+"/api/user/register",{
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            password: password.toLowerCase(),
            username: username.toLowerCase(),
        }).then((res) => {
            console.log(res, res.data["authToken"], res.data["_id"])
            setUser(res.data["_id"])
        }).catch((err)=>{
            //console.log(err.response["request"]["_response"])
            setBannermsg(err.response["request"]["_response"])
            setBanner(true)
            setTimeout(() => {
                setBanner(false)
            }, 4000);
        })
        
    }
    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {banner?<BannerAlert message={bannermsg} />:<></>}
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
                            onPress={() => submitUser() }
                                >
                                <Text style={{textAlign:"center", padding:3}}>Submit</Text>
                        </Pressable>
                        <Pressable style={{marginTop:15}} onPress = {() => {navigation.navigate("Login")}}>
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