import { View, Text, Button,TouchableHighlight,TouchableOpacity,FlatList,StyleSheet,ScrollView,RefreshControl } from 'react-native'
import React,{useContext,useState,useEffect} from 'react'
import { DataTable,List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/Fontisto';
import {Avatar} from 'react-native-paper'
import {Contexts} from './../../context/Contexts'
import {url} from './../../config/config' // ./

const Tests = ({navigation}) => {
      const [refreshing, setRefreshing] = useState(false);
      const [tests, settests] = useState([])
      const {user, setuser,logged,setlogged} = useContext(Contexts)
      const loadTests= async ()=>{
        setRefreshing(true);
        const response = await fetch(`${url}/pruebas/${user.dni_p}`)
        const data = await response.json()
        settests(data)
        setRefreshing(false);
      }
      useEffect(()=>{
        loadTests()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadTests();
      }, []);
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      nombre: 'Lab1',
      hora_inicio: '15:00',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      nombre: 'Lab2',
      hora_inicio: '17:00',
      hora_Fin: '18:00',
    },

  ];
  // onPress={() => navigation.navigate('DiagnosticDetail',{id: item.id_diagnostico})}
  const Item = ({item}) => (
    <TouchableOpacity onPress={() => navigation.navigate('TestDetail',{id: item.id_prueba})}  >
    <View style={styles.item}>
      
      <View>
      <IconFA name="test-tube" color={'#4CACE1'} size={50}/>
      </View>
      <View style={{paddingLeft:10}}>
        <Text style={styles.nombre}>{item.laboratorio}</Text>
        <Text style={styles.correo}>
          {"Fecha"}: {item.fecha_prueba.substring(8,10)}/{item.fecha_prueba.substring(5,7)}/{item.fecha_prueba.substring(0,4)}
        </Text>
        <Text style={styles.correo}>
          {'Resultado'}: {'- - - - - - - '}
        </Text>
      </View>
      
    </View>
    </TouchableOpacity>
  );
return (
  <ScrollView
      refreshControl={
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
          <IconFA name="blood-test"  color={'#4CACE1'} size={40}/>
          <Text style={{paddingLeft:7,color:'black',fontWeight:'bold',}}>Lista de Pruebas</Text>
    </View>
      {
        tests.map((item)=> <Item key={item.id_prueba} item={item}/>)
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
  positivo: {
    fontSize: 20,
  },
  negativo: {
    fontSize: 20,
  },
  correo: {
    fontSize: 12,
    color:'gray'
  },
});

export default Tests