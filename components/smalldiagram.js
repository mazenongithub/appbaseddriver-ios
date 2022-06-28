import React from 'react'
import { View } from 'react-native'
import { Svg, G, Text as TextSvg, Line, Path, Polygon } from 'react-native-svg'
import AppBasedDriver from './appbaseddriver'
import { checkactivedate, abbMonth } from './functions'
import { MyStylesheet } from './styles'



class SmallDiagram {

    showcostlabel(cost) {

        const hidecosts = this.state.hidecosts;

        let hide = true
        // eslint-disable-next-line
        hidecosts.map(hidecost => {

            if (hidecost.detail === cost.detail && hidecost.amount === cost.amount && hidecost.purchasedate === cost.purchasedate) {
                hide = false;
            }
        })

        return hide;

    }



    showshiftlabel(shift) {

        const hideshifts = this.state.hideshifts;
        let hideshift = true
        // eslint-disable-next-line
        hideshifts.map(shiftstate => {

            if (shift.shiftid === shiftstate) {
                hideshift = false;
            }
        })
        return hideshift;

    }

    handleshiftid(shift) {
        const hideshifts = this.state.hideshifts;
        const i = hideshifts.indexOf(shift.shiftid)
        if (i > -1) {

            hideshifts.splice(i, 1)


        } else {
            hideshifts.push(shift.shiftid)

        }
        this.setState({ hideshifts })
    }

    handlecostid(cost) {

        const hidecosts = this.state.hidecosts;
        let remove = false;
        // eslint-disable-next-line
        hidecosts.map((hidecost, i) => {
            if (hidecost.detail === cost.detail && hidecost.amount === cost.amount && hidecost.purchasedate === cost.purchasedate) {
                hidecosts.splice(i, 1)
                remove = true;
            }
        })

        if (!remove) {
            hidecosts.push(cost)
        }
        this.setState({ hidecosts })
    }

    showdiagrams() {

        const appbaseddriver = new AppBasedDriver();
        const styles = MyStylesheet();
        const smalldiagram = new SmallDiagram();


        const showlabels = () => {
            return (
                <G>
                    <TextSvg fill="#231f20" fontSize='24' fontWeight="bold" transform="translate(189.55 146.65)">Jan</TextSvg>
                    <TextSvg fill="#231f20" fontSize='24' fontWeight="bold" transform="translate(188.29 313.59)">Feb</TextSvg>
                    <TextSvg fill="#231f20" fontSize='24' fontWeight="bold" transform="translate(185.55 480.53)">Mar</TextSvg>
                    <TextSvg fill="#231f20" fontSize='24' fontWeight="bold" transform="translate(187.69 647.47)">Apr</TextSvg>
                    <TextSvg fill="#231f20" fontSize='24' fontWeight="bold" transform="translate(184.27 814.41)">May</TextSvg>
                    <TextSvg fill="#231f20" fontSize='24' fontWeight="bold" transform="translate(192.58 1152.73)">Jul</TextSvg>
                    <TextSvg fill="#231f20" fontSize='24' fontWeight="bold" transform="translate(188.26 1485.42)">Sep</TextSvg>
                    <TextSvg fill="#231f20" fontSize='24' fontWeight="bold" transform="translate(185.8 1819.3)">Nov</TextSvg>
                    <TextSvg fill="#231f20" fontSize='24' fontWeight="bold" transform="translate(189.01 987.16)">Jun</TextSvg>
                    <TextSvg fill="#231f20" fontSize='24' fontWeight="bold" transform="translate(186.35 1312.9)">Aug</TextSvg>
                    <TextSvg fill="#231f20" fontSize='24' fontWeight="bold" transform="translate(187.94 1652.37)">Oct</TextSvg>
                    <TextSvg fill="#231f20" fontSize='24' fontWeight="bold" transform="translate(186.79 1992.06)">Dec</TextSvg>

                </G>)
        }

        const showtickmarks = () => {

            return (
                <G>

                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.9" y1="84.34" x2="4.9" y2="44.34" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="404.46" y1="84.34" x2="404.46" y2="44.34" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.9" y1="251.66" x2="4.9" y2="211.66" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="404.46" y1="251.66" x2="404.46" y2="211.66" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.9" y1="418.99" x2="4.9" y2="378.99" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="404.46" y1="418.99" x2="404.46" y2="378.99" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.9" y1="586.31" x2="4.9" y2="546.31" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="404.46" y1="586.31" x2="404.46" y2="546.31" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.9" y1="753.63" x2="4.9" y2="713.63" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="404.46" y1="753.63" x2="404.46" y2="713.63" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.9" y1="920.96" x2="4.9" y2="880.96" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="404.46" y1="920.96" x2="404.46" y2="880.96" />

                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.9" y1="1088.28" x2="4.9" y2="1048.28" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="404.46" y1="1088.28" x2="404.46" y2="1048.28" />

                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.9" y1="1255.61" x2="4.9" y2="1215.61" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="404.46" y1="1255.61" x2="404.46" y2="1215.61" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.9" y1="1422.93" x2="4.9" y2="1382.93" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="404.46" y1="1422.93" x2="404.46" y2="1382.93" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.9" y1="1590.25" x2="4.9" y2="1550.25" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="404.46" y1="1590.25" x2="404.46" y2="1550.25" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.9" y1="1757.58" x2="4.9" y2="1717.58" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="404.46" y1="1757.58" x2="404.46" y2="1717.58" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.9" y1="1924.9" x2="4.9" y2="1884.9" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="404.46" y1="1924.9" x2="404.46" y2="1884.9" />

                </G>)

        }

        const showaxis = () => {
            return (
                <G>
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.46" y1="64.34" x2="404.46" y2="64.34" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.46" y1="231.66" x2="404.46" y2="231.66" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.46" y1="398.99" x2="404.46" y2="398.99" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.46" y1="566.31" x2="404.46" y2="566.31" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.46" y1="733.63" x2="404.46" y2="733.63" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.46" y1="900.96" x2="404.46" y2="900.96" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.46" y1="1068.28" x2="404.46" y2="1068.28" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.46" y1="1235.61" x2="404.46" y2="1235.61" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.46" y1="1402.93" x2="404.46" y2="1402.93" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.46" y1="1570.25" x2="404.46" y2="1570.25" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.46" y1="1737.58" x2="404.46" y2="1737.58" />
                    <Line fill="none" strokeWidth="2" stroke="#231f20" x1="4.46" y1="1904.9" x2="404.46" y2="1904.9" />
                </G>
            )
        }

        const januaryearnings = (shift) => {

            const day = new Date(shift.timein).getDate()
            const showlabel = smalldiagram.showshiftlabel.call(this, shift)
            // font-size:10px;fill:#231f20;font-family:Lato-Bold, Lato;font-weight:700;
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G>
                        <Path fill="#eebe88" stroke="#231f20" d="M94.09,2.16V28.09A1.92,1.92,0,0,1,92.18,30H24.71a1.75,1.75,0,0,0-.51.07L11.83,33.54a1.91,1.91,0,0,1-2.35-2.35l3-10.73a2.16,2.16,0,0,0,.07-.51V2.16A1.91,1.91,0,0,1,14.47.25H92.18A1.92,1.92,0,0,1,94.09,2.16Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 13.43)">{abbMonth(shift.timein)}, ${Number(shift.earnings).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 25.43)">
                            earnings</TextSvg>
                    </G>)

                }
            }



            return (
                <G transform={`translate(${day * 12.9},0)`} key={`svg${shift.shiftid}`} onPress={() => { smalldiagram.handleshiftid.call(this, shift) }}>
                    <Polygon strokeWidth="0.5" fill="#015d40" stroke="#231f20" points="4.91 29.11 0.41 38.11 9.4 38.11 4.91 29.11" />
                    <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="38.11" x2="4.9" y2="64.12" />
                    {label(showlabel)}

                </G>)
        }

        const januarycosts = (cost) => {

            const day = new Date(cost.purchasedate).getDate();
            const showlabel = smalldiagram.showcostlabel.call(this, cost)



            const label = (showlabel) => {
                if (showlabel) {
                    return (<G>
                        <Path fill="#eebe88" stroke="#231f20" d="M93.84,100.11v27.66a1.1,1.1,0,0,1-1.17,1h-79a1.1,1.1,0,0,1-1.17-1V105.55a.9.9,0,0,0,0-.28L9.69,96.39a1.11,1.11,0,0,1,1.43-1.29L28.1,99a1.54,1.54,0,0,0,.3,0H92.67A1.1,1.1,0,0,1,93.84,100.11Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 109.76)">{abbMonth(cost.purchasedate)}, ${Number(cost.amount).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 121.76)">
                            {cost.detail}</TextSvg>
                    </G>)

                }
            }

            return (<G transform={`translate(${day * 12.9},0)`} key={`svg${cost.costid}`} onPress={() => { smalldiagram.handlecostid.call(this, cost) }}>
                <Polygon strokeWidth="0.5" fill="#fdd726" stroke="#231f20" points="4.91 99.13 9.4 90.13 0.41 90.13 4.91 99.13" />
                <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="90.13" x2="4.9" y2="64.12" />

                {label(showlabel)}

            </G>)
        }

        const februaryearnings = (shift) => {
            const day = new Date(shift.timein).getDate()
            const showlabel = smalldiagram.showshiftlabel.call(this, shift)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G>
                        <Path fill="#eebe88" stroke="#231f20" d="M94.09,169.48v25.93a1.91,1.91,0,0,1-1.91,1.91H24.71a2.16,2.16,0,0,0-.51.07l-12.37,3.47a1.91,1.91,0,0,1-2.35-2.35l3-10.72a2.25,2.25,0,0,0,.07-.52V169.48a1.91,1.91,0,0,1,1.91-1.91H92.18A1.92,1.92,0,0,1,94.09,169.48Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 180.76)">
                        {abbMonth(shift.timein)}, ${Number(shift.earnings).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 192.76)">
                            earnings
                        </TextSvg>
                    </G>)

                }
            }

            // stroke-width:0.5px;fill:stroke:#231f20;;stroke:#231f20;

            return (
                <G transform={`translate(${day * 13.79},0)`} key={`svg${shift.shiftid}`} onPress={() => { smalldiagram.handleshiftid.call(this, shift) }}>
                    <Polygon strokeWidth="0.5" fill="#015d40" stroke="#231f20" points="4.91 196.44 0.41 205.44 9.4 205.44 4.91 196.44" />
                    <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="205.44" x2="4.9" y2="231.44" />

                    {label(showlabel)}

                </G>)
        }

        const februarycosts = (cost) => {
            const day = new Date(cost.purchasedate).getDate();

            const showlabel = smalldiagram.showcostlabel.call(this, cost)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G> 
                    <Path fill="#eebe88" stroke="#231f20" d="M93.84,267.44v27.65a1.11,1.11,0,0,1-1.17,1.05h-79a1.11,1.11,0,0,1-1.17-1.05V272.88a.86.86,0,0,0,0-.28l-2.76-8.89a1.11,1.11,0,0,1,1.43-1.29l17,3.94.3,0H92.67A1.11,1.11,0,0,1,93.84,267.44Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 277.08)">
                            {abbMonth(cost.purchasedate)}, ${Number(cost.amount).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 289.08)">
                            {cost.detail}
                        </TextSvg>
                    </G>)

                }
            }


            return (
                <G transform={`translate(${day * 13.79},0)`} key={`svg${cost.costid}`} onPress={() => { smalldiagram.handlecostid.call(this, cost) }}>
                    <Polygon strokeWidth="0.5" fill="#fdd726" stroke="#231f20" points="4.91 266.45 9.4 257.45 0.41 257.45 4.91 266.45" />
                    <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="257.45" x2="4.9" y2="231.44" />
                    {label(showlabel)}


                </G>)
        }

        const marchearnings = (shift) => {

            const day = new Date(shift.timein).getDate()
            const showlabel = smalldiagram.showshiftlabel.call(this, shift)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G>
                        <Path fill="#eebe88" stroke="#231f20" d="M94.09,336.81v25.93a1.92,1.92,0,0,1-1.91,1.91H24.71a1.75,1.75,0,0,0-.51.07l-12.37,3.47a1.91,1.91,0,0,1-2.35-2.36l3-10.72a2.25,2.25,0,0,0,.07-.52V336.81a1.9,1.9,0,0,1,1.91-1.91H92.18A1.91,1.91,0,0,1,94.09,336.81Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 348.08)">
                            {abbMonth(shift.timein)}, ${Number(shift.earnings).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 360.08)">
                            earnings
                        </TextSvg>
                    </G>)

                }
            }

            return (<G transform={`translate(${day * 12.9},0)`} key={`svg${shift.shiftid}`} onPress={() => { smalldiagram.handleshiftid.call(this, shift) }}>
                <Polygon strokeWidth="0.5" fill="#015d40" stroke="#231f20" points="4.91 363.76 0.41 372.76 9.4 372.76 4.91 363.76" />
                <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="372.76" x2="4.9" y2="398.77" />

                {label(showlabel)}

            </G>)
        }

        const marchcosts = (cost) => {
            const day = new Date(cost.purchasedate).getDate();

            const showlabel = smalldiagram.showcostlabel.call(this, cost)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G>
                        <Path fill="#eebe88" stroke="#231f20" d="M93.84,434.76v27.65a1.11,1.11,0,0,1-1.17,1h-79a1.11,1.11,0,0,1-1.17-1V440.2a.9.9,0,0,0,0-.28L9.69,431a1.11,1.11,0,0,1,1.43-1.29l17,3.93.3,0H92.67A1.11,1.11,0,0,1,93.84,434.76Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 444.41)">
                            {abbMonth(cost.purchasedate)}, ${Number(cost.amount).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 456.41)">
                            {cost.detail}
                        </TextSvg>
                    </G>)

                }
            }
            return (
                <G transform={`translate(${day * 12.9},0)`} key={`svg${cost.costid}`} onPress={() => { smalldiagram.handlecostid.call(this, cost) }}>
                    <Polygon strokeWidth="0.5" fill="#fdd726" stroke="#231f20" points="4.91 433.77 9.4 424.77 0.41 424.77 4.91 433.77" />
                    <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="424.77" x2="4.9" y2="398.77" />
                    {label(showlabel)}
                </G>)
        }

        const aprilearnings = (shift) => {
            const day = new Date(shift.timein).getDate()
            const showlabel = smalldiagram.showshiftlabel.call(this, shift)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G>   
                        <Path fill="#eebe88" stroke="#231f20" d="M94.09,504.13v25.93A1.91,1.91,0,0,1,92.18,532H24.71a2.16,2.16,0,0,0-.51.07l-12.37,3.47a1.91,1.91,0,0,1-2.35-2.35l3-10.73a2.16,2.16,0,0,0,.07-.51V504.13a1.91,1.91,0,0,1,1.91-1.91H92.18A1.92,1.92,0,0,1,94.09,504.13Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 515.41)">
                            {abbMonth(shift.timein)}, ${Number(shift.earnings).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 527.41)">
                            earnings
                        </TextSvg>

                    </G>)

                }
            }
            return (<G transform={`translate(${day * 13.3},0)`} key={`svg${shift.shiftid}`} onPress={() => { smalldiagram.handleshiftid.call(this, shift) }}>
                <Polygon strokeWidth="0.5" fill="#015d40" stroke="#231f20" points="4.91 531.09 0.41 540.09 9.4 540.09 4.91 531.09" />
                <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="540.09" x2="4.9" y2="566.09" />
                {label(showlabel)}
            </G>)
        }

        const aprilcosts = (cost) => {
            const day = new Date(cost.purchasedate).getDate();
            const showlabel = smalldiagram.showcostlabel.call(this, cost)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G>
                        <Path fill="#eebe88" stroke="#231f20" d="M93.84,602.08v27.66a1.11,1.11,0,0,1-1.17,1h-79a1.11,1.11,0,0,1-1.17-1V607.52a.9.9,0,0,0,0-.28l-2.76-8.88a1.11,1.11,0,0,1,1.43-1.29l17,3.93a1,1,0,0,0,.3,0H92.67A1.11,1.11,0,0,1,93.84,602.08Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 611.73)">
                            {abbMonth(cost.purchasedate)}, ${Number(cost.amount).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 623.73)">
                            {cost.detail}
                            </TextSvg>
                    </G>)

                }
            }
            return (<G transform={`translate(${day * 13.3},0)`} key={`svg${cost.costid}`} onPress={() => { smalldiagram.handlecostid.call(this, cost) }}>
                <Polygon strokeWidth="0.5" fill="#fdd726" stroke="#231f20" points="4.91 601.1 9.4 592.1 0.41 592.1 4.91 601.1" />
                <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="592.1" x2="4.9" y2="566.09" />

                {label(showlabel)}
            </G>)
        }


        const mayearnings = (shift) => {
            const day = new Date(shift.timein).getDate()
            const showlabel = smalldiagram.showshiftlabel.call(this, shift)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G>   
                    <Path fill="#eebe88" stroke="#231f20" d="M94.09,671.46v25.93a1.92,1.92,0,0,1-1.91,1.91H24.71a1.75,1.75,0,0,0-.51.07l-12.37,3.47a1.91,1.91,0,0,1-2.35-2.36l3-10.72a2.25,2.25,0,0,0,.07-.52V671.46a1.9,1.9,0,0,1,1.91-1.91H92.18A1.91,1.91,0,0,1,94.09,671.46Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 682.73)">
                            {abbMonth(shift.timein)}, ${Number(shift.earnings).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 694.73)">
                            earnings
                        </TextSvg>
                    </G>)

                }
            }
            return (
                <G transform={`translate(${day * 12.9},0)`} key={`svg${shift.shiftid}`} onPress={() => { smalldiagram.handleshiftid.call(this, shift) }}>
                    <Polygon strokeWidth="0.5" fill="#015d40" stroke="#231f20" points="4.91 698.41 0.41 707.41 9.4 707.41 4.91 698.41" />
                    <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="707.41" x2="4.9" y2="733.42" />
                    {label(showlabel)}
                </G>)
        }

        const maycosts = (cost) => {
            const day = new Date(cost.purchasedate).getDate();
            const showlabel = smalldiagram.showcostlabel.call(this, cost)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G>
                        <Path fill="#eebe88" stroke="#231f20" d="M93.84,769.41v27.65a1.11,1.11,0,0,1-1.17,1.05h-79a1.11,1.11,0,0,1-1.17-1.05V774.85a.86.86,0,0,0,0-.28l-2.76-8.88a1.12,1.12,0,0,1,1.43-1.3l17,3.94.3,0H92.67A1.11,1.11,0,0,1,93.84,769.41Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 779.05)">
                            {abbMonth(cost.purchasedate)}, ${Number(cost.amount).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 791.05)">
                            {cost.detail}
                        </TextSvg>
                    </G>)

                }
            }
            return (
                <G transform={`translate(${day * 12.9},0)`} key={`svg${cost.costid}`} onPress={() => { smalldiagram.handlecostid.call(this, cost) }}>
                    <Polygon strokeWidth="0.5" fill="#fdd726" stroke="#231f20" points="4.91 768.42 9.4 759.42 0.41 759.42 4.91 768.42" />
                    <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="759.42" x2="4.9" y2="733.42" />
                    {label(showlabel)}
                </G>)
        }

        const juneearnings = (shift) => {
            const day = new Date(shift.timein).getDate()
            const showlabel = smalldiagram.showshiftlabel.call(this, shift)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G>
                        <Path fill="#eebe88" stroke="#231f20" d="M94.09,838.78v25.93a1.92,1.92,0,0,1-1.91,1.91H24.71a1.75,1.75,0,0,0-.51.07l-12.37,3.47a1.91,1.91,0,0,1-2.35-2.35l3-10.73a2.24,2.24,0,0,0,.07-.51V838.78a1.9,1.9,0,0,1,1.91-1.91H92.18A1.91,1.91,0,0,1,94.09,838.78Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 850.05)">{abbMonth(shift.timein)}, ${Number(shift.earnings).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 862.05)">
                            earnings
                        </TextSvg>
                    </G>)

                }
            }
            return (
                <G transform={`translate(${day * 13.3},0)`}
                    key={`svg${shift.shiftid}`}
                    onPress={() => { smalldiagram.handleshiftid.call(this, shift) }}>
                    <Polygon strokeWidth="0.5" fill="#015d40" stroke="#231f20" points="4.91 865.73 0.41 874.73 9.4 874.73 4.91 865.73" />
                    <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="874.73" x2="4.9" y2="900.74" />
                    {label(showlabel)}

                </G>)
        }

        const junecosts = (cost) => {
            const day = new Date(cost.purchasedate).getDate();
            const showlabel = smalldiagram.showcostlabel.call(this, cost)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G onPress={() => { smalldiagram.handlecostid.call(this, cost) }}>
                        <Path fill="#eebe88" stroke="#231f20" d="M93.84,936.73v27.66a1.11,1.11,0,0,1-1.17,1h-79a1.11,1.11,0,0,1-1.17-1V942.17a.9.9,0,0,0,0-.28L9.69,933a1.11,1.11,0,0,1,1.43-1.29l17,3.93.3,0H92.67A1.11,1.11,0,0,1,93.84,936.73Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 946.38)">
                            {abbMonth(cost.purchasedate)}, ${Number(cost.amount).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 958.38)">
                            {cost.detail}
                        </TextSvg>
                    </G>)

                }
            }
            return (<G transform={`translate(${day * 13.3},0)`} key={`svg${cost.costid}`}>
                <Polygon strokeWidth="0.5" fill="#fdd726" stroke="#231f20" points="4.91 935.75 9.4 926.75 0.41 926.75 4.91 935.75" />
                <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="926.74" x2="4.9" y2="900.74" />

                {label(showlabel)}
            </G>)
        }

        const julyearnings = (shift) => {
            const day = new Date(shift.timein).getDate()
            const showlabel = smalldiagram.showshiftlabel.call(this, shift)
            const label = (showlabel) => {
                if (showlabel) {
                    return (
                        <G>
                            <Path fill="#eebe88" stroke="#231f20" d="M94.09,1006.1V1032a1.91,1.91,0,0,1-1.91,1.91H24.71a2.16,2.16,0,0,0-.51.07l-12.37,3.47a1.91,1.91,0,0,1-2.35-2.35l3-10.72a2.32,2.32,0,0,0,.07-.52V1006.1a1.91,1.91,0,0,1,1.91-1.91H92.18A1.92,1.92,0,0,1,94.09,1006.1Z" />
                            <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 1017.38)">
                                {abbMonth(shift.timein)}, ${Number(shift.earnings).toFixed(2)},
                            </TextSvg>
                            <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 1029.38)">
                                earnings
                            </TextSvg>
                        </G>)

                }
            }
            return (<G transform={`translate(${day * 12.9},0)`} key={`svg${shift.shiftid}`} onPress={() => { smalldiagram.handleshiftid.call(this, shift) }}>
                <Polygon strokeWidth="0.5" fill="#015d40" stroke="#231f20" points="4.91 1033.06 0.41 1042.06 9.4 1042.06 4.91 1033.06" />
                <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="1042.06" x2="4.9" y2="1068.06" />
                {label(showlabel)}

            </G>)
        }

        const julycosts = (cost) => {
            const day = new Date(cost.purchasedate).getDate();
            const showlabel = smalldiagram.showcostlabel.call(this, cost)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G>
                        <Path fill="#eebe88" stroke="#231f20" d="M93.84,1104.05v27.66a1.11,1.11,0,0,1-1.17,1h-79a1.11,1.11,0,0,1-1.17-1v-22.22a.84.84,0,0,0,0-.27l-2.76-8.89a1.11,1.11,0,0,1,1.43-1.29l17,3.94.3,0H92.67A1.11,1.11,0,0,1,93.84,1104.05Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 1113.7)">
                            {abbMonth(cost.purchasedate)}, ${Number(cost.amount).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 1125.7)">
                            {cost.detail}</TextSvg>
                    </G>)

                }
            }
            return (<G transform={`translate(${day * 12.9},0)`} key={`svg${cost.costid}`} onPress={() => { smalldiagram.handlecostid.call(this, cost) }}>
                <Polygon strokeWidth="0.5" fill="#fdd726" stroke="#231f20" points="4.91 1103.07 9.4 1094.07 0.41 1094.07 4.91 1103.07" />
                <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="1094.07" x2="4.9" y2="1068.06" />

                {label(showlabel)}
            </G>)
        }

        const augustearnings = (shift) => {
            const day = new Date(shift.timein).getDate()
            const showlabel = smalldiagram.showshiftlabel.call(this, shift)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G>
                        <Path fill="#eebe88" stroke="#231f20" d="M94.09,1173.43v25.93a1.92,1.92,0,0,1-1.91,1.91H24.71a1.75,1.75,0,0,0-.51.07l-12.37,3.47a1.91,1.91,0,0,1-2.35-2.36l3-10.72a2.25,2.25,0,0,0,.07-.52v-17.78a1.9,1.9,0,0,1,1.91-1.91H92.18A1.91,1.91,0,0,1,94.09,1173.43Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 1184.7)">
                            {abbMonth(shift.timein)}, ${Number(shift.earnings).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 1196.7)">
                            earnings
                        </TextSvg>
                    </G>)

                }
            }
            return (
                <G transform={`translate(${day * 12.9},0)`} key={`svg${shift.shiftid}`} onPress={() => { smalldiagram.handleshiftid.call(this, shift) }}>
                    <Polygon strokeWidth="0.5" fill="#015d40" stroke="#231f20" points="4.91 1200.38 0.41 1209.38 9.4 1209.38 4.91 1200.38" />
                    <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="1209.38" x2="4.9" y2="1235.39" />
                    {label(showlabel)}
                </G>)
        }

        const augustcosts = (cost) => {

            const day = new Date(cost.purchasedate).getDate();
            const showlabel = smalldiagram.showcostlabel.call(this, cost)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G>
                        <Path fill="#eebe88" stroke="#231f20" d="M93.84,1271.38V1299a1.11,1.11,0,0,1-1.17,1h-79a1.11,1.11,0,0,1-1.17-1v-22.21a.86.86,0,0,0,0-.28l-2.76-8.88a1.11,1.11,0,0,1,1.43-1.29l17,3.93.3,0H92.67A1.11,1.11,0,0,1,93.84,1271.38Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 1281.03)">
                            {abbMonth(cost.purchasedate)}, ${Number(cost.amount).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 1293.03)">
                            {cost.detail}
                        </TextSvg>
                    </G>)

                }
            }
            return (<G transform={`translate(${day * 12.9},0)`} key={`svg${cost.costid}`} onPress={() => { smalldiagram.handlecostid.call(this, cost) }}>
                <Polygon strokeWidth="0.5" fill="#fdd726" stroke="#231f20" points="4.91 1270.39 9.4 1261.39 0.41 1261.39 4.91 1270.39" />
                <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="1261.39" x2="4.9" y2="1235.39" />

                {label(showlabel)}
            </G>)
        }


        const septemberearnings = (shift) => {
            const day = new Date(shift.timein).getDate()
            const showlabel = smalldiagram.showshiftlabel.call(this, shift)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G> 
                    <Path fill="#eebe88" stroke="#231f20" d="M94.09,1340.75v25.93a1.91,1.91,0,0,1-1.91,1.91H24.71a1.75,1.75,0,0,0-.51.07l-12.37,3.47a1.91,1.91,0,0,1-2.35-2.35l3-10.73a2.16,2.16,0,0,0,.07-.51v-17.79a1.91,1.91,0,0,1,1.91-1.91H92.18A1.92,1.92,0,0,1,94.09,1340.75Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 1352.02)">
                            {abbMonth(shift.timein)}, ${Number(shift.earnings).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 1364.02)">
                            earnings
                        </TextSvg>
                    </G>)

                }
            }
            return (
                <G transform={`translate(${day * 13.3},0)`} key={`svg${shift.shiftid}`} onPress={() => { smalldiagram.handleshiftid.call(this, shift) }}>

                    <Polygon strokeWidth="0.5" fill="#015d40" stroke="#231f20" points="4.91 1367.7 0.41 1376.7 9.4 1376.7 4.91 1367.7" />
                    <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="1376.71" x2="4.9" y2="1402.71" />
                    {label(showlabel)}
                </G>
            )
        }

        const septembercosts = (cost) => {
            const day = new Date(cost.purchasedate).getDate();
            const showlabel = smalldiagram.showcostlabel.call(this, cost)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G>
                        <Path fill="#eebe88" stroke="#231f20" d="M93.84,1438.7v27.66a1.1,1.1,0,0,1-1.17,1h-79a1.1,1.1,0,0,1-1.17-1v-22.22a.9.9,0,0,0,0-.28L9.69,1435a1.11,1.11,0,0,1,1.43-1.29l17,3.93a1.54,1.54,0,0,0,.3,0H92.67A1.1,1.1,0,0,1,93.84,1438.7Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 1448.35)">
                            {abbMonth(cost.purchasedate)}, ${Number(cost.amount).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 1460.35)">
                            {cost.detail}
                        </TextSvg>
                    </G>)

                }
            }
            return (<G transform={`translate(${day * 13.3},0)`} key={`svg${cost.costid}`} onPress={() => { smalldiagram.handlecostid.call(this, cost) }}>
                <Polygon strokeWidth="0.5" fill="#fdd726" stroke="#231f20" points="4.91 1437.72 9.4 1428.72 0.41 1428.72 4.91 1437.72" />
                <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="1428.72" x2="4.9" y2="1402.71" />

                {label(showlabel)}
            </G>)
        }


        const octoberearnings = (shift) => {
            const day = new Date(shift.timein).getDate()
            const showlabel = smalldiagram.showshiftlabel.call(this, shift)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G><Path fill="#eebe88" stroke="#231f20" d="M94.09,1508.07V1534a1.91,1.91,0,0,1-1.91,1.91H24.71a1.75,1.75,0,0,0-.51.08l-12.37,3.47a1.91,1.91,0,0,1-2.35-2.36l3-10.72a2.25,2.25,0,0,0,.07-.52v-17.79a1.91,1.91,0,0,1,1.91-1.91H92.18A1.92,1.92,0,0,1,94.09,1508.07Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 1519.35)">
                            {
                                abbMonth(shift.timein)}, ${Number(shift.earnings).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 1531.35)">
                            earnings
                        </TextSvg>
                    </G>)

                }
            }
            return (
                <G transform={`translate(${day * 12.9},0)`} key={`svg${shift.shiftid}`} onPress={() => { smalldiagram.handleshiftid.call(this, shift) }}>
                    <Polygon strokeWidth="0.5" fill="#015d40" stroke="#231f20" points="4.91 1535.03 0.41 1544.03 9.4 1544.03 4.91 1535.03" />
                    <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="1544.03" x2="4.9" y2="1570.03" />
                    {label(showlabel)}
                </G>)
        }

        const octobercosts = (cost) => {
            const day = new Date(cost.purchasedate).getDate();
            const showlabel = smalldiagram.showcostlabel.call(this, cost)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G>
                        <Path fill="#eebe88" stroke="#231f20" d="M93.84,1606v27.65a1.11,1.11,0,0,1-1.17,1h-79a1.11,1.11,0,0,1-1.17-1v-22.21a.86.86,0,0,0,0-.28l-2.76-8.88a1.12,1.12,0,0,1,1.43-1.3l17,3.94.3,0H92.67A1.11,1.11,0,0,1,93.84,1606Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 1615.67)">
                        {abbMonth(cost.purchasedate)}, ${Number(cost.amount).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 1627.67)">
                         {cost.detail}
                         </TextSvg>
                    </G>)

                }
            }
            // stroke:#231f20;stroke-miterlimit:10;stroke-width:0.5px;fill:#fdd726;
            return (
                <G transform={`translate(${day * 12.9},0)`} key={`svg${cost.costid}`} onPress={() => { smalldiagram.handlecostid.call(this, cost) }}>
                    <Polygon strokeWidth="0.5" fill="#fdd726" stroke="#231f20" points="4.91 1605.04 9.4 1596.04 0.41 1596.04 4.91 1605.04" />
                    <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="1596.04" x2="4.9" y2="1570.03" />

                    {label(showlabel)}
                </G>
            )
        }


        const novemberearnings = (shift) => {
            const day = new Date(shift.timein).getDate()
            const showlabel = smalldiagram.showshiftlabel.call(this, shift)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G><Path fill="#eebe88" stroke="#231f20" d="M94.09,1675.4v25.93a1.92,1.92,0,0,1-1.91,1.91H24.71a1.75,1.75,0,0,0-.51.07l-12.37,3.47a1.91,1.91,0,0,1-2.35-2.36l3-10.72a2.24,2.24,0,0,0,.07-.51V1675.4a1.9,1.9,0,0,1,1.91-1.91H92.18A1.91,1.91,0,0,1,94.09,1675.4Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 1686.67)">
                        {abbMonth(shift.timein)}, ${Number(shift.earnings).toFixed(2)}, 
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 1698.67)">
                        earnings
                        </TextSvg>
                    </G>)

                }
            }
            return (<G transform={`translate(${day * 13.3},0)`} key={`svg${shift.shiftid}`} onPress={() => { smalldiagram.handleshiftid.call(this, shift) }}>
                <Polygon strokeWidth="0.5" fill="#015d40" stroke="#231f20" points="4.91 1702.35 0.41 1711.35 9.4 1711.35 4.91 1702.35" />
                <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="1711.35" x2="4.9" y2="1737.36" />
                {label(showlabel)}
            </G>)
        }

        const novembercosts = (cost) => {
            const day = new Date(cost.purchasedate).getDate();
            const showlabel = smalldiagram.showcostlabel.call(this, cost)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G>
                        <Path fill="#eebe88" stroke="#231f20" d="M93.84,1773.35V1801a1.11,1.11,0,0,1-1.17,1h-79a1.11,1.11,0,0,1-1.17-1v-22.22a.9.9,0,0,0,0-.28l-2.76-8.88a1.11,1.11,0,0,1,1.43-1.29l17,3.93.3,0H92.67A1.11,1.11,0,0,1,93.84,1773.35Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 1783)">
                        {abbMonth(cost.purchasedate)}, ${Number(cost.amount).toFixed(2)}, 
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 1795)">
                        {cost.detail}
                        </TextSvg>
                    </G>)

                }
            }
            return (<G transform={`translate(${day * 13.3},0)`} key={`svg${cost.costid}`} onPress={() => { smalldiagram.handlecostid.call(this, cost) }}>
                <Polygon strokeWidth="0.5" fill="#fdd726" stroke="#231f20" points="4.91 1772.36 9.4 1763.36 0.41 1763.36 4.91 1772.36" />
                <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="1763.36" x2="4.9" y2="1737.36" />

                {label(showlabel)}
            </G>)
        }



        const decemberearnings = (shift) => {
            const day = new Date(shift.timein).getDate()
            const showlabel = smalldiagram.showshiftlabel.call(this, shift)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G> 
                    <Path fill="#eebe88" stroke="#231f20" d="M94.09,1842.72v25.93a1.91,1.91,0,0,1-1.91,1.91H24.71a2.16,2.16,0,0,0-.51.07l-12.37,3.47a1.91,1.91,0,0,1-2.35-2.35l3-10.72a2.32,2.32,0,0,0,.07-.52v-17.79a1.91,1.91,0,0,1,1.91-1.91H92.18A1.92,1.92,0,0,1,94.09,1842.72Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 1854)">
                        {abbMonth(shift.timein)}, ${Number(shift.earnings).toFixed(2)},
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.28 1866)">
                         earnings
                         </TextSvg>
                    </G>)

                }
            }
            return (<G transform={`translate(${day * 12.9},0)`} key={`svg${shift.shiftid}`} onPress={() => { smalldiagram.handleshiftid.call(this, shift) }}>
                <Polygon strokeWidth="0.5" fill="#015d40" stroke="#231f20" points="4.91 1869.68 0.41 1878.68 9.4 1878.68 4.91 1869.68" />
                <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="1878.68" x2="4.9" y2="1904.68" />
                {label(showlabel)}
            </G>)
        }

        const decembercosts = (cost) => {
            const day = new Date(cost.purchasedate).getDate();
            const showlabel = smalldiagram.showcostlabel.call(this, cost)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<G> 
                    <Path fill="#eebe88" stroke="#231f20" d="M93.84,1940.67v27.66a1.11,1.11,0,0,1-1.17,1.05h-79a1.11,1.11,0,0,1-1.17-1.05v-22.22a1,1,0,0,0,0-.28L9.69,1937a1.11,1.11,0,0,1,1.43-1.29l17,3.93a1,1,0,0,0,.3,0H92.67A1.11,1.11,0,0,1,93.84,1940.67Z" />
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 1950.32)">
                        {abbMonth(cost.purchasedate)}, ${Number(cost.amount).toFixed(2)}, 
                        </TextSvg>
                        <TextSvg fontSize="10" fill="#231f20" fontWeight="bold" transform="translate(15.93 1962.32)">
                        {cost.detail}
                        </TextSvg>
                    </G>)

                }
            }

            return (<G transform={`translate(${day * 12.9},0)`} key={`svg${cost.costid}`} onPress={() => { smalldiagram.handlecostid.call(this, cost) }}>
                <Polygon strokeWidth="0.5" fill="#fdd726" stroke="#231f20" points="4.91 1939.69 9.4 1930.69 0.41 1930.69 4.91 1939.69" />
                <Line strokeWidth="0.5" fill="#015d40" stroke="#231f20" x1="4.9" y1="1930.69" x2="4.9" y2="1904.68" />

                {label(showlabel)}
            </G>)
        }

        let earningsArrows = [];
        let costsArrows = [];
        const shifts = appbaseddriver.getactiveshifts.call(this)

        if (shifts) {
            // eslint-disable-next-line
            shifts.map(shift => {
                const shiftdate = new Date(shift.timein)

                switch (shiftdate.getMonth() + 1) {
                    case 1:
                        earningsArrows.push(januaryearnings(shift))
                        break;
                    case 2:
                        earningsArrows.push(februaryearnings(shift))
                        break;
                    case 3:
                        earningsArrows.push(marchearnings(shift))
                        break;
                    case 4:
                        earningsArrows.push(aprilearnings(shift))
                        break;
                    case 5:
                        earningsArrows.push(mayearnings(shift))
                        break;
                    case 6:
                        earningsArrows.push(juneearnings(shift))
                        break;
                    case 7:
                        earningsArrows.push(julyearnings(shift))
                        break;
                    case 8:
                        earningsArrows.push(augustearnings(shift))
                        break;
                    case 9:
                        earningsArrows.push(septemberearnings(shift))
                        break;
                    case 10:
                        earningsArrows.push(octoberearnings(shift))
                        break;
                    case 11:
                        earningsArrows.push(novemberearnings(shift))
                        break;
                    case 12:
                        earningsArrows.push(decemberearnings(shift))
                        break;
                    default:
                        break;

                }

            })
        }

        const costs = appbaseddriver.gettransformeddrivercosts.call(this)


        if (costs.length > 0) {
            // eslint-disable-next-line
            costs.map(cost => {

                if (checkactivedate(cost.purchasedate, this.state.activemonth, this.state.activeyear)) {

                    const costdate = new Date(cost.purchasedate)


                    switch (costdate.getMonth() + 1) {
                        case 1:
                            costsArrows.push(januarycosts(cost))
                            break;
                        case 2:
                            costsArrows.push(februarycosts(cost))
                            break;
                        case 3:
                            costsArrows.push(marchcosts(cost))
                            break;
                        case 4:
                            costsArrows.push(aprilcosts(cost))
                            break;
                        case 5:
                            costsArrows.push(maycosts(cost))
                            break;
                        case 6:
                            costsArrows.push(junecosts(cost))
                            break;
                        case 7:
                            costsArrows.push(julycosts(cost))
                            break;
                        case 8:
                            costsArrows.push(augustcosts(cost))
                            break;
                        case 9:
                            costsArrows.push(septembercosts(cost))
                            break;
                        case 10:
                            costsArrows.push(octobercosts(cost))
                            break;
                        case 11:
                            costsArrows.push(novembercosts(cost))
                            break;
                        case 12:
                            costsArrows.push(decembercosts(cost))
                            break;
                        default:
                            break;

                    }

                }

            })
        }



        return (

            <View style={{ ...styles.generalContainer, ...styles.topMargin30 }}>

                <Svg width='360' height='1785' viewBox="0 0 405.46 1996.39">
                    <G>
                        <G>

                            {showaxis()}
                            {showtickmarks()}
                            {showlabels()}
                            {earningsArrows}
                            {costsArrows}


                        </G></G></Svg>
            </View>)



    }

}

export default SmallDiagram