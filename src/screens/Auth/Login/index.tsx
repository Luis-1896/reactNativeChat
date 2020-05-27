import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Form, Icon, Input, Item,Label  } from 'native-base';
import React, { useState } from 'react';
import { Image, ScrollView, Text } from 'react-native';
import { RootStackParamList } from '../../../../App';
import BasicButton from "../../../UI/Button/BasicButton";
import styles from "./index.style";


type  LoginScreenNavigationProps = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

interface LoginScreenProps {
    navigation: LoginScreenNavigationProps;
}

interface UserData {
    username: string;
    password: string;
    hidePassword: boolean;
    passwordIconName: 'eye' | 'eye-off';
}

const LoginScreen: React.FunctionComponent<LoginScreenProps>=props => {
    const {navigation} =props;

    const [userData, setUserData] = useState<UserData>({
        hidePassword: true,
        password: '',
        passwordIconName: 'eye',
        username: ''
    });

    const switchPasswordHidden = () => {
        const { hidePassword } = userData;
        setUserData({
            ...userData,
            hidePassword: !hidePassword,
            passwordIconName: hidePassword ? 'eye-off' : 'eye'
        });
    };

    const singIn = () => {
        console.log(userData);
        navigation.navigate('HomeScreen')
        // TODO: Aquí iria la consulta del endpoint de Meteor
        //navigation.navigate('HomeScreen');
    }

    return(
        <Container>
            <ScrollView>
                <Image source={require('../../../assets/logo.png')} style={styles.logo} />
                <Form style={styles.formLogin}>
                    <Item floatingLabel>
                        <Label>Usuario</Label>
                        <Input
                            value={userData.username}
                            onChangeText={text => setUserData({ ...userData, username: text })}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Contraseña</Label>
                        <Input
                            secureTextEntry={userData.hidePassword}
                            value={userData.password}
                            onChangeText={text => setUserData({...userData,password:text})}
                        />
                        <Icon active name={userData.passwordIconName} onPress={switchPasswordHidden} />
                    </Item>
                    <BasicButton labelButton={"Iniciar Sesión"}
                                 onPress={singIn} />
                    <Text style={styles.textLine}>
                        {`¿No tienes cuenta? `}
                        <Text style={styles.textLineUnderline}
                              onPress={()=>navigation.navigate('SignupScreen')}>
                            Registrate
                        </Text>
                    </Text>
                </Form>
            </ScrollView>
        </Container>
    );
};

export default LoginScreen;
