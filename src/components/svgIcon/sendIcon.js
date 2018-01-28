import React from 'react';
import Svg, {Path } from 'react-native-svg';

class SendButton extends React.Component {
	render() {
		return (
			<Svg xmlns="http://www.w3.org/2000/svg" 
				width="30" height="30" viewBox="0 0 24 24">
				<Path  d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
			</Svg>
		);
	}
}

export default SendButton;
