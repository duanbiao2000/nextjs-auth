'use client';

// 引入react-hook-form库，用于管理表单
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
// 引入zod库，用于定义表单验证规则
import * as z from 'zod';
// 引入zodResolver库，用于将zod验证规则与react-hook-form结合使用
import { zodResolver } from '@hookform/resolvers/zod';
// 引入自定义的输入框组件
import { Input } from '../ui/input';
// 引入自定义的按钮组件
import { Button } from '../ui/button';
// 引入next/link库，用于页面跳转
import Link from 'next/link';
// 引入自定义的Google登录按钮组件
import GoogleSignInButton from '../GoogleSignInButton';

// 定义表单验证规则
const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });

// 定义注册表单组件
const SignUpForm = () => {
  // 使用react-hook-form库创建表单实例
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // 定义表单提交事件处理函数
/**
 * 当表单提交时的回调函数
 * 
 * 此函数用于处理表单提交事件，当表单数据通过验证后，控制台输出提交的表单数据
 * 使用了Zod库的infer类型来确保类型安全的表单值处理
 * 
 * @param values - 表单提交的值，由Zod验证器FormSchema推断得出的类型
 */
const onSubmit = (values: z.infer<typeof FormSchema>) => {
  console.log(values);
};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control} // 将表单控制权移交给React Hook Form库，以便管理和验证表单字段
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='johndoe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control} // 将表单控制权移交给React Hook Form库，以便管理和验证表单字段
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
          <FormField
            control={form.control} // 将表单控制权移交给React Hook Form库，以便管理和验证表单字段
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
          <FormField
            control={form.control} // 将表单控制权移交给React Hook Form库，以便管理和验证表单字段
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter your password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Re-Enter your password'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6' type='submit'>
          Sign up
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-in'>
          Sign in
        </Link>
      </p>
    </Form>
  );
};

// 导出注册表单组件
export default SignUpForm;