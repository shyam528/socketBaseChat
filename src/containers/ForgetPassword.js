import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View, Button,StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { NavigationActions } from "react-navigation";

class ForgetPassword extends Component {
    //This function is used for state and method intilisation
    constructor (props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        confirmPassword:'',
      };
      this.submit = this.submit.bind(this);
    }

    //Header of the chat page
    static navigationOptions = {header:false}

    //To onsubmit the forget password
    submit () {
      this.props.navigation.navigate('Login',{})
    }

    render() {
      return (
        <ScrollView style={{padding: 60,backgroundColor:'white'}} keyboardShouldPersistTaps="handled">
          <View style={styles.row}>
            <View>
              <Text style={{fontSize: 27}}>Reset Password</Text>
            </View>
            <TouchableOpacity onPress={()=>this.props.navigation.dispatch(NavigationActions.back())}>
              <Icon name="close" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <TextInput style={{fontSize:16}}
              placeholder='Email' 
              autoCapitalize='none' 
              autoCorrect={false} 
              autoFocus={false} 
              underlineColorAndroid={'rgba(1,1,1,1)'}
              keyboardType='email-address' 
              value={this.state.email} 
              onChangeText={(text) => this.setState({ email: text })} />
          <TextInput style={{fontSize:16}}
              placeholder='Password' 
              autoCapitalize='none' 
              autoCorrect={false} 
              underlineColorAndroid={'rgba(1,1,1,1)'}
              autoFocus={false} 
              value={this.state.password} 
              onChangeText={(text) => this.setState({ password: text })} 
          />
          <TextInput style={{fontSize:16}}
              placeholder='Confirm Password' 
              autoCapitalize='none' 
              autoCorrect={false} 
              underlineColorAndroid={'rgba(1,1,1,1)'}
              secureTextEntry={true} 
              value={this.state.confirmPassword} 
              onChangeText={(text) => this.setState({confirmPassword : text })} />
          <View style={{margin: 7}}/>
          <Button onPress={this.submit.bind(this)} title="Submit"/>
        </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
  row:{
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default ForgetPassword;