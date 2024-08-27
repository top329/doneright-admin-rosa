"use client";

import { Input, Button, Form } from "antd";

import IconDone from "@/assets/done.svg";
import { SignInProps } from "@/types/auth";
import { cryptoEncryptPwd } from "@/utils/utility";
import { useSetRequestLoginMutation } from "@/features/projects";
import { ApiResponse } from "@/types/global";
import { redirect, useRouter } from "next/navigation";
import { Router } from "next/router";

export default function SignIn() {
  const router = useRouter();
  const [setRequestLogin, { isLoading }] = useSetRequestLoginMutation();
  const [form] = Form.useForm();

  const onSubmit = async (data: SignInProps) => {
    const encrypt = cryptoEncryptPwd(data.password);
    const submitData = {
      adminId: data.adminId,
      password: encrypt.pwd,
      phrase: encrypt.phrase,
    };

    console.log(submitData);
    // const res = await setRequestLogin(submitData);
    //@ts-ignore
    // if (res.data && res.data.code === 200) {
      router.replace("/merchant");
    // }
  };
  return (
    <div className="grid py-48 justify-center">
      <div className="w-[500px] grid gap-y-6">
        <div className="flex justify-center">
          <IconDone />
          <p className="text-3xl px-4 font-medium">Done Right</p>
        </div>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            name="adminId"
            rules={[{ message: "This is a required field.", required: true }]}
            label="Email"
          >
            <Input
              placeholder="Please enter your email"
              size="large"
              className="w-full mt-2"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ message: "This is a required field.", required: true }]}
          >
            <Input.Password
              size="large"
              placeholder="Enter your password"
              className="w-full mt-2"
            />
          </Form.Item>
          <Button
            size="large"
            className="!w-full !bg-[#171F30] !text-white !h-11"
            htmlType="submit"
            loading={isLoading}
          >
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
}
