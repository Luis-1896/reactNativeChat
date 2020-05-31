import React, { useState } from 'react';
import {FlatList,Text} from 'react-native';
import { Container,Icon,List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import {RootStackParamList} from "../../../../App";
import BasicHeader from "../../../UI/Header/BasicHeader";
import Meteor, {withTracker} from 'meteor-react-native/src/Meteor';

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
    //console.log(props);
    const {navigation}=props;
    //console.log(ListContainer.prototype.getMeteorData());
    //console.log(ListContainer.prototype.getMeteorData().user[0].status.online);


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
                    data={ListContainer.prototype.getMeteorData().user}
                    keyExtractor={us=>us._id}
                    renderItem={({item})=>{
                        return(
                            <List>
                                <ListItem thumbnail>
                                    <Left>
                                        <Thumbnail source={item.profile.path ==='' ?
                                                            require('../../../assets/logo.png') :
                                                            {uri:`data:image/png;base64,${item.profile.path}`}}
                                        />
                                    </Left>
                                    <Body>
                                        <Text>{item.profile.name}</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent
                                                onPress={()=>navigation.navigate('ChatScreen', {item})}>
                                            <Icon type="FontAwesome" name="circle"
                                                  style={(item._id===Meteor.userId()|| item.status.online==true) ? {color:'green'}:
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

let ListContainer = withTracker(()=>{
    Meteor.subscribe('users');
    let user= Meteor.users.find({}).fetch();
    return {
        user
    }
})(ListUserScreen);


export default ListUserScreen;