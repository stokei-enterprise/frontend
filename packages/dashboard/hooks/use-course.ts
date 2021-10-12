import { useEffect } from 'react';
import { Api } from '@stokei/core';
import { clientRestApi } from '~/services/rest-api';
import { useRequest } from './use-request';

export interface UseCourseResponse {
  readonly loading: boolean;
  readonly course: Api.Rest.CourseModel;
}

export const useCourse = ({ courseId, appId }): UseCourseResponse => {
  const courseService = clientRestApi({ appId }).courses();
  const { data, loading, submit } = useRequest({
    submit: async () => (await courseService.findById(courseId))?.data
  });

  useEffect(() => {
    (async () => {
      try {
        if (courseId) {
          await submit();
        }
      } catch (error) {}
    })();
  }, [courseId]);

  return {
    course: data,
    loading
  };
};
