import URLS from '../../../utils/urls';
import ClientsImage from '../../../assets/svg/man-woman.svg';

export const getLinks = () => {
  return [
    {
      description: '',
      title: 'Medical Contacts',
      image: ClientsImage,
      path: URLS.getPagePath('medical-contacts')
    }
  ]
}
