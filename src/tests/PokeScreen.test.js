import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import PokeScreen from '../screens/PokeScreen';
import { PokemonProvider } from '../context/PokemonContext';
import axios from 'axios';

jest.mock('axios');

beforeEach(() => {
  axios.get.mockImplementation((url) => {
    if (url === 'https://pokeapi.co/api/v2/pokemon?limit=20') {
      return Promise.resolve({
        data: {
          results: [
            { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
          ],
        },
      });
    } else if (url === 'https://pokeapi.co/api/v2/pokemon/6/') {
      return Promise.resolve({
        data: {
          sprites: { front_default: 'https://example.com/charizard.png' },
          weight: 6,
          height: 7,
          types: [{ type: { name: 'fire' } }, { type: { name: 'flying' } }],
        },
      });
    }
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

it('fetches and displays Pokemon with images', async () => {
  const { getByText, getByLabelText } = render(
    <PokemonProvider>
      <PokeScreen />
    </PokemonProvider>
  );

  await waitFor(() => {
    expect(getByText('Charizard')).toBeTruthy();
    expect(getByLabelText(/charizard/i)).toBeTruthy();
  });
});

it('reload the Pokemon list having Charizard be there', async () => {
  const { getByText } = render(
    <PokemonProvider>
      <PokeScreen />
    </PokemonProvider>
  );

  await waitFor(() => {
    expect(getByText('Charizard')).toBeTruthy();
  });

  const reloadButton = getByText('Reload Pokemon');
  fireEvent.press(reloadButton);

  await waitFor(() => {
    expect(getByText('Charizard')).toBeTruthy();
  });
});
