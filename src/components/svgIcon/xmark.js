import * as React from "react"
import Svg, {Path } from 'react-native-svg';

class XMark extends  React.Component {
	render() {
		return <Svg width="20" height="20" viewBox="0 0 82 82">
			<Path d="M0,0 L80,80" stroke="black" strokeLinecap="round" strokeWidth="2"/>
			<Path d="M80,0 L0,80" stroke="black" strokeLinecap="round" strokeWidth="2"/>
		</Svg>
	}
}

export default XMark
