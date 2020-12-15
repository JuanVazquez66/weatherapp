<!--    Current Weather Final Project
        Name: Juan Vazquez
        Teacher: Kirsten Markley
        Class: cis-131-w01
        Date: 12/12/20
-->

<template>
  <div id="app" >
   <!--template created for weather app-->
    <div class="weatherApp">
      <h1>Weather</h1>
      <div class="zipCode">
        <label id="errorName" class="form-label">Enter Zipcode</label>
        <input class="zipInput" id="zipBox" type="text" placeholder="Enter Zipcode" v-model="input"/>
      </div>

      <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="Celsius" v-model="checked">
        <label class="form-check-label" for="flexRadioDefault1">
          Celsius
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Farenheit" v-model="checked">
          <label class="form-check-label" for="flexRadioDefault2">
            Farenheit
          </label>
      </div>
      <!--v-on:click event triggers switchCity function and api call-->
      <button type="button" class="btn btn-secondary" v-on:click="switchCity">Secondary</button>

      <div class="weatherCard">
        <div class="cityName">
          <p>{{weatherObj.cityName}}</p>
        </div>
        <div class="currentTemp">
          <p>{{weatherObj.cityTemp}}</p>
        </div>
        <div>
        <!--weather icon path bound to img tag-->
        <img v-bind:src="'http://openweathermap.org/img/w/' + weatherObj.cityIcon + '.png'" class="weatherIcon">

        </div>
        <div class="currentCond">
          <p>{{weatherObj.cityCond}}</p>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'App',
  components: {
   
  },
  data(){
    return{
      //data created for vue template
      weatherObj:{
        cityName: "",
        cityTemp: "",
        cityCond: "",
        cityIcon: "",
      },
      defaultZip:"65536",
      input: "",
      tempType: "&units=imperial",
      checked: "",    

    };
  },
  methods: {
    switchCity(){
      //regex validates 5 digit numerical zip code
      var isValid = true;
      var regx =  /^\d{5}$/;
      //if statements prompt error message
      if(regx.test(this.input)){
        isValid == true;
        document.getElementById('errorName').innerHTML = "";
      }else{
        isValid = false;
        document.getElementById('errorName').innerHTML = "Please enter valid 5 digit zipcode*";
      }
      //if statement selects celsius or farenheit
      if (this.checked == "Celsius") {
        this.tempType = "&units=metric";
      }else{
        this.tempType = "&units=imperial";
      }
      this.defaultZip = this.input;
      //axios call for open weather api
      axios.get('http://api.openweathermap.org/data/2.5/weather?zip=' + this.defaultZip + ',us&appid=b21fd4ddd2ad64b10c1d45b777046756' + this.tempType)
      .then((res) => {
        this.weatherObj.cityName = res.data.name;
        this.weatherObj.cityTemp = res.data.main.temp;
        this.weatherObj.cityCond = res.data.weather[0].description;
        this.weatherObj.cityIcon = res.data.weather[0].icon;
        console.log(this.weatherObj)
      })
    }
  }
      
  
}
</script>
<!--styles-->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
}
.weatherCard{
  margin-top: 20px;
}
.zipCode{
  display: inline-grid;
}
.weatherApp{
  border: 2px;
  border-color: black;
  border-style: solid;
  margin-left: 700px;
  margin-right: 700px;
  padding-bottom: 50px;
  padding-top: 30px;
  border-radius: 6%;
  background-color: rgb(51, 73, 105);
  color: white;
  
}
.zipInput{
  border: 2px, solid;
  border-radius: 25px;
  height: 40px;
  width: 200px;
}
.currentTemp{
  font-size: 60px;
}
.cityName{
  font-size: 30px;
}
.currentCond{
  font-size: 20px;
}
.weatherIcon{
  height: 100px;
  float: left;
  position: relative;
  left: 120px;
  bottom: 30px;
  margin-top: 10px;
}
</style>
