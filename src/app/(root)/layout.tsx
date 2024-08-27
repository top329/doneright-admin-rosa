"use client";

import { Menu, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import IconExpand from "@/assets/expand.svg";
import IconClose from "@/assets/close.svg";
import IconDone from "@/assets/done.svg";
import menuItems from "@/menu-items";

import React, { useState, useEffect } from "react";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useMediaQuery } from "react-responsive";

import { Spinner, useAuth } from "@/component";
import { useDispatch } from "@/features/store";
import { validateToken } from "@/utils/utility";
import { logout } from "@/features/projects";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const query = useSearchParams();
  const isAuth = query.get("auth");
  const { expireDate, accessToken } = useAuth();

  const isMobile = useMediaQuery({ query: "(max-width: 1168px)" });
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const pathname: string = usePathname();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // useEffect(() => {
  //   if (isAuth) {
  //     dispatch(logout());
  //   } else if (
  //     accessToken &&
  //     accessToken !== "" &&
  //     expireDate &&
  //     validateToken(expireDate)
  //   ) {
  //     if (pathname === "/") {
  //       redirect("/merchant");
  //     }
  //   } else {
  //     dispatch(logout());
  //   }
  // }, [router]);

  const handleClick = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);

  return (
    <div>
      {/* <Spinner loading={true} size="large" />; */}
      <div className="grid-cols flex min-h-screen">
        <div
          className={`bg-[#171F30] text-white py-6 ${
            collapsed ? "!w-[120px]" : "!w-[270px]"
          }`}
        >
          <div className="flex items-center py-4 px-10 mb-[14px] !h-18">
            <IconDone />
            {!collapsed && (
              <p className="text-2xl font-semibold px-[14px] py-2">DoneRight</p>
            )}
          </div>

          <div className="pl-[13px] flex">
            <Menu
              theme={"dark"}
              defaultSelectedKeys={[pathname.slice(1)]}
              mode="inline"
              inlineCollapsed={collapsed}
              items={menuItems}
              className="!bg-[#171F30] !text-[#939396]"
            />
            <Button
              type="link"
              onClick={toggleCollapsed}
              className="!ml-[-4px] !mt-1"
            >
              {collapsed ? <IconClose /> : <IconExpand />}
            </Button>
          </div>
          <div className="absolute bottom-4 px-8">
            <Button
              type="link"
              className="!flex items-center !text-white"
              onClick={handleClick}
            >
              <LogoutOutlined className="text-lg" />{" "}
              {!collapsed && <p className="text-base py-2">Signout</p>}
            </Button>
          </div>
        </div>
        <div
          className={` ${
            collapsed ? "w-[calc(100%-7.5rem)]" : "w-[calc(100%-17rem)]"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
export default Layout;
