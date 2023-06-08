import { useRef } from 'react';
import SinglePlanetCard from './SingleResidentCard';

interface ResidentListProps {
  residents: string[];
}

export default function ResidentList({ residents }: ResidentListProps) {
  const cachedResident = useRef({});

  if (residents.length === 0) {
    return (
      <div className="w-full text-center pt-8 text-xl">
        There are no character from this planet.
      </div>
    );
  }

  return (
    <>
      {residents.map((resident) => (
        <div key={resident}>
          <SinglePlanetCard
            // Need to remove the https://swapi.dev/api part from url
            residentURL={resident.substring(21)}
            cachedResident={cachedResident}
          />
        </div>
      ))}
    </>
  );
}
