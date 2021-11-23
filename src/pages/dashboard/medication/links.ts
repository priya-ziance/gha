import URLS from '../../../utils/urls';
import ClientsImage from '../../../assets/svg/man-woman.svg';

export const getLinks = (clientId: string) => {
  return [
    {
      description: 'Capture taken medication of clients daily task',
      title: 'Med Pass',
      image: ClientsImage,
      path: URLS.getPagePath('med-pass', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Med Destruction',
      image: ClientsImage,
      path: URLS.getPagePath('med-destruction', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Medication List',
      image: ClientsImage,
      path: URLS.getPagePath('medication-list', { clientId }),
      interactive: true
    }
  ]
}
