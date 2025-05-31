/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import queryString from 'query-string';
import { sfLike } from 'spring-filter-query-builder';
import { Badge, Button, Space, Tag, Typography } from 'antd';
import { CloseCircleOutlined, EditOutlined } from '@ant-design/icons';

import DataTable from '../../components/data-table';
import ModalAppointment from '../../components/modal/modal.appointment';
import { callFetchAppointment } from '../../config/api.appointment';

const { Text } = Typography;

const AppointmentPage = () => {
  const tableRef = useRef();

  const reloadTable = () => {
    tableRef?.current?.reload();
  };

  const [dataInit, setDataInit] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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
      title: 'Tên Vaccine',
      dataIndex: 'vaccineName',
      sorter: true,
    },
    {
      title: 'Địa chỉ bệnh nhân',
      dataIndex: 'patientAddress',
      render: (text) => (
        <Text copyable ellipsis style={{ maxWidth: 150 }}>
          {text}
        </Text>
      ),
    },
    {
      title: 'Địa chỉ bác sĩ',
      dataIndex: 'doctorAddress',
      render: (text) => {
        if (text === '0x0000000000000000000000000000000000000000') {
          return (
            <Tag icon={<CloseCircleOutlined />} color="error">
              Chưa phân công
            </Tag>
          );
        }
        return (
          <Text copyable ellipsis style={{ maxWidth: 150 }}>
            {text}
          </Text>
        );
      },
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      sorter: true,
    },
    {
      title: 'Giờ',
      dataIndex: 'time',
      sorter: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      sorter: true,
      render: (status) => {
        return <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>;
      },
    },
    {
      title: 'Thao tác',
      hideInSearch: true,
      width: 50,
      render: (_value, entity) => (
        entity.status === 0 ? (
          <Space>
            <EditOutlined
              style={{
                fontSize: 20,
                color: '#ffa500',
              }}
              onClick={() => {
                setOpenModal(true);
                setDataInit(entity);
              }}
            />
          </Space>
        ) : null
      ),
    },
  ];

  const buildQuery = (params, sort) => {
    const clone = { ...params };
    const q = {
      page: params.current,
      size: params.pageSize,
      filter: '',
    };

    if (clone.vaccineName) q.filter = `${sfLike('vaccineName', clone.vaccineName)}`;
    if (clone.centerName) {
      q.filter = clone.vaccineName
        ? q.filter + ' and ' + `${sfLike('centerName', clone.centerName)}`
        : `${sfLike('centerName', clone.centerName)}`;
    }

    if (!q.filter) delete q.filter;

    return queryString.stringify(q);
  };

  return (
    <>
      <DataTable
        actionRef={tableRef}
        headerTitle='Danh sách lịch hẹn'
        rowKey='appointId'
        columns={columns}
        request={async (params, sort, filter) => {
          const query = buildQuery(params, sort, filter);
          return callFetchAppointment(query);
        }}
        scroll={{ x: true }}
        pagination={{
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} lịch hẹn`,
        }}
        rowSelection={false}
      />
      <ModalAppointment
        openModal={openModal}
        setOpenModal={setOpenModal}
        reloadTable={reloadTable}
        dataInit={dataInit}
        setDataInit={setDataInit}
      />
    </>
  );
};

export default AppointmentPage;
