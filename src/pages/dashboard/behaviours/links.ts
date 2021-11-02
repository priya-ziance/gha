import URLS from '../../../utils/urls';
import ClientsImage from '../../../assets/svg/man-woman.svg';

export const getLinks = (clientId: string) => {
  return [
    {
      description: '',
      title: 'Behaviour',
      image: ClientsImage,
      path: URLS.getPagePath('behaviours-problems', { clientId })
    },
    {
      description: '',
      title: 'Assign Behaviours',
      image: ClientsImage,
      path: URLS.getPagePath('behaviours-assign', { clientId })
    },
    {
      description: '',
      title: 'Behaviours Database',
      image: ClientsImage,
      path: URLS.getPagePath('behaviours-database', { clientId })
    }
    // ,
    // {
    //   description: '',
    //   title: 'Behaviours Insertion',
    //   image: ClientsImage,
    //   path: URLS.getPagePath('goals-database', { clientId })
    // }
  ]
}
