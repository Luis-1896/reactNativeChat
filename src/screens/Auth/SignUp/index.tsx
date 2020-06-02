import { StackNavigationProp } from '@react-navigation/stack';
import {Container, Form, Icon, Input, Item, Label} from 'native-base';
import React, { useState, useEffect } from 'react';
import { ScrollView, Text} from 'react-native';
import { RootStackParamList } from '../../../../App';
import styles from "./index.style";
import LargeButton from "../../../UI/Button/LargeButton";
import Meteor from 'meteor-react-native/src/Meteor';

type SignupScreenNavigationProps=StackNavigationProp<RootStackParamList, 'SignupScreen'>;

interface SignupScreenProps {
    navigation: SignupScreenNavigationProps;
}

interface SignUpUserData {
    _id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
    approved: boolean;
    errorEmail: string;
    errorPassword: string;
}

interface PasswordData {
    hiddenPassword: boolean;
    hiddenRepeatPassword: boolean;
    iconPassword: 'eye' | 'eye-off';
    iconRepeatPassword: 'eye' | 'eye-off';
}

const SignupScreen: React.FunctionComponent<SignupScreenProps> = props => {
    const { navigation } = props;

    const [userData, setUserData] =useState<SignUpUserData>({
        _id:'',
        name: '',
        username: '',
        email: '',
        password: '',
        repeatPassword:'',
        approved: false,
        errorEmail:'',
        errorPassword:''
    });

    const [passwordData,setPasswordData]=useState<PasswordData>({
        hiddenPassword: true,
        hiddenRepeatPassword: true,
        iconPassword: 'eye',
        iconRepeatPassword: 'eye',
    })

    const switchPasswordHidden = () => {
        const { hiddenPassword } = passwordData;
        setPasswordData({
            ...passwordData,
            hiddenPassword: !hiddenPassword,
            iconPassword: hiddenPassword ? 'eye-off' : 'eye'
        });
    };

    const switchRepeatPasswordHidden = () => {
        const { hiddenRepeatPassword } = passwordData;
        setPasswordData({
            ...passwordData,
            hiddenRepeatPassword: !hiddenRepeatPassword,
            iconRepeatPassword: hiddenRepeatPassword ? 'eye-off' : 'eye'
        });
    };

    const validateEmail = (text: string) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            setUserData({ ...userData, email: text, errorEmail: 'Error del formato del correo electrónico' });
            return false;
        } else {
            setUserData({ ...userData, email: text, errorEmail: ''  });
            return true;
        }
    };

    const validatePassword = (text: string) => {
        if (text!==userData.password) {
            setUserData({...userData, repeatPassword:text, errorPassword:'Verificar contraseñas, no coinciden'});
            return false;
        } else {
            setUserData({...userData, repeatPassword:text, errorPassword:''});
            return true;
        }
    };

    useEffect(()=> {
        if((userData.email!==''&&userData.name!==''&&userData.username!==''&&
            userData.password!==''&&userData.repeatPassword!=='')&&( userData.password===userData.repeatPassword)){
            setUserData({...userData, approved:true})
        }
    },[userData.email!=='',userData.name!=='',userData.username!=='',
        userData.password!=='',userData.repeatPassword!=='', userData.password===userData.repeatPassword]);

    const signUp = () =>{
        Meteor.call('saveUser', { user:userData}, (err) => {
            if(err) {
                console.error('error: ',err);
            } else {
                navigation.navigate('LoginScreen');
            }
        });
    };

    return (
        <Container>
            <ScrollView>
                <Text style={[styles.textTitle, styles.textLeft]}>Registrate</Text>
                <Form style={styles.formSignup}>
                    <Item floatingLabel>
                        <Label>Nombre completo</Label>
                        <Input
                            value={userData.name}
                            onChangeText={text => setUserData({ ...userData, name: text })}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Nombre de Usuario</Label>
                        <Input
                            value={userData.username}
                            onChangeText={text => setUserData({ ...userData, username: text })}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Correo electrónico</Label>
                        <Input
                            value={userData.email}
                            onChangeText={text => validateEmail(text)}
                        />
                    </Item>
                    <Text style={styles.errorEmail}>{userData.errorEmail}</Text>
                    <Item floatingLabel>
                        <Label>Contraseña</Label>
                        <Input
                            secureTextEntry={passwordData.hiddenPassword}
                            value={userData.password}
                            onChangeText={text => setUserData({...userData,password:text})}
                        />
                        <Icon active name={passwordData.iconPassword} onPress={switchPasswordHidden} />
                    </Item>
                    <Item floatingLabel>
                        <Label> Repite tu contraseña</Label>
                        <Input
                            secureTextEntry={passwordData.hiddenRepeatPassword}
                            value={userData.repeatPassword}
                            onChangeText={text => validatePassword(text)}
                        />
                        <Icon active name={passwordData.iconRepeatPassword} onPress={switchRepeatPasswordHidden} />
                    </Item>
                    <Text style={styles.errorEmail}>{userData.errorPassword}</Text>
                    <LargeButton
                        disabled={!userData.approved}
                        labelButton={"Registrar"}
                        onPress={signUp}
                    />
                    <Text style={[styles.smallText, styles.textCenter]}>
                        {"¿Ya tienes una cuenta? "}
                        <Text style={styles.textLineUnderline}
                              onPress={()=>navigation.navigate('LoginScreen')}>
                            Haz clic aquí
                        </Text>
                    </Text>
                </Form>
            </ScrollView>
        </Container>
    );
};

export default SignupScreen;