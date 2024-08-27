"use client";

import React, { useState, useEffect } from "react";
import { Space, Table, Input, Button, Select, Drawer, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { RadioChangeEvent, PaginationProps } from "antd";
import IconClose from "@/assets/closed.svg";
import IconFilter from "@/assets/filter.svg";
import { SearchOutlined } from "@ant-design/icons";
import { CustomerDataType } from "@/types/customer";

import IconStar from "@/assets/star.svg";
import IconArrowLeft from "@/assets/arrowleft.svg";
import IconArrowRight from "@/assets/arrowright.svg";
import { useGetCustomerDataMutation } from "@/features/projects";
import { useSelector } from "@/features/store";

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
	if (type === 'prev') {
		return <Button className="!flex items-center justify-center gap-2 !w-[115px]"><IconArrowLeft /><p className="text-black font-semibold">Previous</p></Button>;
	}
	if (type === 'next') {
		return <Button className="!flex items-center justify-center gap-2 !w-[115px]"><p className="text-black font-semibold">Next</p><IconArrowRight /></Button>;
	}
	return originalElement;
};

const columns: ColumnsType<CustomerDataType> = [
  {
    title: "Merchant Name",
    dataIndex: "merchantName",
    key: "merchantName",
    width: 270,
  },
  {
    title: "Contact Name",
    dataIndex: "customerName",
    key: "customerName",
    width: 270,
  },
  {
    title: "Contact Phone",
    dataIndex: "phone",
    key: "phone",
    width: 270,
  },
  {
    title: "Contact Email",
    dataIndex: "email",
    key: "email",
    width: 250,
  },
  {
    title: "Count of Ratings",
    dataIndex: "rateCount",
    key: "rateCount",
    width: 250,
    render: (record) => (
      <div className="flex items-center gap-2">
        <IconStar />
        <p className="mt-0.5">{record}</p>
      </div>
    ),
  },
];
const data: CustomerDataType[] = [
  {
    id: 1,
    merchantName: "Germany",
    customerName: "32",
    phone: "active",
    email: "rosa33@gmail.com",
    rateCount: "5",
  },
];

export default function Contact() {
  const [open, setOpen] = useState(false);
  const [getCustomerData] = useGetCustomerDataMutation();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const customer = useSelector((state) => state.customer.customer);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  useEffect(() => {
    (async () => {
      await getCustomerData({ pageNumber: 1, pageSize: 10 });
    })();
  }, []);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="flex justify-between px-8 py-4 bg-white">
        <div className="py-2.5">
          <p className="text-2xl font-medium">List of Contacts</p>
          <p className="text-sm">{customer?.totalCnt} Total contacts</p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            size="large"
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="h-10 w-[340px]"
          />
          <Button onClick={showDrawer} className="!p-2 !h-10">
            <IconFilter />
          </Button>
          <Drawer
            placement="right"
            onClose={onClose}
            closeIcon={false}
            open={open}
            width={600}
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="border-b flex justify-between p-6 mb-2">
                  <p className="text-2xl font-medium">Filters</p>
                  <Button className="!p-2" onClick={onClose}>
                    <IconClose />
                  </Button>
                </div>
                <div className="p-6">
                  <p className="text-base font-medium">Merchant Name</p>
                  <Input
                    type="text"
                    size="large"
                    placeholder="Search merchant name"
                    className="w-full !my-2"
                  />
                  <p className="text-base font-medium">Contact Name</p>
                  <Input
                    type="text"
                    size="large"
                    placeholder="Search contact name"
                    className="w-full !my-2"
                  />
                  <p className="text-base font-medium mb-2">Ratings</p>
                  <Select
                    placeholder="Select ratings"
                    // onChange={handleChange}
                    options={[
                      {
                        value: "five",
                        label: (
                          <div className="flex items-center gap-1">
                            <IconStar />
                            <IconStar />
                            <IconStar />
                            <IconStar />
                            <IconStar />
                            <p className="text-sm">(25)</p>
                          </div>
                        ),
                      },
                      {
                        value: "four",
                        label: (
                          <div className="flex items-center gap-1">
                            <IconStar />
                            <IconStar />
                            <IconStar />
                            <IconStar />
                            <p className="text-sm">(15)</p>
                          </div>
                        ),
                      },
                      {
                        value: "three",
                        label: (
                          <div className="flex items-center gap-1">
                            <IconStar />
                            <IconStar />
                            <IconStar />
                            <p className="text-sm">(12)</p>
                          </div>
                        ),
                      },
                      {
                        value: "two",
                        label: (
                          <div className="flex items-center gap-1">
                            <IconStar />
                            <IconStar />
                            <p className="text-sm">(6)</p>
                          </div>
                        ),
                      },
                      {
                        value: "one",
                        label: (
                          <div className="flex items-center gap-1">
                            <IconStar />
                            <p className="text-sm">(2)</p>
                          </div>
                        ),
                      },
                    ]}
                    className="!h-10 w-full !items-center"
                  />
                </div>
              </div>
              <div className="grid gap-2 grid-cols-2 px-6 mb-8">
                <Button className="!w-full !bg-white !text-black my-4 !h-11 !text-base !rounded-lg !font-medium">
                  Clear
                </Button>
                <Button className="!w-full !bg-[#171F30] !text-white my-4 !h-11 !rounded-lg !font-medium ">
                  Apply Filter
                </Button>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
      <div className="bg-[#F7F7F7] px-8 pt-10 pb-2 checkbox-round">
        <Table
          columns={columns}
          dataSource={customer?.list}
          scroll={{ x: 500 }}
          size="large"
          rowSelection={rowSelection}
					pagination={false}
					className="border border-gray-300 rounded-md border-b-0 rounded-b-none"
				/>
				<div className="justify-between text-center py-4 border border-gray-300 rounded-b-md">
					<Pagination total={500} itemRender={itemRender} hideOnSinglePage={true} showSizeChanger={false} />
				</div>
      </div>
    </>
  );
}
