import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';
import {TabList, Tab} from './Tabs.js';
import Checkout from './Checkout.js';
import {withStripe} from './StripeApi.js';

class App extends Component {
    render() {
      const WrappedCheckout = withStripe(
        Checkout, 
        'pk_test_CNhkBVh9Fm9XmBChjvuMux88',
        'sk_test_O8AS3kVialq5LELk9PZEGHWR'
      )
      return (
        <TabList>
          <Tab name="Checkout" default>
            <WrappedCheckout />
          </Tab>
          <Tab name="Payments">
            <div><h2>Charges history</h2></div>
          </Tab>
          <Tab name="Disputes">
            <div><h2>Hello C</h2></div>
          </Tab>
        </TabList>
        
      );
  }
}

export default App;