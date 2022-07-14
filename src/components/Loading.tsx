import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const Loading = () => {
    return (
        <View
            style={styles.activityContainer}
        >
            <ActivityIndicator
                size={50}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    activityContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
