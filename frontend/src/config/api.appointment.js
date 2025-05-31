import axios from './axios-customize';

/**
 * Module Appointment
 */

export const callGetAppointment = (hash) => {
  return axios.get(`/appointments/${hash}`)
}



export const callAddAppointmentMetaMark = (
  vaccineId,
  centerId,
  date,
  time,
  price
) => {
  return axios.post('/appointments/meta-mark', {
    vaccineId,
    centerId,
    date,
    time,
    price
  });
};



export const callAllAppointment = (
) => {
  return axios.get('/appointments/all'
  );
};

export const callUpdateAppointment = (appointmentId, doctorAddress) => {
  return axios.put(`/appointments/${appointmentId}`,
    {
      doctorAddress
    });
};

export const callCancelAppointment = (appointmentId) => {
  return axios.put(`/appointments/${appointmentId}/cancel`);
};

export const callCompleteAppointment = (appointmentId) => {
  return axios.put(`/appointments/${appointmentId}/complete`);
};

export const callFetchAppointment = () => {
  return axios.get(`/appointments`)
};

export const callMySchedule = () => {
  return axios.get(`/appointments/my-schedule`);
};

export const callVerifyAppointment = (appointmentHash, paymentHash) => {
  return axios.post(`/appointments/verify`, {
    appointmentHash,
    paymentHash,
  });
};

export const callCreateAppointment = (data) => {
  return axios.post('/appointments', data);
};

export const callListAppointment = (params) => {
  return axios.get('/appointments', { params });
};

export const callConfirmAppointment = (id) => {
  return axios.patch(`/appointments/${id}/confirm`);
};

export const callBookAppointment = (id) => {
  return axios.post(`/appointments/${id}/book`);
};

export const callFinishAppointment = (id) => {
  return axios.post(`/appointments/${id}/finish`);
};

export const callRefundAppointment = (appointmentId) => {
  return axios.get(`/appointments/${appointmentId}/refund`);
};

export const callVerifyId = (id) => {
  return axios.get(`/appointments/${id}/verify`)
};