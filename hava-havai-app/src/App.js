import React from 'react';
import { Provider, defaultTheme, Flex, View } from '@adobe/react-spectrum';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Content from './components/Content';

function App() {
  return (
    <Provider theme={defaultTheme}>
      <Flex direction="column" minHeight="100vh">
        <Header />
        <Flex direction="row" flexGrow={1}>
          <SideBar />
          <View flexGrow={1} padding="size-200">
            <Content />
          </View>
        </Flex>
      </Flex>
    </Provider>
  );
}

export default App;
