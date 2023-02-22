import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiAxios from "../../utils/apiAxios";

export default function Login({ phone }: { phone: string }) {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [password, setPassword] = useState("");
  const [test, setTest] = useState(phone);

  const WEBSITE_SIGNATURE = process.env.WEBSITE_SIGNATURE as string;

  // Toast stuff
  const toastError = (message: string) =>
    toast.error(message ? `Error: ${message}` : "Unknown error occurred");

  async function signin() {
    // Check if valid phone number in system
    try {
      await apiAxios.get(`/customer/check-valid-number/${phoneNumber}`);

      const loginData = await apiAxios.post(
        "/auth/login",
        {
          phone: phoneNumber,
          password: password,
        },
        {
          headers: {
            Authorization:
              "Bearer " +
              Buffer.from(WEBSITE_SIGNATURE, "utf-8").toString("base64"),
          },
        }
      );

      // Expires in a day, which also checks out with the validity of the JWT server-side
      Cookies.set("fitscript_access_token", loginData.data.token, {
        expires: 1,
      });
      router.push(`/dashboard/${phoneNumber}`);
    } catch (error: any) {
      toastError(error?.response?.data?.message);
    }
  }

  return (
    <div className="flex flex-col gap-10 text-black mt-20 text-xl items-center">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h1>Login</h1>
      {test}
      <input
        value={phoneNumber}
        className="bg-gray-100 w-1/3"
        onChange={(e) => setPhoneNumber(e.target.value)}
      ></input>
      <input
        value={password}
        className="bg-gray-100 w-1/3"
        onChange={(e) => setPassword(e.target.value)}
      ></input>

      <button
        className="px-6 py-3 bg-green-300 rounded-full text-3xl"
        onClick={signin}
      >
        Log In
      </button>
    </div>
  );
}

// A specific login page will be /dashboard/login/?phone=1234567890. Generic will just be login
export async function getServerSideProps(context: any) {
  let phone = context.query.phone;

  if (phone && phone.startsWith(" ")) phone = "+" + phone.trim();
  phone = phone ? phone : "";

  const cookies = context.req.cookies;
  const accessToken = cookies["fitscript_access_token"];

  // Check if access token is valid for this dashboard's phone # and is valid in general
  const isTokenValidData = await apiAxios
    .post("/auth/verify-token", {
      token: accessToken,
    })
    .then((res) => res.data)
    .catch((error) => error.response.data);

  if (isTokenValidData.success && isTokenValidData.decodedPhone == phone) {
    return {
      redirect: {
        destination: `/dashboard/${phone}`,
        permanent: false,
      },
    };
  }

  // Fetch data from external API

  return { props: { phone } };
}
