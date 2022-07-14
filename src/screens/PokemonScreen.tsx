/* eslint-disable react/self-closing-comp */
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParams } from '../navigation/Tab1';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { }

export const PokemonScreen = ({ navigation, route }: Props) => {
    const { simplePokemon, color } = route.params;
    const { name, picture, id } = simplePokemon;
    const { top } = useSafeAreaInsets();

    const capitalizeFirstLetter = (string: String) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const { isLoading, pokemon } = usePokemon(id);

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={{
                ...styles.headerContainer,
                backgroundColor: color,
            }}>


                {/* Backbutton */}
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    activeOpacity={0.8}
                    style={{
                        ...styles.backButton,
                        top: top + 5,
                    }}
                >
                    <Icon
                        name="arrow-back-outline"
                        size={35}
                        color="white"
                    />
                </TouchableOpacity>

                {/* Pokemon name */}
                <Text style={{
                    ...styles.pokemonName,
                    top: top + 40
                }}>
                    {capitalizeFirstLetter(name) + '\n'}#{id}
                </Text>

                {/* White Pokeball */}
                <Image source={require('../assets/pokebola-blanca.png')} style={styles.whitePokeball} />

                {/* Pokemon image */}
                <FadeInImage
                    uri={picture}
                    style={styles.pokemonImage}
                />

            </View>

            {/* Pokemon details */}
            {
                isLoading ? (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator
                            color={color}
                            size={50}
                        />
                    </View>
                ) : (
                    <PokemonDetails pokemon={pokemon} />
                )
            }


        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000,
    },
    backButton: {
        position: 'absolute',
        left: 15,
    },
    pokemonName: {
        fontSize: 40,
        color: 'white',
        alignSelf: 'flex-start',
        left: 15,
    },
    whitePokeball: {
        width: 275,
        height: 275,
        bottom: 0,
        opacity: 0.7,
    },
    pokemonImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: -15,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
