import { Flex } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useAlerts } from '~/contexts/alerts';
import { clientRestApi } from '~/services/rest-api';

interface Props {
  readonly courseId: string;
  readonly appId: string;
  readonly onSuccess: () => any;
}

export const FormAddModule: React.FC<Props> = ({
  courseId,
  appId,
  onSuccess,
  ...props
}) => {
  const { addAlert } = useAlerts();

  const formik = useFormik({
    initialValues: { name: '', description: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Obrigatório')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const courseModuleService = clientRestApi({
          appId
        })
          .courses()
          .modules({
            courseId
          });
        const response = await courseModuleService.create({
          name: values.name,
          description: values.description
        });
        if (response?.data) {
          addAlert({
            status: 'success',
            text: 'Modulo criado com sucesso!'
          });
          setSubmitting(false);
          onSuccess();
          return;
        }
      } catch (error) {}

      addAlert({
        status: 'error',
        text: 'Erro ao criar este módulo!'
      });
      setSubmitting(false);
    }
  });

  return (
    <Flex gridArea="form" flex={1} height="auto" flexDir="column">
      <Flex height="auto" flexDir="column" justifyContent="stretch">
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Input
            id="name"
            name="name"
            label="Nome"
            placeholder="Nome"
            borderColor={formik.errors.name && 'red.400'}
            errorMessage={formik.touched.name && formik.errors.name}
            {...formik.getFieldProps('name')}
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
