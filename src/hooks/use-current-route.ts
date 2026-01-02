import { useMemo } from 'react';
import { useMatches } from 'react-router-dom';

export function useCurrentRoute() {
  const matches = useMatches();

  const currentRoute = useMemo(() => {
    const match = matches.at(-1);

    return match;
  }, [matches, location]);

  return currentRoute;
}
