import React, { memo, useState } from 'react';

export const AddressList = ({ list }) => {
  const [post, setPost] = useState('');
  const [detail, setDetail] = useState('');
  const [display, setDisplay] = useState(true);

  const displayAddr = addr => {
    setDisplay(false);
    setPost(addr.substring(0, 5) + ' ');
    setDetail(addr.substring(6, addr.length) + ' ');
  };

  const onChangePost = e => {
    setPost(e.target.value);
  };

  const onChangeDetail = e => {
    setDetail(e.target.value);
  };

  const renderAddr = () => {
    return post === '' ? null : (
      <div>
        <input value={post} onChange={onChangePost} />
        <input value={detail} onChange={onChangeDetail} />
      </div>
    );
  };

  const renderList = () => {
    return display ? list.map((d, i) => <li key={i}>{d.place_name}</li>) : null;
  };

  return (
    <>
      {/* {renderAddr()} */}
      {renderList()}
    </>
  );
};
