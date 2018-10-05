
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ActivityIndicator,
	Linking,
	Constants,
	TouchableOpacity,
} from 'react-native';
import React from 'react';

import ContactListItem from '../components/ContactListItem';
import store from '../store';

import { fetchContacts } from '../utils/api';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../utils/colors';
import getURLParams from '../utils/getURLParams';


const keyExtractor = ({phone}) => phone;

export default class Contacts extends React.Component {

	state = {
		contacts: store.getState().contacts,
		loading: store.getState().isFetchingContacts,
		error: store.getState().error,
	};

	static navigationOptions = ({navigation: { navigate }}) => ({
		title: 'Contacts',
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
	
	async componentDidMount(){

		const { contacts } = this.state;

		const handleStateChange = () => 
			this.setState({
				contacts: store.getState().contacts,
				loading: store.getState().isFetchingContacts,
				error: store.getState().error,
			});

		this.unsubscribe = store.onChange( handleStateChange );

		if ( contacts.length === 0 ){

			const contacts = await fetchContacts();

			store.setState( { 
				contacts,
				isFetchingContacts: false,
			});
		}


		Linking.addEventListener('url', this.handleOpenUrl);

		const url = await Linking.getInitialURL();
		this.handleOpenUrl({ url });

	}

	componentWillUnmount(){
		this.unsubscribe();
		Linking.removeEventListener('url', this.handleOpenUrl);
	}

	handleOpenUrl(event) {
		const { navigation: { navigate } } = this.props; 
		const { url } = event;
		const params = getURLParams(url);
		
		if (params.name) {
			const queriedContact = store.getState().contacts.find(contact =>
          		contact.name.split(' ')[0].toLowerCase() ===
            	params.name.toLowerCase());
		if (queriedContact) {
			navigate('Profile', { id: queriedContact.id });
		} }
	}


	renderContact = ({ item }) => {
		const { navigation: { navigate }} = this.props; //the navigation prop is added by the React Navigation library to the higher-order component it creates using Contact (in this case)
		const { id, name, avatar, phone } = item;
		return (
			
				<ContactListItem 
					name={name} 
					avatar={avatar} 
					phone={phone}
					onPress={ () => navigate('Profile', { contact: item })} 
				/>
			
		);
	};


	render(){

		const { loading, contacts, error } = this.state;

		const contactsSorted = contacts.sort( (a,b) => a.name.localeCompare( b.name ));

		return (
			<View style={styles.container}>
				{ loading && <ActivityIndicator size="large" /> }
				{ error && <Text>Error...</Text> }
				{
					!loading &&
					!error && (
					<FlatList
						data={contactsSorted}
						renderItem={this.renderContact}
						keyExtractor={keyExtractor}
					/>)
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
});
