import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { fetchUsers } from "./redux/userSlice";
import { AppDispatch } from "./store";
import type { ColumnsType } from 'antd/es/table';
import {  Table } from 'antd';
import { Avatar } from 'antd';

interface DataType {
  key: React.Key;
  fullname: string;
  username: number;
  avatar: string;
}
const columns: ColumnsType<DataType> = [
  {
    title: 'STT',
    dataIndex:'stt',
    render: (vaue:any,record:any,index:number) => {
      return (
      <div key={index}>{index+1}</div>
    )}
  },
  {
    title: 'Fullname',
    dataIndex: 'fullname',
    render: (value: any, record: any, index: number) => {
      return (
        <React.Fragment key={index}>
          <div>{`${record.name.title + '.' + record.name.first + record.name.last}`}</div>
        </React.Fragment>
      )
    }
  },
  {
    title: 'Username',
    dataIndex: 'username',
    render: (value: any, record: any, index: number) => {
      return (
        <>
          <div>{record.login.username}</div>
        </>
      )
    }
  },
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    render: (value: any, record: any, index: number) => {
      return (
        <React.Fragment key={index}>
          <Avatar src={record.picture.thumbnail} />
        </React.Fragment>
      )
    }
  },
];
function App() {
  const user = useSelector((state: any) => state.user.user?.results);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsers(1));
  }, [dispatch]);

  
  return (
    <div className="App">
      <h1>User</h1>
     
        <Table 
          columns={columns} 
          dataSource={user}
          pagination= {{
            pageSize:10,
            total:100,
            onChange: (page) => {
              dispatch(fetchUsers(page))
            }
          }} 
        />
    </div>
  );
}

export default App;
