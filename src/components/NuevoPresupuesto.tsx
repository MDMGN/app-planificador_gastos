import {SetStateAction, useState} from 'react'
import { View , Pressable, Text, StyleSheet, TextInput} from "react-native";
import globalStyles from '../styles';

type Props={
  handlePresupuesto: (presupuesto: number) => void,
  presupuesto: number,
  setPresupuesto: React.Dispatch<SetStateAction<number>>
}

export function NuevoPresupuesto(props:Props) {
  const {setPresupuesto, presupuesto, handlePresupuesto} = props
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}> Definir Presupuesto</Text>

      <TextInput 
        style={styles.input}
          keyboardType="numeric"
          placeholder="Agrega tu presupuesto"
          value= {presupuesto ? presupuesto.toString() : ''}
          onChangeText={value=>setPresupuesto(Number(value))}
      />
        <Pressable style={styles.boton}
          onPress={()=> handlePresupuesto(presupuesto)}
        >
          <Text style={styles.botonTexto}>Agregar Presupuesto</Text>
        </Pressable>
    </View>
  )
}

const styles=StyleSheet.create({
  contenedor:{
    ...globalStyles.contenedor
  },
  label:{
    textAlign: 'center',
    fontSize: 24,
    color: '#3B82F6'
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 30
  },
  boton: {
    marginTop: 30,
    backgroundColor: '#1048A4',
    padding: 10,
    borderRadius: 10
  },
  botonTexto:{
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
})