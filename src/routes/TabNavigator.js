// import React from 'react';
// import { TouchableOpacity, View,Text } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Feather';
// import IconP from 'react-native-vector-icons/AntDesign';
// import IconO from 'react-native-vector-icons/MaterialIcons';
// import IconE from 'react-native-vector-icons/EvilIcons';
// import { useSelector } from "react-redux";
// import styles from '../styles/CommonStyle/Style';
// // import {RouteName} from '../../routes';

// const Tab = createBottomTabNavigator();

// const YourTabone = () => {
//     return (
//         <View style={styles.setbgcolor}>
//         <Text>one</Text>
//       </View>
//     );
 
// }
// const YourTabtwo = () => {
//     return (
//   <View style={styles.setbgcolortwo}>
//     <Text>two</Text>
//   </View>
//     );
// }
// const YourTabthree = () => {
//     return (
//   <View style={styles.setbgcolor}>
//     <Text>three</Text>
//   </View>
//     );
// }
// const YourTabfour = () => {
//     return (
//   <View style={styles.setbgcolortwo}>
//     <Text>four</Text>
//   </View>
//     );
// }

// const TabBarIcon = (props) => {
//   return (
//     <Icon
//       name={props.name}
//       size={props.size ? props.size : 24}
//       color={props.tintColor}
//     />
//   )
// }
// const TabBarIcontwo = (props) => {
//   return (
//     <IconP
//       name={props.name}
//       size={props.size ? props.size : 24}
//       color={props.tintColor}
//     />
//   )
// }
// const TabBarIconoffer = (props) => {
//   return (
//     <IconO
//       name={props.name}
//       size={props.size ? props.size : 24}
//       color={props.tintColor}
//     />
//   )
// }

// const TabNavigator =() => {

//   const { colorrdata } = useSelector(state => state.commonReducer) || {};
//   return (
//     <Tab.Navigator initialRouteName="Homes"
//       tabBarOptions={{
//         activeTintColor: 'green',
//         inactiveTintColor: "#302F3C",
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={YourTabone}
//         options={{
//           headerShown:false,
//           tabBarIcon: ({ focused, color }) => (
//             <TabBarIcon
//               focused={focused}
//               tintColor={color}
//               name="home"
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//        name="two"
//         component={YourTabtwo}
//         options={{
//           headerShown:false,
//           tabBarIcon: ({ focused, color }) => (
//             <TabBarIconoffer
//               focused={focused}
//               tintColor={color}
//               name="local-offer"
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//          name="three"
//         component={YourTabthree}
//         options={{
//           headerShown:false,
//           tabBarIcon: ({ focused, color }) => (
//             <TabBarIcontwo
//               focused={focused}
//               tintColor={color}
//               name="shoppingcart"
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="four"
//         component={YourTabfour}
//         options={{
//           headerShown:false,
//           tabBarIcon: ({ focused, color }) => (
//             <TabBarIcon
//               focused={focused}
//               tintColor={color}
//               name="user"
//             />
//           ),
//         }}
//       />    
//     </Tab.Navigator>
//   )
// }
// export default TabNavigator;
