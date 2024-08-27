import { MenuItem } from "@/types";
import { MerchantIcon, CountryIcon, LanguageIcon } from "./icons";
import Icon from "@ant-design/icons";
import {
  ShopOutlined,
  UserOutlined,
  GlobalOutlined,
  ShoppingOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import Link from "next/link";

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const menuItems: MenuItem[] = [
  getItem(
    <div className="pr-12">
      <p>List of merchants</p>
    </div>,
    "merchant",
    <Link href={"/merchant"}>
      <ShoppingOutlined style={{ fontSize: "19px" }} />

      {/* <Icon component={MerchantIcon as React.ForwardRefExoticComponent<any>} /> */}
    </Link>
  ),
  getItem(
    <div className="pr-12">
      <p>List of branches</p>
    </div>,
    "branch",
    <Link href={"/branch"}>
      <ShopOutlined style={{ fontSize: "19px" }} />
    </Link>
  ),
  getItem(
    "List of contacts",
    "contact",
    <Link href={"/contact"}>
      <UserOutlined style={{ fontSize: "19px" }} />
    </Link>
  ),
  getItem(
    "List of countries",
    "country",
    <Link href={"/country"}>
      <Icon component={CountryIcon as React.ForwardRefExoticComponent<any>} />
    </Link>
  ),
  getItem(
    "List of languages",
    "language",
    <Link href={"/language"}>
      <Icon component={LanguageIcon as React.ForwardRefExoticComponent<any>} />
    </Link>
  ),
];

export default menuItems;
