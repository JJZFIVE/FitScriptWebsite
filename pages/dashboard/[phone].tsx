import { useState, useEffect } from "react";
import apiAxios from "../../utils/apiAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { DashboardData } from "../../types/dashboard";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Cookies from "js-cookie";

// TODO GET A JWT ACCESS TOKEN UPON SIGN IN WITH A LONG TIME.
// IF ERRORS, TOAST WILL TELL THEM. SERVER CHECKTOKEN WILL RETURN error.message
// ERROR TOAST + error.message WILL TELL THEM THEY'RE SIGNED OUT AND MUST LOG IN AGAIN

import getGreeting from "../../utils/getGreeting";

const tabs: { name: string; href: string; current: boolean }[] = [
  { name: "Fitness", href: "#", current: true },
  { name: "Billing", href: "#", current: false },
  { name: "Settings", href: "#", current: false },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard({
  dashboardData,
}: {
  dashboardData: DashboardData;
}) {
  const [greeting, setGreeting] = useState("");

  // Goal, frequency, and benchmark state values
  const [goal, setGoal] = useState(dashboardData.goal.value);
  const [frequency, setFrequency] = useState(dashboardData.goal.frequency);
  const [benchBM, setBenchBM] = useState(dashboardData.benchmarks.bench);
  const [squatBM, setSquatBM] = useState(dashboardData.benchmarks.squat);
  const [deadliftBM, setDeadliftBM] = useState(
    dashboardData.benchmarks.deadlift
  );

  // Updating info
  const [updatingGoal, setUpdatingGoal] = useState(false);
  const [updatingFrequency, setUpdatingFrequency] = useState(false);
  const [updatingBench, setUpdatingBench] = useState(false);
  const [updatingSquat, setUpdatingSquat] = useState(false);
  const [updatingDeadlift, setUpdatingDeadlift] = useState(false);

  // Stuff for benchmark mapping
  const availableBenchmarks = ["bench", "squat", "deadlift"];
  const availableBenchmarkData = {
    bench: {
      name: "Bench",
      updatingFunction: setUpdatingBench,
      updatingValue: updatingBench,
      value: benchBM,
      setValue: setBenchBM,
      completeUpdateFunction: updateBench,
    },
    squat: {
      name: "Squat",
      updatingFunction: setUpdatingSquat,
      updatingValue: updatingSquat,
      value: squatBM,
      setValue: setSquatBM,
      completeUpdateFunction: updateSquat,
    },
    deadlift: {
      name: "Deadlift",
      updatingFunction: setUpdatingDeadlift,
      updatingValue: updatingDeadlift,
      value: deadliftBM,
      setValue: setDeadliftBM,
      completeUpdateFunction: updateDeadlift,
    },
  };

  async function updateBench(newBench: number, callback: any) {
    await apiAxios
      .post(
        "/customer/update-benchmark",
        {
          benchmark: "bench",
          newValue: newBench,
          phone: dashboardData.customer.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("fitscript_access_token")}`,
          },
        }
      )
      .then((res) => callback(true, res.data.message))
      .catch((error) => {
        console.error(error);
        callback(false, error.response.data?.message);
      });
  }

  async function updateSquat(newSquat: number, callback: any) {
    await apiAxios
      .post(
        "/customer/update-benchmark",
        {
          benchmark: "squat",
          newValue: newSquat,
          phone: dashboardData.customer.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("fitscript_access_token")}`,
          },
        }
      )
      .then((res) => callback(true, res.data.message))
      .catch((error) => {
        console.error(error);
        callback(false, error.response.data?.message);
      });
  }

  async function updateDeadlift(newDeadlift: number, callback: any) {
    await apiAxios
      .post(
        "/customer/update-benchmark",
        {
          benchmark: "deadlift",
          newValue: newDeadlift,
          phone: dashboardData.customer.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("fitscript_access_token")}`,
          },
        }
      )
      .then((res) => callback(true, res.data.message))
      .catch((error) => {
        console.error(error);
        callback(false, error.response.data?.message);
      });
  }

  // MOVE TO UTILS
  async function updateGoal(newGoal: string, callback: any) {
    await apiAxios
      .put(
        "/customer/update-goal",
        {
          setting: "value",
          newValue: newGoal,
          phone: dashboardData.customer.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("fitscript_access_token")}`,
          },
        }
      )
      .then((res) => {
        callback(true, res.data.message);
      })
      .catch((error) => {
        callback(false, error.response?.data?.message);
      });
  }

  async function updateFrequency(newFrequency: string | null, callback: any) {
    await apiAxios
      .put(
        "/customer/update-goal",
        {
          setting: "frequency",
          newValue: newFrequency,
          phone: dashboardData.customer.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("fitscript_access_token")}`,
          },
        }
      )
      .then((res) => callback(true, res.data.message))
      .catch((error) => callback(false, error.response.data?.message));
  }

  // Toast stuff
  const toastSuccess = (message: string) => toast.success(message);
  const toastError = (message: string) =>
    toast.error(message ? `Error: ${message}` : "Unknown error occurred");

  // TODO: SIGN IN WITH PASSWORD
  useEffect(() => {
    // Set greeting on page reload
    setGreeting(getGreeting());
  }, []);

  return (
    <div className="relative isolate bg-white min-h-screen">
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
      {/* Icon in top left, "Navbar" */}
      <div className="absolute inset-x-0 top-0 z-10 py-3 mx-4 flex gap-4 text-gray-900 items-center">
        <Link href="/">
          <button onClick={() => {}}>
            <img src="/placeholder.png" alt="" height="50" width="50" />
          </button>
        </Link>
        <span className="text-2xl">FitScript</span>
      </div>

      {/* Content area */}
      <div className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
        <main className="flex-1">
          <div className="relative mx-auto max-w-4xl md:px-8 xl:px-0 pt-20 pb-16">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                {greeting} {dashboardData.customer.firstname}
              </h1>
              <button className="underline pt-2 text-gray-400 text-sm">
                Upgrade to FitScript Premium
              </button>
            </div>
            <div className="px-4 sm:px-6 md:px-0">
              <div className="py-6">
                {/* Tabs */}
                <div className="lg:hidden">
                  <label htmlFor="selected-tab" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="selected-tab"
                    name="selected-tab"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                    defaultValue={"Fitness"}
                    //  ^ This used to be tabs.find((tab) => tab.current).name. Was causing an error, but look into what it did
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                <div className="hidden lg:block">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                      {tabs.map((tab) => (
                        <a
                          key={tab.name}
                          href={tab.href}
                          className={classNames(
                            tab.current
                              ? "border-black text-black"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                          )}
                        >
                          {tab.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Goal */}
                <div className="mt-10 divide-y divide-gray-200">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-medium leading-6 text-gray-900">
                      Current Goal
                    </h3>
                    <p className="max-w-2xl text-sm text-gray-500">
                      This is what you&apos;re actively working towards.
                      FitScript will remember this and craft your workouts with
                      your goal in mind.
                    </p>
                  </div>
                  <div className="mt-6">
                    <dl className="divide-y divide-gray-200">
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="text-lg font-medium text-gray-900">
                          Goal
                        </dt>
                        <dd className="mt-1 flex gap-2 justify-between items-center text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                          {!updatingGoal ? (
                            <span className="max-w-sm break-all">{goal}</span>
                          ) : (
                            <textarea
                              className="w-80 break-all p-2 border-gray-400 border rounded-sm "
                              value={goal}
                              onChange={(e) => setGoal(e.target.value)}
                            />
                          )}

                          {!updatingGoal ? (
                            <span className="ml-4 flex-shrink-0">
                              <button
                                className="rounded-2xl px-2 py-1 text-sm bg-black font-medium text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                                onClick={() => setUpdatingGoal(true)}
                              >
                                Edit
                              </button>
                            </span>
                          ) : (
                            <span className="ml-4 flex items-center gap-3">
                              <button
                                className="rounded-full text-sm bg-white border-black border-2 font-medium text-black hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                                onClick={() => setUpdatingGoal(false)}
                              >
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                              <button
                                className="rounded-2xl px-2 py-1 text-sm bg-black font-medium text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                                onClick={() => {
                                  setUpdatingGoal(false);

                                  updateGoal(
                                    goal,
                                    (success: boolean, message: string) => {
                                      if (success) {
                                        toastSuccess(message);
                                      } else {
                                        toastError(message);
                                      }
                                    }
                                  );
                                }}
                              >
                                Confirm
                              </button>
                            </span>
                          )}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                        <dt className="text-lg font-medium text-gray-900">
                          Workout Frequency
                        </dt>
                        <dd className="mt-1 flex gap-2 justify-between items-center text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                          <span className="flex-grow">
                            <Checkboxes
                              frequency={frequency}
                              setFrequency={setFrequency}
                              updatingFrequency={updatingFrequency}
                            />
                          </span>

                          {/* Buttons / logic to update frequency */}
                          {!updatingFrequency ? (
                            <span className="ml-4 flex-shrink-0">
                              <button
                                className="rounded-2xl px-2 py-1 text-sm bg-black font-medium text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                                onClick={() => setUpdatingFrequency(true)}
                              >
                                Edit
                              </button>
                            </span>
                          ) : (
                            <span className="ml-4 flex items-center gap-3">
                              <button
                                className="rounded-full text-sm bg-white border-black border-2 font-medium text-black hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                                onClick={() => setUpdatingFrequency(false)}
                              >
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                              <button
                                className="rounded-2xl px-2 py-1 text-sm bg-black font-medium text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                                onClick={() => {
                                  setUpdatingFrequency(false);

                                  updateFrequency(
                                    frequency,
                                    (success: boolean, message: string) => {
                                      if (success) {
                                        toastSuccess(message);
                                      } else {
                                        toastError(message);
                                      }
                                    }
                                  );
                                }}
                              >
                                Confirm
                              </button>
                            </span>
                          )}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Benchmarks */}
                {/* TODO: ONLY THIS FOR PREMIUM USERS. GRAY THESE OUT IF NOT PREMIUM AND GIVE AN "UPGRADE BOX" */}
                <div className="mt-10 divide-y divide-gray-200">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-medium leading-6 text-gray-900">
                      Benchmarks
                    </h3>
                    <p className="max-w-2xl text-sm text-gray-500">
                      Record your current fitness level with these benchmarks.
                      We&apos;ll use these to track your progress and give you
                      personalized workouts with weights, reps, times, and
                      distances.
                    </p>
                  </div>

                  <div className="mt-6">
                    <dl className="divide-y divide-gray-200">
                      {/* TODO: Make this a .map() */}
                      {availableBenchmarks.map((name, idx) => (
                        <div
                          className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5"
                          key={idx}
                        >
                          <dt className="text-lg font-medium text-gray-900">
                            {
                              availableBenchmarkData[
                                name as keyof typeof availableBenchmarkData
                              ].name
                            }
                          </dt>
                          <dd className="mt-1 flex justify-between text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {!availableBenchmarkData[
                              name as keyof typeof availableBenchmarkData
                            ].updatingValue ? (
                              <span className="break-all max-w-xs">
                                {availableBenchmarkData[
                                  name as keyof typeof availableBenchmarkData
                                ].value
                                  ? availableBenchmarkData[
                                      name as keyof typeof availableBenchmarkData
                                    ].value + " lbs"
                                  : "(Not set)"}
                              </span>
                            ) : (
                              <input
                                className="w-40 break-all p-2 border-gray-400 border rounded-sm "
                                value={
                                  availableBenchmarkData[
                                    name as keyof typeof availableBenchmarkData
                                  ].value as
                                    | string
                                    | number
                                    | readonly string[]
                                    | undefined
                                }
                                onChange={(e) =>
                                  availableBenchmarkData[
                                    name as keyof typeof availableBenchmarkData
                                  ].setValue(parseFloat(e.target.value))
                                }
                              />
                            )}

                            {/* Button to update benchmark */}
                            {!availableBenchmarkData[
                              name as keyof typeof availableBenchmarkData
                            ].updatingValue ? (
                              <span className="ml-4 flex-shrink-0">
                                <button
                                  className="rounded-2xl px-2 py-1 text-sm bg-black font-medium text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                                  onClick={() =>
                                    availableBenchmarkData[
                                      name as keyof typeof availableBenchmarkData
                                    ].updatingFunction(true)
                                  }
                                >
                                  Edit
                                </button>
                              </span>
                            ) : (
                              <span className="ml-4 flex items-center gap-3">
                                <button
                                  className="rounded-full text-sm bg-white border-black border-2 font-medium text-black hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                                  onClick={() =>
                                    availableBenchmarkData[
                                      name as keyof typeof availableBenchmarkData
                                    ].updatingFunction(false)
                                  }
                                >
                                  <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </button>
                                <button
                                  className="rounded-2xl px-2 py-1 text-sm bg-black font-medium text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                                  onClick={() => {
                                    availableBenchmarkData[
                                      name as keyof typeof availableBenchmarkData
                                    ].updatingFunction(false);

                                    availableBenchmarkData[
                                      name as keyof typeof availableBenchmarkData
                                    ].completeUpdateFunction(
                                      availableBenchmarkData[
                                        name as keyof typeof availableBenchmarkData
                                      ].value as number,
                                      (success: boolean, message: string) => {
                                        if (success) {
                                          toastSuccess(message);
                                        } else {
                                          toastError(message);
                                        }
                                      }
                                    );
                                  }}
                                >
                                  Confirm
                                </button>
                              </span>
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Checkboxes
function Checkboxes({
  frequency,
  setFrequency,
  updatingFrequency,
}: {
  frequency: string | null;
  setFrequency: any;
  updatingFrequency: boolean;
}) {
  if (!frequency) return null;

  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  return (
    <fieldset className="gap-1 md:gap-5 flex">
      <legend className="sr-only">Frequency</legend>

      {days.map((day, idx) => (
        <div
          className="relative flex flex-col items-center justify-center px-1 "
          key={idx}
        >
          <div className="text-lg text-black pb-2">{day}</div>
          <div className="flex h-5 items-center">
            <input
              disabled={!updatingFrequency}
              type="checkbox"
              checked={frequency[idx] === "1"}
              className="h-6 w-6 rounded border-gray-300 text-black focus:ring-gray-500"
              onChange={() => {
                let copyFrequency = [...frequency];
                copyFrequency[idx] = frequency[idx] === "1" ? "0" : "1";

                setFrequency(copyFrequency.join(""));
              }}
            />
          </div>
        </div>
      ))}
    </fieldset>
  );
}

// This gets called on every request
export async function getServerSideProps(context: any) {
  const phone = context.params.phone;
  const cookies = context.req.cookies;

  const accessToken = cookies ? cookies["fitscript_access_token"] : null;

  // Check if access token is valid for this dashboard's phone # and is valid in general
  const isTokenValidData = await apiAxios
    .post("/auth/verify-token", {
      token: accessToken,
    })
    .then((res) => res.data)
    .catch((error) => error.response.data);

  if (!isTokenValidData.success || isTokenValidData.decodedPhone !== phone) {
    return {
      redirect: {
        destination: `/dashboard/login?phone=${phone}`,
        permanent: false,
      },
    };
  }

  // Fetch data from external API

  try {
    const dashboardData = await apiAxios
      .get(`/dashboard/data/${phone}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data);

    // Pass data to the page via props
    return { props: { dashboardData } };
  } catch (error) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
