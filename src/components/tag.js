import React from "react"
import {  Space, Tag } from 'antd';
export default function Tags({ text, onClick }) {
    return (
        // <button className="bg-gray-300 hover:bg-gray-400 text-gray-800  font-bold py-2 px-4 rounded-full mt-2 mr-2" onClick={onClick}>
        //     
        // </button>
        <Space size={[0, 8]} wrap>
      <Tag color="#2db7f5">#{text.split(' ').join('-')}</Tag>
    </Space>
    );
}