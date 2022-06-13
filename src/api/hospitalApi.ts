import config from '../config';

interface Res {
  code: string;
  flag: string;
  message: string;
  pageNo: number;
  pageSize: number;
  pageCount: number;
  recordCount: number;
  items: Item[];
  dynamicFilter: DynamicFilter;
  logParam: LogParam;
  wordType: string;
  abTest: AbTest;
  searchParam: string;
}

interface AbTest {
  ab_type: number;
  scene: string;
}

interface LogParam {
  status: string;
}

interface DynamicFilter {
  specialList: SpecialList[];
  hospitalLevelList: HospitalLevelList[];
  hospitalTypeList: HospitalTypeList[];
}

interface HospitalTypeList {
  typeId: number;
  typeDesc: string;
}

interface HospitalLevelList {
  hospitalLevelId: number;
  hospitalLevelDesc: string;
}

interface SpecialList {
  specialId: string;
  specialName: string;
}

interface Item {
  hospitalId: string;
  hospitalName: string;
  hospitalAddress: string;
  hospitalPhoto: string;
  hospitalLevel: string;
  hospitalLatitude: number;
  hospitalLongitude: number;
  patientCount: number;
  orderCount: number;
  score: number;
  commentCount: number;
  shotName: string;
  isOrder: number;
  prefixNameList: PrefixNameList[];
  featureDeptList: FeatureDeptList[];
  functionList: FunctionList[];
  distanceDesc: string;
  highlightHospitalName: string;
  medicalInsurance: number;
  hospitalType: string[];
  hospitalTypeDescList: string[];
  hospitalAscriptionList: string[];
  openServicePackage: number;
  importDeptList: string[];
  rankDesc: string;
  visitedTag: number;
  onlinePay: number;
  officialLabel: number;
  sortNo: string;
  itemSearchParam: string;
}

interface FunctionList {
  functionName: string;
}

interface FeatureDeptList {
  deptId: string;
  deptName: string;
}

interface PrefixNameList {
  prefixName: string;
}

const sleep = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const getHospList = async function (
  pageNo = 1,
  pageSize = 10,
  area = '0'
): Promise<Item[]> {
  await sleep(Math.random() * 500 + 200);
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
