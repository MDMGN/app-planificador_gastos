import {SetStateAction, useEffect, useState} from 'react'
import { Pressable, View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyles from '../styles'


type Props={
    setModal: React.Dispatch<SetStateAction<boolean>>,
    handleGasto: (gasto:Gasto)=>void,
    gasto: Gasto,
    setGasto:  React.Dispatch<SetStateAction<Gasto>>
    gastos:  Gasto[],
    setGastos:  React.Dispatch<SetStateAction<Gasto[]>>
}
export function FormularioGasto(props:Props){

    const [nombre, setNombre]=useState('')
    const [cantidad, setCantidad]=useState('')
    const [categoria, setCategoria]=useState('')
    const [id, setID]=useState<string | undefined>(undefined)
    const [fecha, setFecha]=useState(new Date())
    const {setModal, handleGasto, gasto, setGasto, gastos,setGastos} =props

    useEffect(()=>{
        if(gasto?.id){
            setNombre(gasto.nombre)
            setCantidad(gasto.cantidad.toString())
            setCategoria(gasto.categoria)
            setID(gasto.id)
            setFecha(gasto.fecha)
        }
    },[gasto])

    const handleEliminar=()=>{
        const gastosActulizados=gastos.filter(gastoState=> gastoState.id !== gasto.id)
        setGastos(gastosActulizados)
        setGasto({} as Gasto)
        setModal(false)
    }

  return (
    <View style={styles.contenedor}>
            <View>
                <View style={styles.contenedorBotones}>
                    <Pressable
                        style={[styles.btn,styles.btnCancelar]}
                        onLongPress={()=>{
                            setGasto({} as Gasto)
                            setModal(false)
                        }}
                    > 
                        <Text style={styles.btnCancelarTexto}>Cancelar</Text>
                    </Pressable>
                   {(gasto?.id) && (<Pressable
                        style={[styles.btn,styles.btnEliminar]}
                        onLongPress={()=>{
                            Alert.alert('Deseas eliminar el gasto?',
                                        'Los gastos eliminados no se pueden recuperar.',
                                        [{text:'Cancelar', style:'cancel'},
                                        {text:'Si, eliminar',onPress: handleEliminar}])
                        }}
                    > 
                        <Text style={styles.btnCancelarTexto}>Eliminar</Text>
                    </Pressable>)}
                </View>
            </View>
            <View style={styles.formulario}>
                <Text style={styles.titulo}>
                        {gasto?.id ? 'Editar Gasto' : 'Nuevo Gasto'}
                </Text>
                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre Gasto</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Nombre del gasto. ej. Comida'
                        value={nombre}
                        onChangeText={setNombre}
                    />
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Cantidad Gasto</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        placeholder='Cantidad del gasto. ej. 300'
                        value={cantidad}
                        onChangeText={setCantidad}
                    />
                </View>
                <View style={styles.campo}>
                        <Text style={styles.label}>Categoria Gastos</Text>
                        <Picker
                            style={styles.input}
                            selectedValue={categoria}
                            onValueChange={setCategoria}
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
            <View>
                <Pressable 
                    style={styles.submitBtn}
                    onPress={()=>{
                        handleGasto({id,nombre,cantidad,categoria,fecha})
                    }}
                >
                    <Text style={styles.submitBtnTexto}>{ gasto?.id ? 'Editar Gasto' : 'Agregar Gastos'}</Text>
                </Pressable>
            </View>
            </View>
    </View>
  )
}
const styles=StyleSheet.create({
    contenedor: {
        backgroundColor: '#1E40AF',
        flex: 1
    },
    formulario:{
        ...globalStyles.contenedor
    },
    titulo:{
        textAlign: 'center',
        fontSize: 28,
        marginBottom: 30,
        color: '#647488'
    },
    campo:{
        marginVertical: 10
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
    submitBtn:{
        backgroundColor: '#3B82F6',
        padding: 10,
        marginTop: 20
    },
    submitBtnTexto:{
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    contenedorBotones:{
        flexDirection: 'row',
    },
    btn:{
        padding: 10,
        marginTop: 30,
        marginHorizontal: 20,
        flex: 1
    },
    btnCancelar:{
        backgroundColor: '#DB2777',
    },
    btnEliminar:{
        backgroundColor: 'red'
    },
    btnCancelarTexto:{
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center'
    }
})