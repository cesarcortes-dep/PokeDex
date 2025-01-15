import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { PokemonProvider } from "./src/context/PokemonContext";
import PokeScreen from "./src/screens/PokeScreen";

export default function App() {
  return (
    <PaperProvider>
      <PokemonProvider>
        <PokeScreen />
      </PokemonProvider>
    </PaperProvider>
  );
}