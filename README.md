<h1 align="center">
Weather App
</h1>
This is a simple weather service application that fetches and displays weather information based on user input. It uses a Node.js backend with Express to interact with the Weatherstack API and a React frontend to provide a user interface.

- Location
- Current temperature
- Date and time
- Wind speed
- Pressure
- Humidity
- Visibility


## Sample Images

### Light Theme

<div style="text-align: center;">
     <img src="https://res.cloudinary.com/dsbxrn2tj/image/upload/v1718517633/Screenshot_99_nzbfmy.png" alt="light-theme">
</div>

### Dark Theme

<div style="text-align: center;">
     <img src="https://res.cloudinary.com/dsbxrn2tj/image/upload/v1718517768/Screenshot_100_xmezqm.png" alt="light-theme">
</div>
<br/>

## Installation

- Clone the repository:

  ```
  git clone https://github.com/sulemanshaik109/current-weather-app.git
  ```

### Backend

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install the required dependencies:
    ```
    npm install
    ```

3. Set up environment variables:

    - Create a .env file in the backend directory.

        - Add your Weatherstack API key:
            ```
            PORT=5000
            WEATHER_API_KEY=your_weather_api_key
            ```

4. Run the backend server:

    ```
    node server.js
    ```

### Frontend

1. Install Dependencies

    ```
    npm install
    ```

2. Run the app

    ```
    npm start
    ```

3. Navigate to `http://localhost:3000` to view the application in the browser.

### Features

- **SearchBar**: Enter a location in the SearchBar and click search icon or press Enter to display the weather information of that loaction.
- **Dark Mode Toggle**: Dark mode and light mode toggle functionality is implemented by clicking the icon.

### Usage

To use the Weather App:

- Enter the location in the search bar and click search icon or press Enter.
- View the weather data displayed.
- Use Theme Icons to toggle dark mode and light mode.

### Technology Used

I have built this project using the following tools & techniques:

- Node.js
- Express
- ReactJS
- Axios
- React-router-dom
- React-icons

### Resources

<details>
<summary>OpenWeather API</summary>
<br/>

API Key: **099d738f470c32be8173e609ae9ed4ca**

**API Url**

```
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
```
</details>

<details>
<summary>Colors</summary>
<br/>

<div style="background-color: #ffffff; width: 150px; padding: 10px; color: white">Hex: #ffffff</div>
<div style="background-color: #000000; width: 150px; padding: 10px; color: white">Hex: #000000</div>
<div style="background-color: #565656; width: 150px; padding: 10px; color: white">Hex: #565656</div>
<div style="background-color: #bff0ea; width: 150px; padding: 10px; color: black">Hex: #bff0ea</div>
<div style="background-color: #1b1a1a; width: 150px; padding: 10px; color: black">Hex: #1b1a1a</div>
<div style="background-color: #3b3b3b; width: 150px; padding: 10px; color: black">Hex: #3b3b3b</div>

</details>

# Show Your Support

Give a ⭐️ if you like this project!
