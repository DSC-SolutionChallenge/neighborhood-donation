import React, { useState, useRef, useEffect, useCallback, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { Link } from 'react-router-dom';
// core components
import CardIcon from "components/Card/CardIcon.js";
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

import ProfileInformation from "views/UserProfile/ProfileInformation"
import EditProfile from "views/UserProfile/EditProfile"

// import for the registration box
import AuthBox from "views/Authentication/AuthBox"
import { auth, generateUserDocument } from "../../firebase"

//icons
import { Settings, AccountCircle } from "@material-ui/icons";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import PersonAdd from "@material-ui/icons/PersonAdd";
import VpnKey from "@material-ui/icons/VpnKey";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);

const ItemSummary = ({ item }) => {
  const classes = useStyles();
  const itemOwned = item.donated && item.received
  return (
    <GridItem xs={12} sm={6} md={3} style={{marginBottom:"30px"}}>
      <Card style={{height:"100%"}}>
        <CardHeader color="success" stats icon>
          <CardIcon color="info">
            <img src={item.picUrl} alt="Item" width="220px" />
          </CardIcon>
        </CardHeader>

        <CardBody>
          <Link to={`item/${item.id}`} style={{ textDecoration: 'none' }}>
            <h3 className={classes.cardTitle}>{item.name}</h3>
          </Link>
          <p className={classes.cardCategory}>
            {item.description}
          </p>
        </CardBody>
        <CardFooter chart>
          <div className={classes.stats}>
            {itemOwned ? "Owned: " + item.createdAt : item.createdAt}
          </div>
        </CardFooter>

      </Card>
    </GridItem>
  );

}
export default ItemSummary;