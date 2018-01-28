import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Dimensions, AsyncStorage, ScrollView,Image} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { NavigationActions } from "react-navigation";
import SettingModal from '../components/modal/settingModal';
import OpenImageModal from '../components/modal/openImageModal';
import ImagePicker from 'react-native-image-picker';
import RenderIf from '../components/renderIf';
import { connect } from "react-redux"

class Setting extends Component {

  //This function is used for state and method intilisation
  constructor(props){
    super(props)
    this.state = {
      modalVisible: false,
      name:'Anonymous',
      email:'hi@kontikilabs.com',
      avatarSource:{},
      imageModalVisible:false,
    }
  }

  /*
   * When state change, this function will be called
   * and re-render the UI after state value change
   */
  componentDidMount(){
    if(this.props.user.user.userDetail){
      this.setState({
        name: this.props.user.user.userDetail.username,
        email: this.props.user.user.userDetail.email
      });
    }
  }

  //Header of the chat page
  static navigationOptions = {header:false}

  /*This method is called when we click on
   * navigation menu
  */
  navigate(route) {
    return this.props.navigation.dispatch(
      NavigationActions.navigate({ routeName: route })
    );
  }

  //Modal component requires a callback function to set visisble false
  openModalBox() {
    this.setState({
      modalVisible: true
    });
  }

  closeModal() {
    this.setState({
      modalVisible: false
    })
  }

  //Logout the current user 
  logout() {
    this.setState({
      modalVisible: false
    })
    this.props.navigation.navigate('Home',{});
  }

  //To change the account profile pic
  changePhoto() {
    var options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {}
      else if (response.error){}
      else if (response.customButton){}
      else {
        let source = { uri: response.uri };
        this.setState({
          avatarSource: source
        });
      }
    });
  }

  openImage(){
    // this.setState({
    //   imageModalVisible:true
    // });
  }

  closeImageModal(){
    this.setState({
      imageModalVisible: false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => this.navigate("Chat", { isStatusBarHidden: false })}>
              <Icon name="arrow-back" size={24} color="white"/>
            </TouchableOpacity>
            <Text style={{fontSize:24, color:'white'}}>Settings</Text>
            <TouchableOpacity onPress={this.openModalBox.bind(this)}>
              <Icon name="more-vert" size={24} color="white"/>
            </TouchableOpacity>
            <SettingModal onOpenModel={this.state.modalVisible} 
              onCloseModelBox={this.closeModal.bind(this)}
              onLogout={this.logout.bind(this)}
            />
          </View>
        </View>
        <ScrollView  removeClippedSubviews={false} overScrollMode={'always'} contentContainerStyle={{ flexGrow: 1 }} >
          <View style={styles.content}>
            <View style={styles.row}>
              {RenderIf(this.state.avatarSource.uri === undefined,
                <View>
                  <Icon name="account-circle" size={150} color="black"/>
                </View>
              )}
              {RenderIf(this.state.avatarSource.uri !== undefined,
                <View>
                  <TouchableOpacity onPress={this.openImage.bind(this)}>
                    <Image source={this.state.avatarSource} style={{height:150,width:150,borderRadius:75}} />
                  </TouchableOpacity>
                </View>
              )}
              <View style={{paddingTop:20,paddingRight:20}}>
                <Text style={styles.text}>{this.state.name}</Text>
                <Text style={styles.text}>{this.state.email}</Text>
              </View>
            </View>
            {RenderIf(this.state.avatarSource.uri !== undefined,
              <OpenImageModal onOpenImage={this.state.imageModalVisible} 
                imageUrl= {this.state.avatarSourcel}
                onCloseModelImage={this.closeImageModal.bind(this)} />
            )}
            <View style={{marginLeft:65,marginBottom:10}}>
              <View style={{height:40, width:40,borderRadius:20,backgroundColor:'#c6d8e4'}}>
                <TouchableOpacity onPress={this.changePhoto.bind(this)}>
                  <View style={{alignSelf:'center',paddingTop:5}}>
                    <Icon name="photo-camera" size={30} color="black"/>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#c6d8e4",
  },
  header:{
    height:70,
    width: Dimensions.get('window').width,
    backgroundColor:'#156489',
  },
  row:{
    paddingTop:20,
    paddingLeft:20,
    paddingRight:20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text:{
    fontSize: 20,
    color:'black',
  },  
  content:{
    width: Dimensions.get('window').width-20,
    backgroundColor:'white',
    margin:10,
  },
});

function mapStateToProps(state){
  return { user: state.user}
}
export default connect(mapStateToProps)(Setting);