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

type SettingsScreenNavigationProps=DrawerNavigationProp<RootStackParamList, 'SettingsScreen'>;

interface SettingsScreenProps {
    navigation: SettingsScreenNavigationProps;
}

const SettingsScreen: React.FunctionComponent<SettingsScreenProps>=props =>{
    const {navigation}=props;

    //TODO: Obetener la información del usuario con Meteor

    const [userData, setUserData]=useState({
        name: 'Luis Martínez López',
        username: 'Luis',
        email: 'luismartinezlopez1896@gmail.com',
        photo: ''
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
                allowsEditing:true,
                aspect: [4,3]
            });
            console.log(resultImagePicker);
            if(resultImagePicker.cancelled===false){
                const imageUri= resultImagePicker.uri;
                console.log(imageUri);
                setUserData({...userData, photo: imageUri})
            }
        }
    };

    const editAccount = () => {
        // TODO: Aquí va el código con Meteor para editar la información
        console.log("Datos a editar");
        console.log(userData);
    }

    const deleteAccount = () => {
        // TODO: Aquí va el código con Meteor para eliminar la cuenta
        console.log("Eliminar cuenta")
    }

    return(
        <Container>
            <ScrollView>
                <BasicHeader icon={'menu'} onPress={()=> navigation.openDrawer()} titleHeader={'Configuración'}/>
                <View style={styles.containerCenter}>
                    <Image style={styles.photo}
                           source={userData.photo==='' ? require('../../../assets/logo.png') : {uri:userData.photo}} />
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