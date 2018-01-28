import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './index.style';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.5;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        borderWidth: 1,
        borderRadius: entryBorderRadius,
        borderColor:'#aaa',
        overflow:'hidden',
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        resizeMode: 'cover',
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        backgroundColor: 'white',
    },
    title: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        paddingLeft: 5,
    },
    subtitle: {
        paddingLeft: 5,
        marginTop: 6,
        color:'black',
        fontSize: 12,
        fontStyle: 'italic'
    },
    column: {
        flexDirection: "column",
        flexWrap:'wrap',
        paddingTop: 5,
        justifyContent: "center",
        marginTop:5,
    },
    label: {
        textAlign: "center",
        color: 'white',
        fontSize: 16,
        marginTop: 2,
    },
    button: {
        width:'auto',
        height: 30,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#0399D3'
    },
    slideInnerContainerWithoutImage: {
        width: itemWidth,
        borderWidth: 1,
        borderRadius: entryBorderRadius,
        borderColor:'#aaa',
        overflow:'hidden',
    },
    textContainerWithoutImage:{
        backgroundColor: 'white',
        height: slideHeight*25/100,
    },
    buttonWithoutImage: {
        width:'auto',
        height: 25,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#0399D3',
        bottom:0
    },
    labelWithoutImage: {
        textAlign: "center",
        color: 'white',
        fontSize: 20,
        paddingLeft:4,
    },
});