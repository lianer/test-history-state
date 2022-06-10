import { Button, PageHeader, Space } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import s from './Detail.module.css';

function Detail() {
  const nocache = useLocation().pathname.includes('/nocache');

  return (
    <div className="Detail">
      <PageHeader
        title="详情"
        subTitle="Detail"
        onBack={() => window.history.back()}
      />
      <Space style={{ padding: '24px' }} size="large">
        <Button
          type="primary"
          onClick={() => {
            window.history.back();
          }}
        >
          history.back()
        </Button>
        <Button>
          <Link to={`/${nocache ? 'nocache' : 'cache'}/list`}>
            Link to /{nocache ? 'nocache' : 'cache'}/list
          </Link>
        </Button>
      </Space>
    </div>
  );
}

export default Detail;
