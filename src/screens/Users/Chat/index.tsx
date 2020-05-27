import React, {useState} from 'react';
import { FlatList, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import BasicHeader from "../../../UI/Header/BasicHeader";
import {Container, Content, Badge, Item, Input, List, Button, Icon} from "native-base";
import styles from "./index.style";

type ChatScreenNavigationProps=StackNavigationProp<RootStackParamList, 'ChatScreen'>;

interface ChatScreenProps {
    navigation: ChatScreenNavigationProps;
}

const ChatScreen: React.FunctionComponent<ChatScreenProps>=props => {
    const {navigation}=props;
    const id=props.route.params.item._id;
    let FlatListRef: any =undefined;

    const [menssageNew, setMessage]=useState({
        menssage:'',
        placeholderMessage:'Aa'
    });

    // TODO: agregar a userData los datos obtenidos de Meteor y no estos datos hardcodeados
    const [userData, setUserData] = useState([
        {
            _idSender:'100',
            _idReceived: id,
            _idMessage: '1',
            message:'Hola como estas? mmmmmmmmm fff eeeeeee ffff'
        },
        {
            _idSender:id,
            _idReceived: '100',
            _idMessage: '2',
            message:'Bien y tú?'
        },
        {
            _idSender:'100',
            _idReceived: id,
            _idMessage: '3',
            message:'Hola como estas? mmmmmmmmm fff eeeeeee ffff'
        },
        {
            _idSender:id,
            _idReceived: '100',
            _idMessage: '4',
            message:'Bien y tú?'
        },
        {
            _idSender:'100',
            _idReceived: id,
            _idMessage: '5',
            message:'Hola como estas? mmmmmmmmm fff eeeeeee ffff'
        },
        {
            _idSender:id,
            _idReceived: '100',
            _idMessage: '6',
            message:'Bien y tú?'
        },
        {
            _idSender:'100',
            _idReceived: id,
            _idMessage: '7',
            message:'Hola como estas? mmmmmmmmm fff eeeeeee ffff'
        },
        {
            _idSender:id,
            _idReceived: '100',
            _idMessage: '8',
            message:'Bien y tú?'
        },
        {
            _idSender:'100',
            _idReceived: id,
            _idMessage: '9',
            message:'Hola como estas? mmmmmmmmm fff eeeeeee ffff'
        },
        {
            _idSender:id,
            _idReceived: '100',
            _idMessage: '10',
            message:'Bien y tú?'
        },
        {
            _idSender:'100',
            _idReceived: id,
            _idMessage: '11',
            message:'Hola como estas? mmmmmmmmm fff eeeeeee ffff'
        },
        {
            _idSender:id,
            _idReceived: '100',
            _idMessage: '12',
            message:'Bien y tú?'
        }
    ]);

    const sendMessage = () => {
        setUserData([...userData,{
            _idSender:'100',
            _idReceived: id,
            _idMessage: (userData.length+1).toString(),
            message:menssageNew.menssage
        }]);
        // @ts-ignore
        setMessage({menssage: ""})

    }



    return(
        <Container>
            <BasicHeader icon="arrow-back" onPress={()=>navigation.goBack()} titleHeader={`Chat ${props.route.params.item.username}`}/>
            <View style={styles.formMessage}>
                <FlatList
                    ref={ref=>FlatListRef=ref}
                    onContentSizeChange={() => FlatListRef.scrollToEnd()} // scroll it
                    data={userData}
                    keyExtractor={chat=>chat._idMessage}
                    renderItem={({item, index})=>{
                        return(
                            <List>
                                <Badge style={item._idSender==='100'? styles.badgeMessageSender : styles.badgeMessageReceived }>
                                    <Text style={item._idSender==='100' ? styles.textSender : styles.textReceived}>
                                        {item.message}
                                    </Text>
                                </Badge>
                            </List>
                        )
                    }} />
            </View>
            <Content>
                <Item rounded style={{marginTop:15}}>
                    <Input placeholder={menssageNew.placeholderMessage}
                           value={menssageNew.menssage}
                           onChangeText={mensage => setMessage({...menssageNew, menssage:mensage})}/>
                    <Button transparent
                            disabled={menssageNew.menssage==='' ? true: false}
                            onPress={()=>sendMessage()}>
                        <Icon type="FontAwesome" name="paper-plane"/>
                    </Button>
                </Item>
            </Content>
        </Container>
    );
}

export default ChatScreen;