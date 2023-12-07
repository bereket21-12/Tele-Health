import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from "react-native";
import { View ,StyleSheet , Text,Image} from "react-native";
import { heightPercentageToDP as hp ,widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/FontAwesome';
import { firebase_auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";


const Login = ({navigation}) => {

    const [isChecked, setChecked] = useState(false);
    const [email , setemail] = useState("")
    const [password , setpassword] = useState("")
  

    const toggleCheckbox = () => {
      setChecked(!isChecked);
      
    };
    // const handel = () => {navigation.navigate('HealthTipsScreen')}

    const onLoginPress =async  () => {
      await createUserWithEmailAndPassword(firebase_auth, email, password);
      alert("user created")
  }

    return(
        <View  style={style.container}>
                            <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
                  <View  style={style.main}>
                    <View style = {style.loginview}>
                        <Text style = {style.login}>
                           Login
                        </Text>
                        
                    </View>
                    <TouchableOpacity style = {style.card}>
   
                                <Image
                                 style={style.profileImage}
          source={{ uri: 'https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-256.png' }} // Replace with your user's profile picture URL
         
        />
                        <Text style = {style.text}>
                           Use Google Account
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {style.card}>
                    <Image
                       style={style.profileImage}
          source={{ uri: 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-256.png' }} // Replace with your user's profile picture URL
         
        />
                    
                        <Text style = {style.text}>
                        Use Facebook Account

                        </Text>
                    </TouchableOpacity>
                    <View style = { style.option}>
                        <View style ={style.line}/>
                        
                        <View  style = {style.or}>
                             <Text>Or</Text>
                        </View>
                        <View style ={style.line}/>


                    </View>

                    </View>

                    {/* end of main */}
  
                    <View  style={style.header}>
                         
      <View style={style.fieldContainer}>
        <Text style={style.label}>Email:</Text>
        <TextInput
          style={style.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text)=>{setemail(text)}}
        />
      
        <Text style={style.label}>Password:</Text>
        <TextInput
          style={style.input}
          placeholder="Enter your password"
          secureTextEntry 
          value={password}
          onChangeText={(text)=>{setpassword(text)}}

        />
      </View>
                            
                        

                        <View style={{flexDirection:"row",justifyContent:"space-around"}} >
                        <TouchableOpacity style={[style.checkboxContainer,{paddingTop :hp(2)}]} onPress={toggleCheckbox}>
                                <View style={style.checkbox}>
                                    {isChecked && <Icon name="check" size={18} color="#fff" />}
                                </View>
                                <Text style={[style.checkboxText]}>Remember me</Text>

                      </TouchableOpacity>
                                
                            <Text style={{ fontSize: 16,
                                 fontWeight: 'normal',marginTop:hp(2)}}>Forgot Password?</Text>
                        </View>
                        
         
                    </View>
                    {/* footer */}
                    <View  style={style.footer}>
                    <TouchableOpacity onPress = {onLoginPress} >
                            <View style={style.button}>
                                <Text style={style.buttonText}>Login</Text>
                            </View>
                    </TouchableOpacity>

                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                        <Text >Don't Have Account?</Text><Text onPress={() => navigation.navigate('UserRegistrationScreen')} style={style.singup}>signup</Text>
                    </View>
                    </View>
</KeyboardAvoidingView>
                    
        </View>
    )
}

const style = StyleSheet.create({

    container : {
        flex : 1,
        // backgroundColor : 'white',
    },
    main : {
        flex : 1,
        // backgroundColor : 'green',
        // paddingBottom:hp(10)
    },
    header : {
        flex : 1,
        // backgroundColor : 'blue',
    
       

    },
    footer : {
        flex : 1,
        // marginBottom:-90
        // backgroundColor : 'red',
        alignContent:"center",
      
     
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: '8%',
        margin: '2%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // For Android
         flexDirection : "row",
         justifyContent:"space-between",
         flex :1,
    },
    text:{
          textAlign :"center",
          fontSize:18,
          flex :1,
          height:30,
          
 
        
      },
      login:{
        textAlign :"center",
        fontSize :hp(3)

      
    },
    loginview:{
     padding :'5%',
     
      
    },
    line:{
        flex :1,
        height : wp(1),
        width:wp(50),
        borderTopWidth : wp(0.2),
        color:'black',
        borderStyle : 'solid',

    },
      profileImage: {
    height: 50,
    marginBottom: 3,
    flex :0.2,
    alignSelf:"center"
  },
    option : {
        flex :2,
        flexDirection : "row",
        paddingTop :'5%',
        marginLeft :'5%',
        marginRight :'5%',
        alignItems :"center"

    },
      fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
    or :{
      flex : 0.2,
      fontSize :wp(3),
      paddingLeft:wp(4),
      height:30
    },
    username : {
        fontSize :wp(5)
    },
    inputs : {
        backgroundColor : 'rgb(217,217,217)',
        height:hp(6.5),
        borderStyle :"solid",
        borderWidth:1


    },
      input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap:"wrap"
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
        backgroundColor: '#007AFF',
      },
      checkboxText: {
        fontSize: 16,
        fontWeight: 'normal',
      },
      button: {
        backgroundColor: '#007AFF',
        paddingVertical: wp(4),
        // paddingHorizontal: 20,
        borderRadius: 5,
        margin: wp(3),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginBottom:hp(2)
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
      },
      singup:{

        color : 'blue',
        fontStyle:"italic",
        textDecorationLine:"underline"
      }

})

export default Login ;