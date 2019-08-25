import React from 'react';
import { Route } from 'react-router';
import { Layout } from './layout';
import { HomePage, ApolicesPage, ApolicesInputPage} from './pages';

export const App = () => (
    <Layout>
        <Route exact path="/" exact component={HomePage}/>
        <Route exact path='/apolices' component={ApolicesPage} />
        <Route exact path='/apolices/:id(\d+)' component={ApolicesInputPage} />
        <Route exact path='/apolices/adicionar' component={ApolicesInputPage} />
    </Layout>
)