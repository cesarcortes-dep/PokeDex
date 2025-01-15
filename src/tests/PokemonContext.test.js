import React from "react";
import { render } from "@testing-library/react-native";
import { PokemonProvider, usePokemon } from "../context/PokemonContext";
import { Text } from "react-native";

const TestComponent = () => {
  const { pokemons, loading, error } = usePokemon();
  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Text>{pokemons.length} Pokemon loaded</Text>
      )}
    </>
  );
};

describe("PokemonContext", () => {
  it("should provide default values", () => {
    const { getByText } = render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    expect(getByText(/Loading.../i)).toBeTruthy();
  });
});
