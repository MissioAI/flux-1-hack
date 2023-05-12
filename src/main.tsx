import React from "react";
import ReactDOM from "react-dom/client";
import { ReactFlowProvider } from "reactflow";
import { CeramicWrapper } from "./components/context";
import { ChakraProvider } from "@chakra-ui/react";
import mixpanel from "mixpanel-browser";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from "./components/App";
// import Page1 from './components/Page1'; // import your Page1 component
// import Page2 from './components/Page2'; // import your Page2 component
import "./index.css";
import LoginPage from "./components/LoginPage";

export const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

if (MIXPANEL_TOKEN) mixpanel.init(MIXPANEL_TOKEN);


// const client = new ApolloClient({
//   uri: 'https://flyby-router-demo.herokuapp.com/',
//   cache: new InMemoryCache(),
// });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
<CeramicWrapper>
    <ReactFlowProvider>
      
      <ChakraProvider>
      <App/>
      </ChakraProvider>
      
    </ReactFlowProvider>
    </CeramicWrapper>
  </React.StrictMode>
);
