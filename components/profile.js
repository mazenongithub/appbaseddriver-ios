import React from 'react';
import { View, Text, TextInput } from 'react-native'
import { MyStylesheet } from './styles';
import AppBasedDriver from './appbaseddriver';
import {validateDriverID,validateEmail} from './functions'
//import {CheckDriverID, CheckEmailAddress} from './actions/api'



class Profile  {  

    showdriverimage() {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this);
        const profileImage = () => {
            if (this.state.width > 1200) {
                return (
                    {
                        width: 392,
                        height: 327
                    })
    
            } else if (this.state.width > 600) {
                return (
                    {
                        width: 285,
                        height: 249
                    })
    
            } else {
                return (
                    {
                        width: 167,
                        height: 145
                    })
            }
            
        }

        if (myuser.profileurl) {
            return (<img src={myuser.profileurl} style={{ ...profileImage() }} alt={`${myuser.firstname} ${myuser.lastname}`} />)
        } else {
            return;


        }

    }

    async checkemailaddress() {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this);
        const errmsg = validateEmail(myuser.emailaddress);
       
        if (!errmsg) {
            const response = await CheckEmailAddress(myuser.emailaddress)
            console.log(response)
            if (response.hasOwnProperty("invalid")) {
                myuser.invalidemail = `${response.invalid}`
                this.props.reduxUser(myuser)
                this.setState({ message: response.invalid })
            } else {
                delete myuser.invalidemail;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })
            }




        } else {
            myuser.invalidemail = myuser.emailaddress;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }

    }
    getemailaddress() {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        let emailaddress = "";
        if (myuser) {
            emailaddress = myuser.emailaddress;
        }
        return emailaddress;

    }
    handleemailaddress(emailaddress) {
        const appbaseddriver = new AppBasedDriver();
        let myuser = appbaseddriver.getuser.call(this);
        const errmsg = validateEmail(emailaddress)
        
        if (myuser) {
            
            myuser.emailaddress = emailaddress;
            if(errmsg) {
                myuser.invalidemail = emailaddress;
                this.props.reduxUser(myuser);
                this.setState({message:errmsg})
            } else {
                if(myuser.hasOwnProperty("invalidemail")) {
                    delete myuser.invalidemail;
                    this.props.reduxUser(myuser)
                    this.setState({message:''})
                }
            }
          
            this.setState({ render: 'render' })
        }

    }
    getphonenumber() {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        let phonenumber = "";
        if (myuser) {
            phonenumber =  myuser.phonenumber;
        }
        return phonenumber;

    }
    handlephonenumber(phonenumber) {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {
            myuser.phonenumber = phonenumber;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }

    }
    getlastname() {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        let lastname = "";
        if (myuser) {
            lastname = myuser.lastname;
        }
        return lastname;

    }
    handlelastname(lastname) {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {
            myuser.lastname = lastname;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }

    }
    getfirstname() {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        let firstname = "";
        if (myuser) {
            firstname =  myuser.firstname;
        }
        return firstname;

    }
    handlefirstname(firstname) {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {
            myuser.firstname = firstname;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }

    }
    getdriverid() {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {
            return myuser.driverid;
        }

    }
    handledriverid(driverid) {
        const appbaseddriver = new AppBasedDriver();
        const validate = validateDriverID(driverid);
        let myuser = appbaseddriver.getuser.call(this);
        if (!validate) {

            if (myuser.hasOwnProperty("invalid")) {
                delete myuser.invalid;
            }
            if (myuser) {
                myuser.driverid = driverid;
                this.props.reduxUser(myuser);
                this.setState({ message: '' })
            }

        } else {
            myuser.driverid = driverid;
            myuser.invalid = validate;
            this.props.reduxUser(myuser);
            this.setState({ message: validate })

        }

    }

    async checkdriverid(driverid) {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this);

        if (myuser) {
            let validate = validateDriverID(driverid)
            if (driverid && !validate) {
                try {
                    let response = await CheckDriverID(driverid);
                    console.log(response)
                    if (response.hasOwnProperty("invalid")) {
                        myuser.invalid = response.invalid;
                        this.props.reduxUser(myuser);
                        this.setState({ message: response.invalid })
                    } else if (response.hasOwnProperty("valid")) {

                        if (myuser.hasOwnProperty("invalid")) {
                            delete myuser.invalid;
                            this.setState({ message: '' })
                        }
                    }
                } catch (err) {
                    alert(err)
                }
            }

        }
    }

    showprofile() {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this);
        const styles = MyStylesheet();
        const headerFont = appbaseddriver.getHeaderFont.call(this)
        const profile = new Profile()
       
        const profileDimensions = () => {
            if (this.state.width > 1200) {
                return (
                    {
                        width: 392
                    })
    
            } else if (this.state.width > 600) {
                return (
                    {
                        width: 285
                    })
    
            } else {
                return (
                    {
                        width: 167
                    })
            }
        } 
        const folderSize = () => {
            if (this.state.width > 1200) {
                return (
                    {
                        width: 142
                    })
    
            } else if (this.state.width > 600) {
                return (
                    {
                        width: 93
                    })
    
            } else {
                return (
                    {
                        width: 88
                    })
            }
            
        }
        const regularFont = appbaseddriver.getRegularFont.call(this)

        const goIcon = appbaseddriver.getgocheckheight.call(this)

        const showButton = () => {

            if (!myuser.hasOwnProperty("invalid") && myuser.driverid) {
                return (<Text style={{ ...styles.generalButton, ...goIcon }}>O</Text>)
            } else {
                return;
            }
        }


        const emailicon = () => {
            if (!myuser.hasOwnProperty("invalidemail") && myuser.emailaddress) {
            return (<Text style={{ ...styles.generalButton, ...goIcon }}>O</Text>)
            }
        }

        if (myuser) {
            return (
                <View style={{ ...styles.generalFlex }}>
                    <View style={{ ...styles.flex1 }}>

                 

                        <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <TextInput  value={profile.getdriverid.call(this)}
                                onChangeText={text => { profile.handledriverid.call(this,text) }}
                                style={{ ...styles.generalFont, ...headerFont, ...styles.fontBold }}
                               
                            />
                            {showButton()}
                            </View>
                        </View>

                        <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <View style={{ ...styles.flex1 }}>
                                <Text style={{ ...regularFont, ...styles.generalFont, ...styles.generalContainer,...styles.addMargin }}>First Name</Text>
                                <TextInput style={{ ...styles.generalFont, ...regularFont,...styles.generalField }}
                                    value={profile.getfirstname.call(this)}
                                    onChangeText={text => { profile.handlefirstname.call(this,text) }} />
                            </View>
                            <View style={{ ...styles.flex1 }}>
                                <Text style={{ ...regularFont, ...styles.generalFont, ...styles.generalContainer,...styles.addMargin }}>Last Name</Text>
                                <TextInput style={{ ...styles.generalFont, ...regularFont,...styles.generalField }}
                                    value={profile.getlastname.call(this)}
                                    onChangeText={text => { profile.handlelastname.call(this,text) }} />
                            </View>
                        </View>

                        <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <View style={{ ...styles.flex1 }}>
                                <Text style={{ ...regularFont, ...styles.generalFont, ...styles.generalContainer, ...styles.addMargin  }}>EmailAddress</Text>
                                <TextInput style={{ ...styles.generalFont, ...regularFont,...styles.generalField }}
                                    value={profile.getemailaddress.call(this)}
                                    onChangeText={text => { profile.handleemailaddress.call(this,text) }}
                                 />
                                    {emailicon()}
                            </View>
                            <View style={{ ...styles.flex1 }}>
                                <Text style={{ ...regularFont, ...styles.generalFont, ...styles.generalContainer, ...styles.addMargin }}>Phone Number</Text>
                                <TextInput style={{ ...styles.generalFont, ...regularFont,...styles.generalField }}
                                    value={profile.getphonenumber.call(this)}
                                    onChangeText={text => { profile.handlephonenumber.call(this,text) }}
                                />
                            </View>
                        </View>

                        

                       

               

                    </View>
                </View>




            )
        } else {
            return (<View style={{...styles.generalContainer, ...styles.alignCenter}}>
                <Text style={{...styles.generalFont,...regularFont}}> Please Login to View Profile </Text></View>)
        }

    }
}


export default Profile