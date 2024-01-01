import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from './AuthProvider'; // Import the useAuth hook


const LoginPage = ({navigation}) => {
  const { login } = useAuth();
    const [email , setemail] = useState("")
    const [password , setpassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
 
    try {
     
        if(await login(email, password))
             navigation.navigate('HealthTipsScreen');
      
      // User is logged in successfully
    } catch (error) {
      console.error("Login error:", error.message);
      // Handle login error, e.g., display an error message to the user
    }


  };

  const handleSignUp = () => {
    console.log('Sign Up pressed');
    navigation.navigate('UserRegistrationScreen');
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password pressed');
  };

  const handleGoogleLogin =async  () => {

}

  const handleFacebookLogin = () => {
    console.log('Facebook Login pressed');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>

      <View style={styles.socialLoginContainer}>
      <Text style={styles.title}>Login</Text>
          <TouchableOpacity style={styles.socialLoginCard} onPress={handleGoogleLogin}>
            <Icon name="google" size={24} color="#007AFF" />
            <Text style={styles.socialLoginText}>Login with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialLoginCard} onPress={handleFacebookLogin}>
            <Icon name="facebook" size={24} color="#007AFF" />
            <Text style={styles.socialLoginText}>Login with Facebook</Text>
          </TouchableOpacity>
        </View>
        {/* <Text style ={{alignSelf : 'center',paddingTop:20}}>OR</Text> */}
        <View style={styles.formContainer}>
          
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text)=>{setemail(text)}}
        />
      
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry 
          value={password}
          onChangeText={(text)=>{setpassword(text)}}

        />
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, { backgroundColor: rememberMe ? 'white' : '#007AFF' }]}
              onPress={() => setRememberMe(!rememberMe)}
            >
              {rememberMe && <Icon name="check" size={18} color="#007AFF" />}
            </TouchableOpacity>
            <Text style={styles.checkboxText}>Remember me</Text>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signupLink}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center', // Center the form content
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf:'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%', // Make input full width
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 16,
    fontWeight: 'normal',
   
  },
   label: {
    fontSize: 16,
    marginBottom: 4,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%', // Make button full width
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupLink: {
    color: '#007AFF',
    marginTop: 10,
    textAlign: 'center',
  },
  forgotPasswordLink: {
    color: '#007AFF',
    marginTop: 10,
    textAlign: 'center',
  },
  socialLoginContainer: {
    marginTop: 20,
  },
  socialLoginCard: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLoginText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default LoginPage;
