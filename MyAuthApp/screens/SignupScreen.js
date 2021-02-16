import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, ScrollView, Dimensions, View, ToastAndroid, TextInput, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FloatingLabelComponent, labels, inputStateObj } from './components/floatingLabelComponent'
import TopDesign from './components/topDesignComponent'

const LoginComponent = (props) => {
    return (
        <TouchableOpacity style={styles.loginButton} onPress={() => {
            ToastAndroid.show("Navigating to Login page..", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            props.navLogin.pop()
        }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: "#333", textAlign: 'center' }}>Already have an account? </Text>
                <Text style={{ color: "#0055AA", textAlign: 'center' }}>Login</Text>
            </View>
        </TouchableOpacity>
    )
}

const SignupButtonComponent = (props) => {
    const [jsonResponse, setJsonResponse] = useState({})
    return (
        <>
            <TouchableOpacity style={styles.signupButton} onPress={() => {
                ToastAndroid.show("Trying to sign you up.. " + props.buttonState.toString(), ToastAndroid.SHORT, ToastAndroid.BOTTOM)

                if(props.buttonState.length > 0 || props.inputState[labels.email].length == 0) {
                    Alert.alert("Invalid email", "Email should be of type: example@example.com")
                    return
                }
                else if(props.inputState[labels.name].length == 0 || props.inputState[labels.password].length == 0 || props.inputState[labels.repassword].length == 0) {
                    Alert.alert("Empty fields", "Fields can not be empty..")
                    return
                }

                fetch('https://myauthapp.loca.lt/signup/', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Bypass-Tunnel-Reminder': 'Bypass localtunnel',
                    },
                    body: JSON.stringify({
                        name: 'To be dropped',
                        email: props.inputState[labels.email],
                        password: props.inputState[labels.password],
                        repassword: props.inputState[labels.repassword],
                    })
                })
                    .then((response) => {
                        return response.json()
                    })
                    .then((jsonData) => {
                        setJsonResponse(jsonData)
                        const send = {
                            sendData: jsonData,
                        }
                        props.navResult.navigate('Result', send)
                    })
                    .catch((error) => {
                        setJsonResponse(error.message)
                    })
            }}>
                <Text style={{ color: "#FFF", textAlign: 'center' }}>Signup</Text>
            </TouchableOpacity>
            {/*<Text>{JSON.stringify(jsonResponse)}</Text>*/}
        </>
    )
}

const SignupComponent = (props) => {
    const [emailValidation, setEmailValidation] = useState('')
    const [inputState, setInputState] = useState({ ...inputStateObj })
    const obj = {...inputState}

    const childCallBackName = (text) => {
        obj[labels.name] = text
    }

    const childCallBackEmail = (text) => {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (regex.test(text) === false) {
            let emailValidationFail = "This is not a valid email address"
            setEmailValidation(emailValidationFail)
        }
        else if (emailValidation !== '') {
            setEmailValidation('')
        }

        obj[labels.email] = text
        setInputState(obj)
    }

    const childCallBackPass = (text) => {
        obj[labels.password] = text
        setInputState(obj)
    }

    const childCallBackRePass = (text) => {
        obj[labels.repassword] = text
        setInputState(obj)
    }

    const cyclableProps = [
        {
            'style': styles.nameView,
            'label': labels.name,
            'pass': false,
            'passToParentName': childCallBackName,
        },
        {
            'style': styles.emailView,
            'label': labels.email,
            'pass': false,
            'passToParentEmail': childCallBackEmail,
        },
        {
            'style': styles.passwordView,
            'label': labels.password,
            'pass': true,
            'passToParentPass': childCallBackPass,
        },
        {
            'style': styles.passwordView,
            'label': labels.repassword,
            'pass': true,
            'passToParentRePass': childCallBackRePass,
        },
    ]

    return (
        <>
            {/*<Text> {name} {email} {password} {repassword} </Text>*/}
            <View style={styles.container}>
                {cyclableProps.map((cyclableProp) => {
                    return (
                        <>
                            {(cyclableProp.label == labels.email) ? <Text style={styles.emailValidation}>{emailValidation}</Text> : <></>}
                            <View style={cyclableProp.style}>
                                <FloatingLabelComponent key={cyclableProp.label} {...cyclableProp} />
                            </View>
                        </>
                    )
                })}
            </View>

            <SignupButtonComponent inputState={inputState} navResult={props.navResult} buttonState={emailValidation} />
        </>
    )
}

const SignupPage = (props) => { // Can be destructured directly as const LoginPage = ({ navigation }) => {
    return (
        <ScrollView>
            <TopDesign />
            <Text style={styles.heading}>Create Account</Text>
            <SignupComponent navResult={props.navigation} />
            <LoginComponent navLogin={props.navigation} />
            <StatusBar style='light' />
        </ScrollView>
    );
}

export default SignupPage

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    heading: {
        marginTop: height * 0.1,
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 32,
    },
    container: {
        flex: 1,
        marginTop: height * 0.1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    nameView: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 5,
        marginStart: width * 0.15,
        marginEnd: width * 0.15,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    emailView: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 5,
        marginStart: width * 0.15,
        marginEnd: width * 0.15,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    passwordView: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
        marginStart: width * 0.15,
        marginEnd: width * 0.15,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    loginButton: {
        color: "#333",
        marginLeft: width * 0.15,
        marginTop: height * 0.05,
        padding: 15,
        backgroundColor: "transparent",
        borderRadius: 10,
        marginLeft: width * 0.10,
        marginRight: width * 0.10,
        alignContent: 'flex-end',
        alignSelf: 'center',
        marginBottom: width * 0.10,
    },
    signupButton: {
        marginLeft: width * 0.15,
        marginTop: height * 0.1,
        backgroundColor: "#0055AA",
        borderRadius: 20,
        padding: 10,
        marginLeft: width * 0.10,
        marginRight: width * 0.10,
    },
    emailValidation: {
        color: "#FF0000",
        flex: 1,
        flexDirection: 'column',
        marginTop: 5,
        marginStart: width * 0.15,
        marginEnd: width * 0.15,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
})
