import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, ScrollView, Dimensions, View, ToastAndroid, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FloatingLabelComponent, labels, inputStateObj } from './components/floatingLabelComponent'
import TopDesign from './components/topDesignComponent'

const SignupComponent = (props) => {
    return (
        <TouchableOpacity style={styles.signupButton} onPress={() => {
            ToastAndroid.show("Navigating to SignUp page..", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            props.navSignup.navigate('Signup')
        }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: "#333", textAlign: 'center' }}>New user? </Text>
                <Text style={{ color: "#0055AA", textAlign: 'center' }}>SignUp</Text>
            </View>
        </TouchableOpacity>
    )
}

const LoginButtonComponent = (props) => {
    const [jsonResponse, setJsonResponse] = useState({})
    return (
        <>
            <TouchableOpacity style={styles.loginButton} onPress={() => {
                ToastAndroid.show("Trying to log you in..", ToastAndroid.SHORT, ToastAndroid.BOTTOM)

                if(props.buttonState.length > 0 || props.inputState[labels.email].length == 0) {
                    Alert.alert("Invalid email", "Email should be of type: example@example.com")
                    return
                }
                else if(props.inputState[labels.name].length == 0 || props.inputState[labels.password].length == 0 || props.inputState[labels.repassword].length == 0) {
                    Alert.alert("Empty fields", "Fields can not be empty..")
                    return
                }
                
                fetch('https://myauthapp.loca.lt/login/', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Bypass-Tunnel-Reminder': 'Bypass localtunnel',
                    },
                    body: JSON.stringify({
                        email: props.inputState[labels.email],
                        password: props.inputState[labels.password],
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
                <Text style={{ color: "#FFF", textAlign: 'center' }}>Login</Text>
            </TouchableOpacity>
        </>
    )
}

const LoginComponent = (props) => {
    const [emailValidation, setEmailValidation] = useState('')
    const [inputState, setInputState] = useState({ ...inputStateObj })

    const childCallBackEmail = (text) => {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (regex.test(text) === false) {
            let emailValidationFail = "This is not a valid email address"
            setEmailValidation(emailValidationFail)
        }
        else if (emailValidation !== '') {
            setEmailValidation('')
        }

        const obj = {...inputState}
        obj[labels.email] = text
        setInputState(obj)
    }

    const childCallBackPass = (text) => {
        const obj = {...inputState}
        obj[labels.password] = text
        setInputState(obj)
    }

    const cyclableProps = [
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
    ]

    return (
        <>
            {/*<Text>{inputState[labels.email]} {inputState[labels.password]} </Text>*/}
            <View key="containerView" style={styles.container}>
                {cyclableProps.map((cyclableProp) => {
                    return (
                        <>
                            {(cyclableProp.label == labels.email) ? <Text style={styles.emailValidation}>{emailValidation}</Text> : <></>}
                            <View key={cyclableProp.label} style={cyclableProp.style}>
                                <FloatingLabelComponent key={cyclableProp.label} {...cyclableProp} />
                            </View>
                        </>
                    )
                })}
            </View>

            <LoginButtonComponent key="loginBtn" inputState={inputState} navResult={props.navResult} buttonState={emailValidation} />
        </>
    )
}

const LoginPage = (props) => { // Can be destructured directly as const LoginPage = ({ navigation }) => {
    return (
        <ScrollView>
            <TopDesign />
            <Text style={styles.heading}>Welcome Back,</Text>
            <LoginComponent navResult={props.navigation} />
            <SignupComponent navSignup={props.navigation} />
            <StatusBar style='light' />
        </ScrollView>
    );
}

export default LoginPage

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    heading: {
        marginTop: height * 0.1,
        color: "#FFF",
        textAlign: "center",
        fontSize: 32,
    },
    container: {
        flex: 1,
        marginTop: height * 0.1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
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
        marginLeft: width * 0.15,
        marginTop: height * 0.1,
        backgroundColor: "#0055AA",
        borderRadius: 20,
        padding: 10,
        marginLeft: width * 0.10,
        marginRight: width * 0.10,
    },
    signupButton: {
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
    emailValidation: {
        color: "#FF0000",
        flex: 1,
        flexDirection: 'column',
        marginTop: 105,
        marginStart: width * 0.15,
        marginEnd: width * 0.15,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
})
