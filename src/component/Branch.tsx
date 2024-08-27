"use client";

import React, { useEffect, useState, useLayoutEffect } from "react";
import { Space, Table, Input, Button, Select, Drawer, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { RadioChangeEvent, PaginationProps } from "antd";

import IconClose from "@/assets/closed.svg";
import IconFilter from "@/assets/filter.svg";
import IconArrowLeft from "@/assets/arrowleft.svg";
import IconArrowRight from "@/assets/arrowright.svg";
import { SearchOutlined } from "@ant-design/icons";
import { BranchDataType, BranchResponse } from "@/types/branch";
import { useGetBranchDataMutation } from "@/features/projects";
import { useSelector } from "@/features/store";
import { redirect } from "next/navigation";

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
	if (type === 'prev') {
		return <Button className="!flex items-center justify-center gap-2 !w-[115px]"><IconArrowLeft /><p className="text-black font-semibold">Previous</p></Button>;
	}
	if (type === 'next') {
		return <Button className="!flex items-center justify-center gap-2 !w-[115px]"><p className="text-black font-semibold">Next</p><IconArrowRight /></Button>;
	}
	return originalElement;
};

const columns: ColumnsType<BranchDataType> = [
  {
    title: "Merchant Name",
    dataIndex: "merchantName",
    key: "merchantName",
    width: 270,
  },
  {
    title: "Branch Name",
    dataIndex: "branchName",
    key: "branchName",
    width: 270,
  },
  {
    title: "QR Code",
    dataIndex: "qrUrl",
    key: "qrUrl",
    width: 270,
  },
  {
    title: "Count of Visits to Page",
    dataIndex: "visitCnt",
    key: "visitCnt",
    width: 250,
  },
  {
    title: "Count of Feedback Submitted",
    dataIndex: "feedbackCnt",
    key: "feedbackCnt",
    width: 250,
  },
  {
    title: "Action",
    key: "status",
    fixed: "right",
    width: 200,
    render: () => (
      <Space size="middle">
        <div className="flex gap-2">
          <Select
            defaultValue="Active"
            style={{ width: 120 }}
            // onChange={handleChange}
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            className="!h-9"
          />
        </div>
      </Space>
    ),
  },
];
const data: BranchDataType[] = [
  {
    id: 1,
    merchantName: "Germany",
    branchName: "32",
    qrUrl: "active",
    visitCnt: 5,
    feedbackCnt: 200,
  },
];

export default function Branch() {
  const [open, setOpen] = useState(false);
  const [getBranchData] = useGetBranchDataMutation();
  const branch: BranchResponse | null = useSelector(
    (state) => state.branch.branch
  );

  useEffect(() => {
    (async () => {
      await getBranchData({ pageNumber: 1, pageSize: 10 });
    })();
  }, [getBranchData]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const [value, setValue] = useState(1);

	const onChange = (e: RadioChangeEvent) => {
		console.log('radio checked', e.target.value);
		setValue(e.target.value);
	};

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <>
      <div className="flex justify-between px-8 py-4 bg-white">
        <div className="py-2.5">
          <p className="text-2xl font-medium">List of Branches</p>
          <p className="text-sm">{branch?.totalCnt} Total branches</p>
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
                  <p className="text-base font-medium">Name</p>
                  <Input
                    type="text"
                    size="large"
                    placeholder="Search name"
                    className="w-full !my-2"
                  />
                  <p className="text-base font-medium">Branch Name</p>
                  <Input
                    type="text"
                    size="large"
                    placeholder="Search branch name"
                    className="w-full !my-2"
                  />
                  <p className="text-base font-medium mb-2">Status</p>
                  <Select
                    placeholder="Select merchants status"
                    // onChange={handleChange}
                    options={[
                      { value: "active", label: "Active" },
                      { value: "inactive", label: "Inactive" },
                    ]}
                    className="!h-10 w-full"
                  />
                </div>
              </div>
              <div className="grid gap-2 grid-cols-2 px-6 mb-8">
                <Button className="!w-full !bg-white !text-black !my-4 !h-11 !text-base !rounded-lg !font-medium">
                  Clear
                </Button>
                <Button className="!w-full !bg-[#171F30] !text-white !my-4 !h-11 !text-base !rounded-lg !font-medium ">
                  Apply Filter
                </Button>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
      <div className="bg-[#F7F7F7] px-8 pt-10 pb-16 checkbox-round">
        <Table
          columns={columns}
          dataSource={branch?.list}
          scroll={{ x: 500 }}
          size="small"
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
