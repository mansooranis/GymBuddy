import { View, Text } from "react-native";
import tw from "twrnc";
export default function BannerAlert(props){
    return (
        <View style={tw`h-10 mt-3 bg-red-300 w-full flex justify-center items-center`}>
            <Text style={tw` text-base font-light text-slate-800 `}>{props.message}</Text>
        </View>
    )
}