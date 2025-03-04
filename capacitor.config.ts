
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.4092326e72894763b957c6a16c04a792',
  appName: 'maintenancer-mate',
  webDir: 'dist',
  server: {
    url: 'https://4092326e-7289-4763-b957-c6a16c04a792.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
    }
  }
};

export default config;
