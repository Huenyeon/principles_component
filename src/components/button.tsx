import { Button } from "@mantine/core";
import { ButtonProps } from "@mantine/core";

type CustomButtonProps = ButtonProps & {
  onClick?: () => void;
  children: React.ReactNode;
};

export function ButtonComponent({ onClick, children, ...props }: CustomButtonProps) {
  return (
    <Button onClick={onClick} {...props}>
      {children}
    </Button>
  );
}
