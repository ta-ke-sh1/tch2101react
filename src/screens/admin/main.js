import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition, Disclosure } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import DashboardComponent from '../../components/chart';
import UserComponent from "./user";
import DepartmentComponent from "./department";
import IdeaComponent from "./idea";
import CategoryComponent from "./category";
import ThreadComponent from "./thread";
import { useAuth } from "../../hooks/useAuth.js";

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Threads", href: "/threads" },
  { name: "Sign out", href: "#" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



export default function AdminMain() {
  const auth = useAuth();

const navigation = auth.clearance > 3 ? [
  {
    index: 0,
    name: "User",
    href: "#",
    icon: UsersIcon,
    current: true,
    subnav: true,
  },

  { index: 1, name: "Department", icon: FolderIcon, current: true },
 
  {
    index: 2,
    name: "Event",
    href: "#",
    icon: ChartBarIcon,
    current: false,

  },
] :
[ { index: 0, name: "Dashboard", href: "#", icon: HomeIcon, current: true },
{
  index: 1,
  name: "Idea",
  href: "#",
  icon: CalendarIcon,
  current: true,
},
 
{
  index: 2,
  name: "Category",
  icon: InboxIcon,
  current: true
}, ];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [componentIndex, setIndex] = useState(2);
  
  const components = auth.clearance>3 ? {
    0: <UserComponent />,
    1: <DepartmentComponent />,
    2: <ThreadComponent />,
  }:{
    0: <DashboardComponent />,
    1: <IdeaComponent />,
    2: <CategoryComponent />,
  };
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://www.yourdesigner.vn/wp-content/uploads/2017/03/logo-1-1.png"
                      alt="tch2202 admin"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2" aria-label="Sidebar">
                      {navigation.map((item) =>
                        !item.subNavigations ? (
                          <div key={item.name}>
                            <a
                              href="{#}"
                              className={classNames(
                                item.current
                                  ? "bg-gray-100 text-gray-900"
                                  : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                "group flex w-full items-center rounded-md py-2 pl-2 text-sm font-medium"
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  item.current
                                    ? "text-gray-500"
                                    : "text-gray-400 group-hover:text-gray-500",
                                  "mr-3 h-6 w-6 flex-shrink-0"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </div>
                        ) : (
                          <Disclosure
                            as="div"
                            key={item.name}
                            className="space-y-1"
                          >
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-100 text-gray-900"
                                      : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                    "group flex w-full items-center rounded-md py-2 pl-2 pr-1 text-left text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  )}
                                >
                                  <item.icon
                                    className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                  <span className="flex-1">{item.name}</span>
                                  <svg
                                    className={classNames(
                                      open
                                        ? "rotate-90 text-gray-400"
                                        : "text-gray-300",
                                      "ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400"
                                    )}
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M6 6L14 10L6 14V6Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </Disclosure.Button>
                                <Disclosure.Panel className="space-y-1">
                                  {item.subNavigations.map((subItem) => (
                                    <Disclosure.Button
                                      key={subItem.name}
                                      as="a"
                                      href={subItem.href}
                                      className="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    >
                                      {subItem.name}
                                    </Disclosure.Button>
                                  ))}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        )
                      )}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                width={100}
                height={100}
                src={process.env.PUBLIC_URL + '/logo.png'}
                alt="TCH2202 admin"
              />
            </div>
            <div className="mt-5 flex flex-grow flex-col">
              <nav
                className="flex-1 space-y-1 bg-white px-2"
                aria-label="Sidebar"
              >
                {navigation.map((item) =>
                  !item.subNavigations ? (
                    <div key={item.name}>
                      <div
                        onClick={() => {
                          setIndex(item.index);
                        }}
                        className={classNames(
                          item.current
                            ? "bg-gray-100 text-gray-900"
                            : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex w-full items-center rounded-md py-2 pl-2 text-sm font-medium"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-3 h-6 w-6 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </div>
                    </div>
                  ) : (
                    <Disclosure as="div" key={item.name} className="space-y-1">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900"
                                : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group flex w-full items-center rounded-md py-2 pl-2 pr-1 text-left text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            )}
                          >
                            <item.icon
                              className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            <span className="flex-1">{item.name}</span>
                            <svg
                              className={classNames(
                                open
                                  ? "rotate-90 text-gray-400"
                                  : "text-gray-300",
                                "ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400"
                              )}
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                d="M6 6L14 10L6 14V6Z"
                                fill="currentColor"
                              />
                            </svg>
                          </Disclosure.Button>
                          <Disclosure.Panel className="space-y-1">
                            {item.subNavigations.map((subItem) => (
                              <Disclosure.Button
                                key={subItem.name}
                                as="a"
                                onClick={() => {
                                  setIndex(subItem.index);
                                }}
                                className="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              >
                                {subItem.name}
                              </Disclosure.Button>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
                )}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">
                <form className="flex w-full lg:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search-field"
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center lg:ml-6">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={process.env.PUBLIC_URL + '/logo.png'}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10 min-w-fit">
            <div className="px-4 sm:px-6 lg:px-8">
              {components[componentIndex]}
            </div>
          </main>

        </div>
      </div>
    </>
  );
}
