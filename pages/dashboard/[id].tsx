import { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import getGreeting from "../../utils/getGreeting";

const tabs = [
  { name: "Fitness", href: "#", current: true },
  { name: "Billing", href: "#", current: false },
  { name: "Settings", href: "#", current: false },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [firstname, setFirstname] = useState("Joe");
  const [errorMsg, setErrorMsg] = useState("");
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
    useState(true);
  const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] =
    useState(false);
  const [greeting, setGreeting] = useState("");

  const toastSuccess = (message: string) => toast.success(message);
  const toastError = (message: string) =>
    toast.error(
      errorMsg ? `Error signing up: ${message}` : "Error signing up!"
    );

  const API_URL = process.env.API_URL as string;
  const WEBSITE_SIGNATURE = process.env.WEBSITE_SIGNATURE as string; // Can be found in client side code, but a deterrant from anyone getting a token easily

  useEffect(() => {
    const answer = getGreeting();
    setGreeting(answer);
  }, []);

  return (
    <div className="relative isolate bg-gray-100 min-h-screen">
      {/* Icon in top left, "Navbar" */}
      <div className="absolute inset-x-0 top-0 z-10 py-3 mx-4 flex gap-4 text-gray-900 items-center">
        <button onClick={() => {}}>
          <img src="/placeholder.png" alt="" height="50" width="50" />
        </button>
        <span className="text-2xl">FitScript</span>
      </div>

      {/* Content area */}
      <div className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
        <main className="flex-1">
          <div className="relative mx-auto max-w-4xl md:px-8 xl:px-0 pt-20 pb-16">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                {greeting} {firstname}
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
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    defaultValue={tabs.find((tab) => tab.current).name}
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
                              ? "border-green-500 text-green-600"
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
                    <h3 className="text-xl font-medium leading-6 text-gray-900">
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
                        <dt className="text-sm font-medium text-gray-900">
                          Goal
                        </dt>
                        <dd className="mt-1 flex gap-2 justify-between items-center text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                          <span className="max-w-sm break-all">
                            Example goal: My goal is to lose weight and gain
                            muscle.
                            jsiofsefseofsefesjfseifisejfoisejoifhseoifhosehfosehofihsefhseohfoihseoifhspeoihfisehfishe
                          </span>
                          <span className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              className="rounded-md bg-white font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                              Update
                            </button>
                          </span>
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                        <dt className="text-sm font-medium text-gray-900">
                          Workout Frequency
                        </dt>
                        <dd className="mt-1 flex text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                          <span className="flex-grow">ADD DAY CHECKBOXES</span>
                          <span className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              className="rounded-md bg-white font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                              Update
                            </button>
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Benchmarks */}
                {/* TODO: ONLY THIS FOR PREMIUM USERS. GRAY THESE OUT IF NOT PREMIUM AND GIVE AN "UPGRADE BOX" */}
                <div className="mt-10 divide-y divide-gray-200">
                  <div className="space-y-1">
                    <h3 className="text-xl font-medium leading-6 text-gray-900">
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
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-900">
                          Bench Press
                        </dt>
                        <dd className="mt-1 flex text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                          <span className="flex-grow">185 lbs</span>
                          <span className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              className="rounded-md bg-white font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                              Update
                            </button>
                          </span>
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-900">
                          Bench Press
                        </dt>
                        <dd className="mt-1 flex text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                          <span className="flex-grow">185 lbs</span>
                          <span className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              className="rounded-md bg-white font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                              Update
                            </button>
                          </span>
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-900">
                          Back Squat
                        </dt>
                        <dd className="mt-1 flex text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                          <span className="flex-grow">225 lbs</span>
                          <span className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              className="rounded-md bg-white font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                              Update
                            </button>
                          </span>
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-900">
                          Standard Deadlift
                        </dt>
                        <dd className="mt-1 flex text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                          <span className="flex-grow">305 lbs</span>
                          <span className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              className="rounded-md bg-white font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                              Update
                            </button>
                          </span>
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-900">
                          1 Mile Run
                        </dt>
                        <dd className="mt-1 flex text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                          <span className="flex-grow">
                            7 minutes, 46 seconds
                          </span>
                          <span className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              className="rounded-md bg-white font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                              Update
                            </button>
                          </span>
                        </dd>
                      </div>
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
