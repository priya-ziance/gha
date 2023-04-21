import URLS from '../../../utils/urls';
import ClientsImage from '../../../assets/svg/man-woman.svg';

export const getLinks = (clientId: string) => {
  return [
    {
      description: 'Add client\'s Reshab log. Daily task',
      title: 'Reshab Log',
      image: ClientsImage,
      path: URLS.getPagePath('reshab-logs', { clientId })
    },
    {
      description: 'Add client\'s Reshab log. Daily task',
      title: 'Respite Log',
      image: ClientsImage,
      path: URLS.getPagePath('respite-logs', { clientId })
    },
    {
      description: 'Add client\'s Reshab log. Daily task',
      title: 'Life Skills',
      image: ClientsImage,
      path: URLS.getPagePath('life-skills', { clientId })
    },
    {
      description: 'Add client\'s Reshab log. Daily task',
      title: 'Personal Support',
      image: ClientsImage,
      path: URLS.getPagePath('personal-support', { clientId })
    },
    {
      description: 'Add client\'s Seizure Log. Daily task',
      title: 'Seizure Log',
      image: ClientsImage,
      path: URLS.getPagePath('seizure-logs', { clientId })
    },
  ]
}
