// /*eslint-disable*/
// import axios from 'axios';
// export const login = async (email, password) => {
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: 'http://127.0.0.1:8000/api/v1/users/login',
//       data: {
//         email,
//         password,
//       },
//     });
//     console.log(res);
//     if (res.data.status === 'success') {
//       alert('logged in successfully');
//       window.setTimeout(() => {
//         location.assign('/');
//       }, 1000);
//     }
//   } catch (err) {
//     alert(err.response.data.message);
//   }
// };

// // document.querySelector('.form').addEventListener('submit', (e) => {
// //   e.preventDefault();
// //   const email = document.getElementById('email').value;
// //   const password = document.getElementById('password').value;
// //   login(email, password);
// // });

/*eslint-disable*/
import axios from 'axios';
import { showALert } from './alert';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    console.log(res);
    if (res.data.status === 'success') {
      showALert('success', 'logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showALert('error', err.response.data.message);
  }
};

// 1. امسك الـ Form الأول في متغير
const loginForm = document.querySelector('.form--login');

// 2. اعمل الـ Condition عشان تتأكد إن العنصر موجود في الـ DOM بتاع الصفحة الحالية
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/v1/users/logout',
    });

    if (res.data.status === 'success') location.reload(true);
  } catch (err) {
    console.log(err.response);
    showALert('error', 'error logging out try again!');
  }
};
