// import axios from "axios";
// async function handleLogin(email, password) {
//   try {
//     const response = await axios.post('http://127.0.0.1:8000/api/login', {
//       email,
//       password,
//     });

//     const { access_token, user } = response.data;

//     localStorage.setItem('token', access_token);

//     console.log('Logged in user:', user);

//   } catch (error) {
//     console.error('Login failed:', error.response.data.message);
//   }
// }