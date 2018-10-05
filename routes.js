// import { StackNavigator } from 'react-navigation';

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';
import User from './screens/User';
import Options from './screens/Options';

import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';


import colors from './utils/colors';


const getTabBarIcon = icon => ({ tintColor }) => (
	<FontAwesome name={icon} size={26} style={{ color: tintColor }} />
);


const getDrawerItemIcon=icon=>({tintColor})=>(
	  <FontAwesome name={icon} size={22} style={{ color: tintColor }} />
);

// export default StackNavigator({
// 	Contacts: {
// 		screen: Contacts,
// 	},
// 	Profile: {
// 		screen: Profile,
		
// 	},
// 	Favorites: {
// 		screen: Favorites,
// 	},
// 	User: {
// 		screen: User,
// 	}
// },
// {
// 	initialRouteName: 'User',
// 	navigationOptions: {
// 		headerStyle: {
// 			backgroundColor: colors.blue,
// 		},
// 	},
// },
// );


const ContactScreens = StackNavigator({
	Contacts: {
		screen: Contacts,
	},
	Profile: {
		screen: Profile,
	}
}, {
	initialRouteName: 'Contacts',
	navigationOptions: {
      tabBarIcon: getTabBarIcon('th-list'),
      drawerIcon: getDrawerItemIcon('th-list'),
    },
});

const FavoritesScreens = StackNavigator( {
    Favorites: {
      screen: Favorites,
}, Profile: {
      screen: Profile,
    },
}, {
    initialRouteName: 'Favorites',
       navigationOptions: {
      tabBarIcon: getTabBarIcon('star'),
      drawerIcon: getDrawerItemIcon('star'),
}, },
);
const UserScreens = StackNavigator( {
    User: {
      screen: User,
	},
	Options: {
		screen: Options,
	}, 
},
  {
    mode: 'modal',
    initialRouteName: 'User',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('user'),
      drawerIcon: getDrawerItemIcon( 'user'),
    },
}, );



export default DrawerNavigator({
	Contacts: {
		screen: ContactScreens,
	},
	Favorites: {
		screen: FavoritesScreens,
	},
	User: {
		screen: UserScreens,
	},
},{
	initialRouteName: 'Contacts',
	// animationEnabled: true,
	// tabBarPosition: 'bottom',
	// tabBarOptions: {
	// 	style: {
 //        	backgroundColor: colors.greyLight,
	// 	},
	// 	showLabel: false,
	// 	showIcon: true,
	// 	activeTintColor: colors.blue, 
	// 	inactiveTintColor: colors.greyDark, 
	// 	renderIndicator: () => null,
	// },
});




// export default TabNavigator({
// 	Contacts: {
// 		screen: ContactScreens,
// 	},
// 	Favorites: {
// 		screen: FavoritesScreens,
// 	},
// 	User: {
// 		screen: UserScreens,
// 	},
// },{
// 	initialRouteName: 'Contacts',
// 	animationEnabled: true,
// 	tabBarPosition: 'bottom',
// 	tabBarOptions: {
// 		style: {
//         	backgroundColor: colors.greyLight,
// 		},
// 		showLabel: false,
// 		showIcon: true,
// 		activeTintColor: colors.blue, 
// 		inactiveTintColor: colors.greyDark, 
// 		renderIndicator: () => null,
// 	},
// });

