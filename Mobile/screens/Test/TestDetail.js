import { View, Text, Button,TouchableHighlight,TouchableOpacity,StyleSheet } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import { DataTable,List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/Fontisto';
import { TextInput } from 'react-native';
import {url} from './../../config/config'
import {Contexts} from './../../context/Contexts'

const TestDetail = ({navigation,route}) => {
    const {user, setuser,logged,setlogged} = useContext(Contexts)
    const [test, settest] = useState({
      id_prueba: '',
      fecha_prueba : '',
      dni_p : '',
      tipo_prueba : '', 
      laboratorio : '', 
      resultado : '', 
    })
    const loadTest = async()=>{
      let id = route.params.id
      let test = {}
      const res=await fetch(`${url}/pruebas/${id}/info`)
      const data= await res.json()
      test = {
        id_prueba : data.id_prueba,
        fecha_prueba : data.fecha_prueba,
        dni_p: data.dni_p,
        tipo_prueba : data.tipo_prueba,
        laboratorio : data.laboratorio, 
        resultado : data.resultado, 
      }
      settest(test)
    }
    useEffect(()=> {
      loadTest()
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
              <Icon name="test-tube"  color={'#4CACE1'} size={40}/>
              <Text style={{paddingLeft:7,color:'black',fontWeight:'bold',}}>Detalle de Prueba</Text>
        </View>
      </View>
      <View style={{ paddingTop:4,paddingBottom:4, borderWidth: 2,borderRadius:6,shadowColor:'gray',shadowOpacity:1,borderColor:'rgba(0, 0, 0, 0.25)'}}>
        <View style={{padding:'3%',alignItems:'center',alignContent:'center',}}>
          <IconFA name="test-tube" color={'#4CACE1'} size={90}/>
          <View style={{paddingTop:'4%',alignItems:'center',alignContent:'center',}}>
            <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'bold',fontSize:15,}}>Paciente</Text>
            <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'600',fontSize:13,}}>{user.nombres} {user.apellidos}</Text>
          </View>
          <View style={{paddingTop:'4%',alignItems:'center',alignContent:'center',}}>
            <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'bold',fontSize:15,}}>Enfermedad que se Comprobó</Text>
            <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'600',fontSize:13,}}>{test.tipo_prueba}</Text>
          </View>
          <View style={{paddingTop:'4%',alignItems:'center',alignContent:'center',}}>
            <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'bold',fontSize:15,}}>Fecha de Prueba</Text>
            <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'600',fontSize:13,}}>
            {test.fecha_prueba.substring(8,10)} / {test.fecha_prueba.substring(5,7)} / {test.fecha_prueba.substring(0,4)}
            </Text>
          </View>
          <View style={{paddingTop:'4%',alignItems:'center',alignContent:'center',}}>
            <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'bold',fontSize:15,}}>Laboratorio</Text>
            <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'600',fontSize:13,}}>{test.laboratorio}</Text>
          </View>
          <View style={{paddingTop:'4%',alignItems:'center',alignContent:'center',}}>
            <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'bold',fontSize:15,}}>Resultado</Text>
            <Text style={{paddingTop:4,paddingBottom:4,color:'black',fontWeight:'600',fontSize:13,}}>{test.resultado}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Pruebas')}>
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

export default TestDetail