
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.46a327f34b8b41b195e47b34c5807815',
  appName: 'Vibe Vault',
  webDir: 'dist',
  server: {
    url: 'https://46a327f3-4b8b-41b1-95e4-7b34c5807815.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#F8F9FC",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#7E69AB",
      splashFullScreen: true,
      splashImmersive: true,
    },
  }
};

export default config;
