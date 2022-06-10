import {
  PageHeader,
  Image,
  List,
  Skeleton,
  Button,
  Dropdown,
  Space,
  Menu,
  MenuProps,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import s from './List.module.css';
import { Area, areas } from './area';
import useHistoryState from '../../hooks/useHistoryState';
import { getHospList } from '../../api/hospitalApi';
import { FetchResult } from '../../interface';
import config from '../../config';

function CList() {
  const pageSize = 10;

  const location = useLocation();

  const nocache = location.pathname.includes('/nocache');

  const [area, setArea] = useHistoryState<Area>(areas[0], 'area', nocache);
  const [loading, setLoading] = useHistoryState(true, 'loading', nocache);
  const [pageNo, setPageNo] = useHistoryState<number>(1, 'pageNo', nocache);
  const [pageEnd, setPageEnd] = useHistoryState(false, 'pageEnd', nocache);
  const [actItem, setActItem] = useHistoryState<number>(-1, 'actItem', nocache);
  const [list, setList] = useHistoryState<FetchResult<typeof getHospList>>(
    [],
    'list',
    nocache
  );

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      if (list.length > 0 && list[list.length - 1].hasOwnProperty('hospitalId'))
        return;
    }

    setLoading(true);
    setList(list.concat(new Array(pageSize).fill({})));

    getHospList(pageNo, pageSize, area.key).then((items) => {
      setPageEnd(items.length < pageSize);
      setList(list.concat(items));
      setLoading(false);
    });
  }, [pageNo, area.key]);

  const onAreaMenuSelect: MenuProps['onClick'] = ({ key }) => {
    setList([]);
    setPageNo(1);
    setArea(areas.find((area) => area.key === key)!);
  };

  const onLoadMore = () => {
    if (!loading) setPageNo(pageNo + 1);
  };

  const onLinkMouseDown = (index: number) => {
    setActItem(index);
  };

  const LoadMore = pageEnd ? null : (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      {loading ? (
        <Button>加载中...</Button>
      ) : (
        <Button onClick={onLoadMore}>加载更多</Button>
      )}
    </div>
  );

  return (
    <div className={s.List}>
      <PageHeader
        title="列表"
        subTitle="List"
        onBack={() => window.history.back()}
        extra={
          <Dropdown
            overlay={<Menu items={areas} onClick={onAreaMenuSelect} />}
            trigger={['click']}
          >
            <Space style={{ padding: 4 }}>{area.label}</Space>
          </Dropdown>
        }
      />

      <List
        itemLayout="vertical"
        size="large"
        dataSource={list}
        loadMore={LoadMore}
        renderItem={(item, index) => (
          <Link
            to={`/${nocache ? 'nocache' : 'cache'}/detail?hospId=${
              item.hospitalId
            }`}
            onMouseDown={() => onLinkMouseDown(index)}
          >
            <List.Item
              style={{
                background: index === actItem ? '#f2f2f2' : '#fff',
              }}
              extra={
                <Image
                  width={100}
                  height={60}
                  preview={false}
                  placeholder={
                    <Image
                      src={`${config.IMAGE_SERVER}/z3W27810824?webp=80`}
                      width={100}
                      height={60}
                      style={{ objectFit: 'cover' }}
                    />
                  }
                  src={item.hospitalPhoto}
                />
              }
            >
              <Skeleton
                active
                title={true}
                paragraph={{
                  rows: 2,
                }}
                loading={loading && index >= pageSize * (pageNo - 1)}
              >
                <List.Item.Meta
                  title={item.hospitalName}
                  description={item.hospitalAddress}
                />
              </Skeleton>
            </List.Item>
          </Link>
        )}
      />
    </div>
  );
}

export default CList;
