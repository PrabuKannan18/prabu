import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyAYZ8O4vzIW2VCwYLlkCrLTk12JeoFbk0E",
  authDomain: "prabu-kannan.firebaseapp.com",
  projectId: "prabu-kannan",
  storageBucket: "prabu-kannan.firebasestorage.app",
  messagingSenderId: "935255150491",
  appId: "1:935255150491:web:c806a3682bdae0bde61b3e",
  measurementId: "G-F1LHW449G9"
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAnalytics(() => getAnalytics()),] // This is fine here]]
};
