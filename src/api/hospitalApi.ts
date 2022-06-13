import config from '../config';

export interface Item {
  hospitalId: string;
  hospitalPhoto: string;
  hospitalName: string;
  hospitalAddress: string;
}

const sleep = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const getHospList = async function (
  pageNo = 1,
  pageSize = 10,
  area = '0'
): Promise<Item[]> {
  // await sleep(Math.random() * 500 + 2000);
  await sleep(area === '1' ? 200 : 500);

  // throw new Error('test');

  return fetch(`${config.API_SERVER}/hospital/hospitalsearch/list.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'weiyi-appid': 'p_h5_weiyi',
      'weiyi-authtoken': '',
      'weiyi-version': '1.04',
    },
    body: JSON.stringify({
      pageNo,
      pageSize,
      sort: 'default',
      area,
      latitude: '',
      longitude: '',
      haoyuan: 7,
      callType: 0,
    }),
  })
    .then((res) => res.json())
    .then((data) => data.items);
};
