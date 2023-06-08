import { useEffect, useState, useRef, useContext } from 'react';
import { ErrorContext } from '../../App';
import APIUtils from '../api-utils/APIUtils';

export default function useGetAllPlanets() {
  const [planetList, setPlanetList] = useState();
  const [loading, setLoading] = useState(false);
  const isFirstCall = useRef(true);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    setLoading(true);
    if (isFirstCall.current) {
      isFirstCall.current = false;
      /* Each get request gives 10 planets, there are total of 60 planets.
         Therefore we need to do 6 get requests together.
      */
      Promise.all([
        APIUtils().getData('/planets/?page=1'),
        APIUtils().getData('/planets/?page=2'),
        APIUtils().getData('/planets/?page=3'),
        APIUtils().getData('/planets/?page=4'),
        APIUtils().getData('/planets/?page=5'),
        APIUtils().getData('/planets/?page=6'),
      ])
        .then((response) => {
          setPlanetList(
            response
              // There are 6 list of planets because of 6 API responses
              // Convert array of 6 objects to array of 6 arrays(planet list)
              .map((planet) => planet.results)
              // Flatten them to single array of 60 planets
              .reduce((accumulator, current) => accumulator.concat(current), [])
          );
          setLoading(false);
        })
        .catch((error) => setError(error.message));
    }
  }, []);

  return { planetList, loading };
}
