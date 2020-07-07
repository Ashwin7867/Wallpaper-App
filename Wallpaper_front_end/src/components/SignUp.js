import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

import {signupApi} from '../api/signupApi';

import {
    BrowserRouter as Router,
    Link
  } from 'react-router-dom';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            first_name : '',
            last_name : '',
            phone : '',
            email: '',
            password : '',
            loading : false,
            status : false
        }
    }
    handleChange = (e, {name , value}) => this.setState({ [name] : value});
    handleSubmit = async () => {
        const {first_name , last_name, phone, email , password} = this.state;
        const req_data = {
            first_name : first_name,
            last_name : last_name,
            phone : phone,
            email : email,
            password : password
        }
        console.log('This is req data', req_data);
        const res_status = await signupApi(req_data);
        console.log(res_status);
        if(res_status == '201'){
            this.setState({
                status : true
            })
        alert('User successfully created');
        console.log( res_status)
        }
        
    }

    render(){
        const {first_name , last_name , phone , email, password ,status} = this.state;
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                     Signup to create an account
                </Header>
            <Form size='large'>
            <Segment stacked>
                <Form.Input fluid icon='user'
                        name = 'first_name' 
                        value = {first_name}
                        iconPosition='left' 
                        placeholder='First Name'
                        onChange = {this.handleChange} />
                <Form.Input fluid icon='user'
                        name = 'last_name'
                        value = {last_name} 
                        iconPosition='left' 
                        placeholder='Last Name' 
                        onChange = {this.handleChange}    
                        />
                <Form.Input fluid icon='user'
                        name = 'phone'
                        value = {phone} 
                        iconPosition='left' 
                        placeholder='Phone' 
                        onChange = {this.handleChange}    
                        />
                <Form.Input fluid icon='user'
                        name = 'email'
                        value = {email} 
                        iconPosition='left' 
                        placeholder='E-mail address'
                        onChange = {this.handleChange} />
                <Form.Input fluid icon='lock'
                    name = 'password'
                    value = {password}
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    onChange = {this.handleChange}
                />
                <Button color='teal' fluid size='large' onClick = {this.handleSubmit}>
                    Login
                </Button>
                </Segment>
            </Form>
            <Message>
                Already Signed Up? <Link to = '/'><code>Login </code></Link>
            </Message>
    </Grid.Column>
  </Grid>
)
}
}

export default SignUp;