import { View, Text, Button,TouchableHighlight,TouchableOpacity,FlatList,StyleSheet,ScrollView,RefreshControl } from 'react-native'
import React,{useContext,useState,useEffect} from 'react'
import { DataTable,List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {url} from './../config/config' // ./
import {Contexts} from './../context/Contexts'

const Cites = () => {
      const {user, setuser,logged,setlogged} = useContext(Contexts)
      const [refreshing, setRefreshing] = useState(false);
      const [cites, setcites] = useState([])
      const [citeComponents, setCiteComponents] = useState(<></>)
      const loadCites= async ()=>{
        const response = await fetch(`${url}/citas/${user.dni_p}`)
        const data = await response.json()
        setcites(data)
        setRefreshing(false);
      }
      useEffect(()=>{
        loadCites()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadCites();
      }, []);

      const Item = ({item}) => (
        <TouchableOpacity >
        <View style={styles.item}>
          <View>
          <IconFA name="calendar-check-o" color={'#4CACE1'} size={50}/>
          </View>
          <View style={{paddingLeft:10}}>
            <Text style={styles.nombre}>
              {item.fecha.substring(8,10)}/{item.fecha.substring(5,7)}/{item.fecha.substring(0,4)}
            </Text>
            <Text style={styles.correo}>{item.hora_inicio.substring(0,5)} - {item.hora_fin.substring(0,5)}</Text>
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
          <Icon name="calendar-month-outline"  color={'#4CACE1'} size={40}/>
          <Text style={{paddingLeft:7,color:'black',fontWeight:'bold',}}>Calendario de Citas</Text>
    </View>

      {
        cites.map((item)=> <Item key={item.id_cita} item={item}/>)
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
    fontSize: 20,
  },
  correo: {
    fontSize: 10,
    color:'gray'
  },
});

export default Cites