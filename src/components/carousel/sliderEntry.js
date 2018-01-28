import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './styles/sliderEntry.style';
import DeviceInfo from 'react-native-device-info';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';

const CONFIG = require('../../../config.json');

export default class SliderEntry extends Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient(CONFIG.backendSocketIp, { transports: ['websocket'] });
    // this.openWebUrl = this.openWebUrl.bind(this);
    // this.onButtonClick = this.onButtonClick.bind(this);
  }

  static propTypes = {
      data: PropTypes.object.isRequired,
      parallax: PropTypes.bool,
      parallaxProps: PropTypes.object
  };

  onButtonClick(data) {
    var inputJSON = {
      text: data.title,
      senderId: DeviceInfo.getUniqueID(),
      platform: CONFIG.platform,
      bot: CONFIG.bot,
      payload: data.payload,
      isSetIntent: true,
      responseType:'TEXT_MESSAGE',
      botId: CONFIG.botId
    }
    this.socket.emit('process_query', inputJSON);
  }

  get image () {
    const { data: { image_url }, parallax, parallaxProps,  } = this.props;
    return parallax ? (
        <ParallaxImage
          source={{ uri: image_url }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0}
          showSpinner={false}
          {...parallaxProps}
        />
    ) : (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
    );
  }

  openWebUrl(content) {
    Linking.openURL(content.url)
  }

  render () {
    const { data: { title, subtitle, price, buttons } } = this.props;
    if(this.props.data.image_url !== "") {
      return (
          <View style={styles.slideInnerContainer}>
            <View style={styles.imageContainer}>
              { this.image }
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2} >
                {title}
              </Text>
              <Text style={styles.subtitle} numberOfLines={2}>
                { subtitle }
              </Text>
            </View> 
            <View style={styles.column}>
              {buttons.map((content, index) => {
                if(content.type === 'web_url') {
                  return (
                    <TouchableOpacity style={styles.button} key={index}>
                      <Text style={styles.label} onPress={this.openWebUrl.bind(this, content)}>{content.title}</Text>
                    </TouchableOpacity>
                  )
                } else {
                  return (
                    <TouchableOpacity style={styles.button} key={index}>
                      <Text style={styles.label} onPress={this.onButtonClick.bind(this, content)}>{content.title}</Text>
                    </TouchableOpacity>
                  )
                }
              })}
            </View>
        </View>
      );
    } else {
      return (
          <View style={styles.slideInnerContainerWithoutImage}>
              <View style={styles.textContainerWithoutImage}>
                <Text style={styles.title} numberOfLines={2} >
                  {title}
                </Text>
                <Text style={styles.subtitle} numberOfLines={2}>
                  { subtitle }
                </Text>
              </View>
              <View style={styles.column}>
                {buttons.map((content, index) => {
                  if(content.type === 'web_url') {
                    return (
                      <TouchableOpacity style={styles.buttonWithoutImage} key={index}>
                        <Text style={styles.labelWithoutImage} onPress={this.openWebUrl.bind(this, content)}>{content.title}</Text>
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <TouchableOpacity style={styles.buttonWithoutImage} key={index}>
                        <Text style={styles.labelWithoutImage} onPress={this.onButtonClick.bind(this, content)}>{content.title}</Text>
                      </TouchableOpacity>
                    );
                  }
                })}
              </View>
          </View>
      );
    }
  }
}