import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import RenderIf from '../renderIf';
import Icon from "react-native-vector-icons/MaterialIcons";

class TextMessage extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    var text = this.props.textMessage.text;
    text = text.replace(/<br\s*\/?>/ig, "\r\n")
    if(this.props.textMessage.from === 'bot') {
      return (<View style={{flexDirection:'row',paddingLeft:10}}>
            {RenderIf(this.props.textMessage.chatHead=== true, 
               <Icon name="shopping-cart" size={20} color="#3030A5" />
            )}
            {RenderIf(this.props.textMessage.chatHead=== false, 
              <View style={{paddingLeft:20}}></View>
            )}
            <View style={styles.botMessage}>
              <Text style={styles.text}>{text}</Text>
            </View>
          </View>
      );
    } 
    if(this.props.textMessage.from !== 'bot') {
      return (<View style={{alignSelf: 'flex-end', flexDirection: 'row',paddingRight:10}}>
          <View style={styles.userMessage}>
            <Text style={styles.text}>{text}</Text>
          </View>
          <View style={styles.doubleTick}>
            <Icon name="done-all" size={15} color="white" />
          </View>
        </View>
      );
    }
  }
}

// Initialised the css for this page
const styles = StyleSheet.create({
  botMessage: {
    paddingTop: 2,
    paddingBottom: 5,
    alignSelf: 'flex-start',
    borderRadius: 14,
    marginLeft: 10,
    marginTop:5,
    marginBottom:5,
    backgroundColor: '#4F86ED',
    maxWidth: Dimensions.get('window').width*70/100,
    width:'auto',
    overflow: "hidden"
  },
  userMessage: {
    backgroundColor: "#70B7D4",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 14,
    marginRight: 2,
    marginTop:5,
    marginBottom:5,
    maxWidth: Dimensions.get('window').width*70/100,
    width:'auto',
    overflow: "hidden"
  },
  text: {
    color: "white",
    fontSize:16,
    paddingRight:12,
    paddingLeft:12,
  },
  doubleTick:{
    width:20, 
    height:20, 
    borderRadius: 10, 
    backgroundColor: '#70B7D4', 
    paddingTop:2, 
    paddingLeft:2,
    marginTop:20,
    overflow: "hidden"
  }
});

export default TextMessage;