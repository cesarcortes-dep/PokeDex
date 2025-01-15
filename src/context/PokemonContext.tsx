import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Pokemon } from "../types";

interface PokemonContextType {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  reloadPokemons: () => Promise<void>;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
};

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemons = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20"
      );
      const pokemonsImg = await Promise.all(
        response.data.results.map(
          async (pokemon: { name: string; url: string }) => {
            const pokemonData = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              image: pokemonData.data.sprites.front_default,
              weight: pokemonData.data.weight,
              height: pokemonData.data.height,
              types: pokemonData.data.types,
            };
          }
        )
      );
      setPokemons(pokemonsImg);
    } catch (err) {
      setError("Error loading Pokemon");
    } finally {
      setLoading(false);
    }
  };

  const reloadPokemons = async () => {
    await fetchPokemons();
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <PokemonContext.Provider
      value={{ pokemons, loading, error, reloadPokemons }}
    >
      {children}
    </PokemonContext.Provider>
  );
};