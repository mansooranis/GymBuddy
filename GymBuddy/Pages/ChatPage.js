import axios from "axios";
import { useState, useCallback, useEffect, useRef, useLayoutEffect } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { Icon } from "react-native-vector-icons";
import { io } from "socket.io-client";
import { API_URL } from "../url";
export default function ChatPage({route, navigation}){
    const {props, id, username, reciever, senderusername} = route.params;
    const [messages, setMessages] = useState([])
    const [reciusername, setReciusername] = useState();
    const [counter, setCounter] = useState(1)
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef()
    //console.log(props.members)
    let newmessages;

    useLayoutEffect(()=>{
      navigation.setOptions({
        title: senderusername,
      });
    }, [navigation]);

    useEffect(()=>{
      socket.current = io("ws://localhost:4000")
      socket.current.on("getMessage", (data) => {
        const message = {
          _id: data.msgid,
          text: data.text,
          createdAt: Date.now(),
          user:{
            _id:reciever,
            name: senderusername
          }
        }
        setCounter(counter+1)
        //console.log("receiver username: ", reciusername)
        setArrivalMessage(message);
        //console.log(arrivalMessage)
        
        //console.log(arrivalMessage)
        });
      let isApiSubscribed = true;
      //console.log(props,id)
      if (isApiSubscribed){
        const getusername = async () => {
          axios.get(API_URL+"/api/user/"+reciever)
          .then(res => 
            {setReciusername(res.data)})
            //console.log(reciusername)
        }
        getusername()
        const getmessages = async () => {
            axios.get(API_URL+"/api/messages/"+`${props["_id"]}`)
            .then((res) => {
                if (isApiSubscribed) {
                    socket.current.emit("addUser", id);
                    newmessages = res.data
                    //console.log(res.data)
                    const newArray = newmessages.map(msg => ({
                      _id : msg._id,
                      text: msg.text,
                      createdAt:msg.createdAt,
                      user : {
                        _id : msg.sender,
                        name: msg.username
                      }}))
                    newArray.sort((a,b)=>{
                        return a.createdAt < b.createdAt
                    })
                    setMessages(newArray)
                    //console.log(newArray);
                }
                //console.log(res.data)
            }
            ).catch(err => {console.log(err)})}
        getmessages()
      }
      return ()=>{
          isApiSubscribed = false
      }
  },[])

    useEffect(() => {
      ///console.log(arrivalMessage)
      //console.log("I am arrival message", counter, arrivalMessage, typeof messages.find((m) => {return m === arrivalMessage}))
        if (arrivalMessage && (typeof messages.find((m) => {return m === arrivalMessage}) === "undefined")){
          setMessages((prev) => [arrivalMessage, ...prev ]);
        }
      }, [arrivalMessage]);


      const onSend = useCallback(async (messages = []) => {
        
        //console.log(res.data)
          const message = {
            sender: id,
            text: messages[0].text,
            conversationId: props["_id"],
            username
          };
        //console.log(message)
        axios.post(API_URL+"/api/messages/", message).then((res) => 
          {
          
        socket.current.emit("sendMessage", {
            msgid :res.data._id,
            senderId: id,
            receiverId: reciever,
            text: messages[0].text,
          });
        }).catch(e=>console.log(e))
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])
    return (
        <GiftedChat messages={messages} renderAvatar={null} onSend = {(message)=>{onSend(message)}} user={{_id:id}}/>
    )
}