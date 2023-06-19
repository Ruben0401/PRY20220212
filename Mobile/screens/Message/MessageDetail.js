import { View, Text, Button,TouchableHighlight,TouchableOpacity,StyleSheet,ScrollView } from 'react-native'
import React,{useState,useContext,useEffect}  from 'react'
import { DataTable,List } from 'react-native-paper';
import {Avatar} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIO from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native';
import {url} from './../../config/config'
import {Contexts} from './../../context/Contexts'
import { measure } from 'react-native-reanimated';
import ImgMedico from './../img/AvatarMedico.png'
import ImgPaciente from './../img/AvatarPaciente.png'

const MessageDetail = (props) => {
    const {navigation,route} = props;
    const {user, setuser,logged,setlogged} = useContext(Contexts)
    const [timerID,setTimeID] = useState(null)
    const [loading, setloading] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setmessages] = useState([])
    const [message, setmessage] = useState({
      dni_p : '',
      id_sala : '', 
      texto : '', 
    })
    const [doctor, setdoctor] = useState({

      dni_d : '',
      nombres : '', 
      apellidos : '', 
      fecha_nacimiento : '', 
      sexo : '', 
      edad : '', 
      telefono : '', 
      correo : '', 
      especialidad : '', 
      password_d : '',

    }) 
    const loadMessages= async ()=>{
      let id = route.params.id;
      const response = await fetch(`${url}/mensajes/${id}`)
      const data = await response.json()
      setmessages(data)
    }
    const loadDoctor = async()=>{
      let dni_d= route.params.dni_d;
      const res=await fetch(`${url}/doctores/${dni_d}`)
      const data= await res.json()
      setdoctor({
        dni_d : data.dni_d,
        nombres : data.nombres, 
        apellidos : data.apellidos, 
        fecha_nacimiento : data.fecha_nacimiento.substring(0, 10), 
        sexo : data.sexo, 
        edad : data.edad, 
        telefono : data.telefono, 
        correo : data.correo, 
        especialidad : data.especialidad, 
        password_d : data.password_d,
      })
    }

    const handleChange = (name,value)=>{
    setInput(value);
    setmessage({...message,[name]: value});
    }
    const handleSubmit= async (e) =>{
      e.preventDefault();
  
      setloading(true);
      //Registrar Sala de los mensajes
        let messageNew={}  
        messageNew = {
          ...message,
          dni_p:user.dni_p,
          id_sala: route.params.id
        }
        setmessage(messageNew)
        await fetch(`${url}/mensajes/p`,
        {
            method:'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(messageNew),
        })
      
        setloading(false);
        setInput('')
    }
    useEffect(()=>{
      loadDoctor()
      loadMessages()
      let intervalID = setInterval(loadMessages, 1000);
      setTimeID(intervalID)
      return ()=>{
          clearInterval(intervalID)
          // cleanup
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props])
  return (
    <View style={{padding:'2%',}}>
    <View style={{padding:'3%',borderRadius:6,borderWidth: 1 ,borderColor:'rgba(0, 0, 0, 0.25)'}} >
    <ScrollView  >
      <View>
        <View style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
        }}>
            <View style={{
                flexDirection: "row",
                alignItems: "center"
                }}>              
                <Avatar.Image source={require('../img/AvatarMedico.png')} size={40} style={{backgroundColor:'white',borderColor:'black',borderWidth:1}}/>
                <Text style={{paddingLeft:7,color:'black',fontWeight:'bold',}}>Doctor: {'Hola'}</Text>
            </View>
            <TouchableOpacity onPress={() => {
              clearInterval(timerID);
              navigation.navigate('Mensajes')}}>
                <IconIO name="arrow-back-circle-outline"  color={'#4CACE1'} size={40}></IconIO>
            </TouchableOpacity>

        </View>
      </View>
      
      <View style={{ paddingTop:4,paddingBottom:4, borderWidth: 2,borderRadius:6,shadowColor:'gray',shadowOpacity:1,borderColor:'rgba(0, 0, 0, 0.25)'}}>
      
        <View style={{padding:'3%',alignItems:'center',alignContent:'center',}}>
          
          {
            messages.map((message)=>(
              <View key={message.id_mensaje} style={{paddingTop:'4%',alignItems:'center',alignContent:'center',flexDirection: "row",alignItems: "center",padding:8}}>
              <Avatar.Image  source={ message.dni_p ? ImgPaciente : ImgMedico} size={30} style={{backgroundColor:'white',borderColor:'black',borderWidth:1}}/>
                <View style={[styles.mensaje,]}>
                <TextInput multiline={true} numberOfLines={4}  editable={false}
                style={{color:'black',fontWeight:'500',fontSize:12, height:70,width:'auto', textAlignVertical: 'top',}}>
                    {message.texto}
                </TextInput>
                </View>
              </View>
            ))
          }

          

          <View style={{paddingTop:'4%',alignItems:'center',alignContent:'center',flexDirection: "row",alignItems: "center",padding:8,}}>
            <View style={[styles.mensaje,]}>
            <TextInput multiline={true} numberOfLines={4}  placeholder='Escribir Mensaje de Texto' value={input} 
              onChangeText={(text)=>handleChange('texto',text)}
              style={{color:'black',fontWeight:'500',fontSize:12, height:70,width:'auto', textAlignVertical: 'top',}}>
            </TextInput>
            </View>
            <TouchableOpacity onPress={handleSubmit}>
            <Icon name="send-circle"  color={'#4CACE1'} size={40}></Icon>
            </TouchableOpacity>
          </View>          
        </View>
        
      </View>
      </ScrollView>
    </View>
    </View>
  )
  }
  
  const styles = StyleSheet.create({
  
    mensaje: {
      backgroundColor: '#F6F6F6',
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

export default MessageDetail