// /*eslint-disable*/

export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

export const showALert = (type, msg) => {
  // بنشيل أي Alert قديم الأول
  //   hideAlert();

  const markup = `<div class="alert alert--${type}">${msg}</div>`;

  // التعديل هنا: استخدمنا insertAdjacentHTML
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);

  window.setTimeout(hideAlert, 5000);
};
