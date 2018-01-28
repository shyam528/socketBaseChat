import { AppRegistry } from 'react-native';
import Main from './src/main';
console.ignoredYellowBox = ['Remote debugger is in a background','Setting a timer'];
AppRegistry.registerComponent('socketChatBot', () => Main);
