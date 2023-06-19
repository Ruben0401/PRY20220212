import { View, Text, Button,TouchableHighlight,TouchableOpacity,FlatList,StyleSheet,ScrollView,RefreshControl  } from 'react-native'
import React,{useContext,useState,useEffect} from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar,Switch} from 'react-native-paper'
import {Contexts} from './../context/Contexts'
import {stopLocationTask,startLocationTask,configTask} from './../common/task'


let lastNotificaion = null;

var l1;
var l2;

const Principal = () => {
    const {user, setuser,logged,setlogged} = useContext(Contexts)
    const [locationStarted, setLocationStarted] = React.useState(false);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    
    const colocaONOFF = async()=>{
      if (isSwitchOn) {
        setIsSwitchOn(false);
        stopLocationTask();
      }else{
        setIsSwitchOn(true);
        startLocationTask();
      }
    }
    useEffect(() => {
      configTask();
      setIsSwitchOn(true);
    }, []);

  return (
    <View style={{padding:'2%',backgroundColor:'white'}}>
      <View style={{padding:'3%',borderRadius:6,borderWidth: 1 ,borderColor:'rgba(0, 0, 0, 0.25)'}}>
      <Text style={{fontWeight:'bold',textAlign:'center',textTransform:'uppercase',paddingTop:'8%'}}>Bienvenido {user.nombres} {user.apellidos}</Text>
      <View style={{
            paddingVertical: 15,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent:'space-between',
            alignItems: "center"
      }}>
      <View style={{
            paddingVertical: 15,
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center"
      }}>
          <Icon name="map-marker-radius" color={'#4CACE1'} size={40} />
          <Text style={{paddingLeft:7,color:'black',fontWeight:'bold',}}>Localización</Text>
      </View>
      <View style={{
            paddingVertical: 15,
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center"
      }} >
        <Switch value={isSwitchOn} onValueChange={colocaONOFF} color={'#4CACE1'}/>
      </View>
      </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  btnText: {
      fontSize: 20,
      backgroundColor: 'green',
      color: 'white',
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 10,
  },
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    marginVertical: 8,
    borderRadius:6,
    flexDirection: "row",
    alignItems: "center"
  },
  nombre: {
    fontSize: 15,
    fontWeight:'bold',
    paddingLeft:10,
  },
  positivo: {
    fontSize: 20,
  },
  negativo: {
    fontSize: 20,
  },
  correo: {
    fontSize: 11,
    color:'gray'
  },
});


export default Principal