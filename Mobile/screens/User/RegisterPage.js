import { View, Text,Image,StyleSheet,TouchableOpacity,ScrollView,TextInput,Button,Platform } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { useLinkTo } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React,{useState} from 'react'
import {url} from './../../config/config' // ./
import ImageLogo from './../img/Logo-Principal.png'

const RegisterPage = ({navigation}) => {
  
    const linkTo = useLinkTo();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [loading, setloading] = useState(false)
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };
    const [patient, setpatient] = useState({

      dni_p : '',
      nombres : '', 
      apellidos : '', 
      fecha_nacimiento : '', 
      sexo : '', 
      edad : '', 
      telefono : '', 
      correo : '', 
      direccion : '', 
      password_p : '',

    })
    const handleSubmit= async () =>{  
        setloading(true)
        const res =await fetch(`${url}/pacientes`,
        {
  
            method:'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(patient),
        })
        const data = await res.json()
        console.log(data)
        setloading(false);
        navigation.navigate('Inicio')
  
    }
  
    const handleChange = (name,value)=>{
      
      if (name==="fecha_nacimiento") {
        setShow(false);
        const fecha = value.substring(5,9)+"-"+ + value.substring(3,4)+"-"+value.substring(0,2)
        setpatient({...patient,[name]: fecha});
      }
      else{
        setpatient({...patient,[name]: value});
      }

      
    }
  
    const showMode = (currentMode) => {
      if (Platform.OS === 'android') {
        setShow(true);
        // for iOS, add a button that closes the picker
      }
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
  return (
    <ScrollView>
    <View style={{alignItems:'center',alignContent:'center',paddingTop:20,paddingBottom:20}}>
      <View >
      <Image source={ImageLogo} style={styles.stretch}  />
      </View>
      <Text style={{fontWeight:'bold',textAlign:'center',textTransform:'uppercase',paddingTop:10,paddingBottom:18,fontSize:20,color:'#63C7FF',}}>Disease Safety System</Text>
      <View style={{alignItems:'center',alignContent:'center',paddingTop:20,paddingBottom:20}}>
      <Text style={styles.headerInput}>DNI</Text>
      <TextInput placeholder="Coloca tu DNI"  style={styles.input} onChangeText={(text)=>handleChange('dni_p',text)} >
      </TextInput>
      <Text style={styles.headerInput}>Nombres</Text>
      <TextInput placeholder="Coloca tus Nombres"  style={styles.input}  onChangeText={(text)=>handleChange('nombres',text)}>
      </TextInput>
      <Text style={styles.headerInput}>Apellidos</Text>
      <TextInput placeholder="Coloca tus Apellidos"  style={styles.input}  onChangeText={(text)=>handleChange('apellidos',text)}>
      </TextInput>
      <Text style={styles.headerInput}>Fecha de Nacimiento</Text>
      <TouchableOpacity style={styles.input} onPress={showDatepicker}>
      <Text style={styles.textButtonDate}>{date.toLocaleString().substring(0,10)}</Text>
      </TouchableOpacity>
      
      {
      (show) ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          onChange={(e,selectedValue)=>
          {
            handleChange('fecha_nacimiento',selectedValue.toLocaleString())
            onChange(e,selectedValue)
          }}
        />)
        :(<></>)}
      <Text style={styles.headerInput}>Genero</Text>
      <View style={styles.inputSelect}>
        <Picker style={{  width: 300}} onValueChange={(value)=>handleChange('sexo',value)} selectedValue={patient.sexo} >
          <Picker.Item style={{fontSize:14,}} label="--Seleciona un Genero--" enabled={false} />
          <Picker.Item style={{fontSize:14,}} label="Femenino" value={'Femenino'} />
          <Picker.Item style={{fontSize:14,}} label="Masculino" value={'Masculino'} />
        </Picker>
      </View>
      <Text style={styles.headerInput}>Edad</Text>
      <TextInput placeholder='Coloca tu edad'  style={styles.input} onChangeText={(text)=>handleChange('edad',text)}>
      </TextInput>
      <Text style={styles.headerInput}>Telefono</Text>
      <TextInput placeholder='Coloca tu Telefono'  style={styles.input} onChangeText={(text)=>handleChange('telefono',text)}>
      </TextInput>
      <Text style={styles.headerInput}>Correo Electrónico</Text>
      <TextInput placeholder='Coloca tu correo' textContentType='emailAddress' style={styles.input} onChangeText={(text)=>handleChange('correo',text)} >
      </TextInput>
      <Text style={styles.headerInput}>Dirección</Text>
      <TextInput placeholder="Coloca tu Dirección"  style={styles.input} onChangeText={(text)=>handleChange('direccion',text)}>
      </TextInput>
      <Text style={styles.headerInput}>Contraseña</Text>
      <TextInput secureTextEntry placeholder="Ingresa tu contraseña" style={styles.input} onChangeText={(text)=>handleChange('password_p',text)}>
      </TextInput>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.textButton} >{ loading ? "Cargando.." : "Registrarse" }</Text>
      </TouchableOpacity>
      
    </View>
    </ScrollView>
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
  textButtonDate:{
    fontWeight:'normal',
    textAlign:'center',
    paddingTop:6,
    paddingBottom:6,
    fontSize:15,
    color:'black',
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
  inputSelect:{
    textAlign:'center',
    fontSize:20,
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

export default RegisterPage

