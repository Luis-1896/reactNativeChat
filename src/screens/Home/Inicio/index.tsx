import React from 'react';
import { Image,View} from 'react-native';
import { Body,Button, Container, Left, Right,Header } from 'native-base';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../../../../App';
import BasicButton from "../../../UI/Button/BasicButton";
import styles from "./index.style";

type InicioScreenNavigationProps = DrawerNavigationProp<RootStackParamList, 'InicioScreen'>;

interface InicioScreenProps {
    navigation: InicioScreenNavigationProps;
}

const InicioScreen: React.FunctionComponent<InicioScreenProps> = props => {
    const {navigation}=props;
    return(
        <Container>
            <Header noShadow={true} transparent={true}>
                <Left>
                    <Button transparent style={styles.buttonLogo} onPress={()=>navigation.openDrawer()}>
                        <Image source={require('../../../assets/logo.png')} style={styles.logo}/>
                    </Button>
                </Left>
                <Body />
                <Right />
            </Header>
            <View style={styles.bottom}>
                <BasicButton
                    labelButton={"Lista de Jugadores"}
                    onPress={() => navigation.navigate('ListUsersScreen')}
                />
            </View>
        </Container>
    );
};

export default InicioScreen;