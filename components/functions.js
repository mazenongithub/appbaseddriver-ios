export function UTCTimeStringfromTime(timein) {

    let time = timein.substring(17, 19)
    let hours = timein.substring(11, 13);
    if (time === 'pm' && hours !== '12') {
        hours = Number(hours) + 12
    } else if (time === 'am' && hours === '12') {
        hours = '00'
    }
    let minutes = timein.substring(14, 16)
    let year = timein.substring(0, 4)
    let month = timein.substring(5, 7);
    let day = timein.substring(8, 10)



    const sym = (timein) => {
        let myoffset = new Date(timein).getTimezoneOffset() / 60
        let sym = "+";
        if (myoffset > 0) {
            sym = "-"
        }
        return sym;

    }

    const offset = (timein) => {
        let myoffset = (new Date(timein).getTimezoneOffset() / 60)

        if (myoffset < 10) {
            myoffset = `0${myoffset}`
        }
        return myoffset;
    }
    timein = `${year}/${month}/${day} ${hours}:${minutes}:00${sym(timein)}${offset(timein)}:00`

    return timein

}

export function getMinutesfromTimein(timein) {

    const newDate = new Date(timein)
    let minutes = newDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    return (minutes);
}

export function getHoursfromTimein(timein) {
    //let timein ='2020/05/13 20:00:00'

    const newDate = new Date(timein)
    let hours = newDate.getHours();
    if (hours > 12) {
        hours = hours - 12;

    }
    if (hours < 10) {
        hours = `0${hours}`
    }
    if (hours === '00') {
        hours = '12'
    }
    return (hours);

}

export function checkactivedate(purchasedate, activemonth, activeyear) {

    let active = false

    const offset = getOffsetDate(purchasedate)
    const datein = new Date(`${purchasedate} 12:00:00${offset}`)

    if (datein.getFullYear() === activeyear) {

        const getmonth = getMonString(datein.getMonth() + 1)


        if (activemonth) {


            if (activemonth.indexOf(getmonth) >= 0) {
                active = true;

            }


        } else {
            active = true;

        }

    }
    return active


}

export function compareDates(purchasedate, salvagedate) {
    //const purchasedate = '2021/04/20'
    //const salvagedate = '2023/04/20'

    const salvageDate = new Date(salvagedate)
    const purchaseDate = new Date(purchasedate)

    let compare = true;

    if (salvageDate.getTime() < purchaseDate.getTime()) {
        compare = false;
    }
    return compare;

}

export function getOffsetDate(timein) {
    let datein = new Date(`${timein} 00:00:00 UTC`)
    let offset = datein.getTimezoneOffset() / 60
    let sym = "+";
    if (offset > 0) {
        sym = "-";
    }
    if (Math.abs(offset) < 10) {
        offset = `0${offset}`
    }
    return (`${sym}${offset}:00`)
}

export function increaseDateStringByOneMonth(timein) {

    const offset = getOffsetDate(timein)

    let datein = new Date(`${timein} 12:00:00${offset}`);
    let month = datein.getMonth() + 1;
    let year = datein.getFullYear();
    if (month === 12) {
        month = 1;
        year = year + 1;
    }
    else {
        month = month + 1;
    }

    let date = datein.getDate();

    if (month < 10) {
        month = `0${month}`;
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`;
    }

    return (`${year}/${month}/${date}`);
}

export function AmmortizeFactor(i, n) {
    i = ((i / 1200));
    // let n = 80;

    const num = i * Math.pow((1 + i), n)

    const deno = Math.pow((1 + i), n) - 1;

    const factor = num / deno;

    return factor;
}

export function FutureCostPresent(i, n, F) {
    i = ((i / 1200));
    // let F=540;
    // let i=(.058/12);
    // let n = 40;
    return (F * (1 / Math.pow((1 + i), n)))
}

export function newCost(costid, detail, purchasedate, amount) {
    return ({ costid, detail, purchasedate, amount })
}

export function getYearFromTime(timein) {

    let datein = new Date(timein)
    return datein.getFullYear();


}

export function getMonString(mon) {

    switch (mon) {
        case 1:
            return ("jan")
        case 2:
            return ("feb")
        case 3:
            return ("mar")
        case 4:
            return ("apr")
        case 5:
            return ("may")
        case 6:
            return ("jun")
        case 7:
            return ("jul")
        case 8:
            return ("aug")
        case 9:
            return ("sep")
        case 10:
            return ("oct")
        case 11:
            return ("nov")
        case 12:
            return ("dec")
        default:
            break
    }

}

export function currentDateCheck(timein) {
    let offset = getOffsetDate(timein);
    let datein = new Date(`${timein} 00:00:00${offset}`)
    let datecheck = true;
    if (datein.getTime() > new Date().getTime()) {
        datecheck = false
    }
    return datecheck


}



export function checkactivemonth(timein, activemonth, activeyear) {
    // timein = '2020/05/24 12:00:00-08:00:00
    // activemonth = []
    // activeyear = 2020


    let active = false
    const datein = new Date(timein)
    if (datein.getFullYear() === activeyear) {
        const getmonth = getMonString(datein.getMonth() + 1)


        if (activemonth) {

            if (activemonth.indexOf(getmonth) >= 0) {
                active = true;

            }


        } else {
            active = true;

        }

    }
    return active

}


export function getRepaymentCosts(purchase, purchasedate, salvage, salvagedate, i) {

    // let purchasedate = '2018/05/24'
    // const salvagedate = '2023/05/24'
    // const purchase = '7400'
    // let salvage = '1500'
    // const i = 16;





    const period = calculateTotalMonths(purchasedate, salvagedate)

    salvage = FutureCostPresent(i, period, salvage)
    const value = purchase - salvage
    const monthlyvalue = value * AmmortizeFactor(i, period)
    let costArray = [];
    for (let x = 0; x < period; x++) {

        let cost = newCost(makeID(16), 'repayment', purchasedate, monthlyvalue)
        costArray.push(cost)
        purchasedate = increaseDateStringByOneMonth(purchasedate)


    }
    return costArray;
}

export function calculateTotalMonths(purchasedate, salvagedate) {
    //  let purchasedate = '2018/05/24';
    // let saledate = '2025/01/24'
    const datePurchase = new Date(`${purchasedate}`);
    const salvageDate = new Date(`${salvagedate}`);
    const datePurchaseYear = datePurchase.getFullYear();
    const purchaseMonth = datePurchase.getMonth() + 1;
    const salvageDateYear = salvageDate.getFullYear();
    const salvageMonth = salvageDate.getMonth() + 1;
    const yearsinterval = salvageDateYear - datePurchaseYear;
    const monthInterval = salvageMonth - purchaseMonth;
    const totalMonths = (yearsinterval) * 12 + monthInterval;
    return (totalMonths)

}

export function getDayfromTimein(timein) {
    //let timein ='2020/05/13 20:00:00'

    const newDate = new Date(`${timein}`)
    let date = newDate.getDate();
    if (date < 10) {
        date = `0${date}`

    }
    return date;
}

export function getYearfromTimein(timein) {
    //let timein ='2020/05/13 20:00:00'
    const newDate = new Date(`${timein}`)
    return newDate.getFullYear();

}

export function sorttimes(timeina, timeinb) {
    timeina = new Date(timeina)
    timeinb = new Date(timeinb)
    if (timeina < timeinb) {
        return -1;
    }
    else if (timeinb > timeina) {
        return 1;
    }
    else {
        return 0;
    }
}

export function getAMPMfromTimeIn(timein) {

    //let timein ='2020/05/13 20:00:00'
    const newDate = new Date(timein)
    let hours = newDate.getHours();
    let ampm = "";
    if (hours >= 12) {
        ampm = 'pm'

    } else {
        ampm = 'am'
    }

    return (ampm);
}

export function getMonthfromTimein(timein) {

    const newDate = new Date(`${timein}`)
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`

    }

    return month;
}
export function calculatetotalhours(timeout, timein) {
    let datein = new Date(timein)
    let dateout = new Date(timeout)
    let totalhours = ((dateout.getTime() - datein.getTime()) / (1000 * 60 * 60))
    return totalhours;
}

export function abbDateStr(timein) {
    //const timein = '2020/12/18 23:30:00'
    const datein = new Date(timein)
    const months = datein.getMonth() + 1;
    const day = datein.getDate();
    return (`${months}/${day}`)
}

export function getXcoord(timein) {
    const datein = new Date(timein)
    const months = datein.getMonth() + 1;
    const day = datein.getDate();

    const x0 = (months - 1) * 67
    const x1 = (day / 31) * 67
    const x = Math.round(x0 + x1)
    return x;
}

export function getUTCDate() {


    const datestring = new Date().toLocaleString()
    const datestrings = datestring.split('/')
    return `${datestrings[2].substring(0, 4)}/${trailingZeros(datestrings[0])}/${trailingZeros(datestrings[1])}`

}

export function formatDateStringDisplay(timein) {

    return timein
}

export function makeTimeString(year, month, day, hours, minutes, time) {
    return `${year}/${month}/${day} ${hours}:${minutes} ${time}`
}

export function validateMinutes(min) {
    const reg_ex = /^[0-5][0-9]$/;
    return (reg_ex.test(min));
}

export function monthstring(month) {


    switch (month) {
        case 0:
            return ("January");
        case 1:
            return ("February");
        case 2:
            return ("March");
        case 3:
            return ("April");
        case 4:
            return ("May");
        case 5:
            return ("June");
        case 6:
            return ("July");
        case 7:
            return ("August");
        case 8:
            return ("September");
        case 9:
            return ("October");
        case 10:
            return ("November");
        case 11:
            return ("December");
        default:
            break;
    }
}

export function makeID(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function isNumeric(val) {

    if (val) {
        return (!isNaN(val))
    } else {
        return (true);
    }


}

export function validateDriverID(value) {
    const reg_ex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,34}(?:[A-Za-z0-9_]))?)$/
    const test = reg_ex.test(value);
    value = value.trim();
    let errmsg = "";
    if (!value) {
        errmsg = " DriverID is required ";

    }
    else if (value.length > 36) {
        errmsg = " DriverID should be less than 36 characters";
    }
    else if (!test) {
        errmsg = ` Invalid Provider ID format ${value} `;
    }

    return errmsg;
}

export function validateEmail(value) {
    var reg_ex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    var test = reg_ex.test(value)
    let errmsg = ""
    if (!value) {
        errmsg += `Email Address is required `

    }


    else if (!test) {

        errmsg += ` Email Address ${value} format is invalid `;

    }
    return errmsg;
}

export function validateYear(year) {
    const reg_ex = /^[12][0-9]{3}$/;
    return (reg_ex.test(year));
}
export function validateDate(date) {
    const reg_ex = /^(0?[1-9]|[12][0-9]|3[01])$/;
    return (reg_ex.test(date));

}
export function validateMonth(mon) {
    const reg_ex = /^0[1-9]|1[0-2]$/;
    return (reg_ex.test(mon))
}

export function getFirstIsOn(timein) {
    let datein = new Date(`${timein}`)
    let monthdisplay = trailingZeros(datein.getMonth() + 1);
    let fullyear = datein.getFullYear();
    let thefirstofthemonth = new Date(`${fullyear}/${monthdisplay}/01`);
    let firstday = thefirstofthemonth.getDay();
    switch (firstday) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tues";
        case 3:
            return "Weds";
        case 4:
            return "Thurs";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return;
    }
}

export function getFirstIsOnDate(datein) {

    let monthdisplay = trailingZeros(datein.getMonth() + 1);
    let fullyear = datein.getFullYear();
    let thefirstofthemonth = new Date(`${fullyear}/${monthdisplay}/01`);
    let firstday = thefirstofthemonth.getDay();
    switch (firstday) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tues";
        case 3:
            return "Weds";
        case 4:
            return "Thurs";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return;
    }
}

export function getDayString(day) {

    switch (day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return;
    }
}

export function inputUTCStringForLaborID(timein) {

    let datein = new Date(timein)
    let hours = datein.getHours();
    let ampm
    if (hours > 12) {
        hours = hours - 12;
        ampm = "PM"
    }
    else if (hours === 0) {
        hours = 12;
        ampm = "AM"
    }
    else if (hours === 12) {
        ampm = "PM"
    }
    else if (hours < 12) {
        ampm = "AM"
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    let year = datein.getFullYear()
    let month = datein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    const seconds = trailingZeros(datein.getSeconds())
    return (`${month}/${date}/${year} ${hours}:${minutes}:${seconds} ${ampm}`)

}

export function check_30date(dateobj) {

    let month = dateobj.getMonth();
    if (month !== 1) {
        return 30;
    }
}

export function check_31(timein) {
    const dateobj = new Date(timein)
    let month = dateobj.getMonth();
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;
    }
}


export function check_30(timein) {

    const dateobj = new Date(timein)
   
    let month = dateobj.getMonth();
   
    if (month !== 1) {
        return 30;
    }
}

export function dollarScale  (dollarsperhour) {
  
    let scale = Math.ceil((Number(dollarsperhour)/50))
    return scale;
   
  }
  
  export function deliveryScale  (dollarsperdelivery) {
    let scale = Math.ceil((Number(dollarsperdelivery)/20))
    return scale;
  }
  
  export function mileScale (dollarspermile)  {
     let scale = Math.ceil((Number(dollarspermile)/2.5))
    return scale;
    
    
  }


export function check_29_feb_leapyear(timein) {
    const dateobj = new Date(timein)
    let month = dateobj.getMonth();

    if (month === 1) {
        let year = dateobj.getFullYear();
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            return 29;
        }
        else {
            return;
        }
    }
    else {
        return 29;
    }

}


export function check_31date(dateobj) {

    let month = dateobj.getMonth();
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;
    }
}

export function check_29_feb_leapyeardate(dateobj) {

    let month = dateobj.getMonth();

    if (month === 1) {
        let year = dateobj.getFullYear();
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            return 29;
        }
        else {
            return;
        }
    }
    else {
        return 29;
    }

}

export function calculateTotalDays(purchasedate, salvagedate) {

    const purchaseDate = new Date(`${purchasedate} 12:00:00${getOffsetDate(purchasedate)}`)
    const salvageDate = new Date(`${salvagedate} 12:00:00${getOffsetDate(salvagedate)}`)

    const purchasetime = purchaseDate.getTime();
    const salvagetime = salvageDate.getTime();
    const interval = salvagetime - purchasetime
    const days = interval / (1000 * 60 * 60 * 24)
    return Math.round(days)

}

export function calculateTotalYears(purchasedate, salvagedate) {
    let totalyears = 0;
    const purchaseyearstr = purchasedate.split('/')
    const purchaseyear = purchaseyearstr[0];
    const purchasemonth = purchaseyearstr[1];
    const purchaseday = purchaseyearstr[2];
    const salvageyearstr = salvagedate.split('/')
    const salvageyear = salvageyearstr[0]
    const salvagemonth = salvageyearstr[1]
    const salvageday = salvageyearstr[2]
    if (purchasemonth >= salvagemonth) {

        if (purchasemonth === salvagemonth) {

            if (purchaseday >= salvageday) {

                totalyears = salvageyear - purchaseyear - 1

            } else {

                totalyears = salvageyear - purchaseyear


            }


        }



    } else {
        totalyears = salvageyear - purchaseyear

    }
    return (totalyears)


}

export function increaseCalendarDaybyOneYear(timein) {

    let datein = new Date(timein)
    let currentYear = datein.getFullYear();
    let increaseYear = currentYear + 1;
    let month = datein.getMonth() + 1;
    let day = datein.getDate();
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }
    let newDate = `${increaseYear}/${month}/${day}`
    return (newDate)
}



export function calculateTotalWeeks(purchasedate, salvagedate) {

    const purchaseDate = new Date(`${purchasedate} 12:00:00${getOffsetDate(purchasedate)}`)
    const salvageDate = new Date(`${salvagedate} 12:00:00${getOffsetDate(salvagedate)}`)

    const purchasetime = purchaseDate.getTime();
    const salvagetime = salvageDate.getTime();
    const interval = salvagetime - purchasetime
    const weeks = interval / (1000 * 60 * 60 * 24 * 7)
    return Math.floor(weeks)

}

export function getYearFromDate(timein) {

    let offset = getOffsetDate(timein);
    let datein = new Date(`${timein} 12:00:00${offset}`)
    return datein.getFullYear();


}

export function validateLoanPayment(purchase, purchasedate, salvage, salvagedate, apr) {

    let validate = true;

    if (new Date(purchasedate).getTime() > new Date(salvagedate).getTime()) {

        validate = false;


    }

    if (!Number(apr)) {
        validate = false;

    }

    if (!Number(purchase)) {

        validate = false;

    }

    return validate;


}


export function getInterval(salvagedate, purchasedate, reoccurring, amount, detail) {


    let period = 0;
    let x = 0;
    let cost = {};
    let costArray = [];
    switch (reoccurring) {
        case 'daily':
            period = calculateTotalDays(purchasedate, salvagedate)
            for (x = 0; x < period; x++) {
                cost = newCost(makeID(16), detail, purchasedate, amount)
                costArray.push(cost)
                purchasedate = increasedatebyoneday(purchasedate)

            }
            break;
        case 'weekly':
            period = calculateTotalWeeks(purchasedate, salvagedate)
            for (x = 0; x < period; x++) {
                cost = newCost(makeID(16), detail, purchasedate, amount)
                costArray.push(cost)
                purchasedate = increaseDateByOneWeek(purchasedate)
            }
            break;
        case 'monthly':
            period = calculateTotalMonths(purchasedate, salvagedate)
            for (x = 0; x < period; x++) {
                cost = newCost(makeID(16), detail, purchasedate, amount)
                costArray.push(cost)
                purchasedate = increaseDateStringByOneMonth(purchasedate)
            }

            break;
        case 'annually':
            period = calculateTotalYears(purchasedate, salvagedate)
            for (x = 0; x < period; x++) {
                cost = newCost(makeID(16), detail, purchasedate, amount)
                costArray.push(cost)
                purchasedate = increaseCalendarDaybyOneYear(purchasedate)
            }

            break;


        default:
            break;


    }

    return costArray


}

export function calculateDays(timein, timeout) {
    // const timein = '10-28-2021'
    // const timeout = '10-30-2028'

    timein = timein.split('-');
    timein = `${timein[2]}/${timein[0]}/${timein[1]}`

    timeout = timeout.split('-');
    timeout = `${timeout[2]}/${timeout[0]}/${timeout[1]}`


    const offsetstart = getOffsetDate(timein);
    const datestart = new Date(`${timein} 00:00:00${offsetstart}`)
    const offsetcompletion = getOffsetDate(timeout);
    const datecompletion = new Date(`${timeout} 00:00:00${offsetcompletion}`)
    const starttime = datestart.getTime();
    const endtime = datecompletion.getTime();
    const interval = Math.round((endtime - starttime) / (3600000 * 24));
    return (interval + 1)

}

export function abbMonth(mon) {

    // mon = 2021/01/23
    const newDate = new Date(mon)
    return (`${newDate.getMonth() + 1}/${newDate.getDate()}`)


}

export function increasedatebyoneday(timein) {

    //let timein = '2020/12/31';

    let datein = new Date(timein);
    let newdate = new Date(datein.getTime())
    let day = newdate.getDate();
    let month = newdate.getMonth() + 1;
    let year = newdate.getFullYear();
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        if (day === 31) {
            day = 1;
            if (month !== 12) {
                month = month + 1;

            } else {
                month = 1;
                year = year + 1;
            }
        } else {
            day = day + 1;

        }

    }

    if (month === 4 || month === 6 || month === 9 || month === 11) {

        if (day === 30) {
            day = 1;
            month = month + 1;
        } else {
            day = day + 1;
        }
    }


    if (month === 2) {
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            if (day === 29) {
                day = 1;
                month = month + 1;
            }
        } else {
            if (day === 28) {
                day = 1;
                month = month + 1;
            } else {
                day = day + 1
            }
        }

    }

    if (day < 10) {
        day = `0${day}`
    }

    if (month < 10) {
        month = `0${month}`
    }
    return (`${year}/${month}/${day}`)
}

export function increaseDateByOneWeek(timein) {
    const offset = getOffsetDate(timein);
    const TimeIn = new Date(`${timein} 12:00:00${offset}`);
    let datetime = TimeIn.getTime();
    datetime += (1000 * 60 * 60 * 24 * 7)
    const oneWeek = new Date(datetime)
    let month = oneWeek.getMonth() + 1;
    month = trailingZeros(month)
    let day = oneWeek.getDate();
    day = trailingZeros(day)
    const year = oneWeek.getFullYear();
    return (`${year}/${month}/${day}`)

}

export function trailingZeros(num) {
  

    if (num.toString().length === 1) {


        if (Number(num) < 10) {

            return (`0${num}`);
        } else {
            return num;
        }

    } else {
        return num;
    }

}

