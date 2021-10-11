import { Flex, SimpleGrid } from '@chakra-ui/react';
import { Api } from '@stokei/core';
import { Course } from '../course';
import { NoCourse } from '../no-course';

interface Props {
  readonly courses: Api.Rest.CourseModel[];
}

export const ListCourses: React.FC<Props> = ({ courses }) => {
  return (
    <Flex width="full">
      {courses?.length > 0 ? (
        <SimpleGrid width="full" spacing="10" columns={[1, 2, 2, 3]}>
          {courses?.map((course) => (
            <Course key={course.id} course={course} />
          ))}
        </SimpleGrid>
      ) : (
        <NoCourse />
      )}
    </Flex>
  );
};

export default ListCourses;
