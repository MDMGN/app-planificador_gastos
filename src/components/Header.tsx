import { Text, StyleSheet, View } from "react-native";

export function Header() {
  return (
        <View>
            <Text style={styles.texto}>Planificador de Gastos</Text>
        </View>
  )
}

const styles=StyleSheet.create({
    texto:{
        textAlign: 'center',
        fontSize: 30,
        color: '#FFF',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingTop: 40,
    }
})