import { View, Text, Button,TouchableHighlight,TouchableOpacity,ScrollView,RefreshControl } from 'react-native'
import React,{useContext,useState,useEffect} from 'react'
import { DataTable,List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Contexts} from './../../context/Contexts'
import {url} from './../../config/config' // ./

const Diagnostics = ({navigation}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [diagnostics, setdiagnostics] = useState([])
    const {user, setuser,logged,setlogged} = useContext(Contexts)
    const loadDiagnostics= async ()=>{
      const response = await fetch(`${url}/diagnosticos/${user.dni_p}`)
      const data = await response.json()
      setdiagnostics(data)
    }

    useEffect(()=>{
      loadDiagnostics()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      loadDiagnostics();
      setRefreshing(false);
      
    }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>
      }>
    <View style={{padding:'2%',}}>
    <View style={{padding:'3%',borderRadius:6,borderWidth: 1 ,borderColor:'rgba(0, 0, 0, 0.25)'}} >
      <View style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              flexDirection: "row",
              
              alignItems: "center"
      }}>
            <Icon name="file-document-outline"  color={'#4CACE1'} size={40}/>
            <Text style={{paddingLeft:7,color:'black',fontWeight:'bold',}}>Visualización de Diagnosticos</Text>
      </View>
     <DataTable style={{ borderWidth: 2,borderRadius:6,shadowColor:'gray',shadowOpacity:1,borderColor:'rgba(0, 0, 0, 0.25)'}}>
      <DataTable.Header style={{ borderWidth: 0, borderBottomWidth:2,borderBottomColor:'rgba(0, 0, 0, 0.25)',borderRadius:5,backgroundColor:'#4CACE1'}} >
        <DataTable.Title style={{flex: 2,justifyContent:'center'}} textStyle={{color:'white',fontWeight:'bold',fontSize:15}}>Fecha</DataTable.Title>
        <DataTable.Title style={{flex: 4,justifyContent:'center'}} textStyle={{color:'white',fontWeight:'bold',fontSize:15}}>Enfermedad</DataTable.Title>
        <DataTable.Title style={{flex: 2,justifyContent:'center'}} textStyle={{color:'white',fontWeight:'bold',fontSize:15}}>Ver</DataTable.Title>
      </DataTable.Header>

      {
        diagnostics.map((diagnostic)=>(
          <DataTable.Row key={diagnostic.id_diagnostico} >
            <DataTable.Cell style={{flex: 2,justifyContent:'center'}}textStyle={{color:'black',fontWeight:'600',fontSize:13}}>
            {diagnostic.fecha.substring(8,10)}/{diagnostic.fecha.substring(5,7)}/{diagnostic.fecha.substring(0,4)}
            </DataTable.Cell>
            <DataTable.Cell style={{flex: 4,justifyContent:'center'}}textStyle={{color:'black',fontWeight:'600',fontSize:13}}>
              {diagnostic.enfermedad}
            </DataTable.Cell>
            <DataTable.Cell style={{flex: 2,justifyContent:'center'}}textStyle={{color:'black',fontWeight:'600',fontSize:13}}>
            <TouchableOpacity onPress={() => navigation.navigate('DiagnosticDetail',{id: diagnostic.id_diagnostico})}>
              <View>
              <Icon name="information-outline"  color={'black'} size={25}/>
              </View>
            </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        ))
      }

      
    </DataTable>
    </View>
    </View>
    </ScrollView>
  )
}


export default Diagnostics