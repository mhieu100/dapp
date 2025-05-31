import React, { useEffect, useState, useRef } from 'react';
import { Card, Form, DatePicker, Radio, Select, Row, Col } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { callFetchCenter } from '../../../config/api.center';
import queryString from 'query-string';
import { message } from 'antd';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import dayjs from 'dayjs';

const { Group: RadioGroup } = Radio;

const Confirmation = ({ form }) => {
  const [displayCenter, setDisplayCenter] = useState([]);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapCenter, setMapCenter] = useState([16.047079, 108.206230]); // Default to Da Nang center

  useEffect(() => {
    fetchCenter();
  }, []);

  const fetchCenter = async () => {
    try {
      const query = queryString.stringify({
        page: 1,
        size: 100,
        sort: 'name,asc'
      });
      const res = await callFetchCenter(query);
      if (res && res.data) {
        // Transform data to include coordinates
        const centersWithCoords = res.data.result.map(center => ({
          ...center,
          // If center doesn't have coordinates, use default ones based on address
          latitude: center.latitude || getDefaultLatitude(center.address),
          longitude: center.longitude || getDefaultLongitude(center.address)
        }));
        setDisplayCenter(centersWithCoords);
      }
    } catch (error) {
      message.error('Không thể tải danh sách trung tâm. Vui lòng thử lại sau.');
    }
  };

  // Helper function to get default latitude based on address
  const getDefaultLatitude = (address) => {
    // You can enhance this with a more sophisticated address matching system
    if (address?.toLowerCase().includes('hải châu')) return 16.067627;
    if (address?.toLowerCase().includes('thanh khê')) return 16.064857;
    return 16.047079; // Default Da Nang center
  };

  // Helper function to get default longitude based on address
  const getDefaultLongitude = (address) => {
    if (address?.toLowerCase().includes('hải châu')) return 108.221146;
    if (address?.toLowerCase().includes('thanh khê')) return 108.213514;
    return 108.206230; // Default Da Nang center
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map if not already initialized
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(mapCenter, 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);
    }

    // Create clinic icon
    const clinicIcon = L.divIcon({
      html: '<i class="fas fa-hospital text-blue-600 text-2xl"></i>',
      iconSize: [24, 24],
      className: 'custom-div-icon'
    });

    // Clear existing markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    // Add markers for each center
    displayCenter.forEach((center) => {
      if (center.latitude && center.longitude) {
        const marker = L.marker([center.latitude, center.longitude], { icon: clinicIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <div class="text-sm">
              <strong>${center.name}</strong><br/>
              ${center.address || 'Địa chỉ chưa cập nhật'}<br/>
              <small>Số điện thoại: ${center.phoneNumber || 'Chưa cập nhật'}</small><br/>
              <small>Sức chứa: ${center.capacity || 'Chưa cập nhật'} người/ngày</small>
            </div>
          `)
          .on('click', () => {
            form.setFieldsValue({ centerId: center.centerId });
            form.setFieldValue('centerInfo', center);
            setMapCenter([center.latitude, center.longitude]);
          });

        // Open popup if this is the selected center
        const selectedCenterId = form.getFieldValue('centerId');
        if (selectedCenterId === center.centerId) {
          marker.openPopup();
        }
      }
    });

    // Update map view if center changes
    mapInstanceRef.current.setView(mapCenter, 14);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [displayCenter, mapCenter]);

  const handleCenterChange = (value) => {
    const selectedCenter = displayCenter.find(center => center.centerId === value);
    if (selectedCenter) {
      form.setFieldValue('centerInfo', selectedCenter);
      if (selectedCenter.latitude && selectedCenter.longitude) {
        setMapCenter([selectedCenter.latitude, selectedCenter.longitude]);
      }
    }
  };

  const timeSlots = [
    '08:00',
    '09:00',
    '10:00',
    '14:00',
    '15:00',
    '16:00'
  ];

  const disabledDate = (current) => {
    // Không cho chọn ngày quá khứ và ngày hôm nay
    const isPast = current && current < dayjs().startOf('day');
    // Không cho chọn thứ 7 (6) và Chủ nhật (0)
    const isWeekend = current && (current.day() === 0 || current.day() === 6);
    return isPast || isWeekend;
  };

 

  return (
    <Card title="Chọn thời gian và địa điểm" className="mb-8">
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label="Chọn ngày"
            name="date"
            rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
          >
            <DatePicker className="w-full" locale={locale} disabledDate={disabledDate} />
          </Form.Item>

          <Form.Item
            label="Chọn giờ"
            name="time"
            rules={[{ required: true, message: 'Vui lòng chọn giờ' }]}
          >
            <RadioGroup>
              <Row gutter={[8, 8]}>
                {timeSlots.map(time => (
                  <Col span={8} key={time}>
                    <Radio.Button value={time} className="w-full text-center">
                      {time}
                    </Radio.Button>
                  </Col>
                ))}
              </Row>
            </RadioGroup>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Chọn cơ sở tiêm chủng"
            name="centerId"
            rules={[{ required: true, message: 'Vui lòng chọn cơ sở tiêm chủng' }]}
          >
            <Select
              options={displayCenter.map(center => ({
                label: center.name,
                value: center.centerId
              }))}
              placeholder="Chọn cơ sở tiêm chủng"
              suffixIcon={<EnvironmentOutlined />}
              onChange={handleCenterChange}
            />
          </Form.Item>

          <div className="mt-4">
            <div 
              ref={mapRef} 
              className="h-48 w-full rounded-lg shadow-sm"
              style={{ zIndex: 1 }}
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default Confirmation; 