import { StackNavigationProp } from '@react-navigation/stack';
import {Container, Form, Icon, Input, Item, Label} from 'native-base';
import React, { useState, useEffect } from 'react';
import { ScrollView, Text} from 'react-native';
import { RootStackParamList } from '../../../../App';
import styles from "./index.style";
import LargeButton from "../../../UI/Button/LargeButton";

type SignupScreenNavigationProps=StackNavigationProp<RootStackParamList, 'SignupScreen'>;

interface SignupScreenProps {
    navigation: SignupScreenNavigationProps;
}

interface SignUpUserData {
    name: string;
    username: string;
    email: string;
    password: string;
    hiddenPassword: boolean;
    hiddenRepeatPassword: boolean;
    iconPassword: 'eye' | 'eye-off';
    iconRepeatPassword: 'eye' | 'eye-off';
    repeatPassword: string;
    approved: boolean;
    errorEmail: string;
}

const SignupScreen: React.FunctionComponent<SignupScreenProps> = props => {
    const { navigation } = props;

    const [userData, setUserData] =useState<SignUpUserData>({
        name: '',
        username: '',
        email: '',
        password: '',
        hiddenPassword: true,
        hiddenRepeatPassword: true,
        iconPassword: 'eye',
        iconRepeatPassword: 'eye',
        repeatPassword:'',
        approved: false,
        errorEmail:''
    });

    const switchPasswordHidden = () => {
        const { hiddenPassword } = userData;
        setUserData({
            ...userData,
            hiddenPassword: !hiddenPassword,
            iconPassword: hiddenPassword ? 'eye-off' : 'eye'
        });
    };

    const switchRepeatPasswordHidden = () => {
        const { hiddenRepeatPassword } = userData;
        setUserData({
            ...userData,
            hiddenRepeatPassword: !hiddenRepeatPassword,
            iconRepeatPassword: hiddenRepeatPassword ? 'eye-off' : 'eye'
        });
    };

    const validate = (text: string) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            setUserData({ ...userData, email: text, errorEmail: 'Error del formato del correo electrónico' })
            return false;
        }
        else {
            setUserData({ ...userData, email: text, errorEmail: ''  })
        }
    }

    useEffect(()=> {
        if(userData.email!==''&&userData.name!==''&&userData.username!==''&&
            userData.password!==''&&userData.repeatPassword!==''){
            setUserData({...userData, approved:true})
        }
    },[userData.email!=='',userData.name!=='',userData.username!=='',
        userData.password!=='',userData.repeatPassword!=='']);

    const signUp = () =>{
        console.log(userData);
        // TODO: Aquí va ir el código para mandar los datos al endpoint de registrar en Meteor
    }

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
                            onChangeText={text => validate(text)}
                        />
                    </Item>
                    <Text style={styles.errorEmail}>{userData.errorEmail}</Text>
                    <Item floatingLabel>
                        <Label>Contraseña</Label>
                        <Input
                            secureTextEntry={userData.hiddenPassword}
                            value={userData.password}
                            onChangeText={text => setUserData({...userData,password:text})}
                        />
                        <Icon active name={userData.iconPassword} onPress={switchPasswordHidden} />
                    </Item>
                    <Item floatingLabel>
                        <Label> Repite tu contraseña</Label>
                        <Input
                            secureTextEntry={userData.hiddenRepeatPassword}
                            value={userData.repeatPassword}
                            onChangeText={text => setUserData({...userData,repeatPassword:text})}
                        />
                        <Icon active name={userData.iconRepeatPassword} onPress={switchRepeatPasswordHidden} />
                    </Item>
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