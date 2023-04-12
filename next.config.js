/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    apiKey: "AIzaSyBH13OgiuKrxMwUNw-rk4kAPs1eJdD6dBQ",
    authDomain: "expenses-tracker-80b9f.firebaseapp.com",
    projectId: "expenses-tracker-80b9f",
    storageBucket: "expenses-tracker-80b9f.appspot.com",
    messagingSenderId: "576354877075",
    appId: "1:576354877075:web:37d9aa3e23118b73959766"
  }
}

module.exports = nextConfig
