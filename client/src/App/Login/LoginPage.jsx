import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../helpers';
import { Container, Row, Col, Button, ButtonGroup, Alert } from 'reactstrap';
import { userActions } from './../../actions';
import './../../assets/style/global/main.css'
import './../../assets/style/global/util.css';
import { HypeImgs } from './../../constants/_temperrory.constants';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(userActions.logout());

        this.state = {
            isAdmin: true,
            username: '',
            password: '',
            submitted: false
            // localImgs: {
            //     login: {
            //         admin: "./../../assets/images/manager.png",
            //         biker: "./../../assets/images/biker.png",
            //     }
            // }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    setRole(isAdmin) {
        this.setState({ isAdmin });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password)).then(user => {
                if(user.role === 'admin') {
                    history.push('/admin');
                } else if (user.role === 'biker') {
                    history.push('/biker');
                } else if(user.role === "null") { // has no role
                    history.push('/not-authorized');
                } else { 
                    history.push('/not-found');
                }
            })
        }
    }

    renderImgDep(isAdmin, imgsSrc) { // temp function
        let finalImg = "";
        if (isAdmin) { // Admin role
            finalImg = imgsSrc.login.admin;
        } else { // Biker role
            finalImg = imgsSrc.login.biker;
        }
        return finalImg;
    }
    
    renderImgs(isAdmin = true, shouldHyper) { // temp function
        if (shouldHyper) { // Should Get images from HyperLink
            return this.renderImgDep(isAdmin, HypeImgs);
        }
        // else {
            // return this.renderImgDep(isAdmin, this.state.localImgs);
        // }

    }



    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="limiter">
                <div className="container-login100">
                    <Container className="wrap-login100">
                        <Col md="6" sm="12" className="login100-pic js-tilt" data-tilt>
                            <img src={ this.renderImgs(this.state.isAdmin, true) } alt="IMG" />
                        </Col>
                        <Col md="6" sm="12">
                            <form className="login100-form validate-form" style={{textAlign: "center"}} onSubmit={this.handleSubmit}>
                                <ButtonGroup style={{marginBottom: "2em"}}>
                                    <Button onClick={() => this.setRole(true)} active={this.state.isAdmin}>Admin</Button>
                                    <Button disabled>or</Button>
                                    <Button onClick={() => this.setRole(false)} active={!this.state.isAdmin}>Biker</Button>
                                </ButtonGroup>
            
                                <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                                    <input type="text" className="form-control input100" name="username" placeholder="Username" value={username} onChange={this.handleChange} />
                                    {submitted && !username &&
                                        <div className="help-block">Username is required</div>
                                    }
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <i className="fa fa-envelope" aria-hidden="true"></i>
                                    </span>
                                </div>
            
                                <div className="wrap-input100 validate-input" data-validate = "Password is required">
                                    <input type="password" className="form-control input100" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
                                    {submitted && !password &&
                                        <div className="help-block">Password is required</div>
                                    }
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <i className="fa fa-lock" aria-hidden="true"></i>
                                    </span>
                                </div>
                                
                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn">
                                        Login
                                    </button>
                                </div>
                                { this.props.alert.type === "danger" &&
                                    <Alert style={{marginTop: '15px'}} color={this.props.alert.type}>
                                        { this.props.alert.message }
                                    </Alert>
                                }
            
                                    <Alert style={{marginTop: '15px', fontSize: '12px'}} color="primary">
                                        Admin Username: admin <br />
                                        Admin Password: admin <br />
                                        <br />
                                        Biker Username: biker <br />
                                        Biker Password: biker <br />
                                    </Alert>
                                <div className="login-info" style={{fontSize: '13px', paddingTop: '136px'}}>
                                          © 2019 Copyright : 
                                          <a href="https://github.com/hoseingp/">
                                            {' ' + info.author + ' '}
                                          </a>
                                            - Demo for 
                                          <a href="https://www.saloodo.com">      
                                          {' ' +info.company + ' '}
                                          </a>
                                </div>
                            </form>
                        </Col>
                    </Container>
                </div>
            </div>
        
        );
    }
}

function mapStateToProps(state) {
    const { authentication, alert } = state;
    const { loggingIn } = authentication
    return {
        loggingIn,
        alert
    };
}

const info ={
    author: 'H.Ekrami',
    company: 'Saloodo'
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 