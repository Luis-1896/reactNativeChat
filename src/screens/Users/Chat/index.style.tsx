import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    formMessage: {
        width:'100%',
        height:'60%',
        backgroundColor:'white'
    },
    badgeMessageReceived:{
        width:'45%',
        backgroundColor: '#dfe1ee',
        marginTop:'2%',
        marginLeft: '1%',
        height: 'auto',
        paddingLeft:10,
        paddingBottom:10,
        paddingTop:10,
        paddingRight:5
    }
    ,
    badgeMessageSender:{
        width:'45%',
        backgroundColor: '#00C6FF',
        marginLeft:'54%',
        marginTop:'2%',
        height: 'auto',
        paddingLeft:10,
        paddingBottom:10,
        paddingTop:10,
        paddingRight:5
    },
    textSender:{
        color: 'white'
    },
    textReceived:{
        color: 'black'
    }
});

export default styles;