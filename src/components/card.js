import React from "react";

export default function ThreadCard({ props }) {
  return (
    <>

      <div
        className="relative block p-8 overflow-hidden border bg-white border-slate-100 rounded-lg ml-6 mr-6 mt-8 mb-6"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
        <div className="justify-between sm:flex">
          <div>
            <h5 className="text-xl font-bold text-slate-900">{props.title}</h5>
            {/* <p className="mt-1 text-xs font-medium text-slate-600">By Ana Doe</p> */}
          </div>
        </div>
        <div className="mt-3 sm:pr-8">
          <p className="text-sm text-slate-500 text-left px">
            {props.paragraph}
          </p>
        </div>
        <dl className="flex mt-6">
          <div className="flex flex-col-reverse mr-5">
            <dd className="text-xs text-slate-500">{props.start_date}</dd>
            <dt className="text-sm font-medium text-slate-600">
              {" "}
              Posted Date{" "}
            </dt>
          </div>
          <div className="flex flex-col-reverse mr-5">
            <dd className="text-xs text-slate-500">{props.expired_date}</dd>
            <dt className="text-sm font-medium text-slate-600">
              {" "}
              Opens until{" "}
            </dt>
          </div>
          <div className="flex flex-col-reverse">
            <dd className="text-xs text-slate-500">{props.closed_date}</dd>
            <dt className="text-sm font-medium text-slate-600">
              {" "}
              Archived at{" "}
            </dt>
          </div>
        </dl>
      </div>
    </>
  );
}
