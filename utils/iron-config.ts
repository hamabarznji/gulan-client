import Cookies from 'js-cookie';

export const ironOptions = {
    cookieName: "authToken",
    password: process.env.SECRET_KEY,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true: false,
        httpOnly: true,


      

  },
}

