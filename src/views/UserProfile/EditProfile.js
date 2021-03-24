import React, { useState} from "react";
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
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { auth, updateUserInfo, updateUserDocument} from "../../firebase"

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

export default function EditProfile(){

    const[name, setName] = useState('');
    const[location, setLocation] = useState('');
    const[bio, setBio] = useState('');

    const onChangeHandler = (event) =>{
      const {id, value} = event.currentTarget;
      if(id == 'name'){
        setName(value);
      }
      else if(id == 'location'){
        setLocation(value);
      }
      else if(id == 'bio'){
        setBio(value);
      }

    }

    const updateProfile = (event, name, location, bio) => {
        
        const data ={
          displayName: name,
          location: location, 
          bio: bio
        };
        updateUserDocument(data);

        setName("");
        setLocation("");
        setBio("");
    }



    const classes = useStyles();
    return(
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Update Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: name,
                        onChange: (event) => onChangeHandler(event)
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Update Location"
                      id="location"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: location,
                        onChange: (event) => onChangeHandler(event)
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>Update Bio</InputLabel>
                    <CustomInput
                      labelText="Type new bio here"
                      id="bio"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                        value: bio,
                        onChange: (event) => onChangeHandler(event)

                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={(event) => {updateProfile(event, name, location, bio )} }>Update Profile</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }