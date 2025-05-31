import { ConnectButton, Connector } from '@ant-design/web3';

import { useAccount } from 'wagmi';
import { callLogin } from '../../config/api.auth';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { setUserLoginInfo } from '../../redux/slice/accountSlide';
import { useEffect } from 'react';
import { EthereumCircleColorful } from '@ant-design/web3-icons';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      handleLogin();
    }
  }, [address]);

  const handleLogin = async () => {
    try {
      const res = await callLogin(address);
      if (res?.data) {
        dispatch(setUserLoginInfo(res.data?.user));
        message.success('Đăng nhập thành công!');
        navigate('/');
      } else {
        navigate('/register');
      }
    } catch (error) {
      message.error('Máy chủ không hoạt động!');
      console.log(error);
    }

  };

  return (
    <div class="min-h-screen flex items-center justify-center p-4">
      <div class="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden" >
        <div class="bg-blue-600 py-6 px-8 text-white" >
          <div class="flex items-center justify-center mb-2">
            <i class="fas fa-shield-virus text-3xl mr-3"></i>
            <h1 class="text-2xl font-bold">VaxChain</h1>
          </div>
          <p class="text-center text-blue-100">Secure Vaccine Tracking System</p>
        </div>

        <div class="p-8">
          <div class="flex items-center justify-center mb-6">
            <EthereumCircleColorful style={{ fontSize: '40px', marginRight: '8px' }} />
          </div>
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
            </div>

            <div class="mt-6">
              <Connector>
                <ConnectButton
                  className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >

                  Connect Wallet
                </ConnectButton>
              </Connector>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 px-8 py-4 border-t border-gray-200" alt="© 2025 VaxChain. All rights reserved.">
          <p class="text-xs text-gray-500 text-center">
            © 2025 VaxChain. All rights reserved. <i class="fas fa-link text-blue-500 ml-1"></i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
