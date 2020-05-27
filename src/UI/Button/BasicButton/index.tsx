import React from 'react';
import { Button } from 'native-base';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        marginTop: 10,
        marginLeft: '15%',
        marginRight: '15%'
    },
    textButton: {
        fontSize: 18,
        color: 'white'
    }
});

interface BasicButtonProps {
    labelButton: string;
    onPress: () => void;
}

const BasicButton: React.FunctionComponent<BasicButtonProps> = props => {
    const { labelButton, onPress } = props;

    return (
        <Button block primary style={styles.button} onPress={onPress}>
            <Text style={styles.textButton}>{labelButton}</Text>
        </Button>
    );
};

BasicButton.propTypes = { labelButton: PropTypes.string.isRequired, onPress: PropTypes.func.isRequired };

export default BasicButton;