import {ArmourOctaVideosLayout} from '~/components/AmourOctaVideos/Layout';
import ArmourOctaVideosStyles from '~/styles/armour-octa-videos.scss?url';

export const links = () => {
  return [{rel: 'stylesheet', href: ArmourOctaVideosStyles}];
};

export default function ArmourOctaVideosRoute() {
  return <ArmourOctaVideosLayout />;
}
