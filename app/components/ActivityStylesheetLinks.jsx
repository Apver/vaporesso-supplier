import {useMatches} from 'react-router';
import {getActivityStylesheetLinkDescriptors} from '~/config/activity-links';

/**
 * RR7 的 `route.links()` 无参调用，拿不到 loader 里的 activityHandle；在 root `<head>` 用 matches 注入按活动页分叉的 CSS。
 */
export function ActivityStylesheetLinks() {
  const matches = useMatches();
  const activityMatch = matches.find(
    (m) => m.data && 'activityHandle' in m.data,
  );
  const activityHandle = activityMatch?.data?.activityHandle ?? null;
  const descriptors = getActivityStylesheetLinkDescriptors(
    activityHandle,
    Boolean(activityMatch),
  );

  return (
    <>
      {descriptors.map((d, index) => (
        <link
          key={d.href ?? `${d.rel}-${index}`}
          rel={d.rel}
          href={d.href}
          crossOrigin={d.crossOrigin}
        />
      ))}
    </>
  );
}
