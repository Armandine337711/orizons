/* eslint-disable import/no-unresolved */
// == Import npm
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import
import './styles.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

// Importing Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from 'src/containers/Header'; // REDUX
import Login from 'src/containers/Login'; // REDUX
import Register from 'src/containers/Register'; // REDUX
import Account from 'src/containers/Account'; // REDUX
import Page from 'src/components/Page';
import HomeDesktop from 'src/containers/HomeDesktop'; // REDUX
import HomeMobile from 'src/containers/HomeMobile'; // REDUX
import Trips from 'src/containers/Trips'; // REDUX
import AddTrip from 'src/containers/AddTrip';
import Profile from 'src/containers/Profile';
import Trip from 'src/containers/Trip';
import Results from 'src/containers/Results';

// == Dumb Components
import Footer from 'src/components/Footer';
import About from 'src/components/About';
import Legals from 'src/components/Legals';
import ContactForm from 'src/components/ContactForm';
import Lost404 from 'src/components/Lost404';

// Custom hook for display according to screen size
function useMediaQuery() {
  const [screenSize, setScreenSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateScreenSize() {
      setScreenSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateScreenSize);
    updateScreenSize();
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
}

// == Composant

const App = ({
  isLoggedIn, loadMember, loadTrips, loadCountries, loadCategories
}) => {
  const [width] = useMediaQuery();
  useEffect(() => {
    loadTrips();
    loadCountries();
    loadCategories();
    if (isLoggedIn) {
      loadMember();
    }
  }, [isLoggedIn]);
  return (
    <div>
      <Header />
      <ToastContainer
        position="bottom-right"
      />
      <Page>
        <Switch>
          <Route exact path="/">
            {
              width > 769
                ? <HomeDesktop />
                : <HomeMobile />
            }
          </Route>
          <Route exact path="/inscription">
            <Register />
          </Route>
          <Route exact path="/connexion">
            <Login />
          </Route>
          <Route exact path="/contact">
            <ContactForm />
          </Route>
          <Route exact path="/a-propos">
            <About />
          </Route>
          <Route exact path="/mentions-legales">
            <Legals />
          </Route>
          <Route exact path="/exploration">
            <Trips />
          </Route>
          <Route exact path="/exploration/:id">
            <Trip />
          </Route>
          <Route exact path="/profil/:id">
            <Profile />
          </Route>
          <Route exact path="/ajouter-carnet">
            {isLoggedIn ? <AddTrip /> : <Redirect to="/connexion" />}
          </Route>
          <Route exact path="/compte">
            {isLoggedIn ? <Account /> : <Redirect to="/connexion" />}
          </Route>
          <Route exact path="/resultats">
            <Results />
          </Route >
          <Route>
            <Lost404 />
          </Route>
        </Switch>
      </Page>
      <Footer />
    </div>
  );
};

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loadMember: PropTypes.func.isRequired,
  loadTrips: PropTypes.func.isRequired,
};
// == Export
export default App;
