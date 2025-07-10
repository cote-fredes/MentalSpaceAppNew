import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.mentalspace',
  appName: 'MentalSpace',
  webDir: 'www',
  
  plugins: {
    GoogleMaps: {
      apiKey: 'AIzaSyDfM06IjaaFBvv4lvbXRCMK_-hyYiOuD6w' 
    }
  }
};

export default config;