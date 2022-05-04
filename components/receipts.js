import React from 'react';
import { View, Text, Image } from 'react-native'
import { MyStylesheet } from './styles';
import AppBasedDriver from './appbaseddriver';
import * as ImagePicker from 'expo-image-picker';
import { formatDateStringDisplay, makeID } from './functions'
import { UploadReceipt, RemoveReceipt } from './actions/api'

class Receipts {


    getcost() {
        const appbaseddriver = new AppBasedDriver();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        const equipment = appbaseddriver.getequipmentbyid.call(this,equipmentid);
        let cost = false;
        if (equipment) {
            const costid = appbaseddriver.getEquipmentCostID.call(this)
            console.log(`COSTID: ${costid}`)
            cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, costid)
        }
        return cost;
    }

    getReceipts() {
        let getreceipts = false;
        const receipts = new Receipts()
        const cost = receipts.getcost.call(this);
        if (cost.hasOwnProperty("images")) {
            getreceipts = cost.images;
        }
        return getreceipts;

    }
 

  
    handleRemoveReceipt(imageid) {
        const appbaseddriver = new AppBasedDriver();
        const receipts = new Receipts()
        const myuser = appbaseddriver.getuser.call(this)
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        if (myuser) {
            const equipment = appbaseddriver.getequipmentbyid.call(this,equipmentid);
            if (equipment) {
          
                const cost = receipts.getcost.call(this);
                if (cost) {
                    const costid = cost.costid;
                    if (imageid) {
                        receipts.removeReceipt.call(this,equipmentid, costid, imageid, myuser)
                    }
                }
            }
        }
    }

    async removeReceipt(equipmentid, costid, imageid, myuser) {

        try {
            this.setState({spinner:true})

            let response = await RemoveReceipt({ equipmentid, costid, imageid, myuser })
            this.setState({spinner:false})
            if (response.hasOwnProperty("driverid")) {
                this.props.reduxUser(response)
                let message = `Driver Updated ${new Date().toLocaleTimeString()}`
                this.setState({ spinner: false, message })
            }

        } catch (err) {
            
            this.setState({ spinner: false })
            alert(err)

        }

    }

    async uploadmyuser(equipmentid, costid, imageid, myuser) {

       

                try {
                    let myImage = await ImagePicker.launchImageLibraryAsync({
                        allowsEditing: true,
                        aspect: [1, 1],
                    });

                    if (myImage.hasOwnProperty("uri")) {
                        let uriParts = myImage.uri.split('.');
                        let fileType = uriParts[uriParts.length - 1];

                        const profilephoto = () => {
                            return ({
                                uri: myImage.uri,
                                name: `photo.${fileType}`,
                                type: `image/${fileType}`,
                            })

                        }

                        const values = { equipmentid, costid, imageid }
                        let formData = new FormData();
                        formData.append("profilephoto", profilephoto());
                        formData.append("myuser", JSON.stringify(myuser))
                        formData.append("values", JSON.stringify(values))
                        try {
                            this.setState({spinner:true})
                            let response = await UploadReceipt(formData)
                            this.setState({spinner:false})
                            if (response.hasOwnProperty("driverid")) {
                                this.props.reduxUser(response)
                                let message = `Driver Updated ${new Date().toLocaleTimeString()}`
                                this.setState({ message })
                            }
            
                        } catch (err) {
                            this.setState({ spinner: false })
                            alert(err)
            
            
                        } // try upload image

                    } // end my image url


                } catch (err) {
                    console.log("User Canceled photo selection")
                }

          
        
    }

 
    uploadReceipt() {
        const appbaseddriver = new AppBasedDriver();
        let myuser = appbaseddriver.getuser.call(this)
        const receipts = new Receipts()

        const CreateReceipt = (imageid, url) => {
            return ({ imageid, url })

        }


        if (myuser) {
            const equipmentid = appbaseddriver.getEquipmentID.call(this)
            const equipment = appbaseddriver.getequipmentbyid.call(this,equipmentid);
            if (equipment) {
                const i = appbaseddriver.getequipmentkeybyid.call(this, equipmentid)
                const cost = receipts.getcost.call(this)
                if (cost) {

                    const j = appbaseddriver.getequipmentcostkeybyid.call(this, equipmentid, cost.costid)
                    const imageid = makeID(16)
                    const newReceipt = CreateReceipt(imageid, "")
                    if (cost.hasOwnProperty("images")) {

                        myuser.equipment[i].costs[j].images.push(newReceipt)
                    } else {
                        myuser.equipment[i].costs[j].images = [newReceipt]
                    }
                    receipts.uploadmyuser.call(this,equipmentid, cost.costid, imageid, myuser)


                }



            }


        }
    }

    showupload() {
        const styles = MyStylesheet();
        const receipts = new Receipts();
        const getUploadFile = () => {
            if (this.state.width > 1200) {
                return ({ width: 120})

            } else if (this.state.width > 600) {
                return ({ width: 90 })

            } else {
                return ({ width: 60 })
            }
        }


       

            if(!this.state.spinner) {


            return (<Text style={{ ...styles.generalButton, ...getUploadFile() }} onPress={() => { receipts.uploadReceipt.call(this) }}>Upload</Text>)
            } else {
                return(<Text>...</Text>)
            }

        
    }

    showuploadFile() {
        const styles = MyStylesheet();
        const receipts = new Receipts();
        const getreceipts = receipts.getReceipts.call(this);


        return (<View style={{ ...styles.generalContainer, ...styles.bottomMargin10, ...styles.alignCenter }}>
            

            {receipts.showupload.call(this)}

            <Text>There are {getreceipts.length} Receipts</Text>
        </View>)
    }

    showreceipt(image) {
        const styles = MyStylesheet()
        const appbaseddriver = new AppBasedDriver();
        const getIcon = appbaseddriver.getremoveicon.call(this);
        const receipts = new Receipts();
        const maxWidth = () => {
            if(this.state.width>1200) {
                return({ maxWidth:1000})
            } else if (this.width>600) {
                return({ maxWidth:480})
            } else {
                return({ maxWidth:320})
            }
            
        }
        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin10,...styles.topMargin10}}>
                <View style={{ ...styles.flex5 }}>
                    <View style={{ ...styles.alignCenter,  }}>
                        <Image style={{...maxWidth()}} key={image.id} source={{uri:image.url}}/>
                    </View>
                </View>
                <View style={{ ...styles.flex1 }}>
                    <Text style={{ ...styles.generalButton, ...getIcon }}
                        onPress={() => { receipts.handleRemoveReceipt.call(this,image.imageid) }}>X</Text>
                </View>
            </View>)

    }

    showreceipts() {
        const receipts = new Receipts();
        const myreceipts = receipts.getReceipts.call(this)
        let getreceipts = [];
        if (myreceipts) {
// eslint-disable-next-line
            myreceipts.map(receipt => {
                getreceipts.push(receipts.showreceipt.call(this,receipt))

            })
        }
        return getreceipts;
    }



    showComponent() {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver()
        const myuser = appbaseddriver.getuser.call(this)
        const regularFont = appbaseddriver.getRegularFont.call(this)
        const receipts = new Receipts();
        console.log(`Show Component : Receipts`)

        if (myuser) {
            const equipmentid = appbaseddriver.getEquipmentID.call(this)
            const equipment = appbaseddriver.getequipmentbyid.call(this,equipmentid)
            if (equipment) {

                const cost = receipts.getcost.call(this);
                if (cost) {

                    const reoccurring = (cost) => {
                        if (cost.hasOwnProperty("reoccurring")) {
                            return `Reoccurring ${cost.reoccurring.frequency}`
                        }
                    }


                    return (<View style={{ ...styles.generalContainer }}>

                    

                        <View style={{ ...styles.generalContainer, ...styles.bottomMargin10 }}>
                            <Text style={{ ...regularFont, ...styles.generalFont }}>
                                {reoccurring(cost)} PurchaseDate: {formatDateStringDisplay(cost.purchasedate)} Detail: {cost.detail} Amount: ${cost.amount}
                            </Text>
                        </View>

                        {receipts.showuploadFile.call(this)}

                        <View style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}>{this.state.message}</Text>
                        </View>

                        {receipts.showreceipts.call(this)}

                    </View>)

                } else {

                    return (<View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1 }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}>Cost Not Found</Text>
                        </View>
                    </View>)

                }

            } else {
                return (<View style={{ ...styles.generalFlex }}>
                    <View style={{ ...styles.flex1 }}>
                        <Text style={{ ...styles.generalFont, ...regularFont }}>Equipment Not Found</Text>
                    </View>
                </View>)
            }

        } else {
            return (<View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>
                    <Text style={{ ...styles.generalFont, ...regularFont }}>User Not Found</Text>
                </View>
            </View>)
        }
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation
    }
}

export default Receipts;