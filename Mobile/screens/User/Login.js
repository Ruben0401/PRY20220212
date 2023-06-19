import { View, Text,Image,StyleSheet,TouchableOpacity } from 'react-native'
import React,{useContext,useState} from 'react'
import { TextInput } from 'react-native'
import { Button } from 'react-native'
import ImageLogo from './../img/Logo-Principal.png'
import {Contexts} from './../../context/Contexts'
import {url} from './../../config/config' // ./
import * as SecureStore from 'expo-secure-store';

const Login = () => {
    const {user, setuser,logged,setlogged} = useContext(Contexts)
    const [loading, setloading] = useState(false);
    const [userLog, setuserLog] = useState({

      correo : '', 
      password_p : '',
  
    })
    const handleSubmit= async () =>{  
      setloading(true)
      const res =await fetch(`${url}/pacientes/log`,
      {

          method:'POST',
          headers: {'Content-type':'application/json'},
          body: JSON.stringify(userLog),
      })
      const {status} = await res
      const data = await res.json()
      if (status === 200) {
        const us = {
          dni_p : data.dni_p,
          nombres : data.nombres, 
          apellidos : data.apellidos, 
          fecha_nacimiento : data.fecha_nacimiento, 
          sexo : data.sexo, 
          edad : data.edad, 
          telefono : data.telefono, 
          correo : data.correo, 
          direccion : data.direccion, 
          password_p : data.password_p,
        }
        await SecureStore.setItemAsync("USER_INFO", JSON.stringify(us));
        setuser(us)
        setlogged(true);
        setloading(false);
      }else{
        
        console.log("nada")
        setloading(false);
      }
      
      
      
  }
    const handleChange = (name,value)=>{
      setuserLog({...userLog,[name]: value});
    }
  return (
    <View style={{alignItems:'center',alignContent:'center',paddingTop:20,paddingBottom:20}}>
      <View >
      <Image source={ImageLogo} style={styles.stretch}  />
      </View>
      <Text style={{fontWeight:'bold',textAlign:'center',textTransform:'uppercase',paddingTop:10,paddingBottom:18,fontSize:20,color:'#63C7FF',}}>Disease Safety System</Text>
      <View style={{alignItems:'center',alignContent:'center',paddingTop:20,paddingBottom:20}}>
      <Text style={styles.headerInput}>Correo</Text>
      <TextInput placeholder='coloca tu correo' textContentType='emailAddress' style={styles.input} onChangeText={(text)=>handleChange('correo',text)}>
      </TextInput>
      <Text style={styles.headerInput}>Contraseña</Text>
      <TextInput secureTextEntry placeholder="ingresa tu contraseña" style={styles.input} onChangeText={(text)=>handleChange('password_p',text)}>
      </TextInput>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.textButton} >{ loading ? "Cargando.." : "Iniciar Sesión" }</Text>
      </TouchableOpacity>

    </View>
  )
}
const styles=StyleSheet.create({
  headerInput:{
    fontWeight:'bold',
    textAlign:'center',
    paddingTop:6,
    paddingBottom:6,
    fontSize:20,
    color:'black',
  },
  textButton:{
    fontWeight:'bold',
    textAlign:'center',
    paddingTop:6,
    paddingBottom:6,
    fontSize:15,
    color:'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1C1B25',
    borderRadius:30,
    padding: 5,
    paddingRight:40,
    paddingLeft:40,
  },
  input:{
    fontWeight:'normal',
    textAlign:'center',
    paddingTop:3,
    paddingBottom:3,
    fontSize:15,
    color:'black',
    backgroundColor:'#F5F5F5',
    borderRadius:10,
    width:300,
    borderColor:'rgba(0, 0, 0, 0.25)',
    borderWidth:.5,
  },
  container: {
    paddingTop: 50,
  },
  stretch: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
  },

})

export default Login