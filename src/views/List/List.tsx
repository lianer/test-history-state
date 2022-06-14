import {
  PageHeader,
  Image,
  List,
  Skeleton,
  Button,
  Dropdown,
  Menu,
  MenuProps,
  message,
} from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { Area, areas } from './area';
import useHistoryState from '../../hooks/useHistoryState';
import { getHospList, Item as HospItem } from '../../api/hospitalApi';
import config from '../../config';
import { useMount, useUpdateEffect } from 'ahooks';
import { useCallback, memo } from 'react';
import PQueue from 'p-queue';
import { DownOutlined } from '@ant-design/icons';
import historyState from '../../lib/historyState';
import ScrollRecorder from '../../components/ScrollRecorder';

const dummyHospItem = {
  hospitalId: '',
  hospitalPhoto: '',
  hospitalName: '',
  hospitalAddress: '',
};

const queue = new PQueue({ concurrency: 1 });

const HospPhoto: React.FC<{ item: HospItem }> = memo(({ item }) => {
  return (
    <Image
      width={96}
      height={96}
      style={{ objectFit: 'cover', border: '1px solid #eee' }}
      preview={false}
      fallback={`${config.IMAGE_SERVER}/z3W27810824?webp=10`}
      src={item.hospitalPhoto}
    />
  );
});

const SkeletonHosp: React.FC = memo(() => {
  return (
    <div style={{ display: 'flex', alignItems: 'start', padding: '16px 24px' }}>
      <Skeleton
        active
        title={true}
        style={{ flex: 1, paddingRight: 8 }}
        paragraph={{ rows: 2 }}
        loading={true}
      ></Skeleton>
      <Skeleton.Image style={{ width: 96, height: 96 }} />
    </div>
  );
});

const LoadMore: React.FC<{ loading: boolean; onLoadMore: () => void }> = memo(
  ({ loading, onLoadMore }) => {
    return (
      <div
        style={{
          textAlign: 'center',
          marginTop: '12px',
          height: '32px',
          lineHeight: '32px',
        }}
      >
        {loading ? <Button>加载中...</Button> : <Button onClick={onLoadMore}>加载更多</Button>}
      </div>
    );
  }
);

const MemoDropdown: React.FC<{
  areaLabel: string;
  onAreaMenuSelect: Required<MenuProps>['onClick'];
}> = memo(({ areaLabel, onAreaMenuSelect }) => {
  return (
    <Dropdown
      arrow={true}
      placement="bottom"
      overlay={
        <Menu
          style={{ width: 100, textAlign: 'center' }}
          items={areas}
          onClick={onAreaMenuSelect}
        />
      }
      trigger={['click']}
    >
      <Button type="text" style={{ cursor: 'pointer' }}>
        {areaLabel}
        <DownOutlined style={{ fontSize: 12 }} />
      </Button>
    </Dropdown>
  );
});

const CList: React.FC = () => {
  const pageSize = 10;
  const location = useLocation();
  const nocache = location.pathname.includes('/nocache');

  const [area, setArea] = useHistoryState<Area>(areas[0], 'area', nocache);
  const [loading, setLoading] = useHistoryState(true, 'loading', nocache);
  const [pageNo, setPageNo] = useHistoryState<number>(1, 'pageNo', nocache);
  const [pageEnd, setPageEnd] = useHistoryState(false, 'pageEnd', nocache);
  const [actItem, setActItem] = useHistoryState<number>(-1, 'actItem', nocache);
  const [list, setList] = useHistoryState<HospItem[]>([], 'list', nocache);

  const fetchData = async () => {
    queue.clear();

    if (queue.size === 0) setLoading(true);
    setList(list.concat(new Array(pageSize).fill(dummyHospItem)));

    try {
      const items = await queue.add(() => getHospList(pageNo, pageSize, area.key));
      queue.add(() => {
        setPageEnd(items.length < pageSize);
        setList(list.concat(items));
      });
    } catch (e) {
      console.error(e);
      message.error('获取列表数据异常，请刷新重试~');
    } finally {
      if (queue.size === 0) setLoading(false);
    }
  };

  useMount(() => {
    const nocache = list.length === 0 || list[list.length - 1] === dummyHospItem;
    if (nocache) fetchData();
  });

  useUpdateEffect(() => {
    fetchData();
  }, [pageNo, area.key]);

  const onAreaMenuSelect = useCallback(
    ({ key }: { key: string }) => {
      if (key === area.key) return;
      setList([]);
      setPageNo(1);
      setArea(areas.find((area) => area.key === key)!);
    },
    [area.key]
  );

  (window as any).onAreaMenuSelect = onAreaMenuSelect;

  const onLoadMore = useCallback(() => {
    if (!loading) setPageNo(pageNo + 1);
  }, [loading, pageNo]);

  const onLinkMouseDown = useCallback((index: number) => {
    setActItem(index);
    historyState.applyState();
  }, []);

  const getLink = useCallback(
    (item: HospItem) => {
      return `/${nocache ? 'nocache' : 'cache'}/detail?hospId=${item.hospitalId}`;
    },
    [nocache]
  );

  return (
    <div style={{ paddingBottom: 40 }}>
      {nocache ? null : <ScrollRecorder />}

      <PageHeader
        title="列表"
        subTitle="List"
        onBack={() => window.history.back()}
        extra={<MemoDropdown areaLabel={area.label} onAreaMenuSelect={onAreaMenuSelect} />}
      />

      <List
        itemLayout="vertical"
        size="large"
        dataSource={list}
        loadMore={pageEnd ? null : <LoadMore loading={loading} onLoadMore={onLoadMore} />}
        renderItem={(item, index) => (
          <Link to={getLink(item)} onMouseDown={() => onLinkMouseDown(index)}>
            {loading && index >= pageSize * (pageNo - 1) ? (
              <SkeletonHosp />
            ) : (
              <List.Item
                style={{
                  display: 'flex',
                  alignItems: 'start',
                  background: index === actItem ? '#f2f2f2' : '#fff',
                }}
              >
                <List.Item.Meta
                  style={{
                    flex: 1,
                    paddingRight: 8,
                  }}
                  title={item.hospitalName}
                  description={item.hospitalAddress}
                />
                <HospPhoto item={item} />
              </List.Item>
            )}
          </Link>
        )}
      />
    </div>
  );
};

export default CList;
