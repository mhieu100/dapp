import { useNavigate } from 'react-router-dom';
import { Button, message, theme } from 'antd';

import { callRegister } from '../../config/api.auth';
import { LoginForm, ProConfigProvider, ProFormText } from '@ant-design/pro-components';
import { MailOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
import { useAccount, useDisconnect } from 'wagmi';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { disconnect } = useDisconnect()
  const { token } = theme.useToken();
  const { address } = useAccount();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/';
    }
  }, []);
  const handleSubmit = async (values) => {
    const { fullname, email } = values;
    await callRegister(address, fullname, email);
    message.success('Đăng ký thành công');
    disconnect()
    navigate('/')
  };
  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          logo="https://github.githubassets.com/favicons/favicon.png"
          title="Vaccation"
          subTitle="First time access requires registration information"
          onFinish={handleSubmit}
          submitter={{
            searchConfig: {
              submitText: 'Sign up',
            },

          }}
        >
          <ProFormText
            name="address"
            fieldProps={{
              size: 'large',
              prefix: <WalletOutlined className="prefixIcon" style={{ marginRight: 10 }} />,
            }}
            placeholder={address}
            disabled
          />
          <ProFormText
            name="fullname"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className="prefixIcon" style={{ marginRight: 10 }} />,
            }}
            placeholder="Full name"
            rules={[
              {
                required: true,
                message: 'Please enter your full name!',
              },
            ]}
          />
          <ProFormText
            name="email"
            fieldProps={{
              size: 'large',
              prefix: <MailOutlined className="prefixIcon" style={{ marginRight: 10 }} />,
            }}
            placeholder="Email"
            rules={[
              {
                required: true,
                message: 'Please enter your email!',
              },
            ]}
          />

        </LoginForm>
      </div>
      <div className="text-center mt-4">
        <Button
          color="danger" variant="outlined"
          onClick={() => {
            disconnect();
            navigate('/');
          }}
        >
          Back to home
        </Button>

      </div>
    </ProConfigProvider>
  );
};

export default RegisterPage;
