import React, { useState } from "react";
import { View, FlatList, Modal, StyleSheet, Image } from "react-native";
import { TextInput, Button, Text, ActivityIndicator } from "react-native-paper";
import { usePokemon } from "../context/PokemonContext";
import { Pokemon } from "../types";

const PokeScreen = () => {
  const { pokemons, loading, error, reloadPokemons } = usePokemon();
  const [search, setSearch] = useState<string>("");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const filteredPokemons = pokemons.filter((pokemon: Pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const renderPokemon = ({ item }: { item: Pokemon }) => (
    <View style={styles.pokemonCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.pokemonImage}
        accessibilityLabel={item.name}
        accessible={true}
      />
      <Text
        onPress={() => handlePokemonSelect(item)}
        style={styles.pokemonName}
      >
        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      </Text>
    </View>
  );

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Pokemon"
        value={search}
        onChangeText={setSearch}
      />
      <Button
        mode="contained"
        onPress={reloadPokemons}
        style={styles.reloadButton}
      >
        Reload Pokemon
      </Button>
      <FlatList
        data={filteredPokemons}
        renderItem={renderPokemon}
        keyExtractor={(item) => item.name}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />

      {selectedPokemon && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedPokemon}
          onRequestClose={() => setSelectedPokemon(null)}
        >
          <View style={styles.modalView}>
            <Text>
              {selectedPokemon.name.charAt(0).toUpperCase() +
                selectedPokemon.name.slice(1)}
            </Text>
            <Image
              source={{ uri: selectedPokemon.image }}
              style={styles.pokemonImage}
            />
            <Text>Weight: {selectedPokemon.weight}</Text>
            <Text>Height: {selectedPokemon.height}</Text>
            <Text>
              Types:{" "}
              {selectedPokemon.types.map((type) => type.type.name).join(", ")}
            </Text>
            <Button mode="contained" onPress={() => setSelectedPokemon(null)}>
              Close
            </Button>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    margin: 16,
  },
  reloadButton: {
    marginBottom: 16,
  },
  pokemonCard: {
    flex: 1,
    margin: 5,
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  pokemonImage: {
    width: 90,
    height: 70,
    marginBottom: 5,
  },
  pokemonName: {
    fontWeight: "bold",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default PokeScreen;
