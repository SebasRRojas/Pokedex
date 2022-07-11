/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import ImageColors from 'react-native-image-colors';

import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {

    const [bgColor, setBgColor] = useState('grey');
    const isMounted = useRef(true);
    const navigation = useNavigation();

    const capitalizeFirstLetter = (string: String) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    useEffect(() => {
        if (!isMounted.current) return;

        setCardBackgroundColor();

        return () => {
            isMounted.current = false;
        }
    }, []);

    const setCardBackgroundColor = () => {
        ImageColors.getColors(pokemon.picture, { fallback: 'grey' })
            .then(result => {
                switch (result.platform) {
                    case 'android':
                        // android result properties
                        setBgColor(result.muted || 'grey');
                        break;
                    case 'ios':
                        // iOS result properties
                        setBgColor(result.background || 'grey');
                        break;
                    default:
                        throw new Error('Unexpected platform key');
                }
            });


    };


    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={ () => navigation.navigate('PokemonScreen', { simplePokemon: pokemon, color: bgColor  })}
        >

            <View style={{
                ...styles.cardContainer,
                width: windowWidth * 0.4,
                backgroundColor: bgColor,
            }}>

                <View>
                    <Text style={styles.name}>
                        {capitalizeFirstLetter(pokemon.name)}
                        {'\n#' + pokemon.id}
                    </Text>
                </View>

                <View style={styles.pokeballContainer}>
                    <Image
                        source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokeball}
                    />
                </View>


                <FadeInImage
                    uri={pokemon.picture}
                    style={styles.pokemonImage}
                />

            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,

        //Shadows
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 10,
        left: 10,
    },
    pokeball: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: -20,
        right: -20,
    },
    pokemonImage: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -8,
        bottom: -5,
    },
    pokeballContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.7,
    },
});
