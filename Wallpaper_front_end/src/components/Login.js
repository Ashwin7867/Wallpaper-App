import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
  } from 'react-router-dom';

import {connect} from 'react-redux';
import {receive_login} from '../redux/actions/loginActions';

import {loginApi} from '../api/loginApi';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            status : ''
        }
    }
    handleChange = (e, {name , value}) => {
        this.setState({ [name] : value});
    }    
    handleSubmit = async () => {
        const {email , password} = this.state;
        const data = {
            email : email,
            password : password
        }
        const {status , token} = await loginApi(data);
        console.log('This is token from login Compo',token);
        if(token){
            this.props.receive_login(status, token);
        }

    }
    render(){
        const {email , password} = this.state;
        const {token} = this.props;
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                     Log-in to your account
                </Header>
            <Form size='large' onSubmit = {this.handleSubmit}>
            <Segment stacked>
                <Form.Input fluid icon='user'
                    name = 'email' 
                    value = {email}
                    iconPosition='left' 
                    placeholder='E-mail address'
                    onChange = {this.handleChange} />
                <Form.Input
                    fluid icon='lock'
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
            {!!token && <Redirect to='/homescreen' />}
            <Message>
                New to us?  <Link to = '/signup'><code>Sign Up</code></Link>
            </Message>
    </Grid.Column>
  </Grid>
)
}
}

const mapStateToProps = (state) => {
    const {token} = state.loginReducer;
    return {
        token : token
    }
}

export default connect(mapStateToProps , {receive_login})(Login);