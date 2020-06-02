import React, {useState} from 'react';
import { FlatList, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import BasicHeader from "../../../UI/Header/BasicHeader";
import {Container, Content, Badge, Item, Input, Button, Icon} from "native-base";
import styles from "./index.style";
import Meteor, {withTracker, Mongo} from 'meteor-react-native/src/Meteor';

type ChatScreenNavigationProps=StackNavigationProp<RootStackParamList, 'ChatScreen'>;

interface ChatScreenProps {
    navigation: ChatScreenNavigationProps;
}

export const Message = new Mongo.Collection('chat');

const ChatScreen: React.FunctionComponent<ChatScreenProps>=props => {
    const {navigation}=props;
    const id=props.route.params.id;

    //console.log(ChatContainer.prototype.getMeteorData().chat[0]);
    let FlatListRef: any =undefined;

    const [menssageNew, setMessage]=useState({
        menssage:'',
        placeholderMessage:'Aa'
    });

    const [chat, setChatData] = useState(
        {
            idSender:'',
            idReceived:'',
            messageSendReceived:''
        });

    const sendMessage = () => {
        Meteor.call('saveMessage', { mensage: chat}, (err) => {
            if(err) {
                console.error('error: ',err);
            }else{
             console.log(props);
            }
        });

        // @ts-ignore
        setMessage({menssage: ""});
    };

    return(
        <Container>
            <BasicHeader icon="arrow-back" onPress={()=>navigation.goBack()} titleHeader={`Chat ${props.route.params.username}`}/>
            <View style={styles.formMessage}>
                <FlatList
                    ref={ref=>FlatListRef=ref}
                    onContentSizeChange={() => FlatListRef.scrollToEnd()} // scroll it
                    data={ChatContainer.prototype.getMeteorData().chat}
                    keyExtractor={chat=> chat._id}
                    renderItem={({item})=>{
                        return(
                            ((item.idReceived===id&&item.idSender===Meteor.userId())||
                                (item.idReceived===Meteor.userId()&&item.idSender===id)) ?
                                <View>
                                    <Badge style={item.idSender===Meteor.userId()? styles.badgeMessageSender : styles.badgeMessageReceived }>
                                        <Text style={item.idSender===Meteor.userId() ? styles.textSender : styles.textReceived}>
                                            {item.messageSendReceived}
                                        </Text>
                                    </Badge>
                                </View>:<View></View>
                        )
                    }} />
            </View>
            <Content>
                <Item rounded style={{marginTop:15}}>
                    <Input placeholder={menssageNew.placeholderMessage}
                           value={menssageNew.menssage}
                           onChangeText={mensage => {
                               setMessage({...menssageNew, menssage:mensage});
                               setChatData({...chat,
                                   idSender: Meteor.userId(),
                                   idReceived: id,
                                   messageSendReceived:mensage
                               });
                           }
                           }/>
                    <Button transparent
                            disabled={menssageNew.menssage==='' ? true: false}
                            onPress={()=>sendMessage()}>
                        <Icon type="FontAwesome" name="paper-plane"/>
                    </Button>
                </Item>
            </Content>
        </Container>
    );
};

const ChatContainer=withTracker(()=>{
    Meteor.subscribe('messages');
    let chat=Message.find({}, {
        sort: {
            updated_at: 1
        }
    }).fetch();
    return{
        chat
    }
})(ChatScreen);

export default ChatScreen;