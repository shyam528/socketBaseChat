import { StyleSheet, Dimensions } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background: '#B721FF',
};

export default StyleSheet.create({
    exampleContainer: {
        maxHeight:Dimensions.get('window').height*50/100,
        minHeight: Dimensions.get('window').height*20/100,
    },
    title: {
        paddingHorizontal: 10,
        backgroundColor: 'white',
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center'
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: 25
    },
});