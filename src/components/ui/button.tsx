import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
// 从 class-variance-authority 库中导入 cva 函数和 VariantProps 类型
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// 定义按钮的样式变体
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// 定义按钮组件的属性接口
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// 创建按钮组件
// 定义一个名为Button的React组件，该组件通过forwardRef创建，以支持ref的转发。
// 参数包括一个对象（包含className、variant、size等属性）和一个ref。
// asChild属性用于决定是否将按钮渲染为Slot组件的子元素，默认为false。
// ...props允许传递其他属性到按钮元素。
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // 根据asChild属性决定使用Slot组件还是普通的'button'元素。
    const Comp = asChild ? Slot : 'button';
    // 返回一个Comp组件（Slot或button），并应用相应的样式。
    // cn函数用于合并不同的样式，buttonVariants函数根据variant、size和className生成样式。
    // ref和...props确保了ref和所有其他属性都被正确地传递给按钮元素。
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
