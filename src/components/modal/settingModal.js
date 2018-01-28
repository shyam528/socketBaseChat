import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

class SettingModal extends React.Component {
  constructor(props){
    super(props)
  }

  closeModalBox() {
    this.props.onOpenModel = false;
  }

  closeModal() {
    this.props.onCloseModelBox()
  }

  logout(){
    this.props.onLogout()
  }


  render() {
    return(
      <Modal visible={this.props.onOpenModel} transparent={true} onRequestClose={this.closeModalBox.bind(this)} animationType={"fade"}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={this.closeModal.bind(this)}>
            <Icon name="close" size={14} color="black"/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Edit name</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.logout.bind(this)}>
            <Text style={styles.text}>Log out</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContent:{
    width:Dimensions.get('window').width*50/100,
    backgroundColor:'#f1f1f1',
    alignSelf:'flex-end',
    margin:20,
    borderRadius:4,
    padding:20,
  },
  text:{
    fontSize:20,
    color:'black',
    margin:10,
  },
});

export default SettingModal;