import { Flex } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { InputFile } from '~/components/ui/input-file';
import { Textarea } from '~/components/ui/textarea';
import { useToasts } from '~/contexts/toasts';
import { clientRestApi } from '~/services/rest-api';

interface Props {
  readonly courseId: string;
  readonly appId: string;
  readonly onSuccess: () => any;
}

export const FormAddCourseMaterial: React.FC<Props> = ({
  courseId,
  appId,
  onSuccess,
  ...props
}) => {
  const { addToast } = useToasts();

  const formik = useFormik({
    initialValues: { description: '', title: '', material: null },
    validationSchema: Yup.object({
      title: Yup.string().required('Obrigatório'),
      description: Yup.string()
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('material', values.material);

        const courseMaterialService = clientRestApi({
          appId
        })
          .courses()
          .materials({ courseId });

        const response = await courseMaterialService.create(formData);
        if (response?.data) {
          addToast({
            status: 'success',
            text: 'Material criado com sucesso!'
          });
          setSubmitting(false);
          onSuccess();
          return;
        }
      } catch (error) {}

      addToast({
        status: 'error',
        text: 'Erro ao adicionar o material!'
      });
      setSubmitting(false);
    }
  });

  return (
    <Flex gridArea="form" flex={1} height="auto" flexDir="column">
      <Flex height="auto" flexDir="column">
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <InputFile
            id="material"
            label="Material"
            formats={[
              'application/pdf',
              'application/zip',
              'application/x-rar-compressed',
              'application/octet-stream',
              'application/x-zip-compressed',
              'multipart/x-zip'
            ]}
            errorMessage={
              formik.touched.material && formik.errors.material
                ? 'Material inválido!'
                : null
            }
            onChange={(event) =>
              formik.setFieldValue('material', event.target.files[0] || '')
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

          <Textarea
            required={false}
            id="description"
            name="description"
            label="Descrição"
            placeholder="Descrição"
            borderColor={formik.errors.description && 'red.400'}
            errorMessage={
              formik.touched.description && formik.errors.description
            }
            {...formik.getFieldProps('description')}
          />

          <Flex>
            <Button
              type="submit"
              isLoading={formik.isSubmitting}
              loadingText="Criando"
              spinnerPlacement="end"
              disabled={formik.isSubmitting || !formik.isValid}
              marginTop={4}
            >
              Criar
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};
