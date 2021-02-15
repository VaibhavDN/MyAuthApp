import { createStackNavigator } from 'react-navigation-stack'
import LoginPage from '../screens/LoginScreen'
import SignupPage from '../screens/SignupScreen'
import { createAppContainer } from 'react-navigation'
import Result from '../screens/ResultScreen'

const screens = {
    Login: {
        screen: LoginPage,
    },
    Signup: {
        screen: SignupPage,
    },
    Result: {
        screen: Result,
    }
}

const config = {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
        headerStyle: {
            backgroundColor: '#FFF',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
}

const Stack = createStackNavigator(screens, config)
export default createAppContainer(Stack)
