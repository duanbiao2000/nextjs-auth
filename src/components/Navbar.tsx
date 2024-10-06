// 导入Link组件
import Link from 'next/link';
// 导入buttonVariants样式
import { buttonVariants } from './ui/button';
// 导入HandMetal图标
import { HandMetal } from 'lucide-react';

// 定义Navbar组件
const Navbar = () => {
  // 返回一个div，包含背景色、内边距、边框、固定定位、宽度、层级和顶部位置
  return (
    <div className=' bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <HandMetal />
        </Link>
        <Link className={buttonVariants()} href='/sign-in'>
          Sign in
        </Link>
      </div>
    </div>
  );
};

// 导出Navbar组件
export default Navbar;