import {useEffect, useState} from 'react'
import { StyleSheet, Alert, View, Pressable, Image, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {  ControlPresupuesto, FormularioGasto, Header, ListadoGastos, NuevoPresupuesto, FiltroGastos } from './src/components';
import { generateID } from './src/helpers';

export default function Main() {
  const [presupuesto, setPresupuesto] = useState(0)
  const [isValidPresupuesto, setIsValidPresupesto]=useState(false)
  const [gastos,setGastos]= useState<Gasto[]>([] as Gasto[])
  const [modal, setModal]= useState(false)
  const [gasto,setGasto] = useState({} as Gasto)
  const [filter, setFilter] = useState('')
  const [filterGastos, setFilterGastos] = useState ([] as Gasto[])

  useEffect(()=>{
      const obtenerPresupuesto=async()=>{
          try{
              const presupuestoStorage=await AsyncStorage.getItem('planificador-presupuesto') ?? 0
              if(presupuestoStorage !== 0){
                  setPresupuesto(Number(presupuesto))
                  setIsValidPresupesto(true)
              }
          }catch(error){
              console.error(error)
          }
      }
      obtenerPresupuesto()
  },[])

  useEffect(()=>{
      if(isValidPresupuesto){
        const cargarPresupuesto=async()=>{
          try{
            await AsyncStorage.setItem('planificador-presupuesto',JSON.stringify(presupuesto))
          }catch(error){
              console.error(error)
          }
      }

      cargarPresupuesto()}
  },[isValidPresupuesto])

  useEffect(()=>{
    const obtenerGastos=async()=>{
        try{
            const gastosStorage=await AsyncStorage.getItem('planificador-gastos')
                setGastos(gastosStorage ? JSON.parse(gastosStorage) : [])
        }catch(error){
            console.error(error)
        }
    }

    obtenerGastos()
},[])

useEffect(()=>{
    const cargarGastos=async()=>{
        try{
          await AsyncStorage.setItem('planificador-gastos',JSON.stringify(gastos))
        }catch(error){
            console.error(error)
        }
    }

    cargarGastos()
},[gastos])

  const handlePresupesto=(presupuesto:number)=>{
      if(presupuesto > 0){
          setIsValidPresupesto(true)
          setModal(!modal)
      }else{
        Alert.alert('Error','El presupuesto no puede ser 0 o menor')
      }
  }

  const handleGasto=(gasto:Gasto)=>{
      if([gasto.nombre,gasto.cantidad,gasto.categoria].includes('')){
        Alert.alert('Error','Complete todos los campos')
        return
      }

      if(gasto?.id){
        const gastosActulizados=gastos.map(gastoState=>
           gastoState.id === gasto.id ? gasto : gastoState
        )
        setGastos(gastosActulizados)
      }else{
        gasto.id=generateID()
        setGastos([...gastos,gasto])
      }
        setGasto({} as Gasto)
        setModal(!modal)
  }

  return (
    <View>
        <ScrollView>
            <View style={styles.header}>
              <Header />
                {isValidPresupuesto ? (<ControlPresupuesto
                                          gastos={gastos}
                                        presupuesto={presupuesto}          
                                      />) : 
                                    (<NuevoPresupuesto 
                                          handlePresupuesto={handlePresupesto} 
                                          presupuesto={presupuesto}
                                          setPresupuesto={setPresupuesto} 
                                    />)}
            </View>

            {gastos.length > 0 && (<FiltroGastos gastos={gastos} filter={filter} setFilter={setFilter} setFilteGastos={setFilterGastos} />)}

            {isValidPresupuesto && (<ListadoGastos gastos={gastos} setGasto={setGasto} setModal={setModal} filter={filter} filterGastos={filterGastos}/>)}
        </ScrollView>
      {modal && (
        <Modal 
          animationType='slide'
          visible={modal}
          onRequestClose={()=>{
            setModal(!modal)
          }}
        >
          <FormularioGasto
            handleGasto={handleGasto}
            setModal={setModal}
            gasto={gasto}
            setGasto={setGasto}
            gastos={gastos}
            setGastos={setGastos}
           />
        </Modal>
      )}
      
      {isValidPresupuesto && (
        <Pressable 
          style= {styles.pressable}
          onPress={()=> setModal(!modal)}
        >
          <Image
            style={styles.image}
            source={require('./src//img/nuevo-gasto.png')}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: '#3B82F6',
    minHeight: 480
  },
  pressable:{
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  image: {
    width: 60,
    height: 60
  }
});
