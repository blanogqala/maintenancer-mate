
/// <reference types="vite/client" />

// Declare the Capacitor interface for TypeScript
interface Window {
  Capacitor?: {
    isNative?: boolean;
    platform?: string;
    Plugins?: {
      StatusBar?: {
        setBackgroundColor: (options: { color: string }) => Promise<void>;
      };
      // Add other plugin interfaces as needed
    };
  };
}
