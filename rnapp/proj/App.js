import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import signinscreen from "./src/screens/signinscreen";
import signupscreen from "./src/screens/signupscreen";
import homescreen from "./src/screens/homescreen";
import createrequestscreen from "./src/screens/createrequestscreen";
import requestdetailscreen from "./src/screens/requestdetailscreen";
import accountscreen from "./src/screens/accountscreen";
import replyscreen from "./src/screens/replyscreen";
import notificationscreen from "./src/screens/notificationscreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { setNavigator } from "./src/navigationRef";
const homeFlow = createStackNavigator({
  home: { screen: homescreen, navigationOptions: { title: "Dashboard" } },
  requestdetail: {
    screen: requestdetailscreen,
    navigationOptions: { title: "Request Details" },
  },
  createrequest: {
    screen: createrequestscreen,
    navigationOptions: { title: "Create Request" },
  },
  reply: {
    screen: replyscreen,
    navigationOptions: { title: "Reply" },
  },
  notification: {
    screen: notificationscreen,
    navigationOptions: { title: "Notifications" },
  },
});
const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    signup: { screen: signupscreen, navigationOptions: { title: "Sign Up" } },
    signin: { screen: signinscreen, navigationOptions: { title: "Sign In" } },
  }),
  mainFlow: createMaterialBottomTabNavigator({
    homeflow: { screen: homeFlow, navigationOptions: { title: "Dashboard" } },
    account: {
      screen: accountscreen,
      navigationOptions: { title: "Profile & Settings" },
    },
  }),
});
const App = createAppContainer(switchNavigator);
export default () => {
  return (
    <AuthProvider>
      <App
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      />
    </AuthProvider>
  );
};
