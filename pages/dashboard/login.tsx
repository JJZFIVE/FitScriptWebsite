import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Login({ phone }: { phone: string }) {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [password, setPassword] = useState("");

  const API_URL = process.env.API_URL as string;
  const WEBSITE_SIGNATURE = process.env.WEBSITE_SIGNATURE as string;

  async function signin() {
    await axios
      .post(
        `${API_URL}/auth/login`,
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
      )
      .then((res) => {
        Cookies.set("access_token", res.data.token, { expires: 1 }); // Expires in a day, which also checks out with the validity of the JWT server-side
        router.push(`/dashboard/${phoneNumber}`);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="flex flex-col gap-10 text-black mt-20 text-xl items-center">
      <h1>Login</h1>
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

      <button className="px-4 py-2 bg-red-500" onClick={signin}>
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

  // TODO If they already have a valid access token for this login page, automatically log them in
  // Right? ^

  return { props: { phone } };
}
