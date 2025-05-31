import { useEffect, useState } from 'react';
import { CheckSquareOutlined } from '@ant-design/icons';
import { Col, Form, message, notification, Row } from 'antd';
import { FooterToolbar, ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { callFetchDoctor } from '../../config/api.user';
import { callUpdateAppointment } from '../../config/api.appointment';
import '../../styles/reset.scss';

dayjs.extend(customParseFormat);

const ModalAppointment = (props) => {
  const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;

  const [form] = Form.useForm();
  const [animation, setAnimation] = useState('open');
  const [listDoctor, setListDoctor] = useState([]);

  useEffect(() => {
    fetchDoctor();
  }, []); 

  const fetchDoctor = async () => {
    const res = await callFetchDoctor();
    if (res && res.data) {
      setListDoctor(res.data?.result);
    }
  };

  // Handle form submission
  const submitAppointment = async (valuesForm) => {
    const { walletAddress } = valuesForm;
    const res = await callUpdateAppointment(dataInit.appointmentId, walletAddress);

    if (res) {
      message.success('Appointment updated successfully');
      handleReset();
      reloadTable();
    } else {
      notification.error({
        message: 'An error occurred',
        description: res.message,
      });
    }
  };
  const handleReset = async () => {
    form.resetFields();
    setDataInit(null);

    setAnimation('close');
    await new Promise((resolve) => setTimeout(resolve, 400));
    setOpenModal(false);
    setAnimation('open');
  };

  return (
    <>
      {openModal && (
        <ModalForm
          title="Update Appointment"
          open={openModal}
          modalProps={{
            onCancel: () => {
              handleReset();
            },
            afterClose: () => handleReset(),
            destroyOnClose: true,
            footer: null,
            keyboard: false,
            maskClosable: false,
            className: `modal-company ${animation}`,
            rootClassName: `modal-company-root ${animation}`,
          }}
          scrollToFirstError
          preserve={false}
          form={form}
          onFinish={submitAppointment}
          initialValues={dataInit}
          submitter={{
            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
            submitButtonProps: {
              icon: <CheckSquareOutlined />,
            },
            searchConfig: {
              resetText: 'Cancel',
              submitText: <>Update</>,
            },
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText label="Vaccine Name" name="vaccineName" disabled />
            </Col>
            <Col span={12}>
              <ProFormText label="Patient Wallet" name="patientAddress" disabled />
            </Col>
            <Col span={12}>
              <ProFormText label="Appointment Date" name="date" disabled />
            </Col>
            <Col span={12}>
              <ProFormText label="Appointment Time" name="time" disabled />
            </Col>
           
            <Col span={12}>
              <ProFormSelect
                width="100%"
                name="walletAddress"
                label="Assign Doctor"
                placeholder="Select Doctor"
                options={listDoctor.map((doctor) => ({
                  label: doctor.fullname,
                  value: doctor.walletAddress,
                }))}
                rules={[
                  {
                    required: true,
                    message: 'Please select a doctor!',
                  },
                ]}
              />
            </Col>
          </Row>
        </ModalForm>
      )}
    </>
  );
};

export default ModalAppointment;