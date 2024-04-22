import React, { createContext, useEffect } from 'react'
import axios from 'axios'
import { server } from '../utlits/Variables'

const ApiContext = ({ children }) => {
  const header = {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  }

  const serndVerification = async (phone) => {
    const data = {
      phone: phone,
    }
    const res = await axios.post(`${server}whatsapp-send-verification/`, data, header)
    return res
  }

  const signUpSendVerification = async (username, phone, email, password) => {
    const res = await axios.post(`${server}signup-verification/`, {
      username: username,
      phone: phone,
      email: email,
      password: password
    })
    return res
  }

  const signUp = async (username, phone, email, password, verification) => {
    const res = await axios.post(`${server}signup/`, {
      username: username,
      phone: phone,
      email: email,
      password: password,
      verification: verification
    })
    return res
  }

  const loginFunction = async (phone, password) => {
    const res = await axios.post(`${server}login/`, {
      phone: phone,
      password: password
    })
    return res
  }

  const getUser = async () => {
    const res = await axios.get(`${server}user/`, header)
    return res
  }

  const checkProfile = async (token) => {
    const res = await axios.get(`${server}user/profile/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    return res
  }

  const createManagerProfile = async () => {
    const res = await axios.post(`${server}user/manager/profile/create/`, {}, header)
    return res
  }

  const createClientsProfile = async () => {
    const res = await axios.post(`${server}user/client/profile/create/`, {}, header)
    return res
  }


  const getCountries = async () => {
    const res = await axios.get(`${server}countries/`, header)
    return res
  }
  const getCities = async (country_id) => {
    const res = await axios.get(`${server}cities/${country_id}/`, header)
    return res
  }

  const getStates = async (city_id) => {
    const res = await axios.get(`${server}states/${city_id}/`, header)
    return res
  }


  const getCourts = async (name, country, city, state) => {
    const res = await axios.get(`${server}courts/?name=${name ?? ""}&country=${country ?? ""}&city=${city ?? ""}&state=${state ?? ""}`, header)
    return res
  }


  const getCourtDetail = async (court_id, details) => {
    const res = await axios.get(`${server}court/${court_id}/?details=${details ?? 'false'}`, header)
    return res
  }

  const getCourtImages = async (court_id) => {
    const res = await axios.get(`${server}images/${court_id}/`, header)
    return res
  }

  const getCourtVideo = async (court_id) => {
    const res = await axios.get(`${server}videos/${court_id}/`, header)
    return res
  }

  const getCourtTools = async (court_id) => {
    const res = await axios.get(`${server}tools/${court_id}/`, header)
    return res
  }

  const getCourtFeatures = async (court_id) => {
    const res = await axios.get(`${server}features/${court_id}/`, header)
    return res
  }



  const updateCourt = async (
    court_id,
    name,
    address,
    location_url,
    price_per_hour,
    open_from,
    open_to,
    close_from,
    close_to,
    is_active,
    has_ball,
    offer_price,
    offer_time_from,
    offer_time_to,
    event_price,
    event_time_from,
    event_time_to,
    country,
    city,
    state,
  ) => {
    const data = {
      "name": name,
      "address": address,
      "location_url": location_url,
      "price_per_hour": price_per_hour,
      "open_from": open_from,
      "open_to": open_to,
      "close_from": close_from,
      "close_to": close_to,
      "is_active": is_active,
      "has_ball": has_ball,
      "offer_price": offer_price,
      "offer_time_from": offer_time_from,
      "offer_time_to": offer_time_to,
      "event_price": event_price,
      "event_time_from": event_time_from,
      "event_time_to": event_time_to,
      "country": country,
      "city": city,
      "state": state,
    }
    const res = await axios.put(`${server}court/${court_id}/`, data, header)
    return res
  }

  const deleteCourt = async (court_id) => {
    const res = await axios.delete(`${server}court/${court_id}/`, header)
    return res
  }

  const deleteCourtImage = async (image_id) => {
    const res = await axios.delete(`${server}image/${image_id}/`, header)
    return res
  }

  const deleteCourtVideo = async (video_id) => {
    const res = await axios.delete(`${server}video/${video_id}/`, header)
    return res
  }

  const deleteCourtTool = async (tool_id) => {
    const res = await axios.delete(`${server}tool/${tool_id}/`, header)
    return res
  }

  const deleteCourtFeature = async (feature_id) => {
    const res = await axios.delete(`${server}feature/${feature_id}/`, header)
    return res
  }

  const updateCourtTool = async (tools) => {
    if (tools?.length > 0) {
      tools?.map(async t => {
        const data = new FormData()
        data.append('name', t.name)
        data.append('price', t.price)
        const res = await axios.put(`${server}tool/${t?.id}/`, data, header)
      })
    }
  }

  const updateCourtFeature = async (features) => {
    if (features?.length > 0) {
      features?.map(async t => {
        const data = new FormData()
        data.append('name', t.name)
        data.append('is_free', t.is_free)
        const res = await axios.put(`${server}feature/${t?.id}/`, data, header)
      })
    }
  }



  const createCourt = async (
    name,
    address,
    location_url,
    price_per_hour,
    open_from,
    open_to,
    close_from,
    close_to,
    is_active,
    has_ball,
    offer_price,
    offer_time_from,
    offer_time_to,
    event_price,
    event_time_from,
    event_time_to,
    country,
    city,
    state,
  ) => {

    const data = {
      "name": name,
      "address": address,
      "location_url": location_url,
      "price_per_hour": price_per_hour,
      "open_from": open_from,
      "open_to": open_to,
      "close_from": close_from,
      "close_to": close_to,
      "is_active": is_active,
      "has_ball": has_ball,
      "offer_price": offer_price,
      "offer_time_from": offer_time_from,
      "offer_time_to": offer_time_to,
      "event_price": event_price,
      "event_time_from": event_time_from,
      "event_time_to": event_time_to,
      "country": country,
      "city": city,
      "state": state,
    }

    const res = await axios.post(`${server}courts/`, data, header)
    return res

  }

  const createCourtImage = async (court_id, images) => {
    if (images?.length > 0) {
      const data = new FormData()

      data.append('court', court_id)
      images.forEach(image => data.append('image', image))

      const res = await axios.post(`${server}images/${court_id}/`, data, header)
      return res
    }
  }

  const createCourtVideo = async (court_id, videos) => {
    if (videos?.length > 0) {
      const data = new FormData()
      data.append('court', court_id)
      videos.forEach(video => {
        data.append('name', video.name)
        data.append('url', video.url)
      })

      const res = await axios.post(`${server}videos/${court_id}/`, data, header)
      return res
    }
  }

  const createCourtTool = async (court_id, tools) => {
    if (tools?.length > 0) {
      const data = new FormData()
      data.append('court', court_id)
      tools.forEach(tool => {
        data.append('name', tool.name)
        data.append('price', tool.price)
      })

      const res = await axios.post(`${server}tools/${court_id}/`, data, header)
      return res
    }
  }

  const createCourtFeature = async (court_id, features) => {
    if (features?.length > 0) {
      const data = new FormData()
      data.append('court', court_id)
      features.forEach(feature => {
        data.append('name', feature.name)
        data.append('is_free', feature.is_free)
      })

      const res = await axios.post(`${server}features/${court_id}/`, data, header)
      return res
    }
  }









  const getStaffs = async () => {
    const res = await axios.get(`${server}staffs/`, header)
    return res
  }

  const createStaffProfile = async (user, manager) => {
    const data = {
      user: user,
      manager: manager
    }
    const res = await axios.post(`${server}staffs/`, data, header)
    return res
  }

  const getStaff = async (staff_id) => {
    const res = await axios.get(`${server}staff/${staff_id}/`, header)
    return res
  }

  const updateStaffUser = async (staff_user_id, username, phone, email, verification) => {
    const data = {
      username: username,
      email: email,
      phone: phone,
      code: verification
    }
    const res = await axios.put(`${server}staff-user/${staff_user_id}/`, data, header)
    return res
  }

  const deleteStaff = async (staff_id) => {
    const res = await axios.delete(`${server}staff/${staff_id}/`, header)
    return res
  }



  const getCourtBooksDetails = async (court_id, date) => {
    const res = await axios.get(`${server}book/check/${court_id}/?date=${date}`, header)
    return res
  }



  const getSettings = async () => {
    const res = await axios.get(`${server}settings/`, header)
    return res
  }

  const updateSettings = async (bookingWarning, limitOfPayingInMinuts, limitOfCancelingInMinuts) => {
    if (!limitOfPayingInMinuts) limitOfPayingInMinuts = 0
    if (!limitOfCancelingInMinuts) limitOfCancelingInMinuts = 0
    const data = {
      booking_warning: bookingWarning,
      limit_of_paying_in_minuts: limitOfPayingInMinuts,
      limit_of_canceling_in_minuts: limitOfCancelingInMinuts
    }
    const res = await axios.put(`${server}settings/`, data, header)
    return res
  }




  const bookCourt = async (data) => {
    const res = await axios.post(`${server}books/`, data, header)
    return res
  }

  const getBooks = async (date_from, date_to, court, is_cancelled, is_paied, paied) => {
    const url = `${server}books/?`
    const params = {}

    if (date_from) {
      params.date_from = date_from
    }

    if (date_to) {
      params.date_to = date_to
    }

    if (court) {
      params.court = court
    }

    if (is_cancelled) {
      params.is_cancelled = is_cancelled
    }

    if (is_paied) {
      params.is_paied = is_paied
    }

    if (paied) {
      params.paied = paied
    }

    const res = await axios.get(url, { ...header, params })
    return res
  }

  const getBook = async (book_id, check_cancel) => {
    const res = await axios.get(`${server}book/${book_id}/?check_cancel=${check_cancel}`, header)
    return res
  }

  const updateBook = async (book_id, data) => {
    const res = await axios.put(`${server}book/${book_id}/`, data, header)
    return res
  }





  const pinnedTimes = async (book_id) => {
    const res = await axios.get(`${server}pinned-times/${book_id}/`, header)
    return res
  }

  const pinnedTimesUpdate = async (pinned_id, data) => {
    const res = await axios.put(`${server}pinned-time/${pinned_id}/`, data, header)
    return res
  }







  // academies

  const getAcademyTypes = async () => {
    const res = await axios.get(`${server}academy-types/`, header)
    return res
  }

  const createAcademy = async (data) => {
    const res = await axios.post(`${server}academies/`, data, header)
    return res
  }

  const updateAcademy = async (academy_id, data) => {
    const res = await axios.put(`${server}academy/${academy_id}/`, data, header)
    return res
  }

  const deleteAcademy = async (academy_id) => {
    const res = await axios.delete(`${server}academy/${academy_id}/`, header)
    return res
  }

  const getAcademies = async (name, type) => {
    const res = await axios.get(`${server}academies/?name=${name ?? ""}&type=${type ?? ""}`, header)
    return res
  }

  const getAcademy = async (id) => {
    const res = await axios.get(`${server}academy/${id}/`, header)
    return res
  }




  const createAcademyTime = async (data) => {
    const res = await axios.post(`${server}academy-times/`, data, header)
    return res
  }

  const getAcademyTimes = async (academy_id) => {
    const res = await axios.get(`${server}academy-times/?academy_id=${academy_id}`, header)
    return res
  }

  const getAcademyTime = async (time_id) => {
    const res = await axios.get(`${server}academy-time/${time_id}/`, header)
    return res
  }

  const updateAcademyTime = async (time_id, data) => {
    const res = await axios.put(`${server}academy-time/${time_id}/`, data, header)
    return res
  }

  const deleteAcademyTime = async (time_id, data) => {
    const res = await axios.delete(`${server}academy-time/${time_id}/`, header)
    return res
  }


  const getSubscribePlans = async (academy_id) => {
    const res = await axios.get(`${server}academy-subscribe-plans/?academy_id=${academy_id}`, header)
    return res
  }

  const createSubscribePlan = async (data) => {
    const res = await axios.post(`${server}academy-subscribe-plans/`, data, header)
    return res
  }

  const updateSubscribePlan = async (plan_id, data) => {
    const res = await axios.put(`${server}academy-subscribe-plan/${plan_id}/`, data, header)
    return res
  }

  const deleteSubscribePlan = async (plan_id) => {
    const res = await axios.delete(`${server}academy-subscribe-plan/${plan_id}/`, header)
    return res
  }




  const getAcademyTrainers = async (academy_id) => {
    const res = await axios.get(`${server}academy-trainers/?academy_id=${academy_id}`, header)
    return res
  }

  const createAcademyTrainer = async (data) => {
    const res = await axios.post(`${server}academy-trainers/`, data, header)
    return res
  }

  const updateAcademyTrainer = async (trainer_id, data) => {
    const res = await axios.put(`${server}academy-trainer/${trainer_id}/`, data, header)
    return res
  }

  const deleteAcademyTrainer = async (trainer_id) => {
    const res = await axios.delete(`${server}academy-trainer/${trainer_id}/`, header)
    return res
  }






  const getInvoices = async (created_at_start, created_at_end, only_courts, only_books, only_academies, start_date, end_date, book_id, academy_id, court_id, name, phone) => {
    const url = `${server}invoices/?created_at_start=${created_at_start ?? ""}&created_at_end=${created_at_end ?? ""}&only_courts=${only_courts ?? ""}&only_books=${only_books ?? ""}&only_academies=${only_academies ?? ""}&start_date=${start_date ?? ""}&end_date=${end_date ?? ""}&book_id=${book_id ?? ""}&court_id=${court_id ?? ""}&academy_id=${academy_id ?? ""}&name=${name ?? ""}&phone=${phone ?? ""}`
    const res = await axios.get(url, header)
    return res
  }

  const createInvoice = async (data) => {
    const res = await axios.post(`${server}invoices/`, data, header)
    return res
  }

  const updateInvoice = async (invoice_id, data) => {
    const res = await axios.put(`${server}invoice/${invoice_id}/`, data, header)
    return res
  }

  const deleteInvoice = async (invoice_id) => {
    const res = await axios.delete(`${server}invoice/${invoice_id}/`, header)
    return res
  }



  const check_auto_cancell = async () => {
    const res = await axios.get(`${server}books/auto-cancel/`, header)
    return res
  }

  useEffect(() => {
    localStorage.getItem('token') && check_auto_cancell()
  }, [])



  const createWhtieList = async (data) => {
    const res = await axios.post(`${server}white-lists/`, data, header)
    return res
  }

  const getWhtieLists = async () => {
    const res = await axios.get(`${server}white-lists/`, header)
    return res
  }

  const updateWhtieList = async (id, data) => {
    const res = await axios.put(`${server}white-list/${id}/`, data, header)
    return res
  }

  const deleteWhtieList = async (id) => {
    const res = await axios.delete(`${server}white-list/${id}/`, header)
    return res
  }

  return (
    <ApiContextProvider.Provider value={{

      // whitelst
      createWhtieList,
      getWhtieLists,
      updateWhtieList,
      deleteWhtieList,


      // invoices
      getInvoices,
      createInvoice,
      updateInvoice,
      deleteInvoice,

      // academies
      getAcademyTypes,


      getAcademyTrainers,
      createAcademyTrainer,
      updateAcademyTrainer,
      deleteAcademyTrainer,


      getAcademies,
      getAcademy,
      createAcademy,
      updateAcademy,
      deleteAcademy,

      getAcademyTimes,
      getAcademyTime,
      createAcademyTime,
      updateAcademyTime,
      deleteAcademyTime,

      getSubscribePlans,
      createSubscribePlan,
      updateSubscribePlan,
      deleteSubscribePlan,





      serndVerification,

      loginFunction,
      signUpSendVerification,
      signUp,

      getUser,
      checkProfile,
      createManagerProfile,
      createClientsProfile,


      getCountries,
      getCities,
      getStates,


      getCourts,

      getCourtDetail,
      getCourtImages,
      getCourtVideo,
      getCourtTools,
      getCourtFeatures,

      updateCourt,
      deleteCourt,
      deleteCourtImage,
      deleteCourtVideo,
      deleteCourtTool,
      deleteCourtFeature,
      updateCourtTool,
      updateCourtFeature,

      createCourt,
      createCourtImage,
      createCourtVideo,
      createCourtTool,
      createCourtFeature,


      // staffs
      getStaffs,
      createStaffProfile,
      getStaff,
      updateStaffUser,
      deleteStaff,

      getCourtBooksDetails,

      // settings
      getSettings,
      updateSettings,


      // book court
      bookCourt,
      getBooks,
      getBook,
      updateBook,

      pinnedTimes,
      pinnedTimesUpdate,


    }}>
      {children}
    </ApiContextProvider.Provider>
  )
}

export const ApiContextProvider = createContext()
export default ApiContext