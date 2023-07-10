import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native'
import globalStyles from '../styles'
import { formatearCantidad, formatearFecha } from '../helpers'
type Props={
    gasto: Gasto,
    setGasto: React.Dispatch<React.SetStateAction<Gasto>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const categoriesImages:Record<string,ImageSourcePropType>={
    salud: require('../img/icono_salud.png'),
    ahorro: require('../img/icono_ahorro.png'),
    comida: require('../img/icono_comida.png'),
    casa: require('../img/icono_casa.png'),
    ocio: require('../img/icono_ocio.png'),
    suscripciones: require('../img/icono_suscripciones.png'),
    gastos: require('../img/icono_gastos.png')
}

export function Gasto(props:Props) {
    const {setGasto,gasto, setModal} = props
    const {nombre, cantidad, categoria, fecha} = props.gasto
  return (
    <Pressable
        onLongPress={()=>{
            setGasto(gasto)
            setModal(true)
        }}
    >
        <View style={styles.contenedor}>
            <View style={styles.contenido}>
                <View style={styles.contenedorImagen}>
                    <Image 
                            style={styles.imagen}
                            source={categoriesImages[categoria]}
                        />
                        <View style={styles.contenedorTexto}>
                            <Text style={styles.categoria}>{nombre}</Text>
                            <Text style={styles.nombre}>{categoria}</Text>
                            <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>
                        </View>
                    </View>
                <Text style={styles.cantidad}>{formatearCantidad(Number(cantidad))}</Text>
            </View>
        </View>
    </Pressable>
  )
}

const styles=StyleSheet.create({
    contenedor: {
        ...globalStyles.contenedor,
        marginBottom: 20
    },
    contenido:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imagen:{
        width: 80,
        height: 80,
        marginRight: 20
    },
    contenedorImagen:{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    contenedorTexto:{
        flex: 1
    },
    categoria:{
        color: '#94A4B8',
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 5
    },
    nombre:{
        fontSize: 22,
        color: '#6474BB',
        marginBottom: 5
    },
    cantidad: {
        fontSize: 20,
        fontWeight: '700'
    },
    fecha:{
        fontWeight: '700',
        color: '#DB2777',
        fontSize: 20,
    }
})
