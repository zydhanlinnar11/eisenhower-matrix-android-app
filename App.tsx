import * as React from 'react';
import {UserProvider} from './src/providers/UserProvider';
import Navigation from './src/screens/Navigation';

const App = () => {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
};
export default App;
