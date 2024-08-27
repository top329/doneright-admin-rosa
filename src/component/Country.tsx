"use client";

import React, { useState, useEffect } from "react";
import { Space, Table, Input, Button, Select, Modal, Pagination } from "antd";
import type { RadioChangeEvent, PaginationProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";

import { CountryDataType } from "@/types/country";
import IconPlus from "@/assets/whitePlus.svg";
import IconClose from "@/assets/closed.svg";
import IconEdit from "@/assets/edit.svg";
import IconArrowLeft from "@/assets/arrowleft.svg";
import IconArrowRight from "@/assets/arrowright.svg";
import { useGetCountryDataMutation } from "@/features/projects";
import { CountryResponse } from "@/types/country";
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

const columns: ColumnsType<CountryDataType> = [
  {
    title: "Country Name",
    dataIndex: "countryName",
    key: "countryName",
  },
  {
    title: "Country Language",
    dataIndex: "language",
    key: "language",
  },
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
  },
  {
    title: "Action",
    key: "action",
    fixed: "right",
    width: 90,
    render: () => (
      <Space size="middle">
        <div className="flex gap-2">
          <EditButton />
        </div>
      </Space>
    ),
  },
];
const data: CountryDataType[] = [
  {
    id: 1,
    countryName: "Germany",
    language: "Deutsch",
    currency: "Euro",
  },
  {
    id: 2,
    countryName: "Germany",
    language: "Deutsch",
    currency: "Euro",
  },
];

function EditButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button onClick={showModal} className="!p-2 !h-9">
        <IconEdit />
      </Button>
      <Modal
        width={600}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        closeIcon={false}
      >
        <div>
          <div className="flex justify-between p-6 pb-4 border-b-2">
            <p className="text-2xl font-medium">Edit Countries</p>
            <Button className="!p-2" onClick={handleCancel}>
              <IconClose />
            </Button>
          </div>
          <div className="p-6">
            <p className="text-base font-medium mb-2">Country</p>
            <Select
              defaultValue="Germany"
              options={[
                { value: "germany", label: "Germany" },
                { value: "us", label: "United Kingdom" },
              ]}
              className="!h-10 w-full"
            />
            <p className="text-base font-medium my-2">Language</p>
            <Select
              placeholder="English(US)"
              options={[
                { value: "us", label: "English" },
                { value: "ge", label: "Destuch" },
              ]}
              className="!h-10 w-full"
            />
            <p className="text-base font-medium mt-2">Add Currency</p>
            <Input
              type="text"
              size="large"
              placeholder="Dollar Singapore"
              className="w-full mt-2"
            />
            <Button className="w-full !bg-[#171F30] !text-white !my-2 !h-11 !text-base !font-semibold !rounded-md">
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default function Country() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getCountryData] = useGetCountryDataMutation();
  const country: CountryResponse | null = useSelector(
    (store) => store.country.country
  );
  useEffect(() => {
    (async () => {
      await getCountryData({ pageNumber: 1, pageSize: 10 });
    })();
  }, [getCountryData]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
      <div className="flex justify-between px-8 py-4 bg-white items-center">
        <div>
          <p className="text-2xl font-medium">List of Countries</p>
          <p className="text-sm">{country?.totalCnt} Total Countries</p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            size="large"
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="h-10 w-[340px]"
          />
          <Button
            onClick={showModal}
            className="!flex !w-[146px] !bg-[#171F30] !gap-2 !text-white !my-4 !h-10 !text-sm !rounded-lg !font-semibold !items-center"
          >
            <IconPlus /> Add Country
          </Button>
          <Modal
            width={600}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            closeIcon={false}
          >
            <div>
              <div className="flex justify-between p-6 pb-4 border-b-2">
                <p className="text-2xl font-medium">Add Countries</p>
                <Button className="!p-2" onClick={handleCancel}>
                  <IconClose />
                </Button>
              </div>
              <div className="p-6">
                <p className="text-base font-medium">Country Name</p>
                <Input
                  type="text"
                  size="large"
                  placeholder="e.g Singapore"
                  className="w-full mt-2"
                />
                <p className="text-base font-medium mt-2">Language</p>
                <Select
                  placeholder="English(US)"
                  options={[
                    { value: "us", label: "English" },
                    { value: "ge", label: "Destuch" },
                  ]}
                  className="!h-10 w-full mt-2"
                />
                <p className="text-base font-medium mt-2">Add Currency</p>
                <Input
                  type="text"
                  size="large"
                  placeholder="Dollar Singapore"
                  className="w-full mt-2"
                />
                <p className="text-base font-medium mt-2">Default Country</p>
                <Select
                  placeholder="Germany"
                  options={[
                    { value: "germany", label: "Germany" },
                    { value: "us", label: "United Kingdom" },
                  ]}
                  className="!h-10 w-full mt-2"
                />
                <Button className="!w-full !bg-[#171F30] !text-white !mt-8 !h-11 !text-base !rounded-md !font-semibold ">
                  Add Countries
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <div className="bg-[#F7F7F7] px-8 pt-10 pb-16 checkbox-round">
        <Table
          columns={columns}
          dataSource={country?.list}
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
