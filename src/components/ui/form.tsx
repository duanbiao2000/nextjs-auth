import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

// 创建一个名为Form的组件，用于提供表单上下文
const Form = FormProvider;

// 定义一个名为FormFieldContext的上下文，初始值为一个空对象
const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

// 定义一个名为FormField的泛型函数组件，用于包装Controller组件并提供字段相关的上下文
// 该组件主要用于简化表单字段的管理，通过上下文提供字段的名称，以便内部组件可以方便地使用
// 参数TFieldValues定义了表单值的类型，TName定义了字段路径的类型
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  // 返回一个包含Controller组件的FormFieldContext.Provider组件
  // 通过Provider传递一个包含字段名称的对象，以便子组件可以访问
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

// 定义一个名为useFormField的钩子函数，用于获取字段相关的上下文
const useFormField = () => {
  // 获取字段相关的上下文
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  // 获取字段状态
  const fieldState = getFieldState(fieldContext.name, formState);

  // 如果没有获取到字段上下文，则抛出错误
  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  // 获取表单项的id
  const { id } = itemContext;

  // 返回字段相关的上下文
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// 定义一个名为FormItemContext的上下文，初始值为一个空对象
type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

// 定义一个名为FormItem的组件，用于提供表单项的上下文
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  // 使用React的useId()钩子函数生成一个唯一的id
  const id = React.useId();

  // 返回一个包含FormItemContext.Provider组件的div元素
  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={className} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

// 定义一个名为FormLabel的组件，用于提供表单标签的上下文
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  // 获取字段相关的上下文
  const { error, formItemId } = useFormField();

  // 返回一个包含Label组件的FormLabel组件
  return (
    <Label ref={ref} className={className} htmlFor={formItemId} {...props} />
  );
});
FormLabel.displayName = 'FormLabel';

// 定义一个名为FormControl的组件，用于提供表单控件的上下文
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  // 获取字段相关的上下文
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  // 返回一个包含Slot组件的FormControl组件
  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

// 定义一个名为FormDescription的组件，用于提供表单描述的上下文
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  // 获取字段相关的上下文
  const { formDescriptionId } = useFormField();

  // 返回一个包含p元素和FormDescription组件
  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

// 定义一个名为FormMessage的组件，用于提供表单消息的上下文
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  // 获取字段相关的上下文
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  // 如果没有消息内容，则返回null
  if (!body) {
    return null;
  }

  // 返回一个包含p元素和FormMessage组件
  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

// 导出相关组件和钩子函数
export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};