import {
  Facebook as FacebookIcon,
  Github as GitHubIcon,
  Language as GlobeIcon,
  GooglePlus as GooglePlusIcon,
  Instagram as InstagramIcon,
  Medium as MediumIcon,
  Pinterest as PinterestIcon,
  Reddit as RedditIcon,
  Tumblr as TumblrIcon,
  Twitter as TwitterIcon,
  Wordpress as WordPressIcon,
  Youtube as YouTubeIcon
} from 'grommet-icons'

import BitbucketIcon from './../../components/BitbucketIcon'
import WeiboIcon from './../../components/WeiboIcon'

function formatUrlObject (obj, t) {
  // Default to external website
  const formattedObject = {
    IconComponent: GlobeIcon,
    label: obj.label || obj.path,
    type: t('ConnectWithProject.ProjectLink.types.website'),
    url: obj.url
  }

  if (obj.site && obj.site.includes('bitbucket')) {
    formattedObject.IconComponent = BitbucketIcon
    formattedObject.type = t('ConnectWithProject.ProjectLink.types.bitbucket')
  }

  if (obj.site && obj.site.includes('facebook')) {
    formattedObject.IconComponent = FacebookIcon
    formattedObject.type = t('ConnectWithProject.ProjectLink.types.facebook')
  }

  if (obj.site && obj.site.includes('github')) {
    formattedObject.IconComponent = GitHubIcon
    formattedObject.type = t('ConnectWithProject.ProjectLink.types.github')
  }

  if (obj.site && obj.site.includes('instagram')) {
    formattedObject.IconComponent = InstagramIcon
    formattedObject.label = (obj.path.substr(0, 1) === '@')
      ? obj.path
      : `@${obj.path}`
    formattedObject.type = t('ConnectWithProject.ProjectLink.types.instagram')
  }

  if (obj.site && obj.site.includes('medium')) {
    formattedObject.IconComponent = MediumIcon
    formattedObject.type = t('ConnectWithProject.ProjectLink.types.medium')
  }

  if (obj.site && obj.site.includes('pinterest')) {
    formattedObject.IconComponent = PinterestIcon
    formattedObject.type = t('ConnectWithProject.ProjectLink.types.pinterest')
  }

  if (obj.site && obj.site.includes('plus.google')) {
    formattedObject.IconComponent = GooglePlusIcon
    formattedObject.type = t('ConnectWithProject.ProjectLink.types.googleplus')
  }

  if (obj.site && obj.site.includes('reddit')) {
    formattedObject.IconComponent = RedditIcon
    formattedObject.label = `/${obj.path}`
    formattedObject.type = t('ConnectWithProject.ProjectLink.types.reddit')
  }

  if (obj.site && obj.site.includes('tumblr')) {
    formattedObject.IconComponent = TumblrIcon
    formattedObject.type = t('ConnectWithProject.ProjectLink.types.tumblr')
    formattedObject.url = `https://${obj.path}.tumblr.com`
  }

  if (obj.site && obj.site.includes('twitter')) {
    formattedObject.IconComponent = TwitterIcon
    formattedObject.label = (obj.path.substr(0, 1) === '@')
      ? obj.path
      : `@${obj.path}`
    formattedObject.type = t('ConnectWithProject.ProjectLink.types.twitter')
  }

  if (obj.site && obj.site.includes('weibo')) {
    formattedObject.IconComponent = WeiboIcon
    formattedObject.type = t('ConnectWithProject.ProjectLink.types.weibo')
  }

  if (obj.site && obj.site.includes('wordpress')) {
    formattedObject.IconComponent = WordPressIcon
    formattedObject.type = t('ConnectWithProject.ProjectLink.types.wordpress')
  }

  if (obj.site && obj.site.includes('youtube')) {
    formattedObject.IconComponent = YouTubeIcon
    formattedObject.type = t('ConnectWithProject.ProjectLink.types.youtube')
  }

  return formattedObject
}

export default formatUrlObject
