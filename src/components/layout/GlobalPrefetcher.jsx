import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getProducts, getDepartments } from '../../api/productService';

const GlobalPrefetcher = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Prefetch departments (used for the category tabs)
    queryClient.prefetchQuery({
      queryKey: ['departments'],
      queryFn: getDepartments,
      staleTime: 1000 * 60 * 60, // Keep in memory for 1 hour
    });

    // Prefetch the very first page of "All" products
    queryClient.prefetchInfiniteQuery({
      queryKey: ['products', 'All', ''],
      queryFn: ({ pageParam = 1 }) => {
        return getProducts({ limit: 8, page: pageParam });
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.pagination && lastPage.pagination.page < lastPage.pagination.totalPages) {
          return lastPage.pagination.page + 1;
        }
        return undefined;
      },
      staleTime: 1000 * 60 * 5, // Keep fresh for 5 minutes
    });
  }, [queryClient]);

  return null; // This component doesn't render anything visually
};

export default GlobalPrefetcher;
