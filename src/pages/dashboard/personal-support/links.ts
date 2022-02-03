import URLS from '../../../utils/urls';
import ClientsImage from '../../../assets/svg/man-woman.svg';

export const getLinks = (clientId: string) => {
  return [
    {
      description: 'Add client\'s Personal Support Daily task',
      title: 'Personal Support Logs',
      image: ClientsImage,
      path: URLS.getPagePath('personal-support-logs', { clientId })
    },
    {
      description: '',
      title: 'Personal Support Places Database',
      image: ClientsImage,
      path: URLS.getPagePath('personal-support-places-database', { clientId })
    },
    {
      description: '',
      title: 'Personal Support Notes Database',
      image: ClientsImage,
      path: URLS.getPagePath('personal-support-notes-database', { clientId })
    }
  ]
}
