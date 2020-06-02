import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from 'native-base';
import * as React from 'react';
import { RootStackParamList } from '../../../../App';
import styles from "./index.style";
import InicioScreen from "../Inicio/index";
import SettingsScreen from "../Settings/index";
import Meteor from 'meteor-react-native/src/Meteor';

type HomeScreenNavigationProps = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

interface HomeScreenProps {
    navigation: HomeScreenNavigationProps;
}

const createSlideMenu = (props:any) => {
    const {navigation} = props;

    const logOut=()=>{
        Meteor.logout();
        navigation.navigate('LoginScreen')
    }

    return(
        <DrawerContentScrollView {...props} style={styles.DrawerContentScrollView}>
            <DrawerItemList
                {...props}
                activeTintColor={'#979797'}
                activeBackgroundColor={'#979797'}
                itemStyle={styles.DrawerItemList}
                labelStyle={styles.DrawerItemListLabel}
            />
            <DrawerItem
                style={styles.DrawerItemCustom}
                labelStyle={styles.DrawerItemCustomLabel}
                icon={drawerProps => <Icon name="exit" {...drawerProps} />}
                label="Cerrar sesión"
                onPress={() => logOut()}
            />
        </DrawerContentScrollView>
    );
};

const Drawer=createDrawerNavigator();

const HomeScreen: React.FunctionComponent<HomeScreenProps>=props => {
    return(
        <Drawer.Navigator drawerStyle={{ width: '90%' }} drawerContent={(data: any) => createSlideMenu(data)}>
            <Drawer.Screen
                options={{drawerIcon:() => <Icon name="home" {...props}/>,
                }}
                name="Inicio"
                component={InicioScreen}
            />
            <Drawer.Screen
                options={{drawerIcon:() => <Icon name="cog" {...props}/>}}
                name="Configuración"
                component={SettingsScreen}
            />
        </Drawer.Navigator>
    );
};

export default HomeScreen;