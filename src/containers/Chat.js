import React from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';
import DeviceInfo from 'react-native-device-info';
import Footer from '../components/footer/index';
import CarouselFiles from '../components/carousel/index';
import Icon from "react-native-vector-icons/MaterialIcons";
import TextMessage from '../components/messages/TextMessage';
import QuickReplyMessage from '../components/messages/QuickReply';
import DotsLoader from '../components/typing/index';
import RenderIf from '../components/renderIf';
import Moment from 'moment';
import { connect } from "react-redux"
import * as userAction  from "../actions/userActions"

const CONFIG = require('../../config.json');

class ChatContainer extends React.Component {
  //This function is used to initialise state and method
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      typing:'',
    };

    //function initialisation
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.quickReply = this.quickReply.bind(this)

    //client Socket connect to server 
    this.socket = SocketIOClient(CONFIG.backendSocketIp, { transports: ['websocket'] });

    /* Below parameteres are required 
     * to emit signup intent
     */
    var inputJSON = {
      text: 'Get Started',
      senderId: DeviceInfo.getUniqueID(),
      platform: CONFIG.platform,
      bot: CONFIG.bot,
      payload: 'sign_up',
      from: 'user',
      isSetIntent: true,
      responseType: 'TEXT_MESSAGE',
      botId: CONFIG.botId,
    }
    this.socket.emit('process_query',inputJSON)

    //Client will listen the message here
    this.socket.on('send_response_to_user_'+CONFIG.botId+'_'+DeviceInfo.getUniqueID(), this.onReceivedMessage);
  }

  //Header of the chat page
  static navigationOptions = ({ navigation, screenProps }) => ({
    drawerLabel: "Chat",
    title: CONFIG.homePageSubtitle,
    headerTitleStyle: {
      color:'white'
    },
    headerStyle: {
      backgroundColor:'#156489',
    },
    headerLeft: (
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
          <Icon name="menu" size={30} color="white" />
        </TouchableOpacity>
      </View>
    )
  });

  //Send response to bot on click the QR button
  quickReply(data) {
    this.setState({
      typing: 'on',
    })
    var inputJSON = {
      text: data.title,
      senderId: DeviceInfo.getUniqueID(),
      platform: CONFIG.platform,
      bot: CONFIG.bot,
      payload: data.payload,
      isSetIntent: false,
      responseType:'TEXT_MESSAGE',
      botId: CONFIG.botId
    }
    this.state.messages.push(inputJSON);
    this.socket.emit('process_query', inputJSON);
  };

  //on change  the input text
  ChangeTextInput = (inputText: string) => {
    this.setState({
      inputText,
    })
  };

  //on submit the input text
  onSubmitTextInput = () => {
    var message = this.state.inputText;
    var inputJSON = {
      text: message,
      senderId: DeviceInfo.getUniqueID(),
      platform: CONFIG.platform,
      bot: CONFIG.bot,
      payload: null,
      from: 'user',
      isSetIntent: false,
      responseType: 'TEXT_MESSAGE',
      botId: CONFIG.botId,
    }
    this.setState({
      inputText: '',
      typing: 'on',
    })
    this.state.messages.push(inputJSON);
    this.socket.emit('process_query', inputJSON);
  };

  /**
   * When the server sends a message to client.
   */
  onReceivedMessage(messages) {
    this.setState({
      inputText: '',
      typing: 'off',
    })
    if(messages !== 'typing_off' && messages !== 'typing_on' ) {
      this.state.messages.push(messages)
      this.forceUpdate()
    }
  }

  // This method render the UI in app
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chatContent}>
          <ScrollView  contentContainerStyle={{ flexGrow: 1 }} 
            ref={ref => this.scrollView = ref} onContentSizeChange={(contentWidth, contentHeight)=>{        
            this.scrollView.scrollToEnd({animated: true});
          }}>
            {this.state.messages.map((message, key) => {
              switch(message.responseType) {
                case 'TEXT_MESSAGE':
                  return(<View key={key}>
                      <TextMessage textMessage={message} />
                    </View>
                  );
                  break;
                case 'QUICK_REPLY':
                  return (<View key={key}>
                      <QuickReplyMessage quickReplyMessage={message} onQuickReply={this.quickReply} messageList={this.state.messages} qrIndex={key}/>
                    </View>
                  );
                  break;
                case 'IMAGE_MESSAGE':
                  return (<View key={key} style={styles.botMessage}>
                      <Image style={{width: 80, height: 60, marginLeft:2, marginRight:2}} source={{uri:message.image}} />
                    </View>
                  );
                  break;
                case 'CAROUSEL_MESSAGE':
                  return (
                    <View key={key} style={styles.carouselMessage}>
                      <CarouselFiles carouselList={message.carousel}/>
                    </View>
                  );
                  break;
              } 
            })}
            {RenderIf(this.state.typing=== 'on', 
              <View style={{marginLeft: 20, flexDirection: 'row'}}>
                <Icon name="shopping-cart" size={20} color="#3030A5" />
                <DotsLoader/>
              </View>
            )}
          </ScrollView>
        </View>
        <Footer 
          onChange={this.ChangeTextInput} 
          value={this.state.inputText}
          onSubmit={this.onSubmitTextInput}
        />
      </View>
    );
  }
}

// Initialising the css for this page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  chatContent:{
    paddingTop: 10,
    marginBottom:70,
  },
  botMessage: {
    backgroundColor: "white",
    paddingTop: 5,
    paddingBottom: 5,
    alignSelf: 'flex-start',
    borderRadius: 8,
    marginLeft: 20,
    marginTop:5,
    marginBottom:5,
    maxWidth: Dimensions.get('window').width*70/100,
  },
  userMessage: {
    backgroundColor: "#70B7D4",
    alignSelf: 'flex-end', 
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 8,
    marginRight: 10,
    marginTop:5,
    marginBottom:5,
    maxWidth: Dimensions.get('window').width*70/100,
  },
  carouselMessage: {
    paddingTop: 5,
    paddingBottom: 5,
    alignSelf: 'flex-start',
    borderRadius: 4,
    marginLeft: 10,
    marginTop:5,
    marginBottom:5,
  },
  text: {
    color: "black",
    fontSize:16,
    paddingRight:5,
    paddingLeft:5,
  },

  footContainer: {
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
});

function mapStateToProps(state){
  return { user: state.user}
}
export default connect(mapStateToProps)(ChatContainer);