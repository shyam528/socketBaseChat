import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import RenderIf from '../renderIf';

class QuickReplyMessage extends React.Component {
  constructor(props){
    super(props)
  }

  quickReply(content) {
    this.props.onQuickReply(content)
  }

  render() {
    return(
      <View>
        <View style={styles.botMessage}>
          <Text style={styles.text}>{this.props.quickReplyMessage.quickReply.text}</Text>
        </View>
        {RenderIf(this.props.messageList.length-1 === this.props.qrIndex,
          <ScrollView contentContainerStyle={styles.row} horizontal={true} showsHorizontalScrollIndicator={false}>
            {this.props.quickReplyMessage.quickReply.buttons.map((content, index) => {
              return (
                <View style={styles.button} key={index}>
                  <Text style={styles.label} onPress={this.quickReply.bind(this, content)}>{content.title}</Text>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }
}

// Initialised the css for this page
const styles = StyleSheet.create({
  botMessage: {
    backgroundColor: "#4F86ED",
    padding: 10,
    alignSelf: 'flex-start',
    borderRadius: 14,
    marginLeft: 40,
    marginTop:5,
    marginBottom:5,
    maxWidth: Dimensions.get('window').width*70/100,
    width:'auto',
  },
  text: {
    color: "white",
    fontSize:16,
    paddingRight:5,
    paddingLeft:5,
  },
  row: {
    flexDirection: "row",
    flexWrap:'wrap',
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 40,
    paddingRight: 60,
    marginTop:5,
    marginBottom:5, 
  },
  label: {
    textAlign: "center",
    color: '#009DC2',
    fontSize: 16,
  },
  button: {
    width:'auto',
    height: 40,
    borderRadius: 14,
    borderWidth: 1.8,
    borderColor: '#009DC2',
    backgroundColor: "white",
    justifyContent: "center",
    padding:12,
    marginLeft:10,
    marginBottom:10,
  },
});

export default QuickReplyMessage;