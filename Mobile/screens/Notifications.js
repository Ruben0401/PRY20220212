import { View, Text, Button,TouchableHighlight,TouchableOpacity,FlatList,StyleSheet,ScrollView,RefreshControl  } from 'react-native'
import React,{useContext,useState,useEffect} from 'react'
import { DataTable,List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/Octicons';
import {Avatar} from 'react-native-paper'
import {url} from './../config/config' // ./
import {Contexts} from './../context/Contexts'

const Notifications = () => {
    const {user, setuser,logged,setlogged} = useContext(Contexts)
    const [refreshing, setRefreshing] = useState(false);
    const [notifications, setnotifications] = useState([])
    const loadNotifications= async () =>  {
      setRefreshing(true);
      const response = await fetch(`${url}/alertas`)
      const data = await response.json()
      setnotifications(data)
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

    const Item = ({item}) => (
      <TouchableOpacity >
      <View style={styles.item}>

        <View>
        <IconFA name="alert" color={'#4CACE1'} size={50}/>
        </View>
        <View style={{paddingLeft:10}}>
          <Text style={styles.nombre}>{"Cuidate!! Hay un contagiado cerca"}</Text>
          <Text style={styles.correo}>{"Fecha"}:  {item.fecha.substring(8,10)}/{item.fecha.substring(5,7)}/{item.fecha.substring(0,4)}</Text>
          <Text style={styles.correo}>{"Hora"}:  {item.fecha.substring(11,13)}:{item.fecha.substring(14,16)}</Text>
        </View>

      </View>
      </TouchableOpacity>
    );
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
          <Icon name="bell" color={'#4CACE1'} size={40} />
          <Text style={{paddingLeft:7,color:'black',fontWeight:'bold',}}>Notificaciones</Text>
    </View>
    {
        notifications.map((item)=> <Item key={item.id_alerta} item={item}/>)
    }
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

export default Notifications