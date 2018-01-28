import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import RenderIf from '../renderIf';
import DeviceInfo from 'react-native-device-info';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';

const CONFIG = require('../../../config.json');

class CarouselTemplate extends React.Component {
  constructor(props){
    super(props)
    this.socket = SocketIOClient(CONFIG.backendSocketIp, { transports: ['websocket'] });
  }

  onButtonClick(buttonData) {
    var inputJSON = {
      text: buttonData.title,
      senderId: DeviceInfo.getUniqueID(),
      platform: CONFIG.platform,
      bot: CONFIG.bot,
      payload: buttonData.payload,
      isSetIntent: true,
      responseType:'TEXT_MESSAGE',
      botId: CONFIG.botId
    }
    this.socket.emit('process_query', inputJSON);
  }

  render() {
    return(
      <View style={styles.row}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {this.props.carouselList.map((content, index) => {
            return (
              <View style={styles.carousel} key={index}>
                <Text style={styles.title} >{content.title}</Text>
                <View style={styles.column}>
                  {content.buttons.map((button, indexValue) => {
                    return (
                      <View style={styles.button} key={indexValue}>
                        <Text style={styles.label} onPress={this.onButtonClick.bind(this,button)} >{button.title}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

// Initialised the css for this page
const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize:20,
    padding:5,
    fontWeight: 'bold', 
    height:80,
  },
  row: {
    flexDirection: "row",
    margin:10,
    paddingLeft:10,
  },
  label: {
    textAlign: "center",
    color: '#009DC2',
    fontSize: 16,
  },
  carousel: {
    width: Dimensions.get('window').width-80,
    height: 150,
    borderRadius: 10,
    borderWidth: 1.8,
    borderColor: '#009DC2',
    backgroundColor: "white",
    marginLeft:10,
    marginBottom:10,
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
    backgroundColor: '#0399D3',
  },
  column: {
    flexDirection: "column",
    flexWrap:'wrap',
    paddingTop: 5,
    justifyContent: "center",
    marginTop:5,
  },
});

export default CarouselTemplate;