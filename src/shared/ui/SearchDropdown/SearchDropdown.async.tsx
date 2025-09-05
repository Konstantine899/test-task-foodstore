import { lazy } from 'react';

export const SearchDropdownAsync = lazy(() => 
  import('./SearchDropdown').then(module => ({
    default: module.SearchDropdown
  }))
);