import {Image} from '@shopify/hydrogen';

export function CollectionCard({collection}) {
  if (!collection) return null;

  const image = collection.image;

  return (
    <div className="collection-card">
      {image ? (
        <div className="collection-card__image">
          {/* <img
            src={image.url}
            alt={image.altText ?? collection.title}
            width={image.width ?? 300}
            height={image.height ?? 300}
            loading="lazy"
          /> */}
          <Image
            alt={image.altText || collection.title}
            data={image}
            key={image.id}
            sizes="(min-width: 45em) 50%, 100vw"
          />
        </div>
      ) : null}
      <div className="collection-card__info">
        <div className="collection-card__title">{collection.title}</div>
      </div>
    </div>
  );
}
