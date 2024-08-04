import { View, Flex, Image } from '@adobe/react-spectrum';

function Header() {
  return (
    <View padding="size-200" borderBottomWidth="thin" borderBottomColor="gray-300">
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <Flex direction="row" alignItems="center">
          <Image src="https://res.cloudinary.com/dsbxrn2tj/image/upload/v1720159294/Group_5logo_npxn73.png" alt="Hava Havai" height="size-200" objectFit="cover" />
        </Flex>
        <Image
          src="https://res.cloudinary.com/dsbxrn2tj/image/upload/v1720157961/avatar_to0bfi.jpg"
          alt="User Avatar"
          width="size-450"
          height="size-450"
          borderRadius="50%"
          objectFit="cover"
          marginEnd="size-200"
        />
      </Flex>
    </View>
  );
}

export default Header;
