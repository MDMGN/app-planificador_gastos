import { View, Text, Image, StyleSheet } from "react-native";
import globalStyles from "../styles";
import { formatearCantidad } from "../helpers";
import { useEffect, useState } from "react";
import * as Progress from 'react-native-progress';

type Props={
  presupuesto: number,
  gastos: Array<Gasto>
}
export function ControlPresupuesto(props:Props) {
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  const [porcentaje, setPorcentaje] = useState(0)

  const {presupuesto, gastos}=props

  useEffect(()=>{
      const totalGastado= gastos.reduce((total,{cantidad})=>  total + Number(cantidad),0)
      const totalDisponible= presupuesto - totalGastado
      const nuevoPorcentaje=  (presupuesto - totalDisponible) / presupuesto

      setTimeout(()=> setPorcentaje(nuevoPorcentaje),1000)
      
      setGastado(totalGastado)
      setDisponible(totalDisponible)
  },[gastos])

  return (
    <View style={styles.centrarGrafica}>
      <View style={styles.contenedor}>
        <Progress.Circle 
                size={240} 
                indeterminate={false} 
                progress={porcentaje}  
                showsText={true}
                animated={true}
                thickness={10}
                textStyle={{fontSize: 40, color: 'blue', textAlign: 'center' }}
                formatText={value => `${value*100}% Gastado`}
        />
        <View style={styles.contenedorTexto}>
          <Text style={styles.valor}>
                <Text style={styles.label}>Presupuesto: </Text>
                {formatearCantidad(presupuesto)}
          </Text>
          <Text style={styles.valor}>
                <Text style={styles.label}>Gastado: </Text>
                {formatearCantidad(gastado)}
          </Text>
          <Text style={styles.valor}>
                <Text style={styles.label}>Disponible: </Text>
                {formatearCantidad(disponible)}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles= StyleSheet.create({
  contenedor:{
    ...globalStyles.contenedor
  },
  centrarGrafica: {
    alignItems: 'center',
  },
  image:{
    width: 250,
    height: 250
  },
  contenedorTexto:{
    marginTop: 50
  },
  valor:{
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10
  },
  label:{
    fontWeight: '700',
    color: '#3882F6'
  }
})
