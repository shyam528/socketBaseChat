import * as React from "react"
import { StyleSheet, View } from "react-native"
import { Provider } from "react-redux"
import store from "./store"
import App from "./App"

const styles = StyleSheet.create({
	view: {
		flex: 1,
		backgroundColor: "#000",
	},
});

class Main extends React.Component<{}, {}> {	
	render() {
		console.log("store",store);
		return <Provider store={store}>
			<View style={styles.view}>
				<App />
			</View>
		</Provider>
	}
}

export default Main
