import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Gasto } from './Gasto'

type Props={
    gastos: Gasto[],
    setGasto: React.Dispatch<React.SetStateAction<Gasto>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    filter: string,
    filterGastos: Gasto[]
}

export function ListadoGastos(props:Props) {
    const {gastos, setGasto, setModal, filter, filterGastos}=props
  return (
    <View style={styles.contenedor}>
            <Text style={styles.titulo}>Gastos</Text>

            {filter ? filterGastos.map(gasto=>(<Gasto key={gasto.id} gasto={gasto} setGasto={setGasto} setModal={setModal}/>))
                    : gastos.map(gasto=>(<Gasto key={gasto.id} gasto={gasto} setGasto={setGasto} setModal={setModal}/>))
            }

            {(gastos.length===0 || (filterGastos.length === 0 && !!filter ))
            && (<Text style={styles.noGastos}>No hay gastos</Text>)}
    </View>
  )
}
const styles=StyleSheet.create({
    contenedor:{
        marginTop: 70,
        marginBottom: 100
    },
    titulo:{
        color: '#647488',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 20
    },
    noGastos:{
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 20
    }
})