import URLS from '../../../utils/urls';
import ClientsImage from '../../../assets/svg/man-woman.svg';

export const getLinks = (clientId: string) => {
  return [
    {
      description: 'Add client\'s Life Skill Daily task',
      title: 'Life Skill Logs',
      image: ClientsImage,
      path: URLS.getPagePath('life-skills-logs', { clientId })
    },
    {
      description: '',
      title: 'Life Skill Places Database',
      image: ClientsImage,
      path: URLS.getPagePath('life-skills-places-database', { clientId })
    },
    {
      description: '',
      title: 'Life Skill Notes Database',
      image: ClientsImage,
      path: URLS.getPagePath('life-skills-notes-database', { clientId })
    }
  ]
}
