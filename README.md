# Mausam - Weather Web App 🌤️

A beautiful, responsive weather application built with React that provides real-time weather information for major cities around the world.

## 🌟 Features

- **Real-time Weather Data**: Get current weather conditions for 9 major cities worldwide
- **Detailed Weather Information**: 
  - Current temperature and "feels like" temperature
  - Humidity levels and precipitation chances
  - Air quality index (PM 2.5)
  - Sunrise and sunset times
  - Hourly forecast
  - Wind speed and direction
  - Air quality parameters (PM 2.5, PM 10, NO2, SO2, O3)
- **City Search**: Search for any city worldwide with autocomplete suggestions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Beautiful UI**: Modern dark theme with city-specific background images

## 🚀 Live Demo

Visit the live app at: [https://themehraaryan.github.io/Mausam/](https://themehraaryan.github.io/Mausam/)

## 🛠️ Technologies Used

- **React** - Frontend framework
- **Bootstrap 5** - CSS framework for responsive design
- **WeatherAPI** - Weather data provider
- **Axios** - HTTP client for API requests
- **GitHub Pages** - Hosting platform

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/themehraaryan/Mausam.git
cd Mausam
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🏗️ Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

This will automatically build the app and push it to the `gh-pages` branch.

## 📂 Project Structure

```
Mausam/
├── public/
│   ├── index.html
│   ├── logo.png
│   └── ...
├── src/
│   ├── components/
│   │   ├── Card.js          # Weather card component
│   │   ├── Home.js          # Home page with city cards
│   │   ├── Navbar.js        # Navigation bar
│   │   ├── SearchResult.js  # Search results page
│   │   ├── Spinning2.js     # Loading spinner
│   │   └── covers/          # City background images
│   ├── App.js               # Main app component
│   ├── App.css              # Styles
│   └── index.js             # Entry point
├── package.json
└── README.md
```

## 🎨 Features Breakdown

### Home Page
- Displays weather cards for 9 major cities: New Delhi, New York, London, Dubai, Sydney, Tokyo, Paris, Shanghai, and Moscow
- Each card shows:
  - Current temperature
  - 2-day forecast
  - Humidity
  - Rain chances
  - Air quality (PM 2.5)
  - Feels like temperature
  - Sunrise and sunset times

### Search Functionality
- Type-ahead search with city suggestions
- Comprehensive weather details for searched cities:
  - Current conditions
  - Min/max temperatures
  - Hourly forecast (next 8 hours)
  - Air quality parameters
  - Wind information
  - Detailed weather metrics

## 🔑 API Key

This project uses the [WeatherAPI](https://www.weatherapi.com/) for weather data. The API key is included in the code for demonstration purposes. For production use, please:

1. Sign up for your own free API key at [WeatherAPI](https://www.weatherapi.com/)
2. Replace the API key in the following files:
   - `src/components/Home.js`
   - `src/components/Navbar.js`
   - `src/components/SearchResult.js`

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Created with ❤️ by [Aryan Mehra](https://www.linkedin.com/in/mister-aryanmehra/)

## 🌍 Climate Change Awareness

This app is dedicated to raising awareness about climate change. Learn more about [Climate Change](https://en.wikipedia.org/wiki/Climate_change) and how we can make a difference.

---

### Available Scripts

In the project directory, you can run:

#### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#### `npm test`
Launches the test runner in interactive watch mode.

#### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

#### `npm run deploy`
Builds and deploys the app to GitHub Pages.

---

**Note**: This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
