import useGetData from '../common/hooks/UseGetData';
import SelectWithSearch from '../common/components/SelectWithSearch';
import APIUtils from '../common/api-utils/APIUtils';

function Home() {
  // const data = useGetData('/planets');
  // console.log(data);
  Promise.all([
    APIUtils().getData('/planets/?page=1'),
    APIUtils().getData('/planets/?page=2'),
    APIUtils().getData('/planets/?page=3'),
    APIUtils().getData('/planets/?page=4'),
    APIUtils().getData('/planets/?page=5'),
  ]).then((values) => console.log(values));
  return <SelectWithSearch />;
}

export default Home;
