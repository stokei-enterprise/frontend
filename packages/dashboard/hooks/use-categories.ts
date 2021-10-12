import { useEffect } from 'react';
import { Api } from '@stokei/core';
import { clientRestApi } from '~/services/rest-api';
import { useRequest } from './use-request';

export interface UseCategoriesResponse {
  readonly loading: boolean;
  readonly categories: Api.Rest.CategoryModel[];
}

export const useCategories = (): UseCategoriesResponse => {
  const categoryService = clientRestApi().categories();

  const { data, loading, submit } = useRequest({
    submit: async () => (await categoryService.findAll())?.data
  });

  useEffect(() => {
    (async () => {
      try {
        await submit();
      } catch (error) {}
    })();
  }, []);

  return {
    categories: data,
    loading
  };
};
