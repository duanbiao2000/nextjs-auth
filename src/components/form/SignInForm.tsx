'use client';

// 引入react-hook-form库
import { useForm } from 'react-hook-form';
// 引入自定义的表单组件
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// 引入自定义的输入框组件
import { Input } from '../ui/input';
// 引入自定义的按钮组件
import { Button } from '../ui/button';
import Link from 'next/link';
// 引入自定义的Google登录按钮组件
import GoogleSignInButton from '../GoogleSignInButton';

// 定义表单验证规则
const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});

// 定义登录表单组件
const SignInForm = () => {
  // 使用react-hook-form库创建表单实例
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 定义表单提交事件
  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      {/* 表单容器 */}
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        {/* 表单内容 */}
        <div className='space-y-2'>
          {/* 邮箱输入框 */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='mail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* 密码输入框 */}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* 提交按钮 */}
        <Button className='w-full mt-6' type='submit'>
          Sign in
        </Button>
      </form>
      {/* 分隔线 */}
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      {/* Google登录按钮 */}
      <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
      {/* 注册链接 */}
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-up'>
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;