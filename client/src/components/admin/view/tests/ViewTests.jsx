import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, DatePicker, Form, Select, Badge } from "antd";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const ViewTests = () => {
	const { RangePicker } = DatePicker;
	const [tests, settests] = useState([]);
	const [childTable, setchildTable] = useState([]);
	const [expandedRowKeys, setExpandedRowKeys] = useState([]);

	const lists = useSelector((s) => s.listReducer);
	const { classListLabels, subjectListLabels, teacherListLabels } = lists;

	const getTests = async () => {
		const { data, status } = await axios.post("/gettest");
		if (status === 201) {
			settests(data.tests);
		}
	};
	const columns = [
		"Date",
		"Details",
		"Teacher",
		"Class",
		"Subject",
		"Total Marks",
	].map((e) => ({
		title: e,
		dataIndex: e.replace(" ", "").toLocaleLowerCase(),
		key: e.toLocaleLowerCase(),
	}));
	const obj = tests.map((e, i) => {
		const date = new Date(e.date).toDateString();
		return {
			key: e._id,
			date: date,
			details: e.details,
			teacher: e.teacher,
			class: e.Class,
			subject: e.subject,
			totalmarks: e.totalMarks,
		};
	});

	const getTestsByChange = async (e) => {
		let payload = e;
		if (e.date) {
			const dates = e.date.map((e) => format(new Date(e.$d), "yyyy-MM-dd"));
			const datequery = { $gte: dates[0], $lte: dates[1] };
			payload = { ...e, date: datequery };
		}
		// console.log(payload);
		const { data, status } = await axios.post("/gettest", payload);
		if (status === 201) {
			settests(data.tests);
		}
	};

	// Nested Table
	const onExpand = async (expanded, record) => {
		const keys = [];
		if (expanded) {
			keys.push(record.key);
		}
		setExpandedRowKeys(keys);

		if (record) {
			setchildTable([]);
			const { data, status } = await axios.get(`/test/${record.key}`);
			if (status === 201) {
				const childData = await Promise.all(
					data.studentResults.map(async (e, i) => {
						const res = await axios.get(`/student?rollNumber=${e.rollNumber}`);
						const percentage = Math.trunc(
							(e.obtainedMarks / data.totalMarks) * 100
						);

						return {
							key: i,
							studentName: res.data.name,
							rollNumber: e.rollNumber,
							obtainedMarks: e.obtainedMarks,
							totalMarks: data.totalMarks,
							percentage: `${percentage}%`,
						};
					})
				);
				setchildTable(childData);
			}
		}
	};

	const expandedRowRender = () => {
		const columns = [
			{
				title: "Roll Number",
				dataIndex: "rollNumber",
				key: "rollNumber",
			},
			{
				title: "Student Name",
				key: "studentName",
				dataIndex: "studentName",
			},
			{
				title: "Total Marks",
				key: "totalMarks",
				dataIndex: "totalMarks",
			},
			{
				title: "Obtained Marks",
				dataIndex: "obtainedMarks",
				key: "obtainedMarks",
			},
			{
				title: "Percentage",
				dataIndex: "percentage",
				key: "percentage",
				render: (t) => {
					const display = Number(t.split("%")[0]);
					return display > 40 ? (
						<div className="font-bold  text-green-500">{t}</div>
					) : (
						<div className="font-bold text-red-500">{t}</div>
					);
				},
			},
			{
				title: "Pass/Fail",
				key: "passfail",
				render: (e) => {
					const display = Number(e.percentage.split("%")[0]);
					return display > 40 ? (
						<Badge
							style={{ fontWeight: "bold" }}
							status="success"
							text="Passed"
						/>
					) : (
						<Badge
							status="error"
							style={{ fontWeight: "bold" }}
							text="Failed"
						/>
					);
				},
			},
			//
		];

		return (
			<Table columns={columns} dataSource={childTable} pagination={false} />
		);
	};
	useEffect(() => {
		getTests();
	}, []);

	return (
		<>
			<div className="flex w-full flex-col bg-stone-200">
				<div className="grid place-items-center p-5 text-4xl">Tests</div>
				<div>
					<Form onFinish={getTestsByChange}>
						<div className="flex space-x-6 justify-center flex-wrap items-center">
							<Form.Item name="subject">
								<Select
									showArrow="true"
									showSearch
									optionFilterProp="children"
									filterOption={(input, option) =>
										(option?.label ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									placeholder="Select Subject"
									allowClear
									options={subjectListLabels}
								/>
							</Form.Item>
							<Form.Item name="teacher">
								<Select
									showArrow="true"
									showSearch
									optionFilterProp="children"
									filterOption={(input, option) =>
										(option?.label ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									placeholder="Select Teacher"
									allowClear
									options={teacherListLabels}
								/>
							</Form.Item>
							<Form.Item name="Class">
								<Select
									showArrow="true"
									showSearch
									optionFilterProp="children"
									filterOption={(input, option) =>
										(option?.label ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									placeholder="Select Class"
									allowClear
									options={classListLabels}
								/>
							</Form.Item>
							<Form.Item name="date">
								<RangePicker />
							</Form.Item>
						</div>
						<div className="grid place-items-center">
							<Form.Item>
								<Button type="primary" htmlType="submit">
									Get Tests
								</Button>
							</Form.Item>
						</div>
					</Form>
				</div>
				<div className="p-5">
					<Table
						expandable={{
							expandedRowRender,
							onExpand,
							expandedRowKeys: expandedRowKeys,
						}}
						expandRowByClick
						columns={columns}
						dataSource={obj}
					/>
				</div>
			</div>
		</>
	);
};

export default ViewTests;
