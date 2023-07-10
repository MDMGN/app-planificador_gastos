import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import globalStyles from '../styles'
import { Picker } from '@react-native-picker/picker'

type Props={
    gastos: Gasto[],
    filter : string,
    setFilter: React.Dispatch<React.SetStateAction<string>>,
    setFilteGastos: React.Dispatch<React.SetStateAction<Gasto[]>>
}
export  function FiltroGastos(props:Props) {
    const {gastos, filter, setFilter, setFilteGastos} = props

    useEffect(()=>{
        if(filter === ''){
            setFilteGastos([] as Gasto[])
        }else{
            const filterGastosActulizado=gastos.filter(gasto=> gasto.categoria === filter)
            setFilteGastos(filterGastosActulizado)
        }
    },[filter])

  return (
    <View style={styles.contenedor}>
        <Text style={styles.label}>Filtrar Gastos: </Text>
        <Picker
            style={styles.input}
            selectedValue={filter}
            onValueChange={setFilter}
        >
            <Picker.Item label='-- Seleccione --' value={''} />
            <Picker.Item label='Comida' value={'comida'}  />
            <Picker.Item label='Ahorro' value={'ahorro'} />
            <Picker.Item label='Casa' value={'casa'} />
            <Picker.Item label='Gastos Varios' value={'gastos'} />
            <Picker.Item label='Salud' value={'salud'} />
            <Picker.Item label='Suscripciones' value={'suscripciones'} />
        </Picker>
    </View>
  )
}

const styles=StyleSheet.create({
    contenedor:{
        ...globalStyles.contenedor,
        transform: [{translateY: 0}],
        marginTop: 70
    },
    label:{
        color: '#647488',
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold'
    },
    input:{
            backgroundColor: '#F5F5F5',
            padding: 10,
            borderRadius: 10,
            marginTop: 10
    },
})
