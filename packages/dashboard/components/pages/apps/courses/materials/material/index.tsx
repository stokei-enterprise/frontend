import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Api } from '@stokei/core';
import { useRouter } from 'next/router';
import { memo, useEffect } from 'react';
import { Card } from '~/components/ui/card';
import { useRequest } from '~/hooks/use-request';
import { clientRestApi } from '~/services/rest-api';
import { assetsIconsUrl } from '~/utils/constants';

interface Props {
  readonly material: Api.Rest.MaterialModel;
  readonly courseId: string;
  readonly appId: string;
}

export const Material: React.FC<Props> = memo(
  ({ courseId, appId, material }) => {
    const courseMaterialService = clientRestApi({
      appId
    })
      .courses()
      .materials({
        courseId
      });
    const { loading, submit, data } = useRequest({
      submit: () => courseMaterialService.delete(material.id)
    });
    const router = useRouter();

    useEffect(() => {
      if (data) {
        router.reload();
      }
    }, [data, router]);

    return (
      <Card
        menu={[
          {
            text: 'Baixar',
            loadingText: 'Baixando...',
            onClick: () => (window.location.href = material.url)
          },
          {
            color: 'red.500',
            text: 'Remover',
            loading: loading,
            loadingText: 'Removendo...',
            onClick: () => !loading && submit()
          }
        ]}
        body={
          <>
            <Flex width="full" alignItems="center">
              <Image
                height="100"
                src={`${assetsIconsUrl}/${material.format}.png`}
                fallbackSrc="/no-image.png"
                alt="ImageMaterial"
              />
            </Flex>
            <Flex flexDirection="column">
              <Heading size="sm" marginBottom={1}>
                {material.title}
              </Heading>
              {material.description && (
                <Text
                  fontSize="xs"
                  lineHeight="shorter"
                  maxWidth="full"
                  color="gray.500"
                  isTruncated
                >
                  {material.description}
                </Text>
              )}
            </Flex>
            {loading && (
              <Flex>
                <Text color="red.500" size="md">
                  Removendo...
                </Text>
              </Flex>
            )}
          </>
        }
      />
    );
  }
);
