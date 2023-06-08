import useGetResidentAndCacheIt from '../../../common/hooks/UseGetResidentAndCacheIt';
import Loader from '../../../common/components/Loader';

interface SingleResidentCardProps {
  residentURL: string;
  cachedResident: object;
}

interface UseGetResidentAndCacheItReturnType {
  data:
    | {
        name: string;
      }
    | undefined;
  loading: boolean;
}

export default function SingleResidentCard({
  residentURL,
  cachedResident,
}: SingleResidentCardProps) {
  const { data, loading }: UseGetResidentAndCacheItReturnType =
    useGetResidentAndCacheIt(residentURL, cachedResident);

  return (
    <div className="w-3/4 h-16 m-auto mt-8 rounded-md shadow-md border-gray-300 border">
      <div className="text-center relative top-1/4">
        <div className="relative left-1/2">{loading && <Loader />}</div>
        {data && !loading ? (
          <span className="text-md">
            Character Name - <strong>{data.name}</strong>
          </span>
        ) : null}
      </div>
    </div>
  );
}
