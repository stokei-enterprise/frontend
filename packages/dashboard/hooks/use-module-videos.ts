import { useEffect } from 'react';
import { FindAllPayload } from '~/services/interfaces/find-all.payload';
import { Api } from '@stokei/core';
import { clientRestApi } from '~/services/rest-api';
import { useRequest } from './use-request';

export interface UseModuleVideosResponse {
  readonly loading: boolean;
  readonly videos: Api.Rest.FindAllPayload<Api.Rest.VideoModel>;
}

export const useModuleVideos = ({
  appId,
  moduleId
}): UseModuleVideosResponse => {
  const courseVideosService = clientRestApi({
    appId
  })
    .courses()
    .videos({ moduleId });
  const { data, loading, submit } = useRequest({
    submit: async () =>
      (
        await courseVideosService.findAll({
          title: ':asc',
          position: ':asc'
        })
      )?.data
  });

  useEffect(() => {
    (async () => {
      try {
        if (moduleId) {
          await submit();
        }
      } catch (error) {}
    })();
  }, [moduleId]);

  return {
    videos: data,
    loading
  };
};
