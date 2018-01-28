import React from 'react';
import { View, Dimensions, StyleSheet, Modal,Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

class OpenImageModal extends React.Component {
  constructor(props){
    super(props)
  }

  closeModalBox() {
    this.props.onOpenModel = false;
  }

  closeModal() {
    this.props.onCloseModelImage()
  }


  render() {
    console.log("this.props",this.props);
    return(
      <Modal visible={this.props.onOpenImage} transparent={true} onRequestClose={this.closeModalBox.bind(this)} animationType={"fade"}>
        <View style={styles.modalContent}>
          <Image source={this.props.imageUrl} style={{width:100, height:100}} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContent:{
    width:Dimensions.get('window').width*90/100,
    height:Dimensions.get('window').height*50/100,
    backgroundColor:'#f1f1f1',
    margin:20,
    padding:20,
  },
});

export default OpenImageModal;