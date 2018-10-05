"Navigation is important in mobile apps." Discuss.

This project uses the React Navigation library to handle routing in a contact list app.  Both a TabNavigator and DrawerNavigator implementation are tried to move between three StackNavigators, Contacts, Favorites and User.  A small **state container** is set up for data sharing across the who app hierarchy.  Components set a listener for changes to the state they consume in componentDidMount() and unsubscribe in componentWillUnmount().
