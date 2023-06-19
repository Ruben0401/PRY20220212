import { View, Text, Button,TouchableHighlight,TouchableOpacity,FlatList,StyleSheet,ScrollView,RefreshControl  } from 'react-native'
import React,{useContext,useState,useEffect} from 'react'
import { DataTable,List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/Octicons';
import {Avatar} from 'react-native-paper'
import {url} from './../config/config' // ./
import {Contexts} from './../context/Contexts'

const LocationAround = () => {
    const {user, setuser,logged,setlogged} = useContext(Contexts)
    const [refreshing, setRefreshing] = useState(false);
    const [notificationsnumber, setnotificationsnumber] = useState()
    const loadNotifications= async () =>  {
      setRefreshing(true);
      const response = await fetch(`${url}/alertas`)
      const data = await response.json()
      let notificationes = data.length
      setnotificationsnumber(notificationes)
      setRefreshing(false);
    }
    useEffect(()=>{
      loadNotifications()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      loadNotifications();
    }, []);

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
          <Icon name="map-marker-radius" color={'#4CACE1'} size={40} />
          <Text style={{paddingLeft:7,color:'black',fontWeight:'bold',}}>Localización</Text>
    </View>
    <View>
      <TouchableOpacity style={{
            paddingVertical: 15,
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center"
      }}>
      <IconFA name="alert" color={'#4CACE1'} size={20}/>
      <Text style={styles.nombre}> 
        Notificaciones de Alerta : {notificationsnumber}
      </Text>
      </TouchableOpacity>
    </View>

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

export default LocationAround