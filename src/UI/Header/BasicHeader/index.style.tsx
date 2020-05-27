import {StyleSheet, Platform} from "react-native";
import Constants from "expo-constants";
import {ACCENT_COLOR} from "../../../shared/util/constants";


const styles= StyleSheet.create({
    headerBlack: {
        ...Platform.select({
            android: {
                marginTop: Constants.statusBarHeight
            }
        }),
        backgroundColor: ACCENT_COLOR,
        elevation: 10,
        shadowOpacity: 0.8,
        shadowColor: 'gray',
        shadowOffset: {
            height: 5,
            width: 0
        }
    },
    headerLeft: {
        flex: 1
    },
    iconHeader: {
        color: 'white'
    },
    headerCenter: {
        alignItems: 'center',
        flex: 6
    },
    headerTitle: {
        color: 'white',
        fontSize: 18
    },
    headerRight: {
        flex: 1
    },
});

export default styles;