import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const TopDesign = () => {
    return (
        <View style={styles.topDesign} />
    )
}

const styles = StyleSheet.create({
    topDesign: {
        flex: 1,
        position: 'absolute',
        padding: 10,
        backgroundColor: '#0066FF',
        width: width * 1.22,
        height: width * 1.5,
        top: -1 * width * 1.1,
        left: -1 * ((width * 0.22) / 2),
        borderBottomStartRadius: (width) / 2,
        borderBottomEndRadius: (width) / 2,
        zIndex: -1,
    },
})

export default TopDesign
