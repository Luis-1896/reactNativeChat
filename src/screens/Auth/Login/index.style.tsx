import {StyleSheet} from "react-native";

const styles =StyleSheet.create({
    logo: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginTop: 50,
        marginBottom: 20
    },
    formLogin:{
        margin: 30
    },
    formLoginInput: {
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 5,
        paddingRight: 10
    },
    iconInput: {
        color: 'gray',
        marginRight:0
    },
    textLine: {
        color: 'gray',
        textAlign: 'center',
        margin: 15
    },
    textLineUnderline: {
        color: 'gray',
        textAlign: 'center',
        textDecorationLine: 'underline',
        margin: 15
    }
});

export default styles;