import {Image} from '@shopify/hydrogen';

export function ProductCard({
  product,
  type = 'medium',
  preferNewImg = false,
  hideNewDesc = false,
}) {
  if (!product) return null;

  const typeClass = `product-card__${type}`;

  const newImgMeta =
    preferNewImg &&
    product?.metafields?.find(
      (m) => m?.key === 'newimg' && m?.namespace === 'custom',
    );
  const newImgRef = newImgMeta?.reference;
  const newImgImage =
    preferNewImg && newImgRef?.image
      ? {
          id:
            newImgRef.image.id ||
            newImgRef.id ||
            newImgMeta.id ||
            `newimg-${product.id || ''}`,
          altText: newImgRef.image.altText || product.title,
          url: newImgRef.image.url,
          width: newImgRef.image.width,
          height: newImgRef.image.height,
        }
      : null;

  const image = newImgImage || product.featuredImage;

  // 要防止 metafields 中出现 null
  const newMeta = product?.metafields?.find(
    (m) => m && m.key === 'newdesc' && m.namespace === 'custom',
  );
  const newDescValue = newMeta?.value ?? '';

  return (
    <div
      className={`product-card ${typeClass}${preferNewImg ? ' mega-menu-product-card' : ''}`}
    >
      {image && (
        <div className="product-card__image">
          <Image
            alt={image.altText || product.title}
            data={image}
            key={image.id}
            sizes="(min-width: 45em) 100%, 100vw"
          />
        </div>
      )}

      <div className="product-card__info">
        <div className="product-card__title">{product.title}</div>
        {newDescValue && !hideNewDesc && (
          <div className="product-card__new-label">{newDescValue}</div>
        )}
      </div>
    </div>
  );
}
