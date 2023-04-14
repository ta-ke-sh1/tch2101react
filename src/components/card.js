import React from 'react'

export default function ThreadCard({ props }) {
  return (
    <>
      <a className="relative block p-8 overflow-hidden border bg-white border-slate-100 rounded-lg ml-6 mr-6" href>
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
        <div className="justify-between sm:flex">
          <div>
            <h5 className="text-xl font-bold text-slate-900">
              {props.title}
            </h5>
            {/* <p className="mt-1 text-xs font-medium text-slate-600">By Ana Doe</p> */}
          </div>
          <div className="flex-shrink-0 hidden ml-3 sm:block">
            <img className="object-cover w-16 h-16 rounded-lg shadow-sm" src="https://github.com/creativetimofficial/argon-design-system/blob/master/assets/img/faces/team-2.jpg?raw=true" alt="" />
          </div>
        </div>
        <div className="mt-3 sm:pr-8">
          <p className="text-sm text-slate-500">
            {props.paragraph}
          </p>
        </div>
        <dl className="flex mt-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-slate-600"> Opens until </dt>
            <dd className="text-xs text-slate-500">{props.date}</dd>
          </div>
          <div className="flex flex-col-reverse ml-3 sm:ml-6">
            <dt className="text-sm font-medium text-slate-600">Total Ideas</dt>
            <dd className="text-xs text-slate-500">{props.ideaCount}</dd>
          </div>
        </dl>
      </a>
    </>

  );
}