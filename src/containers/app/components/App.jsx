import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Layout from './Layout';
import { EmployeeProfile, EmployeesList } from '../../employees';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/" exact component={EmployeesList} />
        <Route path="/view/:employeeId" component={EmployeeProfile} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
