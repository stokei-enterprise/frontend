import { Flex } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import { InputFileImage } from '~/components/ui/input-file-image';
import { UserAvatar } from '~/components/ui/user-avatar';
import { useToasts } from '~/contexts/toasts';
import { AuthContext } from '~/contexts/auth';
import { Api } from '@stokei/core';
import { clientRestApi } from '~/services/rest-api';

interface Props {
  readonly user: Api.Rest.MeModel;
  readonly onSuccess: () => any;
}

export const FormUpdateAccountAvatar: React.FC<Props> = ({
  user,
  onSuccess,
  ...props
}) => {
  const { addToast } = useToasts();
  const { setAvatarUrl } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: { image: null },
    validationSchema: Yup.object({}),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append('image', values.image);

        const meService = clientRestApi().me();

        const response = await meService.updateAvatar({ image: values.image });
        if (response?.data) {
          addToast({
            status: 'success',
            text: 'Foto alterada com sucesso!'
          });
          setSubmitting(false);
          onSuccess();
          return;
        }
      } catch (error) {}

      addToast({
        status: 'error',
        text: 'Erro ao alterar a foto do perfil!'
      });

      setSubmitting(false);
    }
  });

  return (
    <Flex gridArea="form" flex={1} height="auto" flexDir="column">
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Flex width={['full', 'full', '250px', '250px']}>
          <InputFileImage
            rounded
            id="image"
            label="Imagem"
            accept="image/*"
            onPreview={(url) => setAvatarUrl(url)}
            previewElement={(file) => (
              <UserAvatar size="full" src={file} name={user?.fullname} />
            )}
            errorMessage={
              formik.touched.image && formik.errors.image
                ? 'Imagem inválida!'
                : null
            }
            onChange={(event) =>
              formik.setFieldValue('image', event.target.files[0] || '')
            }
          />
        </Flex>

        <Flex>
          <Button
            type="submit"
            isLoading={formik.isSubmitting}
            loadingText="Salvando"
            spinnerPlacement="end"
            disabled={formik.isSubmitting || !formik.isValid}
            marginTop={4}
          >
            Salvar
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
