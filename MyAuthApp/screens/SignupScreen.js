import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, ScrollView, Dimensions, View, ToastAndroid, TextInput, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FloatingLabelComponent, labels } from './components/floatingLabelComponent'
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

                if (props.buttonState.length > 0 || props.userEmail.length == 0) {
                    Alert.alert("Invalid email", "Email should be of type: example@example.com")
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
                        email: props.userEmail,
                        password: props.userPass,
                        repassword: props.userRePass,
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
    const [name, setName] = useState('Default name')
    const [email, setEmail] = useState('Default email')
    const [password, setPassword] = useState('Default password')
    const [repassword, setRePassword] = useState('Default repassword')
    const [emailValidation, setEmailValidation] = useState('')

    const childCallBackName = (text) => {
        setName(text)
    }

    const childCallBackEmail = (text) => {

        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (regex.test(email) === false) {
            let emailValidationFail = "This is not a valid email address"
            setEmailValidation(emailValidationFail)
        }
        else if (emailValidation !== '') {
            setEmailValidation('')
        }

        setEmail(text)
    }

    const childCallBackPass = (text) => {
        setPassword(text)
    }

    const childCallBackRePass = (text) => {
        setRePassword(text)
    }

    return (
        <>
            {/*<Text> {name} {email} {password} {repassword} </Text>*/}
            <View style={styles.container}>
                <View style={styles.nameView}>
                    <FloatingLabelComponent label={labels.name} pass={false} passToParentName={childCallBackName} />
                </View>

                <Text style={styles.emailValidation}>{emailValidation}</Text>
                <View style={styles.emailView}>
                    <FloatingLabelComponent label={labels.email} pass={false} passToParentEmail={childCallBackEmail} />
                </View>

                <View style={styles.passwordView}>
                    <FloatingLabelComponent label={labels.password} pass={true} passToParentPass={childCallBackPass} />
                </View>

                <View style={styles.passwordView}>
                    <FloatingLabelComponent label={labels.repassword} pass={true} passToParentRePass={childCallBackRePass} />
                </View>
                
            </View>

            <SignupButtonComponent userName={name} userEmail={email} userPass={password} userRePass={repassword} navResult={props.navResult} buttonState={emailValidation} />
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