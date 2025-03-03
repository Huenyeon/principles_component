'use client';

import { Drawer, Text } from "@mantine/core";



type DrawerProps = {
  opened: boolean;
  onClose: () => void;
  title?: string;
  size?: string;
  position?: "left" | "right" | "top" | "bottom";
  overlayOpacity?: number;
  overlayBlur?: number;
  children?: React.ReactNode;
  backgroundColor?: string;
};

export function DrawerComponent({
  opened,
  onClose,
  title,
  children,
}: DrawerProps) {
  return (


        <Drawer.Root opened={opened} onClose={onClose}>
        <Drawer.Overlay opacity={1} />
        <Drawer.Content className="bg-white shadow-lg rounded-lg transition-all h-screen w-md max-w-4xl">
            <div className="justify-end flex p-10">
                <Drawer.CloseButton className="w-10 h-10 flex justify-center text-white ">x</Drawer.CloseButton>

            </div>
            <Drawer.Header className="text-2xl font-semibold pl-5 ">
            <Drawer.Title >{title}</Drawer.Title>

            
            </Drawer.Header>
            <Drawer.Body className="p-4 h-full overflow-auto">
                <Text >WE ARE FROM THE SAME COMPONENT</Text>
            {children}
                
                
            </Drawer.Body>

         

        </Drawer.Content>
        </Drawer.Root>

    
  );
}
