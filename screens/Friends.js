import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const FriendsScreen = () => {
    const [friendsCount] = useState(0); // State to track the number of friends
    const navigation = useNavigation();
    const goToNotifications = () => {
        navigation.navigate('Notifications');
    };
    const goToAddFriends = () => {
        navigation.navigate('AddFriends');
    };

    const addFriend = () => {
        // Logic to add a friend
        // For now, let's just increment the friends count
        setFriendsCount(prevCount => prevCount + 1);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* Plus icon for adding friends */}
                <TouchableOpacity onPress={goToAddFriends} style={styles.iconContainer}>
                    <Image source={require('../assets/Plus.png')} style={styles.headerIcon} />
                </TouchableOpacity>
                {/* Title */}
                <Text style={styles.title}>Friends</Text>
                {/* Mail icon for notifications */}
                <TouchableOpacity onPress={goToNotifications} style={styles.iconContainer}>
                    <Image source={require('../assets/Mail.png')} style={styles.headerIcon} />
                </TouchableOpacity>
            </View>


            {/* Search bar */}
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchBarInput}
                    placeholder="Search friends..."
                    placeholderTextColor="#aaa"
                />
            </View>
            {/* Content */}
            <View style={styles.content}>
                {/* If no friends are added, display message */}
                {friendsCount === 0 && <Text style={styles.noFriendsText}>You have no friends yet.</Text>}
                {/* Otherwise, display friends list */}
                {/* Add your friends list here */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 40, // Added padding to move content below status bar
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        marginTop: 5, // Adjust this value as needed
    },
    headerIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 32,
        // fontFamily: 'Sora-SemiBold',
        fontWeight: 'bold',
        marginTop: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noFriendsText: {
        fontSize: 18,
        color: 'gray',
    },

    searchBar: {
        marginTop: 15, // Add margin to position below title
        marginBottom: 10, // Add margin for spacing
        marginHorizontal: 20, // Add horizontal margin
        paddingHorizontal: 10, // Add padding for text input
        backgroundColor: 'white', // Light background for search bar
        borderRadius: 5, // Rounded corners for search bar
        borderWidth: 1,
        borderColor: 'grey',
        height: 40,
    },
    searchBarInput: {
        marginTop: 9,
        fontSize: 16,
        color: 'black',
    },
});

export default FriendsScreen;