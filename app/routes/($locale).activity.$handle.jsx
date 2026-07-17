import {useLoaderData} from 'react-router';
import {resolveActivityLayout} from '~/config/activity-layouts';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  const activity = data?.activity;

  return [
    {title: activity?.title ?? 'Activity'},
    {name: 'description', content: activity?.description ?? ''},
    {
      tagName: 'link',
      rel: 'canonical',
      href: `/activity/${data?.handle ?? ''}`,
    },
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({params}) {
  const {handle} = params;
  const layoutEntry = resolveActivityLayout(handle);

  if (!layoutEntry) {
    throw new Response('Not Found', {status: 404});
  }

  return {
    handle,
    activityHandle: handle,
    activity: {
      title: layoutEntry.title,
      description: layoutEntry.description,
    },
  };
}

export default function ActivityPage() {
  /** @type {LoaderReturnData} */
  const {handle} = useLoaderData();
  const layoutEntry = resolveActivityLayout(handle);
  const Layout = layoutEntry?.Layout;


  if (!Layout) {
    return null;
  }

  return <Layout />;
}

/** @typedef {import('./+types/activity.$handle').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
