import React, { useState } from 'react';
import {FlatList,Text} from 'react-native';
import { Container,Icon,List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import {RootStackParamList} from "../../../../App";
import BasicHeader from "../../../UI/Header/BasicHeader";

type ListUsersScreenNavigationProps= StackNavigationProp<RootStackParamList,'ListUsersScreen'>;

interface ListUsersScreenProps{
    navigation: ListUsersScreenNavigationProps;
}

interface ListUsersData {
    users: {
        _id:string;
        name: string;
        username: string;
        status: boolean;
        path: string;
    }[]
}

const ListUserScreen: React.FunctionComponent<ListUsersScreenProps> = props => {
    console.log(props);
    const {navigation}=props;

    //TODO: Obtener los datos de los usuarios registrados y remplazar por los datos harcodeados
    const [userData, setUserData] = useState<ListUsersData>({
        users:[
            {
                _id: '1',
                name: 'Luis Martinez Lopez',
                username: 'Luis',
                status:true,
                path:''
            },
            {
                _id: '2',
                name: 'Fabiola Aguilar Bautista',
                username: 'Fabiola',
                status:false,
                path:'../../../assets/logo.png'
            },
            {
                _id: '3',
                name: 'Armando Reyes Hernandez',
                username: 'Army',
                status:false,
                path:''
            },
        ]
    });

    return (
        <Container>
            <BasicHeader icon="arrow-back" onPress={()=>navigation.goBack()} titleHeader={"Lista de Usuarios"}/>
            <>
                <FlatList
                    data={userData.users}
                    keyExtractor={user=>user._id}
                    renderItem={({item,index})=>{
                        return(
                            <List>
                                <ListItem thumbnail>
                                    <Left>
                                        <Thumbnail square
                                                   source={item.path==='' ? require('../../../assets/logo.png') : {uri:item.path}}
                                        />
                                    </Left>
                                    <Body>
                                        <Text>{item.name}</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent
                                                onPress={()=>navigation.navigate('ChatScreen', {item})}>
                                            <Icon type="FontAwesome" name="circle"
                                                  style={item.status===true ? {color:'green'}:
                                                      {color: 'red'}} />
                                        </Button>
                                    </Right>
                                </ListItem>
                            </List>
                        );
                    }}
                />
            </>
        </Container>
    );

};

export default ListUserScreen;