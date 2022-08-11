import axios from "axios";
import { useContext, useState } from "react";
import {View, ScrollView, StyleSheet, Text, TextInput, Button, Pressable, SafeAreaView } from "react-native";
import tw from 'twrnc';
import { API_URL } from "../url";
import { UserContext } from "../UserContext";
import BannerAlert from "./Components/BannerAlert";
export default function LogIn({navigation}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const {user, setUser} = useContext(UserContext);
    const [banner, setBanner] = useState(false)
    const [bannermsg, setBannermsg] = useState("")

    const submitUser = () => {
        axios.post(API_URL+"/api/user/login", {
            username: username.toLowerCase(),
            password: password.toLowerCase()
        }).then((res)=>{
            //123console.log(res.data["id"])
            setUser(res.data["id"])
            navigation.navigate("Home")
    })
        .catch((err)=>{
            //console.log(err.response)
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
                    <Text style={{fontSize:38}}>Sign In</Text>
                    <View style = {{flexDirection:"column"}}>
                        <TextInput style={styles.inputbox} value={username} onChangeText={setUsername} placeholder={"username"}/>
                        <TextInput secureTextEntry={true} style={styles.inputbox} value={password} onChangeText={setPassword} placeholder={"password"} />
                        <Pressable 
                            style={styles.buttonstyle}
                            onPress={() => submitUser() }
                                >
                                <Text style={{textAlign:"center", padding:3}}>Submit</Text>
                        </Pressable>
                        <Pressable style={{marginTop:15}} onPress={()=>{navigation.navigate("Signup")}}>
                            <Text style={tw`text-[#0096FF]`}>Don't have an account? Sign up here</Text>
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