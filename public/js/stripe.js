import axios from 'axios';
import { showALert } from './alert';

/* eslint-disable*/
const { default: Stripe } = require('stripe');

const stripe = Stripe(
  'pk_test_51TmHRX7c9o387bGUw0QOIVVO0hf2WcnVMoY5GMJ8sRYWclGuceUG29zFDlTgGZeum7tax7pIKgsQMVNa4GbAYN9L00kv9tOiCB',
);

export const bookTour = async (tourId) => {
  try {
    // 1- get checkout session from api
    const session = await axios(
      // `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`,
      `/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);

    // 2- create checkout form + charge credit card
    window.open(session.data.session.url);
  } catch (err) {
    console.log(err);
    showALert('error', err);
  }
};
