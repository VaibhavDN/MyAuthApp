import React from 'react'
import { useState, useEffect } from 'react'
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
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')
    const [lengthObj, setLengthObj] = useState({})

    const textStyle = {
        position: 'absolute',
        color: "#3366ff",
        textAlign: "left",
        fontSize: (inFocus || lengthObj[label] > 1) ? 14 : 20,
        textAlignVertical: 'center',
        top: (inFocus || lengthObj[label] > 1) ? 0 : 32,
    }

    console.log(lengthObj)

    function handleInputText(text, _label) {
        if(label != _label) {
            setLabel(_label)
        }
        if (_label == labels.email && text != email) {
            props.passToParentEmail(text)
            setEmail(text)
        }
        else if (_label == labels.password && text != password) {
            props.passToParentPass(text)
            setPassword(text)
        }
        else if (_label == labels.repassword && text != repassword) {
            props.passToParentRePass(text)
            setRePassword(text)
        }
        else if (_label == labels.name && text != name) {
            props.passToParentName(text)
            setName(text)
        }

        if(lengthObj.Name != name.length || lengthObj.Email != email.length || lengthObj.Password != password.length || lengthObj.RePassword != repassword.length) {
            const obj = {
                'Name': name.length,
                'Email': email.length,
                'Password': password.length,
                'RePassword': repassword.length,
            }

            setLengthObj(obj)
        }
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
                secureTextEntry={props.pass}
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
