"use client";

import React, { useState, useEffect } from "react";
import {
	ConfigProvider,
	Space,
	Table,
	Input,
	Button,
	Select,
	Modal,
	Radio,
	Typography,
	Pagination,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import type { ColumnsType } from "antd/es/table";
import type { RadioChangeEvent, PaginationProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { TranslateDataType } from "@/types";
import { LanguageDataType } from "@/types/language";
import IconPlus from "@/assets/whitePlus.svg";
import IconClose from "@/assets/closed.svg";
import IconEdit from "@/assets/edit.svg";
import IconTranslate from "@/assets/tans.svg";
import IconDelete from "@/assets/delete.svg";
import IconUpload from "@/assets/upload.svg";
import IconUploadBlack from "@/assets/upload_black.svg";
import IconExport from "@/assets/export.svg";
import IconExportGreen from "@/assets/export_green.svg";
import IconArrowLeft from "@/assets/arrowleft.svg";
import IconArrowRight from "@/assets/arrowright.svg";
import { useSelector } from "@/features/store";
import { useGetLanguageDataMutation } from "@/features/projects";

const { Text } = Typography;

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
	if (type === 'prev') {
		return <Button className="!flex items-center justify-center gap-2 !w-[115px]"><IconArrowLeft /><p className="text-black font-semibold">Previous</p></Button>;
	}
	if (type === 'next') {
		return <Button className="!flex items-center justify-center gap-2 !w-[115px]"><p className="text-black font-semibold">Next</p><IconArrowRight /></Button>;
	}
	return originalElement;
};

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
						<p className="text-2xl font-medium">Edit Language</p>
						<Button className="!p-2" onClick={handleCancel}>
							<IconClose />
						</Button>
					</div>
					<div className="p-6">
						<p className="text-base font-medium mb-2">Language</p>
						<Select
							placeholder="English(US)"
							options={[
								{ value: "us", label: "English" },
								{ value: "ge", label: "Destuch" },
							]}
							className="!h-10 w-full mb-4"
						/>

						<Button className="!w-full !bg-[#171F30] !text-white !my-2 !h-11 !text-base !rounded-md">
							Save Changes
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
}
function TranslateTable() {
	const [selectedKey, setSelectedKey] = useState<string | null>(null);

	const handleDivClick = (key: string) => {
		setSelectedKey((prevSelectedKey) => (prevSelectedKey === key ? null : key));
	};

	const columns: ColumnsType<TranslateDataType> = [
		{
			title: "Base Language Text",
			dataIndex: "base",
			key: "base",
			render: (render) => (
				<>
					<div className="w-[32vw]">
						<Text ellipsis={true}>{render}</Text>
					</div>
				</>
			),
		},
		{
			title: "Translated Text",
			dataIndex: "trans",
			key: "trans",
			render: (render: string, record: TranslateDataType) => (
				<>
					{" "}
					<div
						onClick={() => handleDivClick(record.key)}
						className={`p-2 rounded-lg w-[32vw] ${selectedKey === record.key ? "border border-black" : ""
							}`}
					>
						<Text
							ellipsis={true}
							className={`text-base border-b ${selectedKey === record.key ? "border-black" : "border-gray-100"
								}`}
						>
							{render}
						</Text>
						<p className="text-xs text-gray-400">Automatic translation</p>
					</div>
				</>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			width: 100,
			render: (render) => (
				<div className="px-2">
					{render && (
						<div className="bg-[#E6F9F0] text-center py-2 rounded-lg">
							<p className="text-[#01AF5B] font-semibold text-sm">Added</p>
						</div>
					)}
					{!render && (
						<div className="bg-[#FEEDED] text-center py-2 rounded-lg">
							<p className="text-[#AF0101] font-semibold text-sm">Pending</p>
						</div>
					)}
				</div>
			),
		},
	];
	const data: TranslateDataType[] = [
		{
			key: "1",
			base: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries",
			trans:
				"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries",
			status: true,
		},
		{
			key: "2",
			base: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries",
			trans:
				"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries",
			status: false,
		},
		{
			key: "3",
			base: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries",
			trans:
				"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries",
			status: true,
		},
		{
			key: "6",
			base: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries",
			trans:
				"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries",
			status: true,
		},
		{
			key: "4",
			base: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries",
			trans:
				"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries",
			status: true,
		},
		{
			key: "5",
			base: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries",
			trans:
				"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries",
			status: true,
		},
	];
	return (
		<div className="flex flex-col h-[calc(100%-8rem)] justify-between">
			<div className="bg-[#F7F7F7] px-8 pt-10 pb-2">
				<Table
					columns={columns}
					dataSource={data}
					size="small"
					pagination={false}
					className="border border-gray-300 rounded-md border-b-0 rounded-b-none"
				/>
				<div className="justify-between text-center py-4 border border-gray-300 rounded-b-md">
					<Pagination total={500} itemRender={itemRender} hideOnSinglePage={true} showSizeChanger={false} />
				</div>
			</div>
			<div className="px-6">
				<Button className="w-full !bg-[#171F30] !text-white !mt-4 !h-10 !text-base !rounded-md !font-semibold ">
					Save All Translation
				</Button>
			</div>
		</div>
	);
}
export default function Language() {
	const [isTranslate, setIsTranslate] = useState(false);
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const [getLanguageData] = useGetLanguageDataMutation();
	const language = useSelector((state) => state.language.language);

	useEffect(() => {
		(async () => {
			await getLanguageData({ pageNumber: 1, pageSize: 10 });
		})();
	}, []);
	const showUploadModal = () => {
		setIsUploadModalOpen(true);
	};

	const handleUploadOk = () => {
		setIsUploadModalOpen(false);
	};

	const handleUploadCancel = () => {
		setIsUploadModalOpen(false);
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

	const columns: ColumnsType<LanguageDataType> = [
		{
			title: "Country Name",
			dataIndex: "languageName",
			key: "languageName",
		},
		{
			title: "Text Direction",
			dataIndex: "textDirection",
			key: "textDirection",
		},
		{
			title: "Action",
			key: "action",
			fixed: "right",
			width: 190,
			render: () => (
				<Space size="middle">
					<div className="flex gap-2">
						<EditButton />
						<Button className="!p-2 !h-9" onClick={() => setIsTranslate(true)}>
							<IconTranslate />
						</Button>
						<Button className="!p-2 !h-9">
							<IconDelete />
						</Button>
					</div>
				</Space>
			),
		},
	];
	const [value, setValue] = useState(1);

	const onChange = (e: RadioChangeEvent) => {
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
			{!isTranslate && (
				<div>
					<div className="flex justify-between px-8 py-4 bg-white items-center">
						<div>
							<p className="text-2xl font-medium">List of Languages</p>
							<p className="text-sm">{language?.totalCnt} Total branches</p>
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
								className="!flex !w-[150px] !gap-2 !bg-[#171F30] !text-white !my-4 !h-10 !text-sm !rounded-lg !font-semibold !items-center"
							>
								<IconPlus /> Add Language
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
										<p className="text-2xl font-medium">Add New Language</p>
										<Button className="!p-2" onClick={handleCancel}>
											<IconClose />
										</Button>
									</div>
									<div className="p-6">
										<p className="text-base font-medium mt-2">Language</p>
										<Select
											placeholder="English(US)"
											options={[
												{ value: "us", label: "English" },
												{ value: "ge", label: "Destuch" },
											]}
											className="!h-10 w-full mt-2"
										/>
										<ConfigProvider
											theme={{
												token: {
													colorPrimary: "#171F30",
													colorPrimaryActive: "#171F30",
												},
											}}
										>
											<Radio.Group
												// onChange={}
												value={value}
												className="w-full mt-4"
											>
												<Space className="grid grid-cols-2">
													<Radio value={1}>Right to Left</Radio>
													<Radio value={2}>Left to Right</Radio>
												</Space>
											</Radio.Group>
										</ConfigProvider>
										<Button className="w-full !bg-[#171F30] !text-white !mt-4 !h-11 !text-base !rounded-md !font-semibold ">
											Add New Language
										</Button>
									</div>
								</div>
							</Modal>
						</div>
					</div>
					<div className="bg-[#F7F7F7] px-8 pt-10 pb-16 checkbox-round">
						<Table
							columns={columns}
							dataSource={language?.list}
							size="small"
							scroll={{ x: 800 }}
							rowSelection={rowSelection}
							pagination={false}
							className="border border-gray-300 rounded-md border-b-0 rounded-b-none"
						/>
						<div className="justify-between text-center py-4 border border-gray-300 rounded-b-md">
							<Pagination total={500} itemRender={itemRender} hideOnSinglePage={true} showSizeChanger={false} />
						</div>
					</div>
				</div>
			)}
			{isTranslate && (
				<div className="h-full">
					<div className="flex justify-between px-8 pt-8 pb-8 items-center">
						<p className="text-2xl font-medium">Edit Translation Page</p>
						<div className="flex gap-2">
							<Button
								onClick={showUploadModal}
								className="!flex !bg-[#171F30] !text-white !h-9 !text-sm !rounded-md !font-semibold !items-center gap-2"
							>
								<IconUpload />
								<p>Upload all</p>
							</Button>
							<Modal
								width={380}
								open={isUploadModalOpen}
								onOk={handleUploadOk}
								onCancel={handleUploadCancel}
								centered
								footer={false}
								closeIcon={false}
							>
								<div className="p-6 text-center">
									<Dragger className="group !bg-white">
										<div className="flex items-center justify-center py-2">
											<IconUploadBlack />
										</div>
										<p className="text-sm text-[#1A1A1A]">
											<span className="font-bold">Click to upload</span>&nbsp;
											<span>or drag and drop</span>
											<br />
											<span>
												Lorem ipsum is placeholder text commonly
												<br /> used in the graphic, print, and publishing
												<br /> industries.
											</span>
										</p>
									</Dragger>
									<Button className="w-full !text-[#171F30] !bg-white !mt-4 !h-[37px] !text-sm !rounded-md !font-semibold ">
										Cancel
									</Button>
								</div>
							</Modal>
							<Button
								onClick={showModal}
								className="!flex !h-9 !text-sm !rounded-md !font-semibold !items-center gap-2"
							>
								<IconExport />
								<p>Export</p>
							</Button>
							<Modal
								width={380}
								open={isModalOpen}
								onOk={handleOk}
								onCancel={handleCancel}
								centered
								footer={false}
								closeIcon={false}
							>
								<div className="p-6 text-center">
									<Button type="link">
										<IconExportGreen />
									</Button>
									<p className="text-2xl font-medium mt-2">
										Are you sure want to
									</p>
									<p className="text-2xl font-medium my-3">
										Export this Translations
									</p>
									<p className="text-base text-[#B3B3B3] mt-4">
										Lorem ipsum is placeholder text commonly <br /> used in the
										graphic, print, and publishing ind
									</p>
									<Button className="w-full !bg-[#171F30] !text-white !mt-4 !h-9 !text-sm !rounded-md !font-semibold ">
										Yeah, I want to export
									</Button>
									<Button
										onClick={handleCancel}
										className="w-full !text-[#171F30] !bg-white !mt-4 !h-9 !text-sm !rounded-md !font-semibold "
									>
										Cancel
									</Button>
								</div>
							</Modal>
							<Select
								defaultValue={"us"}
								options={[
									{ value: "us", label: "English" },
									{ value: "ge", label: "Destuch" },
								]}
								className="!h-9 !font-semibold !w-[105px]"
							/>
						</div>
					</div>
					<TranslateTable />
				</div>
			)}
		</>
	);
}
