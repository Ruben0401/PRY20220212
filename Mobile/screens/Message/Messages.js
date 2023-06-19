import { View, Text, Button,TouchableHighlight,TouchableOpacity,FlatList,StyleSheet,ScrollView,RefreshControl } from 'react-native'
import React,{useContext,useState,useEffect} from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from 'react-native-paper'
import {Contexts} from './../../context/Contexts'
import {url} from './../../config/config'



const Messages = ({navigation}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [roommessages, setroommessages] = useState([])
    const [roomComponents, setRoomComponents] = useState(<></>)
    const loadRoomMessages= async ()=>{
      const response = await fetch(`${url}/salamensajes`)
      const data = await response.json()
      setroommessages(data)
    }
    const loadDoctor = async (dni)=>{
      const res=await fetch(`${url}/doctores/${dni}`)
      const data= await res.json()
      
      let dato = data.apellidos
      return dato
    }
    const loadDoctorEm = async (dni)=>{
      const res=await fetch(`${url}/doctores/${dni}`)
      const data= await res.json()
      
      let dato = data.correo
      return dato
    }
    const loadRoomComponent=async(data)=>{
      let components=await Promise.all(data.map(async(roommessage)=>{
        return(
        <TouchableOpacity key={roommessage.id_sala} onPress={() => navigation.navigate('MessageDetail',{id: roommessage.id_sala,dni_d: roommessage.dni_d})}>
        <View style={styles.item}>
          <View>
          <Avatar.Image source={require('../img/AvatarMedico.png')} size={50} style={{backgroundColor:'white'}}/>
          </View>
          <View style={{paddingLeft:10}}>
            <Text style={styles.nombre}>{'Dr. '}{await loadDoctor(roommessage.dni_d)}</Text>
            <Text style={styles.correo}>{await loadDoctorEm(roommessage.dni_d)}</Text>
          </View>
          
        </View>
        </TouchableOpacity>
        )
      }
      ))
      setRoomComponents(components)
      setRefreshing(false);
    }
    useEffect(()=>{
      loadRoomComponent(roommessages)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[roommessages])
    useEffect(()=>{
      loadRoomMessages()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      loadRoomMessages();
      loadRoomComponent(roommessages)
      
    }, [roommessages]);

    const Item = ({item}) => (
      <TouchableOpacity key={item.id_sala} onPress={() => navigation.navigate('MessageDetail',{id: item.id_sala})}>
      <View style={styles.item}>
        <View>
        <Avatar.Image source={require('../img/AvatarMedico.png')} size={50} style={{backgroundColor:'white'}}/>
        </View>
        <View style={{paddingLeft:10}}>
          <Text style={styles.nombre}>{(item.dni_d)}</Text>
          <Text style={styles.correo}>{item.dni_p}</Text>
        </View>
        
      </View>
      </TouchableOpacity>
    );
    {/* <FlatList
        data={roommessages}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
    /> */}
  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>
    }>
    <View style={{padding:'2%',backgroundColor:'white'}} >
    <View style={{padding:'3%',borderRadius:6,borderWidth: 1 ,borderColor:'rgba(0, 0, 0, 0.25)'}} >
      <View style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              flexDirection: "row",
              
              alignItems: "center"
      }}>
            <Icon name="inbox"  color={'#4CACE1'} size={40}/>
            <Text style={{paddingLeft:7,color:'black',fontWeight:'bold',}}>Bandeja de Mensajes</Text>
      </View>
      
      {roomComponents}
      

    </View>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
    fontSize: 20,
  },
  correo: {
    fontSize: 10,
    color:'gray'
  },
});
export default Messages