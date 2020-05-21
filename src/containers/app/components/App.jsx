import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Layout from './Layout';
import { EmployeeProfile, EmployeesList } from '../../employees';
import NotFound from '../../../components/NotFound';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/" exact component={EmployeesList} />
        <Route path="/view/:employeeId" component={EmployeeProfile} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
