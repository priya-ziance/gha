import URLS from '../../../utils/urls';
import ClientsImage from '../../../assets/svg/man-woman.svg';
import ListImage from '../../../assets/svg/list.svg';
import LocationImage from '../../../assets/svg/location.svg';

export const getLinks = () => {
  return [
    {
      description: '',
      title: 'Clients',
      image: ClientsImage,
      path: URLS.getPagePath('clients')
    },
    {
      description: '',
      title: 'Admins',
      image: ClientsImage,
      path: URLS.getPagePath('admins')
    },
    {
      description: '',
      title: 'Logs',
      image: ListImage,
      path: URLS.getPagePath('logs')
    },
    {
      description: '',
      title: 'Locations',
      image: LocationImage,
      path: URLS.getPagePath('locations')
    }
  ]
}
