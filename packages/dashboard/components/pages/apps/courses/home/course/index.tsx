import { AvatarGroup, Flex, Text } from '@chakra-ui/react';
import { Api } from '@stokei/core';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { AppAvatar } from '~/components/ui/app-avatar';
import { ButtonOutlined } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { UserAvatar } from '~/components/ui/user-avatar';

interface Props {
  readonly course: Api.Rest.CourseModel;
  readonly appId: string;
}

export const Course: React.FC<Props> = memo(({ course, appId }) => {
  const router = useRouter();
  return (
    <Card
      title={course?.name}
      headerImage={course?.imageUrl}
      headerFallbackImage="/no-image.png"
      body={
        course?.teachers?.length > 0 && (
          <Flex width="full" flexDirection="column" paddingY={2}>
            <Text lineHeight="shorter" color="gray.500" marginBottom={1}>
              Professores
            </Text>
            <AvatarGroup size="sm" max={2}>
              {course?.teachers?.map((teacher) => (
                <UserAvatar
                  key={teacher.id}
                  src={teacher?.avatar}
                  name={teacher?.fullname}
                />
              ))}
            </AvatarGroup>
          </Flex>
        )
      }
      footer={
        <Flex
          width="full"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <ButtonOutlined
            onClick={() => router.push(`/apps/${appId}/courses/${course.id}`)}
          >
            Acessar
          </ButtonOutlined>

          {course?.app && (
            <AppAvatar src={course.app?.logo} name={course.app?.name} />
          )}
        </Flex>
      }
    />
  );
});

Course.displayName = 'Course';
