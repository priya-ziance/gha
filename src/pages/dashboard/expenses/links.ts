import URLS from '../../../utils/urls';
import ClientsImage from '../../../assets/svg/man-woman.svg';

export const getLinks = (clientId: string) => {
  return [
    {
      description: 'Expenses',
      title: 'Main Account',
      image: ClientsImage,
      path: URLS.getPagePath('expenses-main-account', { clientId }),
      interactive: true
    },
    {
      description: 'Account',
      title: 'Personal Funds',
      image: ClientsImage,
      // path: URLS.getPagePath('goals-data-collection', { clientId }),
      interactive: false
    },
    {
      description: '',
      title: 'Expense List',
      image: ClientsImage,
      // path: URLS.getPagePath('goals-database', { clientId }),
      interactive: false
    },
    {
      description: '',
      title: 'Main Account',
      image: ClientsImage,
      // path: URLS.getPagePath('sp-goals', { clientId }),
      interactive: false
    },
    {
      description: '',
      title: 'Personal Funds',
      image: ClientsImage,
      // path: URLS.getPagePath('goals-data-collection', { clientId }),
      interactive: false
    },
    {
      description: '',
      title: 'Reoccurring Expense List',
      image: ClientsImage,
      // path: URLS.getPagePath('goals-database', { clientId }),
      interactive: false
    }
  ]
}
