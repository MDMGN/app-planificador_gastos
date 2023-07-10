import { StatusBar } from 'expo-status-bar'
import Constans from 'expo-constants'
import Main from './Main'
import { StyleSheet, View } from 'react-native'

export default function App() {
  return (
    <View style={styles.contenedor}>
          <StatusBar style='light' />
          <Main />
    </View>
  )
}

const styles=StyleSheet.create({
  contenedor: {
    marginTop: Constans.statusBarHeight,
    flex: 1,
    backgroundColor: '#F5F5F5'
  }
})