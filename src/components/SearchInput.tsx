/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Platform, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useEffect } from 'react';

interface Props {
    onDebounce: (value: String) => void;
    style?: StyleProp<ViewStyle>;
}

export const SearchInput = ({ style, onDebounce }: Props) => {

    const [textValue, setTextValue] = useState('');
    const debouncedValue = useDebouncedValue(textValue);

    useEffect(() => {
        onDebounce(debouncedValue);

    }, [debouncedValue]);


    return (
        <View style={{
            ...styles.container,
            ...style as any,
        }}>
            <View style={styles.textBackGround}>

                <TextInput
                    placeholder="Buscar pokemon"
                    style={{
                        ...styles.textInput,
                        top: (Platform.OS === 'android') ? 2 : 0,
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={textValue}
                    onChangeText={setTextValue}
                />

                <Icon
                    name="search-outline"
                    size={30}
                    color="grey"
                />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // marginTop: 15,
    },
    textBackGround: {
        backgroundColor: '#F3F1F3',
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    textInput: {
        flex: 1,
        fontSize: 18,
    },
});
