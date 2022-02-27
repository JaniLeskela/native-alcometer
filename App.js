import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View,Button } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import {Picker} from '@react-native-picker/picker';




export default function App() {

  const [weight, setWeight] = useState(0);
  const [bottles, setBottles] = useState(1);
  const [gender, setGender] = useState('male');
  const [time, setTime] = useState(1);
  const [promille,setPromille] = useState(0);

  const genders = [
    {label: 'Male', value: 'male'},
    {label: "Female", value: 'female'}
  ];

  function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }

  const numBottles=range(1,20)
  const hours=range(1,24)

  function Calculate() {
    let result = 0;
    let litres = bottles * 0.33;
    let grams = litres * 8 *4.5;
    let burning = weight / 10;
    let gramsleft = grams - burning * time;
    

    if(gender ==='male') {
      result = (gramsleft / (weight * 0.7));
    }
    if(gender ==='female') {
      result = (gramsleft / (weight * 0.6));
    }

    if (result < 0) {
      result = 0;
    }
    
    setPromille(result)
  }


  return (
    <View style={styles.container}>
      
     <View> 
        <Text style={styles.label}> Weight</Text> 
        <TextInput value={weight}
       onChangeText={text => setWeight(text)}
       keyboardType='numper-pad'
      placeholder="Type in your weight"
       ></TextInput>
    
    </View>
    <View> 
      <Text style={styles.label}> Bottles</Text>
      <Picker 
        selectedValue={bottles}
        onValueChange={(itemValue) => setBottles(itemValue)}>
        {numBottles.map((bottles) => (
        <Picker.Item label ={bottles + ' Bottles'}
        value={bottles}/>
        ))}
      </Picker>
    </View>

    <View>
      <Text style={styles.label} >Time</Text>
      <Picker 
        selectedValue={time}
        onValueChange={(itemValue) => setTime(itemValue)}>
        {hours.map((time) => (
        <Picker.Item label ={time + ' Hours'}
        value={time}/>
        ))}
      </Picker>   
    </View>

    <View>

    <Text style={styles.label}>Gender</Text>
    
    <RadioForm
    initial={0}
    radio_props={genders}
    onPress={(value) => {setGender(value)}}></RadioForm>
    <Text>{promille.toFixed(2)}</Text>
    </View>
    <View>
    <Button onPress={Calculate} title="Calculate"></Button>
    </View>


    
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginBottom: 10,
    fontWeight: 'bold'
  }
});
