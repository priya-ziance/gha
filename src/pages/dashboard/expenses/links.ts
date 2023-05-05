import URLS from '../../../utils/urls';
import ClientsImage from '../../../assets/svg/man-woman.svg';

export const getLinks = (clientId: string) => {
  return [
    {
      description: 'Expenses',
      title: 'Account Expenses',
      image: ClientsImage,
      path: URLS.getPagePath('expenses-account', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Bank Statements',
      image: ClientsImage,
      path: URLS.getPagePath('bank-statement', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Expense List',
      image: ClientsImage,
      path: URLS.getPagePath('expenses-list', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Recurring Expense',
      image: ClientsImage,
      path: URLS.getPagePath('recurring-expense', { clientId }),
      interactive: true
    }
  ]
}
