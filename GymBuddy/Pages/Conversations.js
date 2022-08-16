import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import ChatBox from "./Components/ChatBox";
import { API_URL } from "../url";

export default function Conversation() {
    const [user,setUser] = useState();
    const [chats, setChats] = useState([]);
    const [isdata, setdata] = useState(false)
    let apicall = true
    useEffect(
        () => {
            if (apicall){
                const getuser = async() => {
                    setUser(await AsyncStorage.getItem("userId"))
                    //setUser("62f560d2fdcb278030cebc3d")
                    //console.log(user,"from conversation page")
                    axios.get(API_URL+"/api/conversation/"+user)
                    .then((res)=>{
                        //console.log(res.data)
                        setChats(res.data)
                    }).catch(
                        (e) => {console.log(e)}
                    )
                }
                getuser()
                setdata(true)
            }
            return (()=>{
                apicall = false
            })
            //console.log(chats)
        },[chats]
    )
    //console.log(chats)
    return(
        <SafeAreaView>
            <View>
                <Text style = {tw` text-3xl mt-0 ml-4 mb-6`}>Chats</Text>
                <View style={tw`border-b border-slate-400`}></View>
                {isdata?chats.map((data) => <ChatBox data = {data} key={data["_id"]} id={user} />):<></>}
            </View>
        </SafeAreaView>
    )
}