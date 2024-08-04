import React from 'react';
import { Flex, View, Heading, Divider, Link, Button, ListBox, Item } from '@adobe/react-spectrum';

function Sidebar() {
  return (
    <View width="size-3000" padding="size-200">
      <Flex direction="column" gap="size-200">
        <ListBox>
            <Item>Home</Item>
            <Item>Dashboard</Item>
        </ListBox>
                
        <Heading level={3}>Services</Heading>
        <Link><Button variant="primary" isQuiet>Airports</Button></Link>
        <Link><Button variant="primary" isQuiet>Videos</Button></Link>
        
        <Divider size="S" />
        
        <Heading level={3}>Others</Heading>
        <Link><Button variant="primary" isQuiet>List 1</Button></Link>
        <Link><Button variant="primary" isQuiet>List 2</Button></Link>
        <Link><Button variant="primary" isQuiet>List 3</Button></Link>
      </Flex>
    </View>
  );
}

export default Sidebar;
