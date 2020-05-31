import BasicHeader from "../../../UI/Header/BasicHeader";
import { DrawerNavigationProp } from '@react-navigation/drawer';
import {Container, Icon, Input, Item, Label} from 'native-base';
import React, { useState } from 'react';
import { Image, ScrollView, View,Button } from 'react-native';
import { RootStackParamList } from '../../../../App';
import LargeButton from '../../../UI/Button/LargeButton';
import { btnGrayStyle, btnRedStyle } from '../../../UI/Button/LargeButton/index.style';
import styles from './index.style';
import *as ImagePicker from 'expo-image-picker';
import *as Permissions from 'expo-permissions';
import Meteor from 'meteor-react-native/src/Meteor';

type SettingsScreenNavigationProps=DrawerNavigationProp<RootStackParamList, 'SettingsScreen'>;

interface SettingsScreenProps {
    navigation: SettingsScreenNavigationProps;
}


const SettingsScreen: React.FunctionComponent<SettingsScreenProps>=props =>{
    const {navigation}=props;

    const [userData, setUserData]=useState({
        _id: Meteor.user()._id,
        name: Meteor.user().profile.name,
        username: Meteor.user().username,
        email: Meteor.user().emails[0].address,
        photo: Meteor.user().profile.path
    });

    const [disabled, setDisabled]=useState({
        name: true,
        username: true,
        email: true
    });

    const openGallery = async ()=> {
        const resultPermission= await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(resultPermission){
            const resultImagePicker= await ImagePicker.launchImageLibraryAsync({
                base64:true,
                allowsEditing:true,
                aspect: [4,3]
            });
            if(resultImagePicker.cancelled===false){
                const base64Ima= resultImagePicker.base64;
                setUserData({...userData, photo: base64Ima})
            }
        }
    };

    const  editAccount = async () => {
        Meteor.call('saveUser', { user:userData}, (err) => {
            if(err) {
                console.error('error: ',err);
            } else {
                navigation.goBack();
            }
        });

    }

    const deleteAccount = () => {
        Meteor.call('deleteUser', {idUser: userData._id}, err=>{
            if(err){
                console.error('Error to delete user: ', err);
            } else{
                Meteor.logout();
                navigation.navigate('LoginScreen')
            }
        });
    }

    return(
        <Container>
            <ScrollView>
                <BasicHeader icon={'menu'} onPress={()=> navigation.openDrawer()} titleHeader={'Configuración'}/>
                <View style={styles.containerCenter}>
                    <Image style={styles.photo}
                           source={userData.photo===undefined ? require('../../../assets/logo.png') :
                                    {uri:`data:image/png;base64,${userData.photo}`
                           }} />
                    <Button onPress={()=>openGallery()}
                            title={"Selecciona tu foto de perfil"}
                            color="#841584"
                    />
                </View>
                <View style={styles.formUser}>
                    <Item floatingLabel style={styles.spaceBetweenItems}>
                        <Label>Nombre Completo</Label>
                        <Input
                            value={userData.name}
                            onChangeText={text => setUserData({ ...userData, name: text })}
                            disabled={disabled.name}
                        />
                        <Icon type="FontAwesome" name={'pencil'} onPress={()=> setDisabled({...disabled, name: !disabled.name})} />
                    </Item>
                    <Item floatingLabel style={styles.spaceBetweenItems}>
                        <Label>Usuario</Label>
                        <Input
                            value={userData.username}
                            onChangeText={text => setUserData({ ...userData, username: text })}
                            disabled={disabled.username}
                        />
                        <Icon type="FontAwesome" name={'pencil'} onPress={()=> setDisabled({...disabled, username: !disabled.username})} />
                    </Item>
                    <Item floatingLabel style={styles.spaceBetweenItems}>
                        <Label>Correo electrónico</Label>
                        <Input
                            value={userData.email}
                            onChangeText={text => setUserData({ ...userData, email: text })}
                            disabled={disabled.email}
                        />
                        <Icon type="FontAwesome" name={'pencil'} onPress={()=> setDisabled({...disabled, email: !disabled.email})} />
                    </Item>
                </View>
                <LargeButton style={btnGrayStyle} labelButton={'Guardar'} onPress={() => editAccount()} />
                <LargeButton style={btnRedStyle} labelButton={'Eliminar Cuenta'} onPress={() => deleteAccount()} />
            </ScrollView>
        </Container>
    );
};


export default SettingsScreen;