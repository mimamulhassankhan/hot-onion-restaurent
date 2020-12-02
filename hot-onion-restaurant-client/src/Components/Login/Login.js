import { Image } from '@fluentui/react';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { addLoggedinUser } from '../../Redux/Actions/RestaurantActions';
import { defaulftLoggingFramework, signInWithEmailAndPassword } from './loginManager';

const Login = ({user, addLoggedinUser}) => {
    //login config
    defaulftLoggingFramework();

    //local state
    const [localUser, setLocalUser] = useState({
        name: '',
        email: '',
        password:'',
        confirmPassword:''
    })
    //localize
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleBlur = event => {
        let isFormValid = true;
        if(event.target.name === 'email'){
          isFormValid = /\S+\@\S+\.\S+/.test(event.target.value);
        }
        else if(event.target.name === 'password'){
          isFormValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(event.target.value)
        }
        if(isFormValid){
          const newUserInfo = {...localUser};
          newUserInfo[event.target.name] = event.target.value;
          setLocalUser(newUserInfo);
        }
        event.preventDefault(); 
      }

    const handleSubmit = event => {
        if(localUser.email && localUser.password) {
            signInWithEmailAndPassword(localUser.email, localUser.password)
            .then(res => {
            setLocalUser(res);
            addLoggedinUser(res);
            history.replace(from);
            }).catch(res => console.log(res));
        }
        
        event.preventDefault();
    }
    return (
        <div>
            <Form.Group onSubmit={handleSubmit} className="w-25 text-center mx-auto">
                <Image className="mx-auto" width={150} src="/Images/Image/Group 1151.png" alt="logo"/>
                <br/>
                <Form.Control onBlur={handleBlur} name="email" size="lg" type="text" placeholder="Email"  required/>
                <br />
                <Form.Control onBlur={handleBlur} name="password" size="lg" type="password" placeholder="Password" required/>
                <br/>
                <Form.Control onClick={handleSubmit} className="bg-danger text-white" size="lg" type="submit" value="Submit" />
                <Link to={"/signup"}>
                    <p className="pt-3">No account?? don't worry. Create Account here.</p>
                </Link>
            </Form.Group>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);