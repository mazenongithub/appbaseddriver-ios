class AppBasedDriver {
    getOrientation() {
        if(this.state.width<this.state.height) {
            return ('portrait')
        } else {
            return('landscape')
        }
    }

    getNavigation() {
        let nav = false;
        if (this.props.hasOwnProperty("navigation")) {
            nav = this.props.navigation;

        }
        return nav;
    }

    getuser() {
        let user = false;
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("driverid")) {
                user = this.props.myusermodel
            }
        }
        return user;
    }

    async logoutuser() {
        console.log("logout user")

    }



}
export default AppBasedDriver;