import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, ScrollView, Dimensions, View, ToastAndroid, TextInput } from 'react-native'

const Result = ({ navigation }) => {
    return (
        <>
            <Text style={{ marginTop: 80, marginStart: 40, fontSize: 18 }}>Result: { JSON.stringify(navigation.getParam('sendData')) }</Text>
            <StatusBar style='dark' />
        </>
    )
}

export default Result
