// --- JavaScript xử lý mở/đóng ---
const loginOverlay = document.getElementById('loginOverlay');
const registerOverlay = document.getElementById('registerOverlay');
const openLogin = document.getElementById('openLogin');
const openRegister = document.getElementById('openRegister');
const closeLogin = document.getElementById('closeLogin');
const closeRegister = document.getElementById('closeRegister');
const toRegister = document.getElementById('toRegister');
const toLogin = document.getElementById('toLogin');

openLogin.onclick = () => {
  loginOverlay.classList.remove('hidden');
};

openRegister.onclick = () => {
  registerOverlay.classList.remove('hidden');
};

closeLogin.onclick = () => {
  loginOverlay.classList.add('hidden');
};

closeRegister.onclick = () => {
  registerOverlay.classList.add('hidden');
};

toRegister.onclick = (e) => {
  e.preventDefault();
  loginOverlay.classList.add('hidden');
  registerOverlay.classList.remove('hidden');
};

toLogin.onclick = (e) => {
  e.preventDefault();
  registerOverlay.classList.add('hidden');
  loginOverlay.classList.remove('hidden');
};

window.onclick = (e) => {
  if (e.target === loginOverlay) loginOverlay.classList.add('hidden');
  if (e.target === registerOverlay) registerOverlay.classList.add('hidden');
};
