import counterpart from 'counterpart'

import BitbucketIcon from './../../components/BitbucketIcon'
import FacebookIcon from './../../components/FacebookIcon'
import GitHubIcon from './../../components/GitHubIcon'
import GlobeIcon from './../../components/GlobeIcon'
import GooglePlusIcon from './../../components/GooglePlusIcon'
import InstagramIcon from './../../components/InstagramIcon'
import MediumIcon from './../../components/MediumIcon'
import PinterestIcon from './../../components/PinterestIcon'
import RedditIcon from './../../components/RedditIcon'
import TumblrIcon from './../../components/TumblrIcon'
import TwitterIcon from './../../components/TwitterIcon'
import WeiboIcon from './../../components/WeiboIcon'
import WordPressIcon from './../../components/WordPressIcon'
import YouTubeIcon from './../../components/YouTubeIcon'

export default function formatUrlObject (obj) {
  // Default to external website
  const formattedObject = {
    IconComponent: GlobeIcon,
    label: obj.label || obj.path,
    type: counterpart('ProjectLink.types.website'),
    url: obj.url,
  }

  if (obj.site && obj.site.includes('bitbucket')) {
    formattedObject.IconComponent = BitbucketIcon
    formattedObject.type = counterpart('ProjectLink.types.bitbucket')
  }

  if (obj.site && obj.site.includes('facebook')) {
    formattedObject.IconComponent = FacebookIcon
    formattedObject.type = counterpart('ProjectLink.types.facebook')
  }

  if (obj.site && obj.site.includes('github')) {
    formattedObject.IconComponent = GitHubIcon
    formattedObject.type = counterpart('ProjectLink.types.github')
  }

  if (obj.site && obj.site.includes('instagram')) {
    formattedObject.IconComponent = InstagramIcon
    formattedObject.label = (obj.path.substr(0, 1) === '@')
      ? obj.path
      : `@${obj.path}`
    formattedObject.type = counterpart('ProjectLink.types.instagram')
  }

  if (obj.site && obj.site.includes('medium')) {
    formattedObject.IconComponent = MediumIcon
    formattedObject.type = counterpart('ProjectLink.types.medium')
  }

  if (obj.site && obj.site.includes('pinterest')) {
    formattedObject.IconComponent = PinterestIcon
    formattedObject.type = counterpart('ProjectLink.types.pinterest')
  }

  if (obj.site && obj.site.includes('plus.google')) {
    formattedObject.IconComponent = GooglePlusIcon
    formattedObject.type = counterpart('ProjectLink.types.googleplus')
  }

  if (obj.site && obj.site.includes('reddit')) {
    formattedObject.IconComponent = RedditIcon
    formattedObject.label = `/${obj.path}`
    formattedObject.type = counterpart('ProjectLink.types.reddit')
  }

  if (obj.site && obj.site.includes('tumblr')) {
    formattedObject.IconComponent = TumblrIcon
    formattedObject.type = counterpart('ProjectLink.types.tumblr')
    formattedObject.url = `https://${obj.path}.tumblr.com`
  }

  if (obj.site && obj.site.includes('twitter')) {
    formattedObject.IconComponent = TwitterIcon
    formattedObject.label = (obj.path.substr(0, 1) === '@')
      ? obj.path
      : `@${obj.path}`
    formattedObject.type = counterpart('ProjectLink.types.twitter')
  }

  if (obj.site && obj.site.includes('weibo')) {
    formattedObject.IconComponent = WeiboIcon
    formattedObject.type = counterpart('ProjectLink.types.weibo')
  }

  if (obj.site && obj.site.includes('wordpress')) {
    formattedObject.IconComponent = WordPressIcon
    formattedObject.type = counterpart('ProjectLink.types.wordpress')
  }

  if (obj.site && obj.site.includes('youtube')) {
    formattedObject.IconComponent = YouTubeIcon
    formattedObject.type = counterpart('ProjectLink.types.youtube')
  }

  return formattedObject
}
