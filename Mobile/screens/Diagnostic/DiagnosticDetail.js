import { View, Text, Button,TouchableHighlight,TouchableOpacity,StyleSheet } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import { DataTable,List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native';
import {url} from './../../config/config'
import {Contexts} from './../../context/Contexts'

const DiagnosticDetail = ({navigation,route}) => {

  const {user, setuser,logged,setlogged} = useContext(Contexts)
  const [diagnostic, setdiagnostic] = useState({

    id_diagnostico:'',
    dni_p : '',
    enfermedad : '', 
    fecha : '', 
    estado : '', 
    descripcion : '',
  })
  const loadDiagnostic = async()=>{
    let id = route.params.id
    let diagnostic = {}
    const res=await fetch(`${url}/diagnosticos/${id}/info`)
    const data= await res.json()
    diagnostic = {
      id_diagnostico: data.id_diagnostico,
      dni_p : data.dni_p,
      enfermedad : data.enfermedad, 
      fecha : data.fecha, 
      estado : data.estado, 
      descripcion : data.descripcion, 
    }
    setdiagnostic(diagnostic)
    console.log(route.params.id)
    
  }

  useEffect(()=> {
    loadDiagnostic()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[route.params.id])

return (
  <View style={{padding:'2%',}}>
  <View style={{padding:'3%',borderRadius:6,borderWidth: 1 ,borderColor:'rgba(0, 0, 0, 0.25)'}} >
    <View>
      <View style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              flexDirection: "row",

              alignItems: "center"
      }}>
            <Icon name="file-document-outline"  color={'#4CACE1'} size={40}/>
            <Text style={{paddingLeft:7,color:'black',fontWeight:'bold',}}>Detalle de Diagnostico</Text>
      </View>
    </View>
    <View style={{ paddingTop:4,paddingBottom:4, borderWidth: 2,borderRadius:6,shadowColor:'gray',shadowOpacity:1,borderColor:'rgba(0, 0, 0, 0.25)'}}>
      <View style={{padding:'3%',alignItems:'center',alignContent:'center',}}>
        <Icon name="file-sign"  color={'#4CACE1'} size={90}/>
        <View style={{paddingTop:'4%',alignItems:'center',alignContent:'center',}}>
          <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'bold',fontSize:15,}}>Paciente</Text>
          <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'600',fontSize:13,}}>{user.nombres} {user.apellidos}</Text>
        </View>
        <View style={{paddingTop:'4%',alignItems:'center',alignContent:'center',}}>
          <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'bold',fontSize:15,}}>Posible Enfermedad</Text>
          <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'600',fontSize:13,}}>{diagnostic.enfermedad}</Text>
        </View>
        <View style={{paddingTop:'4%',alignItems:'center',alignContent:'center',}}>
          <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'bold',fontSize:15,}}>Fecha de Registro</Text>
          <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'600',fontSize:13,}}>
            {diagnostic.fecha.substring(8,10)} / {diagnostic.fecha.substring(5,7)} / {diagnostic.fecha.substring(0,4)}
          </Text>
        </View>
        <View style={{paddingTop:'4%',alignItems:'center',alignContent:'center',}}>
          <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'bold',fontSize:15,}}>Estado</Text>
          <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'600',fontSize:13,}}>{diagnostic.estado}</Text>
        </View>
        <View style={{paddingTop:'4%',alignItems:'center',alignContent:'center',}}>
          <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'bold',fontSize:15,}}>Descripción</Text>
          <TextInput multiline={true} numberOfLines={10}  editable={false}
          style={{paddingTop:4,paddingBottom:0,color:'black',fontWeight:'600',fontSize:12, height:100, textAlignVertical: 'top',}}>
            {diagnostic.descripcion}
          </TextInput>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Diagnosticos')}>
          <View style={styles.boton}>
          <Text style={{paddingTop:4,paddingBottom:4,color:'white',fontWeight:'bold',fontSize:15,}}>Regresar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
  </View>
)
}

const styles = StyleSheet.create({

  boton: {
    backgroundColor: '#4CACE1',
    padding: 20,
    paddingTop:5,
    paddingBottom:5,
    marginVertical: 8,
    borderRadius:6,
  },
  nombre: {
    fontSize: 20,
  }
});

export default DiagnosticDetail