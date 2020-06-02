import React from 'react';
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

const ListUserScreen: React.FunctionComponent<ListUsersScreenProps> = props => {
    const {navigation}=props;

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
                                        <Thumbnail source={item.profile.path ===undefined ?
                                                            require('../../../assets/logo.png') :
                                                            {uri:`data:image/png;base64,${item.profile.path}`}}
                                        />
                                    </Left>
                                    <Body>
                                        <Text>{item.profile.name}</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent
                                                onPress={()=>navigation.push('ChatScreen', {id: item._id, username: item.username})}>
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

let ListContainer =  withTracker( ()=>{
    Meteor.subscribe('users');
    let user=  Meteor.users.find({_id: { $ne: Meteor.userId() }}).fetch();
    return {
        user
    }
})(ListUserScreen);


export default ListUserScreen;