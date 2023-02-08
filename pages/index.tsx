import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phone, setPhone] = useState(""); // The actual phone #, with no formatting
  const [recaptchaSuccess, setRecaptchaSuccess] = useState(false); // The value of the recaptcha
  const [errorMsg, setErrorMsg] = useState(""); // The error message to display on toast
  const [allowSignup, setAllowSignup] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [showCheckIcon, setShowCheckIcon] = useState(false);

  const toastSuccess = (message: string) => toast.success(message);
  const toastError = (message: string) =>
    toast.error(
      errorMsg ? `Error signing up: ${message}` : "Error signing up!"
    );

  const RECAPTCHA_PUBLIC = process.env.RECAPTCHA_PUBLIC as string;
  const API_URL = process.env.API_URL as string;

  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();

    if (!allowSignup) {
      toastError(errorMsg);
      return;
    }

    // TODO: JWT
    // Successful signup
    await axios
      .post(`${API_URL}/signup`, {
        phone: phone,
        firstname: firstname,
      })
      .then((res) => toastSuccess(res.data.message))
      .catch((error) => toastError(error.response.data.message));
  }

  function handlePhoneChange(e: any) {
    // If e.target.value is not comprised only of numbers 0-9, do not allow
    // the change to be made.
    if (!e.target.value.match(/^[0-9+()]*$/)) {
      return;
    }

    // TODO: Make this easier to input

    setPhone(e.target.value);
  }

  async function validateRecaptcha(value: string | null): Promise<void> {
    if (!value) {
      return;
    }

    const validated = await axios
      .get(`/api/validateRecaptcha/${value}`)
      .then((res) => res.data);
    if (!validated.success) {
      console.error(validated.message);
    } else {
      setRecaptchaSuccess(true);
    }
  }

  useEffect(() => {
    if (phone.length !== 12) {
      setErrorMsg("Please enter a valid phone number");
      setAllowSignup(false);
      setShowCheckIcon(false);
      return;
    } else if (!phone.startsWith("+1")) {
      setErrorMsg("Phone # must start with +1");
      setAllowSignup(false);
      setShowCheckIcon(false);
      return;
    } else {
      setShowCheckIcon(true);
    }

    if (!recaptchaSuccess) {
      setErrorMsg("Please complete the reCAPTCHA");
      setAllowSignup(false);
      setShowCheckIcon(false);
      return;
    }

    setErrorMsg("");
    setAllowSignup(true);
  }, [recaptchaSuccess, phone]);

  return (
    <div className="relative isolate bg-gray-800 min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        />
      </svg>
      <div className="px-6 pt-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">FitScript</span>
              <img
                className="h-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-100"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-[#30CD5A]"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-2 sm:py-16 lg:flex lg:gap-x-10 lg:px-8 lg:py-4">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto lg:pt-20">
          <h1 className="mt-10 max-w-2xl text-4xl font-bold tracking-tight text-gray-100 sm:text-6xl">
            Your{" "}
            <span className="text-[#30CD5A]">Personal AI Fitness Trainer</span>,
            Right in Your Texts
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-300">
            <span className="text-[#30CD5A]">
              We&apos;re not another workout app.
            </span>{" "}
            FitScript is a personalized fitness trainer powered by AI that lives
            in your text messages. We&apos;ll help you reach your fitness goals
            with a personalized workout plan, nutrition advice, and more. All
            you have to do is text.
          </p>
          <div className="mt-10 flex flex-col gap-1 gap-x-6 text-white">
            <h3 className="text-3xl ">Sign Up with Phone #</h3>
            <p className="text-lg text-gray-500">
              (Only valid in the US and Canada. Include country code +1)
            </p>

            {/* Phone input */}
            <div className="w-80 flex justify-end items-center relative pt-1">
              <input
                className="relative py-4 w-full bg-[#30CD5A] rounded-full text-white text-xl placeholder:text-gray-300 border-2 border-gray-700 text-center focus:ring-black"
                placeholder="+1 (302) 740-9745"
                onChange={handlePhoneChange}
                value={phone}
              />
              {showCheckIcon && (
                <CheckIcon className="h-8 w-8 text-black absolute mr-5" />
              )}
            </div>

            {/* name input  */}
            <div className="w-80 flex justify-end items-center relative pt-1">
              <input
                className="relative py-4 w-full bg-[#30CD5A] rounded-full text-white text-xl placeholder:text-gray-300 border-2 border-gray-700 text-center focus:ring-black"
                placeholder="Firstname"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
              />
              {/* {showCheckIcon && (
                <CheckIcon className="h-8 w-8 text-black absolute mr-5" />
              )} */}
            </div>

            <ReCAPTCHA
              sitekey={RECAPTCHA_PUBLIC}
              onChange={validateRecaptcha}
            />

            <button
              className="px-4 py-2 bg-black rounded-full"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
          <svg
            viewBox="0 0 366 729"
            role="img"
            className="mx-auto w-[22.875rem] max-w-full drop-shadow-xl"
          >
            <title>App screenshot</title>
            <defs>
              <clipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
                <rect width={316} height={684} rx={36} />
              </clipPath>
            </defs>
            <path
              fill="#4B5563"
              d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
            />
            <path
              fill="#343E4E"
              d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
            />
            <foreignObject
              width={316}
              height={684}
              transform="translate(24 24)"
              clipPath="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)"
            >
              <img src="/hometexts.jpeg" alt="" draggable={false} />
            </foreignObject>
          </svg>
        </div>
      </div>
    </div>
  );
}
