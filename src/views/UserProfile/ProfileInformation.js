import React, {useContext, useState} from "react";
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

import UserProvider from "views/providers/UserProvider"
import { UserContext } from "views/providers/UserProvider"
import { storage, setUserImage} from "../../firebase";
import "firebase/firestore";
import "firebase/storage";

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

export default function ProfileInformation() {
  
  const user = useContext(UserContext);
  const {displayName, location, bio, photoURL} = user;

  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  const handleChange = e => {
    if(e.target.files[0]){
        setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
      const uploadTask = storage.ref(`profileImage/${image.name}`).put(image);
      
      uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {
              console.log(error);
          },
          () => {
              storage
              .ref(`profileImage`)
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                  console.log(url);
                  setUrl(url);
                  setUserImage(url);
              });
          }
      );
  };

  console.log(user);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardBody>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <InputLabel style={{ color: "#AAAAAA" }}>Name</InputLabel>
                    <h4>{displayName}</h4>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <InputLabel style={{ color: "#AAAAAA" }}>Location</InputLabel>
                    <h4>{location}</h4>
                  </GridItem>
              </GridContainer>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <InputLabel style={{ color: "#AAAAAA" }}>Bio</InputLabel>
                    <h4>{bio}</h4>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                    
                    <input type="file" onChange={handleChange} />
                    <Button onClick={handleUpload} color="primary">Upload Profile Picture</Button>
                  </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <img className = "UserProfilePic" src = {photoURL} alt = "User Profile Picture" width = "300" height = "300" />
        </GridItem>
      </GridContainer>
    </div>
  );
}