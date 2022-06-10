import React from 'react';
import s from './Home.module.css';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Space } from 'antd';
import { PageHeader } from 'antd';
import config from '../../config';

function Home() {
  return (
    <div className="Home">
      <PageHeader title="首页" subTitle="Home" />
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <Row className={s.Entry}>
          <Col className={s.Item} span={24}>
            <Link to="/cache/list">
              <Image
                preview={false}
                width={80}
                src={`${config.IMAGE_SERVER}/iLO513248555?webp=80`}
              />
              <div>有缓存</div>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col className={s.Item} span={24}>
            <Link to="/nocache/list">
              <Image
                preview={false}
                width={80}
                src={`${config.IMAGE_SERVER}/iLO513248555?webp=80`}
              />
              <div>无缓存</div>
            </Link>
          </Col>
        </Row>
      </Space>
    </div>
  );
}

export default Home;
