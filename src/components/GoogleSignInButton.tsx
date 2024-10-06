// 导入FC和ReactNode类型
import { FC, ReactNode } from 'react';
// 导入Button组件
import { Button } from './ui/button';

// 定义GoogleSignInButtonProps接口，包含children属性
interface GoogleSignInButtonProps {
  children: ReactNode;
}
// 定义GoogleSignInButton组件，接收GoogleSignInButtonProps类型的props
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  // 定义loginWithGoogle函数，点击按钮时打印login with google
  const loginWithGoogle = () => console.log('login with google');

  // 返回Button组件，设置onClick属性为loginWithGoogle函数，设置className属性为w-full
  return (
    <Button onClick={loginWithGoogle} className='w-full'>
      {children}
    </Button>
  );
};

// 导出GoogleSignInButton组件
export default GoogleSignInButton;