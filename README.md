# Dian-Jin
This simple weather website using javascript, css and html. Weather data is obtained from Meteo.

Final Result:


<img width="1440" alt="image" src="https://user-images.githubusercontent.com/105716817/230738460-b0b3afb1-8869-43ac-a88a-38e0b251793a.png">

Steps:
1. javascript querySelector design:
  Design templates for daily weather card and hourly weather. Thus data could be imported into website using querySelector.
<img width="525" alt="image" src="https://user-images.githubusercontent.com/105716817/230736351-0c067c5d-dfb8-4f98-8a6b-a10ea4852eff.png">

<img width="758" alt="image" src="https://user-images.githubusercontent.com/105716817/230736374-b431d0cf-b79d-4476-9e76-59cdf23f7ad6.png">

2. Utilizing Meteo (open API) to get weather data which is an object:
    axios.get("https://api.open-meteo.com/v1/forecast?&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime",
  Notice that there are various types of weather data and thus what data to be chosen is up to you. In this project, temperature, feels-like temperature, wind speed, preciptation and weather category are selected. 
  
3. Using the data to call three functions seperately for current_weather, daily_weather and hourly_weather.
<img width="371" alt="image" src="https://user-images.githubusercontent.com/105716817/230736575-a7e66f77-4e76-40e5-93c1-1e0561450aae.png">

4. Three Functions are: 

<img width="506" alt="image" src="https://user-images.githubusercontent.com/105716817/230736603-6d78e00e-2a76-4ff2-a33b-29d1dfcd1290.png">
parameters are data proerties -- current_weather and daily. These names must be consistent with actual properties' names of data object.
then using construct to assign values needed. Finally return them in appropriate forms.
------------------------------------

<img width="633" alt="image" src="https://user-images.githubusercontent.com/105716817/230736641-ff58786a-bd14-4b83-8a6c-6465b6d3cb68.png">
<img width="628" alt="image" src="https://user-images.githubusercontent.com/105716817/230736653-2c1ee786-4126-4ddb-bb82-e5efd99012d5.png">
Same as the first function, but notice that there are more than one days and hours, so use a map to include time and index. to returns and use
the arrow function => . Make sure the hour is in the future, so use filter({timestamp}) => timestamp>= current_weather.temp*1000

5. In the main.js, set dynamic values for each tag in html. Necessary to use querySelector to modify its value. Take hourly weather setting for instance:

<img width="711" alt="image" src="https://user-images.githubusercontent.com/105716817/230736946-b4697716-c256-4828-a3ec-71bbc92939e4.png">
  Copy template and assign values. Finally add current template 'instance' : element to table / section.
 
6. Accessory functions and files:
  (1). ICON_MAPE.js and addMapping function:
  
    <img width="334" alt="image" src="https://user-images.githubusercontent.com/105716817/230737041-82d28d31-2747-49b2-8e07-ab191b7356e1.png">
   
   (2)get icon's url and set values.
   
   <img width="610" alt="image" src="https://user-images.githubusercontent.com/105716817/230737275-6ec1b2af-e0b3-4c6c-8aba-8628ed76570b.png">

7. Some skills in CSS: 

  display: grid;
  grid-template-columns: repeat(auto-fit,75px); // let all icons auto fill with dynamic website width
  
  display: flex;
  flex-direction: column
  jusstify-content: center / space-around .. 
