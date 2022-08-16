import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import tw from "twrnc"
import { API_URL } from "../../url";
import { Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ChatBox (props) {
    //console.log(props.data)
    //console.log(props.data["members"][1])
    //console.log(props)
    const [username, setUsername]= useState();
    const [senderusername, setUsernamesender] = useState()
    const navigation = useNavigation();
    const [user, setUser] = useState()
    const [sender, setSender] = useState()
    //console.log(props.data.members[1])
    let apicall = true
    useEffect(
        () => {
            if (apicall){
                const getUsernames = async () => {
                    const id = await AsyncStorage.getItem("userId")
                    try {
                        axios.get(API_URL+"/api/user/"+`${id}`)
                        .then(
                            (res) => {
                                //console.log(res.data)
                                setUsername(res.data)
                            }
                        )
                    }catch(e){
                        console.log(e)
                    }
                    try {
                        const reciverid = props.data.members.find((m) => m !== id)
                        setSender(reciverid)
                        axios.get(API_URL+"/api/user/"+`${reciverid}`)
                        .then(
                            (res) => {
                                //console.log(res.data)
                                setUsernamesender(res.data)
                            }
                        )
                    }catch(e){
                        console.log(e)
                    }
                }
                getUsernames()
            }
            return (()=>{
                apicall = false
            })
        },[username, senderusername]
    )
    return (
        <View style = {tw`h-16 bg-white border border-t-0 border-slate-400 border-l-0 border-r-0`}>
            <Pressable style={tw`h-full w-full flex flex-row items-center`} onPress={()=> {navigation.navigate("ChatPage", {props: props.data, id:props.id, username:username, reciever:sender, senderusername: senderusername})}}>
                <View style={tw`h-10 w-10 bg-red-100 border rounded-full ml-4`}></View>
                <Text style={tw`ml-4 text-lg`}>{senderusername}</Text>
            </Pressable>
        </View>
    )
}