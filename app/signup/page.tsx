"use client"
import Header from '@/components/layout/Header';
import { Footer } from '@/components/shared/Footer';
import { useAccessToken } from '@/hooks/useAccessToken';
import { LogInDataI } from '@/interfaces';
import { useSignupMutation } from '@/redux-services/auth.service';
import { Form, Space, Button, Input } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React from 'react'
import { useThemeMode } from 'antd-style';
import { toast } from 'react-toastify';

function SignupPage() {
  const router = useRouter();
  const [form] = Form.useForm<LogInDataI>();
  const { setAccessToken } = useAccessToken();
  const [signup, { isLoading }] = useSignupMutation();
  const { isDarkMode } = useThemeMode()
  const onFinish = async () => {
    try {
      const user = form.getFieldsValue();
      if (!user.password && !user.username) return
      const response = (await signup(user).unwrap()) || {}
      console.log(response)
      if (response.data && response.data.access_token !== "") {
        setAccessToken(response?.data?.access_token)
        toast.success('Sign up successful')
        router.replace('/game')
      } else {
        throw new Error("Failed to Sign Up, please try again later")
      }

    } catch (error: any) {
      toast.error(error.data?.message || error?.message || 'An error occurred')
      console.log(error.data?.message || error?.message || "An error occurred")
    }
  }

  return (
    <div className="container max-w-2xl mt-16">
      <Header />
      <div className={`flex items-center justify-center mt-4 p-20 ${isDarkMode ? 'bg-darkgray' : 'bg-lightgray'} shadow-lg`}>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className='w-[230px]'
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }, { type: 'string', min: 4, max: 10 }]}
            className='mb-2'
          >
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }, { type: 'string' }]}
          >
            <Input placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Space className='align'>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Signup
              </Button>
            </Space>
          </Form.Item>
          Have an account? <Link href="/login" className='underline'>Login</Link>
        </Form>
      </div>
      <Footer />
    </div>
  )
}

export default SignupPage
