/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';


interface Props {
    pokemon: PokemonFull;
}

export const PokemonDetails = ({ pokemon }: Props) => {

    const capitalizeFirstLetter = (string: String) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                ...StyleSheet.absoluteFillObject,
            }}
        >

            {/* Types and weight */}
            <View style={{
                ...styles.container,
                marginTop: 380,
            }}>

                <Text style={styles.title}>Types</Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.types.map(({ type }) => (
                            <Text
                                style={{
                                    ...styles.regularText,
                                    marginRight: 10,
                                }}
                                key={type.name}
                            >
                                {capitalizeFirstLetter(type.name)}
                            </Text>
                        ))
                    }
                </View>
                <Text style={styles.title}>Weight</Text>
                <Text style={styles.regularText}>{pokemon.weight} lb</Text>

            </View>

            {/* Sprites */}
            <View style={styles.container}>
                <Text style={styles.title}>Sprites</Text>
            </View>

            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <FadeInImage
                    uri={pokemon.sprites.front_default}
                    style={styles.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.back_default}
                    style={styles.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.front_shiny}
                    style={styles.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.back_shiny}
                    style={styles.basicSprite}
                />
            </ScrollView>

            {/* skills */}
            <View style={styles.container}>
                <Text style={styles.title}>Base Abilities</Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.abilities.map(({ ability }) => (
                            <Text
                                style={{
                                    ...styles.regularText,
                                    marginRight: 10,
                                }}
                                key={ability.name}
                            >
                                {capitalizeFirstLetter(ability.name)}
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* Stats */}
            <View style={styles.container}>
                <Text style={styles.title}>Stats</Text>
                <View style={{}}>
                    {
                        pokemon.stats.map((stat, i) => (
                            <View key={stat.stat.name + i} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text
                                    style={{
                                        ...styles.regularText,
                                        marginRight: 10,
                                    }}
                                >
                                    {capitalizeFirstLetter(stat.stat.name)}:
                                </Text>
                                <Text
                                    style={{
                                        ...styles.regularText,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {stat.base_stat}
                                </Text>
                            </View>
                        ))
                    }
                </View>
            </View>

            {/* Moves */}
            <View style={styles.container}>
                <Text style={styles.title}>Moves</Text>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                    {
                        pokemon.moves.map(({ move }) => (
                            <Text
                                style={{
                                    ...styles.regularText,
                                    marginRight: 10,
                                }}
                                key={move.name}
                            >
                                {capitalizeFirstLetter(move.name)}
                            </Text>
                        ))
                    }
                </View>

                <View style={{
                    marginBottom: 40,
                    alignItems: 'center',
                }}>
                    <FadeInImage
                        uri={pokemon.sprites.front_default}
                        style={styles.basicSprite}
                    />
                </View>

            </View>




        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 20,
    },
    regularText: {
        fontSize: 17,
        color: 'black',
    },
    basicSprite: {
        width: 100,
        height: 100,
    }
});
