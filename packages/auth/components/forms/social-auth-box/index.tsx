import { Stack } from '@chakra-ui/react';
import { useContext } from 'react';
import {
  FacebookButton,
  GoogleButton,
  EmailButton
} from '~/components/ui/button';
import { RootContext } from '~/contexts/root';
import { facebookAuthURI, googleAuthURI } from '~/utils/constants';

interface SocialAuthBoxProps {
  readonly isOpen: boolean;
  readonly onOpenEmail: () => void;
}

export const SocialAuthBox: React.FC<SocialAuthBoxProps> = ({
  onOpenEmail,
  isOpen = false,
  ...props
}) => {
  const { redirectUri, appId } = useContext(RootContext);
  return (
    <Stack direction="column" align="stretch" spacing={3}>
      <GoogleButton
        flex="1"
        onClick={async () => {
          const href = await googleAuthURI({
            redirectUri,
            appId
          });
          window.location.href = href;
        }}
      >
        Google
      </GoogleButton>
      <FacebookButton
        flex="1"
        onClick={async () => {
          const href = await facebookAuthURI({
            redirectUri,
            appId
          });
          window.location.href = href;
        }}
      >
        Facebook
      </FacebookButton>
      {!isOpen && (
        <EmailButton flex="1" onClick={onOpenEmail}>
          Email
        </EmailButton>
      )}
    </Stack>
  );
};
