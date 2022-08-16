import { Button, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../url";
import tw from "twrnc";

export default function HomePage({navigation}){
    const [userId, setUserId] = useState()
    const [username, setUsername] = useState()
    const [apicall, setApicall] = useState(true)
    useEffect(
        ()=>{
            if (apicall){
                const getuser = async ()=>{
                    setUserId(await AsyncStorage.getItem("userId"))
                    try {
                        axios.get(API_URL+"/api/user/"+userId)
                        .then(res=>{setUsername(res.data)})
                    }catch(e){

                    }
                }
                getuser()
            }
            return (()=>{
                setApicall(false) 
            })
        }
        )
    //console.log(userId)
    return (
        <SafeAreaView>
            <ScrollView>
                <View style = {tw` flex flex-col`}>
                    <Text style = {tw` ml-5 mt-10 text-3xl`}>Hi, {username}</Text>
                    <Pressable onPress={()=>{navigation.push("Conversations")}}>
                        <Text style = {tw` text-blue-500 ml-5 mt-4`}>Go to your chats.</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}