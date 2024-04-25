import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Modal, Image, FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StackActions } from '@react-navigation/native';

import eyeOffLogo from '../assets/eye-icon.png';
import eyeLogo from '../assets/blind-eye-sign.png';
import downArrow from '../assets/down-arrow.png';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalEmail, setModalEmail] = useState('');
    const [isMobileModalVisible, setIsMobileModalVisible] = useState(false);
    const [showCountryCodes, setShowCountryCodes] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState('+1');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.1.102:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Invalid credentials');
            }
    
            const data = await response.json();
    
            // Extract auth token from response and pass it as parameter to navigation function
            navigation.dispatch(StackActions.push('Unverified_HomePage', { authToken: data.token }));
        } catch (error) {
            console.error('Login failed:', error.message);
            // Handle login error, e.g., show error message to the user
        }
    };
    

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleDone = () => {
        setIsModalVisible(false);
        setIsMobileModalVisible(false);
        setModalEmail('');
    };

    const toggleMobileModal = () => {
        setIsMobileModalVisible(!isMobileModalVisible);
        if (!isMobileModalVisible) {
            setIsModalVisible(false);
        }
    };

    const countryCodes = [
        { code: '+1', country: 'USA' },
        { code: '+91', country: 'India' },
        { code: '+961', country: 'Lebanon' },
    ];

    const handleCountryCodeSelect = (code) => {
        setSelectedCountryCode(code);
        setShowCountryCodes(false);
    };

    const Reset = () => {  
        setIsModalVisible(false);
        navigation.dispatch(StackActions.push('Reset'));
    };

    const OTP = () => {  
        setIsMobileModalVisible(false);
        navigation.dispatch(StackActions.push('OTP'));
    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            setIsModalVisible(false);
            setIsMobileModalVisible(false);
            setShowCountryCodes(false);
        }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backButtonText}>{'< Back'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <Text style={styles.loginHeader}>Log-in to your CoinCorp Account!</Text>
                    <View style={styles.emailContainer}>
                        <Text style={styles.header1}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g email@example.com"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.passwordContainer}>
                        <Text style={styles.header1}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={passwordVisibility}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
                            <Image source={passwordVisibility ? eyeOffLogo : eyeLogo} style={styles.eyeIcon} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={toggleModal} style={styles.forgotPasswordButton}>
                        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={toggleModal}
                >
                    <TouchableWithoutFeedback onPress={toggleModal}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={styles.centeredView}
                        >
                            <View style={styles.modalView}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <TouchableOpacity onPress={toggleModal} style={styles.forgotPasswordButton}>
                                        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleDone}>
                                        <Text style={styles.doneButtonText}>Done</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.header1}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g email@example.com"
                                    value={modalEmail}
                                    onChangeText={setModalEmail}
                                />
    
                                <TouchableOpacity onPress={Reset} style={styles.linkButton}>
                                    <Text style={styles.linkButtonText}>Send reset link</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleMobileModal} style={styles.mobilenum}>
                                    <Text>Use mobile number instead</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isMobileModalVisible}
                    onRequestClose={toggleMobileModal}
                >
                    <TouchableWithoutFeedback onPress={toggleMobileModal}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={styles.centeredView}
                        >
                            <View style={styles.modalView}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <TouchableOpacity onPress={toggleMobileModal} style={styles.forgotPasswordButton}>
                                        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleDone}>
                                        <Text style={styles.doneButtonText}>Done</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.header1}>Mobile Number</Text>
                                <View style={styles.inputContainer}>
                                    <TouchableOpacity
                                        style={styles.countryCodeButton}
                                        onPress={() => setShowCountryCodes(!showCountryCodes)} // Toggle visibility
                                    >
                                        <View style={styles.countryCodeContainer}>
                                            <Text style={styles.countryCode}>{selectedCountryCode}</Text>
                                            <Image source={downArrow} style={styles.downArrow} />
                                        </View>
                                    </TouchableOpacity>
                                    <TextInput
                                        style={styles.inputnum}
                                        placeholder="123 456 7890"
                                        keyboardType="phone-pad"
                                        onChangeText={(text) => setPhoneNumber(text)}
                                        value={phoneNumber}
                                    />
                                </View>
                                {showCountryCodes && (
                                    <FlatList
                                        data={countryCodes}
                                        keyExtractor={(item) => item.code}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={styles.countryCodeListItem}
                                                onPress={() => handleCountryCodeSelect(item.code)}
                                            >
                                                <Text style={styles.countryCodeListItemText}>
                                                    {item.code} - {item.country}
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                )}
                                <TouchableOpacity onPress={OTP} style={styles.linkButton}>
                                    <Text style={styles.linkButtonText}>Send reset link</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setIsModalVisible(true); setIsMobileModalVisible(false); setShowCountryCodes(true); }} style={styles.mobilenum}>
                                    <Text>Use email instead</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
};    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    header: {
        alignSelf: 'stretch',
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 0,
    },
    backButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loginHeader: {
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: 'center',
        marginBottom: 10,
        bottom: 230
    },
    emailContainer: {
        width: '100%',
        marginBottom: 10
    },
    content: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    input: {
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    passwordContainer: {
        position: 'relative',
        width: '100%',
    },
    loginButton: {
        backgroundColor: 'black',
        paddingVertical: 15,
        borderRadius: 5,
        width: '100%',
        position: 'absolute',
        bottom: 20,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        alignSelf: 'center',
    },
    eyeButton: {
        position: 'absolute',
        right: 10,
        top: '55%',
        transform: [{ translateY: -12.5 }],
    },
    eyeIcon: {
        width: 25,
        height: 25,
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        fontWeight: 'bold',
        color: 'black',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 35,
    },
    modalText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000',
        marginBottom: 20,
    },
    linkButton: {
        marginTop: 10,
        backgroundColor: 'black',
        paddingVertical: 15,
        borderRadius: 5,
        width: '100%',
        marginBottom: 10,
        alignSelf: 'center',
    },
    linkButtonText: {
        color: 'white',
        fontSize: 16,
        alignSelf: 'center',
    },    
    mobilenum:{
        marginTop: 10,
        alignSelf:'center',
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
    },
    doneButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    
    countryCodeButton: {
        padding: 10,
        justifyContent: 'center',
    },
    
    inputnum: {
        padding: 10,
        flex: 1,
        height: 40,
    },    
    countryCode: {
        fontSize: 16,
    },
    downArrow: {
        width: 10,
        height: 6,
        marginLeft: 5, // Space between the country code and arrow
    },
    countryCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Center the items vertically
        justifyContent: 'center', // Center the items horizontally
    },
});

export default Login;
