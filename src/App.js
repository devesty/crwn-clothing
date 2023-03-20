import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up-component';


import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selectors';
import Header from './components/header/header-component';


class App extends React.Component {

unSubscribeFromAuth = null;

componentDidMount() {
const {setCurrentUser} = this.props;

  this.unSubscribeFromAuth  = auth.onAuthStateChanged(async userAuth => {
    if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth);


      userRef.onSnapshot(snapShot => {
        
          setCurrentUser ({
            id: snapShot.id,
            ...snapShot.data()
          })
        }
        );
      
      
    }
    setCurrentUser( userAuth );
  })
}

componentWillUnmount() {
  this.unSubscribeFromAuth();
}

  render() {
    return (
      <div>
        <Header />
        <Routes>
        <Route exact path='/' element={<HomePage/>} />
        <Route path='/shop' element={<ShopPage/>} />
        <Route exact path='/checkout' element={<CheckoutPage/>} />
        <Route exact path='/signin' render={() => this.props.currentUser ? ( <Navigate to = '/' />) : (
          <SignInAndSignUpPage/>
        )} />
        </Routes>
       
      </div>
    );
  }
   
  }
  
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});


  const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
  });

export default connect(mapStateToProps, mapDispatchToProps)(App);
