import React, { useState, useEffect } from 'react';
import { Steps, Form, Button, message, theme, Tag, Card, Descriptions, Modal, Spin, Result } from 'antd';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ExperimentOutlined,
  MedicineBoxOutlined,
  BugOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  LoadingOutlined,
  CheckCircleFilled,
  WalletOutlined,
} from '@ant-design/icons';
import VaccineSelection from './steps/VaccineSelection';
import PaymentMethod from './steps/PaymentMethod';
import Confirmation from './steps/Confirmation';
import { callFetchVaccineById } from '../../config/api.vaccine';
import { callAddAppointmentMetaMark, callVerifyAppointment } from '../../config/api.appointment';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import Web3 from 'web3';

const PaymentStatusModal = ({ visible, status, onClose, ethAmount }) => {
  const getModalContent = () => {
    switch (status) {
      case 'preparing':
        return (
          <div className="text-center py-6">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
            <h3 className="mt-4 text-lg font-medium">Đang chuẩn bị giao dịch</h3>
            <p className="mt-2 text-gray-500">Vui lòng đợi trong giây lát...</p>
          </div>
        );
      case 'processing':
        return (
          <div className="text-center py-6">
            <WalletOutlined style={{ fontSize: 48, color: '#1890ff' }} />
            <h3 className="mt-4 text-lg font-medium">Xác nhận giao dịch</h3>
            <p className="mt-2 text-gray-500">Vui lòng xác nhận giao dịch trong ví MetaMask của bạn.</p>
            {ethAmount && (
              <p className="mt-2 text-blue-600 font-semibold">Số tiền: {ethAmount} ETH</p>
            )}
            <Spin className="mt-4" />
          </div>
        );
      case 'success-payment':
        return (
          <div className="text-center py-6">
            <CheckCircleFilled style={{ fontSize: 48, color: '#52c41a' }} />
            <h3 className="mt-4 text-lg font-medium">Thanh toán thành công!</h3>
            {ethAmount && (
              <p className="mt-2 text-blue-600">Đã thanh toán: {ethAmount} ETH</p>
            )}
            <p className="mt-2 text-gray-500">Đang xử lý đặt lịch...</p>
            <Spin className="mt-4" />
          </div>
        );
      case 'processing-booking':
        return (
          <div className="text-center py-6">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
            <h3 className="mt-4 text-lg font-medium">Đang xử lý đặt lịch</h3>
            <p className="mt-2 text-gray-500">Chúng tôi đang xác nhận lịch tiêm chủng của bạn...</p>
          </div>
        );
      case 'success':
        return (
          <Result
            status="success"
            title="Đặt lịch thành công!"
            subTitle="Bạn sẽ được chuyển hướng đến trang xác nhận..."
          />
        );
      case 'failed':
        return (
          <Result
            status="error"
            title="Thanh toán thất bại"
            subTitle="Giao dịch đã bị hủy hoặc gặp lỗi. Vui lòng thử lại sau."
            extra={[
              <Button type="primary" key="console" onClick={onClose}>
                Đóng
              </Button>,
            ]}
          />
        );
      case 'booking-failed':
        return (
          <Result
            status="warning"
            title="Thanh toán thành công, nhưng đặt lịch thất bại"
            subTitle="Vui lòng liên hệ với chúng tôi để được hỗ trợ."
            extra={[
              <Button type="primary" key="console" onClick={onClose}>
                Đóng
              </Button>,
            ]}
          />
        );
      case 'error':
        return (
          <Result
            status="error"
            title="Có lỗi xảy ra"
            subTitle="Hệ thống gặp sự cố. Vui lòng thử lại sau."
            extra={[
              <Button type="primary" key="console" onClick={onClose}>
                Đóng
              </Button>,
            ]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      open={visible}
      footer={null}
      closable={['failed', 'booking-failed', 'error'].includes(status)}
      maskClosable={false}
      onCancel={onClose}
      width={400}
    >
      {getModalContent()}
    </Modal>
  );
};

const BookingPage = () => {
  const user = useSelector((state) => state.account.user);
  const navigate = useNavigate();
  const location = useLocation();
  const web3Instance = new Web3(window.ethereum);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [bookingSummary, setBookingSummary] = useState({
    vaccine: null,
    date: null,
    time: null,
    center: null,
    payment: null
  });
  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    ageGroup: [],
    priceRange: []
  });
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentHash , setPaymentHash] = useState('');
  const [ethAmount, setEthAmount] = useState(null);

  useEffect(() => {
    const params = queryString.parse(location.search);
    if (params.vaccineId) {
      fetchVaccineById(params.vaccineId);
    }
  }, [location.search]);

  const fetchVaccineById = async (id) => {
    try {
      setLoading(true);
      const response = await callFetchVaccineById(id);
      setSelectedVaccine(response.data);
      setBookingSummary(prev => ({ ...prev, vaccine: response.data }));
      form.setFieldsValue({
        vaccine: id
      });
    } catch (error) {
      message.error('Không thể tải thông tin vaccine. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const getVaccineIcon = (type) => {
    switch (type) {
      case 'virus':
        return <ExperimentOutlined className="text-blue-600 text-xl" />;
      case 'bacteria':
        return <BugOutlined className="text-blue-600 text-xl" />;
      default:
        return <MedicineBoxOutlined className="text-blue-600 text-xl" />;
    }
  };

  const renderSelectedVaccineInfo = () => {
    if (!selectedVaccine) return null;

    // Calculate ETH equivalent
    const ethEquivalent = selectedVaccine.price / 10000;

  return (
      <Card className="mb-6 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-lg bg-blue-50 flex items-center justify-center">
            {getVaccineIcon(selectedVaccine.type)}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
                    <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedVaccine.name}</h3>
                <p className="text-gray-600">{selectedVaccine.description}</p>
              </div>
              <Tag color="green" icon={<CheckCircleOutlined />}>Đã chọn</Tag>
            </div>
            <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
              <Descriptions.Item label="Nhà sản xuất">{selectedVaccine.manufacturer}</Descriptions.Item>
              <Descriptions.Item label="Xuất xứ">{selectedVaccine.country}</Descriptions.Item>
              <Descriptions.Item label="Đối tượng">{selectedVaccine.target}</Descriptions.Item>
              <Descriptions.Item label="Liều lượng">{selectedVaccine.schedule}</Descriptions.Item>
              <Descriptions.Item label="Giá">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(selectedVaccine.price)}
                <br/>
                <small className="text-blue-500">({ethEquivalent} ETH)</small>
              </Descriptions.Item>
            </Descriptions>
          </div>
            </div>
      </Card>
    );
  };

  const renderSummary = () => {
    if (!bookingSummary.vaccine) return null;

    // Calculate ETH equivalent
    const ethEquivalent = bookingSummary.vaccine.price / 10000;

    return (
      <Card className="mb-4" size="small">
        <Descriptions title="Thông tin đặt lịch" column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
          <Descriptions.Item label="Vaccine">
            <Tag color="blue">{bookingSummary.vaccine.name}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Giá">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(bookingSummary.vaccine.price)}
            {' '}
          
            <Tag color="blue">{ethEquivalent} ETH</Tag>
          </Descriptions.Item>
          {bookingSummary.date && bookingSummary.time && (
            <Descriptions.Item label="Thời gian">
              <Tag icon={<CalendarOutlined />} color="green">
                {dayjs(bookingSummary.date).format('DD/MM/YYYY')} - {bookingSummary.time}
              </Tag>
            </Descriptions.Item>
          )}
          {bookingSummary.center && (
            <Descriptions.Item label="Cơ sở tiêm chủng">
              <Tag color="purple">{bookingSummary.center.name}</Tag>
            </Descriptions.Item>
          )}
          {bookingSummary.payment && (
            <Descriptions.Item label="Phương thức thanh toán">
              <Tag icon={<CreditCardOutlined />} color="orange">{bookingSummary.payment}</Tag>
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>
    );
  };

  const validateStep = async () => {
    try {
      const values = await form.validateFields();
      switch (current) {
        case 0: // Vaccine selection
          if (!values.vaccine && !selectedVaccine && !bookingSummary.vaccine) {
            message.warning('Vui lòng chọn vaccine');
            return false;
          }
          break;
        case 1: // Time and center selection
          if (!values.date || !values.time || !values.centerId) {
            message.error('Vui lòng chọn đầy đủ thông tin thời gian và cơ sở');
            return false;
          }
          // Update summary with time and center info
          const centerInfo = await form.getFieldValue('centerInfo');
          setBookingSummary(prev => ({
            ...prev,
            date: values.date,
            time: values.time,
            center: centerInfo
          }));
          break;
        case 2: // Payment method
          if (!selectedPayment) {
            message.error('Vui lòng chọn phương thức thanh toán');
            return false;
          }
          setBookingSummary(prev => ({
            ...prev,
            payment: selectedPayment
          }));
          break;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const next = async () => {
    const isValid = await validateStep();
    if (isValid) {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const sendETH = async () => {
    try {
      // Calculate ETH based on vaccine price (10000 VND = 1 ETH)
      const vaccinePrice = bookingSummary.vaccine.price;
      const ethAmount = vaccinePrice / 10000;
      const wallet = '0x672DF7fDcf5dA93C30490C7d49bd6b5bF7B4D32C';
      const amountInWei = web3Instance.utils.toWei(ethAmount.toString(), 'ether');

      // Display the conversion in console for verification
      console.log(`Converting ${vaccinePrice} VND to ${ethAmount} ETH at rate 10000:1`);

      const tx = {
        from: user.walletAddress,
        to: wallet,
        value: amountInWei,
        gas: 21000,
      };

      const receipt = await web3Instance.eth.sendTransaction(tx);
      return receipt.transactionHash;
    } catch (error) {
      console.error('Transaction failed:', error);
      return false;
    }
  };

  const handleFinish = async () => {
    try {
      setLoading(true);
      const isValid = await validateStep();
      if (!isValid) {
        setLoading(false);
        return;
      }

      const { date, time, center, vaccine } = bookingSummary;

      // Xử lý thanh toán metamask trước
      if (bookingSummary.payment === 'metamask') {
        // Calculate ETH amount
        const calculatedEthAmount = vaccine.price / 10000;
        setEthAmount(calculatedEthAmount);
        
        setPaymentStatus('preparing');
        message.loading({
          content: 'Đang chuẩn bị giao dịch...',
          key: 'paymentMessage',
          duration: 0
        });
        
        setTimeout(() => {
          message.loading({
            content: `Vui lòng xác nhận giao dịch ${calculatedEthAmount} ETH trong ví MetaMask của bạn...`,
            key: 'paymentMessage',
            duration: 0
          });
        }, 1500);
        
        try {
          setPaymentStatus('processing');
          const transactionSuccess = await sendETH();
          
          if (!transactionSuccess) {
            setPaymentStatus('failed');
            message.error({
              content: 'Thanh toán thất bại. Giao dịch bị từ chối hoặc gặp lỗi.',
              key: 'paymentMessage',
              duration: 3
            });
            setLoading(false);
            return;
          } else {
            setPaymentStatus('success-payment');
            message.loading({
              content: 'Thanh toán thành công! Đang xử lý đặt lịch...',
              key: 'paymentMessage',
              duration: 0
            });
            
            try {
              setPaymentStatus('processing-booking');
              const res = await callAddAppointmentMetaMark(
                vaccine.vaccineId,
                center.centerId,
                date,
                time,
                vaccine.price
              );
              
              if (res) {
                setPaymentStatus('success');
                message.success({
                  content: 'Đặt lịch thành công!',
                  key: 'paymentMessage',
                  duration: 2
                });

                if (res && transactionSuccess) {
                  await callVerifyAppointment(res, transactionSuccess);
                }
                setTimeout(() => {
                  navigate('/success?appointment_hash=' + res + '&payment_hash=' + transactionSuccess);
                }, 1000);
                return;
              } else {
                setPaymentStatus('booking-failed');
                message.error({
                  content: 'Thanh toán thành công nhưng đặt lịch thất bại. Vui lòng liên hệ hỗ trợ.',
                  key: 'paymentMessage',
                  duration: 5
                });
              }
            } catch (bookingError) {
              setPaymentStatus('booking-failed');
              message.error({
                content: 'Lỗi khi xử lý đặt lịch. Vui lòng liên hệ hỗ trợ.',
                key: 'paymentMessage',
                duration: 5
              });
              console.error('Booking error:', bookingError);
            }
          }
        } catch (txError) {
          setPaymentStatus('failed');
          message.error({
            content: 'Giao dịch thất bại: ' + (txError.message || 'Lỗi không xác định'),
            key: 'paymentMessage',
            duration: 5
          });
          console.error('Transaction error:', txError);
        }
      }
    } catch (error) {
      setPaymentStatus('error');
      console.error('Error:', error);
      message.error({
        content: 'Có lỗi xảy ra, vui lòng thử lại sau',
        key: 'paymentMessage',
        duration: 3
      });
    } finally {
      setLoading(false);
    }
  };
  const steps = [
    {
      title: 'Chọn vaccine',
      content: 'vaccine-selection',
    },
    {
      title: 'Thời gian tiêm chủng',
      content: 'confirmation',
    },
    {
      title: 'Phương thức thanh toán',
      content: 'payment-method',
    }
  ];

  const renderStepContent = (step) => {
    const commonProps = {
      form,
      currentPage,
      setCurrentPage,
      searchText,
      setSearchText,
      selectedFilters,
      setSelectedFilters
    };

    switch (step) {
      case 'vaccine-selection':
        return queryString.parse(location.search).vaccineId ? (
          renderSelectedVaccineInfo()
        ) : (
          <VaccineSelection 
            {...commonProps} 
            setBookingSummary={setBookingSummary}
          />
        );

      case 'confirmation':
        return <Confirmation {...commonProps} />;

      case 'payment-method':
        return (
          <PaymentMethod
            {...commonProps}
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Đặt lịch tiêm chủng</h1>
          <p className="mt-1 text-sm text-gray-500">Chọn vaccine, phương thức thanh toán và thời gian tiêm phù hợp</p>
        </div>

        {renderSummary()}

        <Steps current={current} items={steps.map((item) => ({ key: item.title, title: item.title }))} className="mb-8" />

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            payment: 'credit-card'
          }}
        >
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            {renderStepContent(steps[current].content)}
          </div>

          <div className="flex justify-between">
            {current > 0 && (
              <Button size="large" onClick={prev} disabled={loading}>
                Quay lại
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" size="large" onClick={next} disabled={loading}>
                Tiếp tục
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button 
                type="primary" 
                size="large" 
                onClick={handleFinish}
                loading={loading}
              >
                Hoàn tất đặt lịch
              </Button>
            )}
          </div>
        </Form>
      </div>
      
      <PaymentStatusModal 
        visible={!!paymentStatus} 
        status={paymentStatus} 
        ethAmount={ethAmount}
        onClose={() => setPaymentStatus('')} 
      />
    </div>
  );
};

export default BookingPage;