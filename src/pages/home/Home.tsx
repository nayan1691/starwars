import { useMemo, useState } from 'react';
import SelectWithSearch from '../../common/components/SelectWithSearch';
import useGetAllPlanets from '../../common/hooks/UseGetAllPlanets';
import Loader from '../../common/components/Loader';
import PaginatedResidentList from './components/PaginatedResidentList';

interface PlanetListResponseType {
  count: number;
  next: string | null;
  previous: string | null;
  results: [];
}

interface GetAllPlanetReturnType {
  planetList: PlanetListResponseType[] | undefined;
  loading: boolean;
}

function Home() {
  const { planetList, loading }: GetAllPlanetReturnType = useGetAllPlanets();
  const [residents, setResidents] = useState();

  const handleSelection = (selectedValue: string | undefined) => {
    setResidents(planetsAndResidents?.residents[selectedValue]);
  };

  const planetsAndResidents = useMemo(() => {
    if (planetList) {
      const planetOptions = [];
      const residents = {};
      /* From list of 60 planets, create list of planet options
         which is required for the dropdown to show them.
         Each planet consist of residents url list. We are storing list
         of residents url as key(name of planet) value pair.
      */
      planetList.map((item) => {
        planetOptions.push({ value: item.name, label: item.name });
        residents[item.name] = item.residents;
      });
      return {
        planetOptions,
        residents,
      };
    }
  }, [planetList]);

  if (loading) {
    return (
      <div className="absolute top-1/4 left-1/2">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {planetsAndResidents?.planetOptions &&
      planetsAndResidents.planetOptions.length > 0 ? (
        <SelectWithSearch
          placeholder="Search the planet from starwars universe"
          options={planetsAndResidents.planetOptions}
          handleChange={handleSelection}
          className="m-auto pt-4 text-lg w-1/2"
        />
      ) : null}
      {residents ? (
        <PaginatedResidentList pageSize={4} residents={residents} />
      ) : null}
    </>
  );
}

export default Home;
