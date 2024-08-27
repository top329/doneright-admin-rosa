"use client";

import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Input,
  Button,
  Select,
  Modal,
  DatePicker,
  Drawer,
  Pagination,
  Form,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { DatePickerProps, RadioChangeEvent, PaginationProps } from "antd";

import IconEye from "@/assets/eye.svg";
import IconPlus from "@/assets/plus.svg";
import IconEdit from "@/assets/edit.svg";
import IconClose from "@/assets/closed.svg";
import IconFilter from "@/assets/filter.svg";
import IconArrowLeft from "@/assets/arrowleft.svg";
import IconArrowRight from "@/assets/arrowright.svg";
import { SearchOutlined } from "@ant-design/icons";
import {
  AddPaymentProps,
  CountryListResponse,
  CurrencyListResponse,
  MerchantDataType,
  MerchantPaymentDataType,
  MerchantPaymentListResponse,
} from "@/types/merchant";
import {
  useAddMerchantPaymentMutation,
  useGetCountryListMutation,
  useGetCurrencyListMutation,
  useGetMerchantDataMutation,
  useGetMerchantPaymentListMutation,
} from "@/features/projects/merchant";
import { useSelector } from "@/features/store";
import { MerchantResponse } from "@/types/merchant";
import dayjs from "dayjs";

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if (type === 'prev') {
    return <Button className="!flex items-center justify-center gap-2 !w-[115px]"><IconArrowLeft /><p className="text-black font-semibold">Previous</p></Button>;
  }
  if (type === 'next') {
    return <Button className="!flex items-center justify-center gap-2 !w-[115px]"><p className="text-black font-semibold">Next</p><IconArrowRight /></Button>;
  }
  return originalElement;
};

const columns: ColumnsType<MerchantDataType> = [
  {
    title: "Country",
    dataIndex: "countryName",
    key: "countryName",
    width: 170,
  },
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
    width: 170,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 170,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 260,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    width: 170,
  },
  {
    title: "Sign-Up Date",
    dataIndex: "createDate",
    key: "createDate",
    width: 200,
  },

  {
    title: "State",
    key: "status",
    dataIndex: "status",
    width: 150,
    render: (record) => (
      <>
        <Select
          defaultValue={record}
          style={{ width: 120 }}
          options={[
            { value: "active", label: "Active" },
            { value: "passive", label: "Passive" },
          ]}
          className="!h-9"
        />
      </>
    ),
  },
  {
    title: "Merchant Name",
    dataIndex: "merchantName",
    key: "merchantName",
    width: 150,
  },
  {
    title: "Next Payment Date",
    dataIndex: "nextPayDate",
    key: "nextPayDate",
    width: 170,
  },
  {
    title: "Expected Payment",
    dataIndex: "nextPayAmount",
    key: "nextPayAmount",
    width: 150,
  },
  {
    title: "Max Number of Branches",
    dataIndex: "branchCnt",
    key: "branchCnt",
    width: 200,
  },
  {
    title: "Max Scan",
    dataIndex: "maxScanCnt",
    key: "maxScanCnt",
    width: 150,
  },
  {
    title: "Latest Payment Date",
    dataIndex: "lastPayDate",
    key: "lastPayDate",
    width: 150,
  },
  {
    title: "Latest Payment",
    dataIndex: "lastPayAmount",
    key: "lastPayAmount",
    width: 150,
  },
  {
    title: "Action",
    key: "action",
    fixed: "right",
    width: 290,
    render: (record) => (
      <Space size="middle">
        <div className="flex gap-2">
          <EyeButton merchantId={record.id} />
          <PlusButton merchantId={record.id} />
          <EditButton />
          <Select
            defaultValue="Enable"
            style={{ width: 120 }}
            options={[
              { value: "enabled", label: "Enabled" },
              { value: "disabled", label: "Disabled" },
              { value: "unverified", label: "Unverified" },
              { value: "unpaid", label: "Unpaid" },
            ]}
            className="!h-9"
          />
        </div>
      </Space>
    ),
  },
];

function EyeButton({ merchantId }: { merchantId: number }) {
  const [getMerchantPaymentList, { isLoading }] =
    useGetMerchantPaymentListMutation();
  const merchantPaymentList: MerchantPaymentListResponse | null = useSelector(
    (state) => state.merchant.merchantPaymentList
  );

  const columns: ColumnsType<MerchantPaymentDataType> = [
    {
      title: "Payment Date",
      dataIndex: "payDate",
      key: "payDate",
      width: 170,
    },
    {
      title: "Next Payment Date",
      dataIndex: "nextPayDate",
      key: "nextPayDate",
      width: 170,
    },
    {
      title: "Payment Amount",
      dataIndex: "payAmount",
      key: "payAmount",
      width: 170,
    },
  ];
  const data: MerchantPaymentDataType[] = [
    {
      payDate: "2023.02.14",
      nextPayDate: "2023.03.14",
      payAmount: "12048",
    },
    {
      payDate: "2023.02.14",
      nextPayDate: "2023.03.14",
      payAmount: "12048",
    },
    {
      payDate: "2023.02.14",
      nextPayDate: "2023.03.14",
      payAmount: "12048",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    (async () => {
      await getMerchantPaymentList({
        pageNumber: 1,
        pageSize: 10,
      });
    })();
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
        <IconEye />
      </Button>
      <Modal
        // title="All Payment"
        width={1000}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        closeIcon={false}
      >
        <div>
          <div className="flex justify-between p-6 pb-4 border-b-2">
            <p className="text-xl font-medium ">All Payment</p>
            <Button className="!p-2" onClick={handleCancel}>
              <IconClose />
            </Button>
          </div>
          <div className="p-4">
            <Table
              columns={columns}
              dataSource={merchantPaymentList?.list}
              pagination={false}
              className="border border-gray-300 rounded-md border-b-0 rounded-b-none"
            />
            <div className="justify-between text-center py-4 border border-gray-300 rounded-b-md">
              <Pagination total={500} itemRender={itemRender} hideOnSinglePage={true} showSizeChanger={false} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
function PlusButton({ merchantId }: { merchantId: number }) {
  const [form] = Form.useForm();
  const [addMerchantPayment, { isLoading }] = useAddMerchantPaymentMutation();

  const onSubmit = async (data: AddPaymentProps) => {
    const submitData: AddPaymentProps = {
      merchantId,
      payAmount: data.payAmount,
      nextPayDate: dayjs(data.nextPayDate).format("YYYY-MM-DD"),
    };
    await addMerchantPayment(submitData);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
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
        <IconPlus />
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
            <p className="text-2xl font-medium">Add Payment</p>
            <Button className="!p-2" onClick={handleCancel}>
              <IconClose />
            </Button>
          </div>
          <div className="p-6">
            <Form form={form} layout="vertical" onFinish={onSubmit}>
              <p className="text-base font-medium">Payment Amount</p>
              <Form.Item
                name="payAmount"
                rules={[
                  { message: "This is a required field", required: true },
                ]}
              >
                <Input
                  type="text"
                  size="large"
                  placeholder="e.g $100"
                  className="w-full mt-2"
                />
              </Form.Item>

              <p className="text-base my-2 font-medium">Next Payment Date</p>
              <Form.Item
                name="nextPayDate"
                rules={[
                  { message: "This is a required field", required: true },
                ]}
              >
                <DatePicker
                  onChange={onChange}
                  className="w-full h-10 rounded-lg mb-4"
                />
              </Form.Item>

              <Button
                className="w-full !bg-[#171F30] !text-white !my-2 !h-11 !text-base !rounded-md !font-semibold "
                htmlType="submit"
                loading={isLoading}
              >
                Add Payment
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}
function EditButton() {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [getCountryList] = useGetCountryListMutation();
  const [getCurrencyList, { isLoading }] = useGetCurrencyListMutation();

  const countryList: CountryListResponse = useSelector(
    (state) => state.merchant.countryList
  );
  const currencyList: CurrencyListResponse = useSelector(
    (state) => state.merchant.currencyList
  );

  const [form] = Form.useForm();

  // useEffect(() => {
  //   (async () => {
  //     await getCountryList({});
  //     await getCurrencyList({});
  //   })();
  // }, []);

  const showModal = () => {
    (async () => {
      await getCountryList({});
      await getCurrencyList({});
    })();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (data: any) => {
    alert("here");
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
            <p className="text-2xl font-medium">Edit</p>
            <Button className="!p-2" onClick={handleCancel}>
              <IconClose />
            </Button>
          </div>
          <div className="p-6">
            <Form form={form} onFinish={onSubmit}>
              <p className="text-base font-medium mb-2">Country</p>
              <Form.Item
                name="country"
                rules={[
                  { message: "This is a required field.", required: true },
                ]}
              >
                <Select
                  options={countryList.map((item: any) => {
                    return { value: item.countryName };
                  })}
                  className="!h-10 w-full"
                />
              </Form.Item>

              <p className="text-base font-medium my-2">Currency</p>
              <Form.Item
                name="currency"
                rules={[
                  { message: "This is a required field.", required: true },
                ]}
              >
                <Select
                  options={currencyList.map((item: any) => {
                    return { value: item.code + " " + item.symbol };
                  })}
                  className="!h-10 w-full mb-6"
                />
              </Form.Item>

              <Button className="w-full !bg-[#171F30] !text-white !my-2 !h-11 !text-base !font-semibold !rounded-md">
                Save Changes
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default function Merchant() {
  const [open, setOpen] = useState(false);
  const [getMerchantData] = useGetMerchantDataMutation();
  const merchant: MerchantResponse | null = useSelector(
    (state) => state.merchant.merchant
  );
  useEffect(() => {
    (async () => {
      await getMerchantData({
        pageNumber: 1,
        pageSize: 10,
      });
    })();
  }, []);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
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
          <p className="text-2xl font-medium">List of Merchants</p>
          <p className="text-sm">{merchant?.totalCnt} Total merchants</p>
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
                  <p className="text-base font-medium">Country</p>
                  <Input
                    type="text"
                    size="large"
                    placeholder="Search country"
                    className="w-full !my-2"
                  />
                  <p className="text-base font-medium">Currency</p>
                  <Input
                    type="text"
                    size="large"
                    placeholder="Search currency"
                    className="w-full !my-2"
                  />
                  <p className="text-base font-medium">Merchant Name</p>
                  <Input
                    type="text"
                    size="large"
                    placeholder="Search merchant name"
                    className="w-full !my-2"
                  />
                  <p className="text-base font-medium mb-2">Status</p>
                  <Select
                    placeholder="Select merchants status"
                    options={[
                      { value: "active", label: "Active" },
                      { value: "inactive", label: "Inactive" },
                      { value: "paid", label: "Paid" },
                      { value: "unpaid", label: "Unpaid" },
                    ]}
                    className="!h-10 w-full"
                  />
                </div>
              </div>
              <div className="grid gap-2 grid-cols-2 px-6 mb-8">
                <Button className="!!w-full bg-white !text-black !my-4 !h-11 !text-base !rounded-lg !font-medium">
                  Clear
                </Button>
                <Button className="w-full !bg-[#171F30] !text-white !my-4 !h-11 !text-base !rounded-lg !font-medium ">
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
          dataSource={merchant?.list}
          size="small"
          rowSelection={rowSelection}
          scroll={{ x: 1500 }}
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
