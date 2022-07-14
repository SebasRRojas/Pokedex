/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, FlatList, Text, Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles } from '../theme/appTheme';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { useEffect } from 'react';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, simplePokemonList } = usePokemonSearch();

    const [term, setTerm] = useState('');
    const [filteredPokemons, setFilteredPokemons] = useState<SimplePokemon[]>([]);

    useEffect(() => {
        if (term.length === 0) {
            return setFilteredPokemons([]);
        }

        if (isNaN(Number(term))) {
            setFilteredPokemons(
                simplePokemonList.filter(poke => poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
            );
        } else {
            const pokemonById = simplePokemonList.find((poke) => poke.id === term);
            setFilteredPokemons(
                (pokemonById) ? [pokemonById] : []
            );
        }



    }, [term]);


    if (isFetching) {
        return <Loading />;
    }

    return (
        <View
            style={{
                flex: 1,
                marginHorizontal: 20,
            }}
        >

            <SearchInput
                onDebounce={(value) => setTerm(value)}
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 40,
                    top: (Platform.OS === 'ios') ? top : top + 20,
                }}
            />

            <FlatList
                data={filteredPokemons}
                keyExtractor={(pokemon) => pokemon.id}
                showsVerticalScrollIndicator={false}
                numColumns={2}

                // header
                ListHeaderComponent={(
                    <Text
                        style={{
                            ...styles.title,
                            ...styles.globalmargin,
                            marginBottom: top + 20,
                            color: 'black',
                            marginTop: (Platform.OS === 'ios') ? top + 50 : top + 70,

                        }}
                    >{term}</Text>
                )}

                renderItem={({ item }) => (
                    <PokemonCard pokemon={item} />
                )}

            />

        </View>
    );
};

