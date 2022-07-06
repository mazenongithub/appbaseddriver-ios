import React, {Component} from 'react';
import { View, Dimensions, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import AppBasedDriver from './appbaseddriver';
import * as ImagePicker from 'expo-image-picker';
import { formatDateStringDisplay, makeID } from './functions'
import { UploadReceipt, RemoveReceipt } from './actions/api'
import Spinner from './spinner'


class Receipts extends Component {


    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width, height: Dimensions.get('window').height, orientation: '', message: '', imageset:[
                {imageid:`default`,
                height:480,
                width:320
                }],
                spinner:false
        }
        this.updatedimesions = this.updatedimesions.bind(this)

    }

    componentDidMount() {
 
        this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height, orientation: Dimensions.get('screen') })
        Dimensions.addEventListener('change', this.updatedimesions)
        this.updatePictureSet()


    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updatedimesions)
    }

    updatedimesions() {
        this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height })
    }

    async updatePictureSet() {
        const appbaseddriver = new AppBasedDriver();
        const receipts = new Receipts();
        
        const imageset = [];
       

        const image = (imageid, url, width, height) => {
            return({imageid,url,width,height})
        }

        const getreceipts = receipts.getReceipts.call(this)
        if(getreceipts) {
        
            getreceipts.map(receipt=> {
                const receipturl = receipt.url
                this.getImageSize(receipturl)
                .then(imagesize=> {
                  
                  
                    const newImage = image(receipt.imageid,receipturl,imagesize.width,imagesize.height)
                 
                    imageset.push(newImage)
                    
                    
                    
                }

                )

                .then(()=> {
                  
                    this.setState({imageset})
                })
          
               

            })
        }


    }

    async getImageSize(url) {

        return new Promise((resolve,reject) => {

            let width = 0; let height = 0;
  
            Image.getSize(url, (getwidth, getheight) => {
               width = getwidth;
               height = getheight;
               resolve ({width,height})
           
              }, (error) => {
                  reject(error)
                console.error(`Couldn't get the image size: ${error.message}`);
              })
    
             



        })

       
    
        }


    getcost() {
        const appbaseddriver = new AppBasedDriver();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid);
        let cost = false;
        if (equipment) {
            const costid = appbaseddriver.getEquipmentCostID.call(this)
            
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
            const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid);
            if (equipment) {

                const cost = receipts.getcost.call(this);
                if (cost) {
                    const costid = cost.costid;
                    if (imageid) {
                        receipts.removeReceipt.call(this, equipmentid, costid, imageid, myuser)
                    }
                }
            }
        }
    }

    async removeReceipt(equipmentid, costid, imageid, myuser) {

        try {
            this.setState({ spinner: true })

            let response = await RemoveReceipt({ equipmentid, costid, imageid, myuser })
            this.setState({ spinner: false })
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

    async uploadmyuser(equipmentid, costid, myuser) {



        try {
            let myImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1080, 2340],
                mediaTypes:ImagePicker.MediaTypeOptions.Images
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

                const values = { equipmentid, costid }
                let formData = new FormData();
                formData.append("profilephoto", profilephoto());
                formData.append("myuser", JSON.stringify(myuser))
                formData.append("values", JSON.stringify(values))
                try {
                    this.setState({ spinner: true })
                    let response = await UploadReceipt(formData)
                    this.setState({ spinner: false })
                    if (response.hasOwnProperty("driverid")) {
                        this.props.reduxUser(response)
                        this.updatePictureSet();
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


        if (myuser) {
            const equipmentid = appbaseddriver.getEquipmentID.call(this)
            const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid);
            if (equipment) {

                const cost = receipts.getcost.call(this)
                if (cost) {
                    receipts.uploadmyuser.call(this, equipmentid, cost.costid, myuser)
                }

            }

        }
    }

    showupload() {
        const styles = MyStylesheet();
        const receipts = new Receipts();
        const getUploadFile = () => {
            if (this.state.width > 1200) {
                return ({ width: 120 })

            } else if (this.state.width > 600) {
                return ({ width: 90 })

            } else {
                return ({ width: 60 })
            }
        }




        if (!this.state.spinner) {


            return (
                <TouchableOpacity
                onPress={() => { receipts.uploadReceipt.call(this) }}
                >
                       <Image source={require('./icons/uploadicon.png')}
                                        style={styles.uploadIcon}
                                        resizeMethod='scale'
                                    />
                </TouchableOpacity>
            )
        } else {
            return (<Text>...</Text>)
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


    getImageHeight(imageid) {
        const imageset = this.state.imageset;
        let getwidth = 0;
        let getheight = 0;
        let height = 480;
        imageset.map(image=> {
            if(image.imageid === imageid) {
                getwidth = image.width;
                getheight = image.height;
                const aspect = getheight/getwidth;
                height = Math.round(320*aspect)

            }
        })
        return height;

    }
 

   showreceipt(image) {
       
        const styles = MyStylesheet()
        const appbaseddriver = new AppBasedDriver();
        const getIcon = appbaseddriver.getremoveicon.call(this);
        const receipts = new Receipts();
        const imageheight = this.getImageHeight(image.imageid)

 
        const maxWidth = () => {
   
                return ({ width:320,height:imageheight })
            

        }
        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin10, ...styles.topMargin10 }}
            key={image.imageid}>
                <View style={{ ...styles.flex5 }}>
                    <View style={{ ...styles.alignCenter, }}>
                        <Image 
                        style={{ ...maxWidth() }} 
                        resizeMethod='scale'
                        key={image.id} source={{ uri: image.url }} />
                    </View>
                </View>
                <View style={{ ...styles.flex1 }}>

                  
                    <TouchableOpacity
                        onPress={() => { receipts.handleRemoveReceipt.call(this, image.imageid) }}>
                         <Image source={require('./icons/redx.png')}
                            style={styles.removeIcon}
                            resizeMethod='scale'
                        />

                        </TouchableOpacity>
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
                getreceipts.push(receipts.showreceipt.call(this, receipt))

            })
        }
        return getreceipts;
    }



    render() {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver()
        const myuser = appbaseddriver.getuser.call(this)
        const regularFont = appbaseddriver.getRegularFont.call(this)
        const receipts = new Receipts();
    

        if (myuser) {
            const equipmentid = appbaseddriver.getEquipmentID.call(this)
            const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
            if (equipment) {

                const cost = receipts.getcost.call(this);
                if (cost) {

                    const reoccurring = (cost) => {
                        if (cost.hasOwnProperty("reoccurring")) {
                            return `Reoccurring ${cost.reoccurring.frequency}`
                        }
                    }

                    const showspinner = () => {
                        if(this.state.spinner) {
                            return(<Spinner/>)
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
                            {showspinner()}
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

export default connect(mapStateToProps, actions)(Receipts)