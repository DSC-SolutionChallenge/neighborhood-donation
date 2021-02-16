import React from "react";
import {Link} from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import avatar from "assets/img/faces/marc.jpg";

import SignIn from "views/Authentication/SignIn"
import SignUp from "views/Authentication/SignUp"
import PasswordReset from "views/Authentication/PasswordReset"
import ProfileInformation from "views/UserProfile/ProfileInformation"
import EditProfile from "views/UserProfile/EditProfile"

//icons
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import PersonAdd from "@material-ui/icons/PersonAdd";
import VpnKey from "@material-ui/icons/VpnKey";
import {Settings, AccountCircle} from "@material-ui/icons";
import { Avatar } from "@material-ui/core";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
};

const useStyles = makeStyles(styles);


export default function UserProfile() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Profile"
            headerColor="primary"
            tabs={[
              {
                tabName: "Profile Information",
                tabIcon: AccountCircle,
                tabContent: (
                  <ProfileInformation/>
                )
              },
              {
                tabName: "Edit Profile",
                tabIcon: Settings,
                tabContent: (
                  <EditProfile/>
                )
              },
            ]}
          />
        </GridItem>
      </GridContainer>
      {/* Below is user authentication */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Authentication"
            headerColor="primary"
            tabs={[
              {
                tabName: "Sign In",
                tabIcon: SupervisorAccount,
                tabContent: (
                  <SignIn />
                )
              },
              {
                tabName: "Sign Up",
                tabIcon: PersonAdd,
                tabContent: (
                  <SignUp />
                )
              },
              {
                tabName: "Forgot Password",
                tabIcon: VpnKey,
                tabContent: (
                  <PasswordReset />
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}