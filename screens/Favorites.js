import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { fetchContacts } from '../utils/api';
import ContactThumbnail from '../components/ContactThumbnail';
import store from '../store';

import { FontAwesome } from '@expo/vector-icons';
import colors from '../utils/colors';


const keyExtractor = ({ phone }) => phone;

export default class Favorites extends React.Component {

	static navigationOptions = ({navigation: { navigate }}) => ({
		title: 'Favorites',
		headerStyle: {
			backgroundColor: 'white',
		},
		headerLeft: (
      		<FontAwesome
        		name="navicon"
        		size={24}
        		style={{ color: colors.black, marginLeft: 10 }}
        		onPress={() => navigate('DrawerToggle')}
			/>
		),
	});
	
	state = { 
		contacts: store.getState().contacts, 
		loading: store.getState().isFetchingContacts,
		error: store.getState().error,
	};

	async componentDidMount() { 

		const { contacts } = this.state;

		const handleStateChange = () => 
			this.setState({
				contacts: store.getState().contacts,
				loading: store.getState().isFetchingContacts,
				error: store.getState().error,
			});

		this.unsubscribe = store.onChange( handleStateChange );

		if ( contacts.length  === 0 ){
			const contacts = await fetchContacts();

			store.setState( { 
				contacts,
				isFetchingContacts: false,
			});
		}

			
	}

	componentWillUnmount(){
		this.unsubscribe();
	}

	renderFavoriteThumbnail = ({ item }) => {
		const { navigation: { navigate } } = this.props;
		const { avatar } = item;
		return ( 
			<ContactThumbnail
        		avatar={avatar}
        		onPress={() => navigate('Profile', { contact: item })}
      		/>
		);
	};


	render(){
		const { loading, contacts, error } = this.state;
		const favorites = contacts.filter(contact => contact.favorite);
		const favoritesSorted = favorites.sort( (a,b) => a.name.localeCompare( b.name ));

		return (
			<View style={styles.container}>
        		{loading && <ActivityIndicator size="large" />}
        		{error && <Text>Error...</Text>}
        		{
        			!loading &&
          			!error && (
            			<FlatList
							data={favoritesSorted} 
							keyExtractor={keyExtractor} 
							numColumns={3} 
							contentContainerStyle={styles.list} 
							renderItem={this.renderFavoriteThumbnail}
						/>
					)
          		}
			</View>
		);
	}
}

const styles = StyleSheet.create({ 
	container: {
    	backgroundColor: 'white',
    	justifyContent: 'center',
    	flex: 1,
	}, 
	list: {
    	alignItems: 'center',
  	},
});