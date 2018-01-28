import React from 'react';
import {View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
class Footer extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      message: '',
	    };
	    this.sendText = this.sendText.bind(this);
	}

	sendText() {
		this.props.onSubmit();
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput style={styles.input}
					onChangeText={this.props.onChange}
					value={this.props.value}
					autoCapitalize={'none'}
					autoCorrect={false}
					clearButtonMode={"while-editing"} 
					onSubmitEditing={this.props.onSubmit}
					autoFocus={false}
					placeholder={'Type your message'}
					multiline={true}
					underlineColorAndroid={'rgba(0,0,0,0)'}
				/>
				<TouchableOpacity style={{alignSelf:'center',marginRight:5,bottom:0}} onPress={this.sendText.bind(this)}> 
                    <Icon name="send" size={30} color="#70B7D4"/>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		maxHeight:100,
		bottom:0,
		width: Dimensions.get('window').width-20,
		borderRadius: 16,
    	borderWidth: 1.8,
    	borderColor:'#aaa',
		marginLeft:10,
		marginRight:10,
		marginBottom:10,
		flexDirection:'row',
		justifyContent:'space-between',
	},
	input: {
		color:'black',
		marginLeft:5,
		fontSize:20, 
		borderBottomWidth: 0,
		borderBottomColor: 'transparent',
		width:Dimensions.get('window').width*80/100, 
	}
})

export default Footer;