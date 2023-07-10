const formatearCantidad=(cantidad:number): string =>{
    return cantidad.toLocaleString('en-US',{
        style: 'currency',
        currency: 'USD'
    })
}

const generateID=():string=>{
    return Math.random().toString(36).substring(2,11)
}

const formatearFecha=(fecha:Date):string=>{
        const nuevaFecha=new Date(fecha)

        const opciones:Intl.DateTimeFormatOptions={
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        }
        return nuevaFecha.toLocaleDateString('es-ES',opciones)
}

export{
    formatearCantidad,
    generateID,
    formatearFecha
}