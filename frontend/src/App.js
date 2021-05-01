import React from "react";
import { AuthProvider } from './contexts/auth';
import { LoadingProvider } from './contexts/loading';
import Routes from "./routes";
import "leaflet-draw";
import "leaflet-easybutton";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "font-awesome/css/font-awesome.min.css";

function App() {
  return <AuthProvider><LoadingProvider><Routes /></LoadingProvider></AuthProvider>;
}

export default App;
