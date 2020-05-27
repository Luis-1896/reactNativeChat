import { StyleSheet } from 'react-native';
import { DISABLED_COLOR_BG, DISABLED_COLOR_FONT } from '../../../shared/util/constants';

export const btnDisabledStyle = StyleSheet.create({
    backgroundColor: {
        backgroundColor: DISABLED_COLOR_BG,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: '5%',
        marginRight: '5%'
    },
    fontColor: {
        color: DISABLED_COLOR_FONT,
        fontSize: 18,
        fontWeight: '700'
    }
});

export const btnBlackStyle = StyleSheet.create({
    backgroundColor: {
        backgroundColor: '#202020',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: '5%',
        marginRight: '5%'
    },
    fontColor: {
        color: 'white',
        fontSize: 18
    }
});

export const btnGrayStyle = StyleSheet.create({
    backgroundColor: {
        backgroundColor: '#7B7B7B',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: '5%',
        marginRight: '5%'
    },
    fontColor: {
        color: 'white',
        fontSize: 18
    }
});

export const btnRedStyle = StyleSheet.create({
    backgroundColor: {
        backgroundColor: '#F06767',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: '5%',
        marginRight: '5%'
    },
    fontColor: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700'
    }
});

export const btnBlueStyle = StyleSheet.create({
    backgroundColor: {
        backgroundColor: '#83E4ED',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: '5%',
        marginRight: '5%'
    },
    fontColor: {
        color: 'black',
        fontSize: 18,
        fontWeight: '700'
    }
});
