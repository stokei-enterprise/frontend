import { Flex, Heading } from '@chakra-ui/react';
import { Api } from '@stokei/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { InputFileImage } from '~/components/ui/input-file-image';
import { TextEditor } from '~/components/ui/text-editor';
import { useToasts } from '~/contexts/toasts';
import { clientRestApi } from '~/services/rest-api';

interface Props {
  readonly video: Api.Rest.VideoModel;
  readonly appId: string;
  readonly moduleId: string;
  readonly onSuccess: () => any;
}

export const FormUpdateVideo: React.FC<Props> = ({
  video,
  appId,
  moduleId,
  onSuccess,
  ...props
}) => {
  const { addToast } = useToasts();

  const [percentLoading, setPercentLoading] = useState(0);

  const formik = useFormik({
    initialValues: {
      title: video.title,
      description: video.description,
      thumbnail: null
    },
    validationSchema: Yup.object({
      title: Yup.string(),
      description: Yup.string()
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        if (values.title) {
          formData.append('title', values.title);
        }
        if (values.description) {
          formData.append('description', values.description);
        }
        if (values.thumbnail) {
          formData.append('thumbnail', values.thumbnail);
        }

        const courseVideoService = clientRestApi({
          appId,
          onUploadProgress: setPercentLoading
        })
          .courses()
          .videos({
            moduleId
          });
        const response = await courseVideoService.update(video.id, formData);
        if (response?.data) {
          addToast({
            status: 'success',
            text: 'Video atualizado com sucesso!'
          });
          setSubmitting(false);
          onSuccess();
          return;
        }
      } catch (error) {}

      addToast({
        status: 'error',
        text: 'Erro ao atualizar este video!'
      });

      setSubmitting(false);
    }
  });

  return (
    <Flex gridArea="form" flex={1} height="auto" flexDir="column">
      <Heading size="lg" lineHeight="shorter" mb={4}>
        Alterar video
      </Heading>
      <Flex height="auto" flexDir="column" justifyContent="stretch">
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <InputFileImage
            id="thumbnail"
            label="Miniatura"
            aspectRatio={1920 / 1080}
            errorMessage={
              formik.touched.thumbnail && formik.errors.thumbnail
                ? 'Miniatura inválida!'
                : null
            }
            onChange={(event) =>
              formik.setFieldValue('thumbnail', event.target.files[0] || '')
            }
          />

          <Input
            id="title"
            name="title"
            label="Nome"
            placeholder="Nome"
            borderColor={formik.errors.title && 'red.400'}
            errorMessage={formik.touched.title && formik.errors.title}
            {...formik.getFieldProps('title')}
          />

          <TextEditor
            id="description"
            name="description"
            label="Descrição"
            initialValue={video?.description}
            errorMessage={
              formik.touched.description && formik.errors.description
            }
            {...formik.getFieldProps('description')}
            onChange={(value) => formik.setFieldValue('description', value)}
          />

          <Flex>
            <Button
              type="submit"
              isLoading={formik.isSubmitting}
              loadingText={`${percentLoading}% Salvando`}
              spinner={null}
              disabled={formik.isSubmitting || !formik.isValid}
              marginTop={4}
            >
              Salvar
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};
