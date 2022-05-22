import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { MyStylesheet } from './styles';
import AppBasedDriver from './appbaseddriver';

class DriverUI {

    handleui(mon) {

        let activemonth = this.state.activemonth;
        if (!activemonth) {
            activemonth = [mon]
            this.setState({ activemonth })
        } else {
            let key = activemonth.indexOf(mon)

            if (key >= 0) {
                activemonth.splice(key, 1)

            } else {
                activemonth.push(mon)

            }
            this.setState({ activemonth })

        }
    }

    uiButton() {
        if (this.state.width > 1200) {
            return ({ width: 65 })

        } else if (this.state.width > 600) {
            return ({ width: 61 })

        } else {
            return ({ width: 57 })

        }
    }

    activebackground(year) {
        const styles = MyStylesheet();
        if (this.state.activeyear === year) {
            return styles.activeBackground;
        }
    }

    handleUILeft() {
        let uistart = this.state.uistart;
        if (this.state.width > 1200) {
            uistart = uistart - 4

        } else if (this.state.width > 600) {
            uistart = uistart - 3

        } else {

            uistart = uistart - 2
        }

        this.setState({ uistart })

    }

    handleUIRight() {

        let uiend = this.state.uiend;
        if (this.state.width > 1200) {
            uiend = uiend + 4

        } else if (this.state.width > 600) {
            uiend = uiend + 3

        } else {

            uiend = uiend + 2
        }

        this.setState({ uiend })

    }


    monthmenu() {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver();
        const driverui = new DriverUI()

        const monthbackground = (month) => {
            let background = ''
            if (!this.state.activemonth) {
                background = styles.activeBackground;
            } else if (this.state.activemonth.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.state.activemonth.map(mon => {
                    if (mon === month) {
                        background = styles.activeBackground;
                    }
                })
            }
            return background;
        }

        return (<View style={{ ...styles.generalFlex }}>

            <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                <View style={{ ...styles.bottomMargin10, ...styles.generalContainer }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...monthbackground("jan") }} onPress={() => { driverui.handleui.call(this, "jan") }}>Jan</Text>
                </View>
                <View style={{ ...styles.bottomMargin10, ...styles.generalContainer }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...monthbackground("apr") }} onPress={() => { driverui.handleui.call(this, "apr") }}>Apr</Text>
                </View>
                <View style={{ ...styles.bottomMargin10, ...styles.generalContainer }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...monthbackground("jul") }} onPress={() => { driverui.handleui.call(this, "jul") }}>Jul</Text>
                </View>
                <View style={{ ...styles.bottomMargin10, ...styles.generalContainer }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...monthbackground("oct") }} onPress={() => { driverui.handleui.call(this, "oct") }}>Oct</Text>
                </View>
            </View>


            <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                <View style={{ ...styles.bottomMargin10, ...styles.generalContainer }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...monthbackground("feb") }} onPress={() => { driverui.handleui.call(this, "feb") }}>Feb</Text>
                </View>
                <View style={{ ...styles.bottomMargin10, ...styles.generalContainer }}>

                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...monthbackground("may") }} onPress={() => { driverui.handleui.call(this, "may") }}>May</Text>
                </View>
                <View style={{ ...styles.bottomMargin10, ...styles.generalContainer }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...monthbackground("aug") }} onPress={() => { driverui.handleui.call(this, "aug") }}>Aug</Text>
                </View>
                <View style={{ ...styles.bottomMargin10, ...styles.generalContainer }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...monthbackground("nov") }} onPress={() => { driverui.handleui.call(this, "nov") }}>Nov</Text>
                </View>
            </View>



            <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                <View style={{ ...styles.bottomMargin10, ...styles.generalContainer }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...monthbackground("mar") }} onPress={() => { driverui.handleui.call(this, "mar") }}>Mar</Text>
                </View>
                <View style={{ ...styles.bottomMargin10, ...styles.generalContainer }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...monthbackground("jun") }} onPress={() => { driverui.handleui.call(this, "jun") }}>Jun</Text>
                </View>
                <View style={{ ...styles.bottomMargin10, ...styles.generalContainer }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...monthbackground("sep") }} onPress={() => { driverui.handleui.call(this, "sep") }}>Sep</Text>
                </View>
                <View style={{ ...styles.bottomMargin10, ...styles.generalContainer }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...monthbackground("dec") }} onPress={() => { driverui.handleui.call(this, "dec") }}>Dec</Text>
                </View>
            </View>

        </View>)

    }


    largeUI() {

        const styles = MyStylesheet();
        const driverui = new DriverUI();
        const appbaseddriver = new AppBasedDriver();



        const rows = (startyear) => {
            

            return (<View style={{ ...styles.generalFlex }} key={`uistart${startyear}`}>

                <View style={{ ...styles.flex1 }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...driverui.activebackground.call(this, startyear) }} onPress={() => { this.setState({ activeyear: startyear }) }}>{startyear}</Text>

                </View>
                <View style={{ ...styles.flex1 }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...driverui.activebackground.call(this, startyear + 1) }} onPress={() => { this.setState({ activeyear: startyear + 1 }) }}>{startyear + 1}</Text>

                </View>
                <View style={{ ...styles.flex1 }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...driverui.activebackground.call(this, startyear + 2) }} onPress={() => { this.setState({ activeyear: startyear + 2 }) }}>{startyear + 2}</Text>

                </View>
                <View style={{ ...styles.flex1 }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...driverui.activebackground.call(this, startyear + 3) }} onPress={() => { this.setState({ activeyear: startyear + 3 }) }}>{startyear + 3}</Text>
                </View>
            </View>)



        }

        let uistart = this.state.uistart;
        let uiend = this.state.uiend;

        const rownumber = ((uiend - uistart) + 1) / 4;
        let myrows = [];

        for (let x = 0; x < rownumber; x++) {
            myrows.push(rows(uistart))
            uistart += 4

        }


        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin10, ...styles.topMargin10 }}>
                <View style={{ ...styles.flex1, ...styles.alignCenter }}>

                <TouchableOpacity onPress={() => { driverui.handleUILeft.call(this)  }}>
                    <Image source={require('./icons/leftarrow.png')}
                        style={styles.arrowIcon}
                        resizeMethod='scale'
                    />
                </TouchableOpacity>

                   

                </View>

                <View style={{ ...styles.flex4 }}>
                    {myrows}
                </View>

                <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                <TouchableOpacity onPress={() => { driverui.handleUIRight.call(this)  }}>
                    <Image source={require('./icons/rightarrow.png')}
                        style={styles.arrowIcon}
                        resizeMethod='scale'
                    />
                </TouchableOpacity>

                </View>


            </View>)

    }

    mediumUI() {

        const styles = MyStylesheet();
        const driverui = new DriverUI();
        const appbaseddriver = new AppBasedDriver();
    

        const rows = (startyear) => {

            return (<View style={{ ...styles.generalFlex }} key={`uistart${startyear}`}>

                <View style={{ ...styles.flex1 }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...driverui.activebackground.call(this, startyear) }} onPress={() => { this.setState({ activeyear: startyear }) }}>{startyear}</Text>

                </View>
                <View style={{ ...styles.flex1 }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...driverui.activebackground.call(this, startyear + 1) }} onPress={() => { this.setState({ activeyear: startyear + 1 }) }}>{startyear + 1}</Text>

                </View>
                <View style={{ ...styles.flex1 }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...driverui.activebackground.call(this, startyear + 2) }} onPress={() => { this.setState({ activeyear: startyear + 2 }) }}>{startyear + 2}</Text>

                </View>
            </View>)



        }

        let uistart = this.state.uistart;
        let uiend = this.state.uiend;

        const rownumber = ((uiend - uistart) + 1) / 3;
        let myrows = [];
   

        for (let x = 0; x < rownumber; x++) {
            myrows.push(rows(uistart))
            uistart += 3

        }


        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin10, ...styles.topMargin10 }}>
                <View style={{ ...styles.flex1, ...styles.alignCenter }}>

                    <Text style={{ ...styles.generalButton, ...driverui.uiButton.call(this) }} onPress={() => { driverui.handleUILeft.call(this) }}>{`<`}</Text>

                </View>

                <View style={{ ...styles.flex3 }}>
                    {myrows}

                </View>

                <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <Text style={{ ...styles.generalButton, ...driverui.uiButton.call(this) }} onPress={() => { driverui.handleUIRight.call(this) }}>{`>`}</Text>

                </View>


            </View>)



    }

    smallUI() {

        const styles = MyStylesheet();
        const driverui = new DriverUI();
        const appbaseddriver = new AppBasedDriver();
  


        const rows = (startyear) => {

            return (<View style={{ ...styles.generalFlex }} key={`uistart${startyear}`}>

                <View style={{ ...styles.flex1 }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...driverui.activebackground.call(this, startyear) }} onPress={() => { this.setState({ activeyear: startyear }) }}>{startyear}</Text>

                </View>
                <View style={{ ...styles.flex1 }}>
                    <Text style={{ ...styles.regularFont, ...styles.generalFont, ...styles.boldFont, ...driverui.activebackground.call(this, startyear + 1) }} onPress={() => { this.setState({ activeyear: startyear + 1 }) }}>{startyear + 1}</Text>

                </View>

            </View>)



        }

        let uistart = this.state.uistart;
        let uiend = this.state.uiend;

        const rownumber = ((uiend - uistart) + 1) / 2;
        let myrows = [];

        for (let x = 0; x < rownumber; x++) {
            myrows.push(rows(uistart))
            uistart += 2

        }


        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin10, ...styles.topMargin10 }}>
                <View style={{ ...styles.flex1, ...styles.alignCenter }}>

                <TouchableOpacity onPress={() => { driverui.handleUILeft.call(this)  }}>
                    <Image source={require('./icons/leftarrow.png')}
                        style={styles.arrowIcon}
                        resizeMethod='scale'
                    />
                </TouchableOpacity>

                </View>

                <View style={{ ...styles.flex2 }}>
                    {myrows}
                </View>

                <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                <TouchableOpacity onPress={() => { driverui.handleUIRight.call(this)  }}>
                    <Image source={require('./icons/rightarrow.png')}
                        style={styles.arrowIcon}
                        resizeMethod='scale'
                    />
                </TouchableOpacity>

                </View>


            </View>)



    }

    responsiveUI() {
        const driverui = new DriverUI();

        if (this.state.width > 1200) {

            return (driverui.largeUI.call(this))

        } else if (this.state.width > 600) {

            return (driverui.mediumUI.call(this))

        } else {
            return (driverui.smallUI.call(this))
        }
    }

    showui() {

        const driverui = new DriverUI();
        const styles = MyStylesheet();
        return (
            <View style={{ ...styles.generalContainer }}>
                {driverui.responsiveUI.call(this)}
                {driverui.monthmenu.call(this)}
            </View>)

    }

}

export default DriverUI;