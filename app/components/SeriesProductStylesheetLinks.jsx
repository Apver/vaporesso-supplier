import {useMatches} from 'react-router';
import {getSeriesProductStylesheetLinkDescriptors} from '~/config/series-product-links';

/**
 * RR7 的 `route.links()` 无参调用，拿不到 loader 里的 template；在 root `<head>` 用 matches 注入按模板分叉的 CSS。
 */
export function SeriesProductStylesheetLinks() {
  const matches = useMatches();
  const seriesMatch = matches.find(
    (m) => m.data && 'seriesProductTemplate' in m.data,
  );
  const template = seriesMatch?.data?.seriesProductTemplate ?? null;
  const descriptors = getSeriesProductStylesheetLinkDescriptors(
    template,
    Boolean(seriesMatch),
  );

  return (
    <>
      {descriptors.map((d) => (
        <link key={d.href} rel={d.rel} href={d.href} />
      ))}
    </>
  );
}
