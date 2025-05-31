/* eslint-disable no-undef */
import { useEffect, useRef, useState } from 'react';
import { Badge, Button, Popconfirm, Space, Tag, message, notification } from 'antd';
import { CheckSquareOutlined, CloseCircleOutlined } from '@ant-design/icons';

import DataTable from '../../components/data-table';
import { callCancelAppointment, callCompleteAppointment, callMySchedule } from '../../config/api.appointment';
import queryString from 'query-string';
import { sfLike } from 'spring-filter-query-builder';

const MySchedulePage = () => {
    const tableRef = useRef();

    const reloadTable = () => {
        tableRef?.current?.reload();
    };
    const [isFetching, setFetching] = useState(false);
    const [listSchedule, setListSchedule] = useState([]);



    const handleComplete = async (id) => {
        if (id) {
            const res = await callCompleteAppointment(id);
            if (res) {
                message.success('Hoàn thành lịch hẹn thành công');
                reloadTable();
            } else {
                notification.error({
                    message: res.error,
                    description: res.message,
                });
            }
        }
    };

    useEffect(() => {
        fetchMySchedule();
    }, []);

    const fetchMySchedule = async () => {
        setFetching(true);
        try {
            const res = await callMySchedule();
            if (res && res.data) {
                const formattedData = res.data.map(item => ({
                    ...item,
                }));
                setListSchedule(formattedData);
                return {
                    data: formattedData,
                    success: true,
                    total: formattedData.length
                };
            }
        } catch (error) {
            notification.error({
                message: 'Error fetching schedule',
                description: error.message
            });
        } finally {
            setFetching(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
          case 0:
            return 'orange';
          case 2:
            return 'green';
          case 3:
            return 'red';
          default:
            return 'default';
        }
      };

    const getStatusText = (status) => {
        switch (status) {
          case 0:
            return 'Chờ xác nhận';
          case 1:
            return 'Chờ tiêm';
          case 2:
            return 'Đã tiêm';
          default:
            return 'Đã hủy';
        }
      };

    const buildQuery = (params, sort) => {
        const clone = { ...params };
        const q = {
            page: params.current,
            size: params.pageSize,
            filter: '',
        };

        if (clone.name)
            q.filter = `${sfLike('name', clone.name)}`;
        if (clone.manufacturer) {
            q.filter = clone.name
                ? q.filter + ' and ' + `${sfLike('manufacturer', clone.manufacturer)}`
                : `${sfLike('manufacturer', clone.manufacturer)}`;
        }

        if (!q.filter) delete q.filter;

        let temp = queryString.stringify(q);

        let sortBy = '';
        if (sort && sort.name) {
            sortBy =
                sort.name === 'ascend'
                    ? 'sort=name,asc'
                    : 'sort=name,desc';
        }
        if (sort && sort.manufacturer) {
            sortBy =
                sort.manufacturer === 'ascend'
                    ? 'sort=manufacturer,asc'
                    : 'sort=manufacturer,desc';
        }

        if (sort && sort.price) {
            sortBy = sort.price === 'ascend' ? 'sort=price,asc' : 'sort=price,desc';
        }
        if (sort && sort.stockQuantity) {
            sortBy =
                sort.stockQuantity === 'ascend'
                    ? 'sort=stockQuantity,asc'
                    : 'sort=stockQuantity,desc';
        }
        temp = `${temp}&${sortBy}`;

        return temp;
    };

    const columns = [
        {
            title: 'STT',
            key: 'index',
            width: 50,
            align: 'center',
            render: (text, record, index) => index + 1,
            hideInSearch: true,
        },
        {
            title: 'Vaccine',
            dataIndex: 'vaccineName',
        },
        {
            title: 'Patient Address',
            dataIndex: 'patientAddress',
            ellipsis: true,
            width: 300,
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Time',
            dataIndex: 'time',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
              <Tag color={getStatusColor(status)}>
                {getStatusText(status)}
              </Tag>
            )
          },
        {
            title: 'Actions',
            hideInSearch: true,
            width: 100,
            render: (_value, entity) =>
                entity.status === 1 ? (
                    <Button type="link" size="small"  onClick={() => handleComplete(entity.appointmentId)}>
                    Xác nhận tiêm
                  </Button>
                   
                ) : null,
        },
    ];

    return (
        <>
            <DataTable
                actionRef={tableRef}
                headerTitle="Today's Doctor Appointment Schedule"
                rowKey="appointmentId"
                loading={isFetching}
                columns={columns}
                dataSource={listSchedule}
                request={fetchMySchedule}
                search={false}
                scroll={{ x: true }}
                pagination={{
                    showSizeChanger: true,
                    showTotal: (total) => `Total ${total} appointments`,
                }}
                rowSelection={false}
            />
        </>
    );
};

export default MySchedulePage;