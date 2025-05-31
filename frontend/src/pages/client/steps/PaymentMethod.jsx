import React from 'react';
import { Card, Radio, Form, Input, Row, Col, DatePicker, Alert, message } from 'antd';
import {
  WalletOutlined,
  CopyOutlined
} from '@ant-design/icons';

const { Group: RadioGroup } = Radio;

const PaymentMethod = ({ selectedPayment, setSelectedPayment }) => {



  const paymentMethods = {
    crypto: [
      {
        icon: <WalletOutlined className="text-blue-600" />,
        title: 'MetaMask',
        description: 'Thanh toán bằng ETH qua ví MetaMask',
        value: 'metamask'
      }
    ]
  };

  const handlePaymentSelect = (value) => {
    setSelectedPayment(value);
  };

  return (
    <Card title="Chọn phương thức thanh toán" className="mb-8">
      <Form.Item name="payment" rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}>
        <div className="space-y-6">
          <div>
            <h4 className="text-md font-medium mb-3">Thanh toán tiền điện tử</h4>
            <RadioGroup className="w-full">
              <Row gutter={16}>
                {paymentMethods.crypto.map(method => (
                  <Col span={8} key={method.value}>
                    <Radio.Button
                      value={method.value}
                      className="w-full p-4 h-auto"
                      onClick={() => handlePaymentSelect(method.value)}
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                          {method.icon}
                        </div>
                        <div>
                          <h5 className="font-medium">{method.title}</h5>
                          <p className="text-xs text-gray-500">{method.description}</p>
                        </div>
                      </div>
                    </Radio.Button>
                  </Col>
                ))}
              </Row>
            </RadioGroup>
          </div>

          {selectedPayment?.includes('meta') && (
            <div className="mt-6 bg-gray-50 p-6 rounded-lg">
              <Alert
                message="Thanh toán tiền điện tử"
                description="Gửi chính xác số tiền đến địa chỉ ví dưới đây. Giao dịch sẽ được xác thực trên blockchain."
                type="info"
                showIcon
                className="mb-4"
              />
              <Form.Item label="Địa chỉ ví">
                <Input.Search
                  value="0x672DF7fDcf5dA93C30490C7d49bd6b5bF7B4D32C"
                  readOnly
                  enterButton={<CopyOutlined />}
                  onSearch={() => {
                    navigator.clipboard.writeText("0x672DF7fDcf5dA93C30490C7d49bd6b5bF7B4D32C");
                    message.success('Đã sao chép địa chỉ ví');
                  }}
                />
              </Form.Item>
            </div>
          )}
        </div>
      </Form.Item>
    </Card>
  );
};

export default PaymentMethod; 