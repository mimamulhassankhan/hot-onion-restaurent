import React, { useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { addLoggedinUser } from '../../Redux/Actions/RestaurantActions';
import { defaulftLoggingFramework } from '../Login/loginManager';
import './SignUp.css';
import { createUserWithEmailAndPassword } from './signupManager';

const SignUp = ({user, addLoggedinUser}) => {
    console.log(user);
    //call login framework
    defaulftLoggingFramework();

    //local state
    const [localUser, setLocalUser] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    //localize
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const handleBlur = (e) => {
        let isFormValid = true;
        if(e.target.name === 'email'){
          isFormValid = /\S+\@\S+\.\S+/.test(e.target.value);
        }
        else if(e.target.name === 'password'){
          isFormValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(e.target.value)
        }
        else if(e.target.name === 'confirmPassword'){
            isFormValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(e.target.value)
        }

        if(isFormValid){
          const newUserInfo = {...localUser};
          newUserInfo[e.target.name] = e.target.value;
          setLocalUser(newUserInfo);
        }
        e.preventDefault(); 
      }

    const handleSubmit = event => {
        console.log( localUser.password);
        if(localUser.email && (localUser.password === localUser.confirmPassword)){
            createUserWithEmailAndPassword(localUser.name, localUser.email, localUser.password)
            .then(res => {
              setLocalUser(res);
              addLoggedinUser(res);
              history.replace(from);
            }).catch(res => console.log(res));
          }
        event.preventDefault();
    }


    return (
        <>
            <div className="sign-up-body">
                <Form.Group onSubmit={handleSubmit} className="w-25 text-center mx-auto">
                    <Image className="mx-auto" width={150} src="/Images/Image/Group 1151.png" alt="logo"/>
                    <br/>
                    <Form.Control onBlur={handleBlur} name="name" size="lg" type="text" placeholder="Name" />
                    <br />
                    <Form.Control onBlur={handleBlur} name="email" size="lg" type="text" placeholder="Email" />
                    <br />
                    <Form.Control onBlur={handleBlur}name="password" size="lg" type="password" placeholder="Password" />
                    <br />
                    <Form.Control onBlur={handleBlur} name="confirmPassword" size="lg" type="password" placeholder="Confirm Password" />
                    <br />
                    <Form.Control onClick={handleSubmit} className="bg-danger text-white" size="lg" type="submit" value="Submit" />
                    <br/>
                </Form.Group>
                <Link to={"/login"}>
                    <p>Already have an account? <u><strong>login here</strong></u></p>
                </Link>
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        user : state.user
    }
}

const mapDispatchToProps = {
    addLoggedinUser : addLoggedinUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);