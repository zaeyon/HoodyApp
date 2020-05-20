import * as React from 'react';
import {
  View,
  Text,
  Button,
  PermissionsAndroid,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TextInput} from 'react-native-gesture-handler';
import Navigator from '~/Navigator';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from '~/reducers';
import Amplify, {Auth} from 'aws-amplify';

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'ap-northeast-2:843a8f2b-9568-489a-bdee-86a41bbf71fc',

    // REQUIRED - Amazon Cognito Region
    region: 'ap-northeast-2',

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    // identityPoolRegion: 'XX-XXXX-X',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'ap-northeast-2_NlywDsr3W',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '4lbd5q1hkra4eo3bv0fao92pcg',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    /* cookieStorage: {
      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
      domain: '.yourdomain.com',
      // OPTIONAL - Cookie path
      path: '/',
      // OPTIONAL - Cookie expiration in days
      expires: 365,
      // OPTIONAL - Cookie secure flag
      // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
      secure: true,
    },
    */

    // OPTIONAL - customized storage object
    // storage: new MyStorage(),

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_SRP_AUTH',

    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    //clientMetadata: {myCustomKey: 'myCustomValue'},

    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain:
        'https://hoogingapp-auth-v1.auth.ap-northeast-2.amazoncognito.com',
      scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: 'http://localhost:3000/',
      redirectSignOut: 'http://localhost:3000/',
      responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
    },
  },
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
      alert('카메라 권한을 허용해주세요.');
    }
  } catch (err) {
    console.warn(err);
  }
}

function App() {
  requestCameraPermission();
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;

/*
class App extends React.Component {
  constructor(state, props) {
    super(state, props);
    this.state = {
      validCloseWindow: false,
    };
  }
  async componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
  }
  requestCameraPermission();

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
  }
  handleBackButton = () => {
    if (!this.props.navigation.canGoBack()) {
      if (this.state.validCloseWindow) return false;
      this.state.validCloseWindow = true;
      setTimeout(() => {
        this.state.validCloseWindow = false;
      }, 3000);
      ToastAndroid.show('Press Again To Exit !', ToastAndroid.SHORT);
      return true;
    }
  };

  //rest of component code
  render() {
    return <Navigator />;
  }
}

export default App;
*/
