import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Picker,
  Icon,
  View,
  Text,
  Button,
} from 'native-base';
import {ImageBackground} from 'react-native';

import SectionedMultiSelect from 'react-native-sectioned-multi-select';


//import SelectMeal from '../SelectMeal';
import SelectIngredients,{items} from '../SelectIngredients';
export default class WelcomePage extends Component {

  constructor() {
    super();
    this.state = {
      selectedItems: [],
      selectedMeal: "",
      isLoading:true,
      allIngredients:['']

    };
  }
  onSelectedItemsChange = selectedItems => {
    this.setState({selectedItems});
    console.log(this.state.selectedItems,"sadasdasd");

  };
  onValueChangeMeal(value) {
    this.setState({
      selectedMeal: value,
    });
  }
  getFoodRecipe=(idArray)=>{
    console.log(idArray);


    return fetch('http://51.136.56.78:3000/foods/calculate',{
      method:"POST",
      headers:new Headers({
        'Content-Type':'application/raw',

      }),
      body:JSON.stringify({"ingredient":[7,6,5,4]})
    }).then((response)=>response.json()).then((responseJson)=>{
      console.log(responseJson)
    })
  }

  componentDidMount=()=>{
    return fetch('http://51.136.56.78:3000/ingredients/all')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        allIngredients: responseJson.result,
      }, function(){
      //  console.log(responseJson.result.filter(x=>x.type=="sebze" ? x:null))
      });

    })
    .catch((error) =>{
      console.error(error);
    });
  }
  render() {
    return (
      <ImageBackground
        source={require('../../bg.jpg')}
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
      
      <View>
      <Form style={{marginTop: 5, backgroundColor: '#fff'}}>
        <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{width: undefined}}
            placeholder="Select your SIM"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            selectedValue={this.state.selectedMeal}
            onValueChange={this.onValueChangeMeal.bind(this)}>
            <Picker.Item enable label="Lütfen öğün seçiniz" value="key0" />
            <Picker.Item label="Kahvaltı" value="key0" />
            <Picker.Item label="Öğle Yemeği" value="key1" />
            <Picker.Item label="Akşam Yemeği" value="key2" />
          </Picker>
        </Item>
      </Form>
      </View>
        <View>
        <View style={{backgroundColor: 'white'}}>
        <SectionedMultiSelect
          items={items}
          uniqueKey="id"
          subKey="children"
          selectText="Evinizdeki malzemeleri seçiniz..."
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          confirmText="Seç"
          searchPlaceholderText="Malzeme arayın"
          selectedText=" adet Seçildi"
        />
      </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Button
            primary
            onPress={() => {
            //  this.props.navigation.navigate('FoodList');
            this.getFoodRecipe(this.state.selectedItems);
            }}
            style={{marginBottom: 5}}>
            <Text>Yemek Bul</Text>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}
