import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import AppBasedDriver from './appbaseddriver';
import Profile from './profile'
import { MyStylesheet } from './styles';
class Landing {

    getimages() {

        const myimages = [
            {
                imageid: 'equipment',
                uri: require('./slides/equipment.png'),
                capt: 'Create Your Equipment List',
                title: 'Equipment'

            },
            {
                imageid: 'viewequipment',
                uri: require('./slides/viewequipment.png'),
                capt: 'Enter Costs for your Equipment ',
                title: 'View Equipment'

            }]

        return myimages;
    }

    showimage(image) {
        const appbaseddriver = new AppBasedDriver();
        const regularFont = appbaseddriver.getRegularFont.call(this)
        const headerFont = appbaseddriver.getHeaderFont.call(this)

        const styles = MyStylesheet()
        const marginLeft = () => {


            return ({ marginLeft: 60 })


        }
        const slideimage = () => {

            return ({
                width: 268,
                height: 364
            })

        }
        return (
            <View style={[styles.generalFlex, styles.bottomMargin30]}>
                <View style={[styles.flex1]}>
                    <Image source={image.uri}
                        resizeMethod='scale'
                        style={{ ...slideimage(), ...marginLeft() }}
                        key={image.imageid}
                    />
                    <View style={{ ...styles.alignCenter, ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <Text style={{ ...headerFont, ...styles.centerText }}>{image.title}</Text>
                    </View>

                    <View style={{ ...styles.alignCenter, ...styles.generalContainer, ...styles.bottomMargin15 }}>

                        <Text style={{ ...regularFont }}>{image.capt}</Text>
                    </View>
                </View>
            </View>)

    }

    showiconimage(image) {
        const styles = MyStylesheet()

        return (

            <TouchableOpacity onPress={() => { this.setState({ activeimage: image.imageid }) }}>
                <Image source={image.uri}
                    resizeMethod='scale'
                    style={{ ...styles.iconimage }}
                    key={image.imageid}
                />
            </TouchableOpacity>)

    }
    getactiveimage() {
        const landing = new Landing();
        const images = landing.getimages.call(this)
        let myimage = false;
        images.map(image => {
            if (image.imageid === this.state.activeimage) {
                myimage = image;
            }
        })
        return myimage;
    }
    showactiveimage() {
        const landing = new Landing();
        const activeimage = landing.getactiveimage.call(this)
        if (activeimage) {
            return (landing.showimage.call(this, activeimage))
        }
    }
    showimages() {

        const landing = new Landing();
        const images = landing.getimages.call(this);
        let myimage = [];


        images.map(image => {


            myimage.push(landing.showimage.call(this, image))


        })


        return myimage;
    }

    showiconimages() {
        const appbaseddriver = new AppBasedDriver();
        const styles = MyStylesheet();
        const landing = new Landing();
        const images = landing.getimages.call(this)
        const myimages = [];
        const regularFont = appbaseddriver.getRegularFont.call(this)

        images.map((image, i) => {

            if (i % 2 === 0 || i == 0) {

                if (i < images.length - 1) {

                    myimages.push(
                        <View style={[styles.generalFlex, styles.bottomMargin10]} key={image.imageid}>
                            <View style={[styles.flex1, styles.alignCenter]}>
                                {landing.showiconimage.call(this, image)}
                                <Text style={[regularFont, styles.alignCenter]}>{image.title}</Text>
                            </View>
                            <View style={[styles.flex1, styles.alignCenter]}>
                                {landing.showiconimage.call(this, images[i + 1])}
                                <Text style={[regularFont, styles.alignCenter]}>{images[i + 1].title}</Text>
                            </View>

                        </View>
                    )
                } else {
                    myimages.push(
                        <View style={[styles.generalFlex, styles.bottomMargin10]} key={[image.imageid]}>
                            <View style={[styles.flex1, styles.alignCenter]}>
                                {landing.showiconimage.call(this, image)}
                                <Text style={[regularFont, styles.alignCenter]}>{image.title}</Text>
                            </View>
                            <View style={[styles.flex1]}>

                            </View>

                        </View>
                    )
                }
            }

        }


        )


        return myimages;
    }



    showLanding() {
        const appbaseddriver = new AppBasedDriver();
        const profile = new Profile();
        const landing = new Landing();
        const styles = MyStylesheet();

        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {
            return (profile.showprofile.call(this))

        } else {

            return (<View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>


                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <View style={{ ...styles.flex1, ...styles.alignCenter, ...styles.marginTop35 }}>

                            {landing.showactiveimage.call(this)}

                        </View>

                    </View>


                    {landing.showiconimages.call(this)}



                </View>

            </View>)

        }



    }

}

export default Landing;