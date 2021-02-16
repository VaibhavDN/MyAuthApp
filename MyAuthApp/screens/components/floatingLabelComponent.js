import React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'

const labels = {
    name: "Name",
    email: "Email",
    password: "Password",
    repassword: "RePassword",
}

const FloatingLabelComponent = (props) => {
    const [inFocus, setInFocus] = useState(false)
    const [label, setLabel] = useState('')
    const [lengthObj, setLengthObj] = useState({
        'Name': 0,
        'Email': 0,
        'Password': 0,
        'RePassword': 0,
    })
    const [inputState, setInputState] = useState({ ...labels })

    const returnToParent = {
        'Name': 'passToParentName',
        'Email': 'passToParentEmail',
        'Password': 'passToParentPass',
        'RePassword': 'passToParentRePass',
    }

    console.log("InputState", inputState)

    const textStyle = {
        position: 'absolute',
        color: "#3366ff",
        textAlign: "left",
        fontSize: (inFocus || lengthObj[label] > 1) ? 14 : 20,
        textAlignVertical: 'center',
        top: (inFocus || lengthObj[label] > 1) ? 0 : 32,
    }

    function handleInputText(text, _label) {
        const updateInputState = { ...inputState }
        updateInputState[_label] = text
        setInputState(updateInputState)

        if (label != _label) {
            setLabel(_label)
        }
        
        console.log(props[returnToParent[_label]]())

        const obj = { ...lengthObj }
        if(inputState[_label] != undefined) {
            obj[_label] = Math.max(inputState[_label].length, 0)
        }
        setLengthObj(obj)
}

return (
    <>
        <Text style={textStyle}>{props.label} </Text>
        <TextInput style={styles.textInputStyle}
            onFocus={() => {
                setInFocus(true)
            }}
            onBlur={() => {
                setInFocus(false)
            }}
            onChangeText={text => handleInputText(text, props.label)}
            secureTextEntry={props.pass} value={inputState[label]}
        />
    </>
)
}

const styles = StyleSheet.create({
    textInputStyle: {
        color: "#333",
        textAlign: "left",
        fontSize: 18,
        marginTop: 20,
        borderBottomColor: "#333",
        borderBottomWidth: 1,
    },
})

module.exports = {
    "FloatingLabelComponent": FloatingLabelComponent,
    "labels": labels,
}
