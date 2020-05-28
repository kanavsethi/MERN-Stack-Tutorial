import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';


import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

import Dashboard from './components/dashboard/Dashboard';

import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import AddExperience from './components/profile/AddExperience';
import AddEducation from './components/profile/AddEducation';

import Profiles from './components/allProfiles/AllProfiles';

import Profile from './components/singleProfile/Profile';

import ProtectedRoute from './components/common/ProtectedRoute';
import PageNotFound from './components/common/PageNotFound';

import Posts from './components/postFeed/Posts';

import Post from './components/singlePost/Post';

import store from './redux/store';
import { setAuthToken, setCurrentUser, logOutUser } from "./redux/actions/authActions";
import { clearCurrentProfile } from './redux/actions/profileActions';

import './App.css';





if (localStorage.jwtToken) {

  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));

  let currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(clearCurrentProfile());
    store.dispatch(logOutUser());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div className='container'>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:handle' component={Profile} />

              <Switch>
                <ProtectedRoute exact path='/dashboard' component={Dashboard} />
                <ProtectedRoute exact path='/createProfile' component={CreateProfile} />
                <ProtectedRoute exact path='/editProfile' component={EditProfile} />
                <ProtectedRoute exact path='/addExperience' component={AddExperience} />
                <ProtectedRoute exact path='/addEducation' component={AddEducation} />
                <ProtectedRoute exact path='/profile' component={Profile} />
                <ProtectedRoute exact path='/feed' component={Posts} />
                <ProtectedRoute exact path='/post/:id' component={Post} />
              </Switch>
              <Route exact path='/pageNotFound' component={PageNotFound} />

            </div>
            <Footer />
          </div>
        </Router>
      </Provider >
    );
  }
}

export default App;
