import {useEffect, useRef, useState} from 'react';

function ColorPicture({color}) {
  return (
    <picture>
      <source media="(max-width: 1023px)" srcSet={color.mobImageUrl} />
      <source media="(min-width: 1024px)" srcSet={color.pcImageUrl} />
      <img src={color.pcImageUrl} alt={color.name} />
    </picture>
  );
}

export function TrendySection({title, description, colorsList}) {
  const [currentColor, setCurrentColor] = useState(colorsList[0]);
  const [outgoingColor, setOutgoingColor] = useState(null);
  const [incomingColor, setIncomingColor] = useState(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const isAnimatingRef = useRef(false);

  const selectedId = incomingColor?.id ?? currentColor.id;

  const handleSelect = (color) => {
    if (color.id === selectedId || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    setOutgoingColor(currentColor);
    setIncomingColor(color);
    setIsRevealing(false);
  };

  useEffect(() => {
    if (!incomingColor) return;

    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsRevealing(true));
    });

    return () => cancelAnimationFrame(frameId);
  }, [incomingColor]);

  const handleTransitionEnd = (event) => {
    if (event.propertyName !== 'clip-path') return;
    if (!incomingColor) return;

    setCurrentColor(incomingColor);
    setOutgoingColor(null);
    setIncomingColor(null);
    setIsRevealing(false);
    isAnimatingRef.current = false;
  };

  return (
    <div className="xros-mini-retro-trendy ui-v4-flex">
      <h3 className="ui-v4-title">{title}</h3>
      <p className="xros-mini-retro-trendy-description">{description}</p>
      <div className="xros-mini-retro-trendy-content ui-v4-flex">
        <div className="xros-mini-retro-trendy-content-show">
          {!outgoingColor ? (
            <div className="xros-mini-retro-trendy-content-show-layer">
              <ColorPicture color={currentColor} />
            </div>
          ) : (
            <>
              <div
                className={`xros-mini-retro-trendy-content-show-layer is-out${isRevealing ? ' is-leaving' : ''}`}
                aria-hidden="true"
              >
                <ColorPicture color={outgoingColor} />
              </div>
              <div
                className={`xros-mini-retro-trendy-content-show-layer is-in${isRevealing ? ' is-entering' : ''}`}
                onTransitionEnd={handleTransitionEnd}
              >
                <ColorPicture color={incomingColor} />
              </div>
            </>
          )}
          <div
            className="xros-mini-retro-trendy-content-show-mask"
            aria-hidden="true"
          >
            <picture>
              <source
                media="(max-width: 1023px)"
                srcSet="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-mob-06_1-inverted.svg"
              />
              <img
                src="https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-retro-6_1-inverted.svg"
                alt=""
              />
            </picture>
          </div>
        </div>
        <div className="xros-mini-retro-trendy-content-list">
          {colorsList.map((color) => (
            <div
              key={color.id}
              className={`xros-mini-retro-trendy-content-item ${color.id === selectedId ? `color-bg-${color.id}` : ''}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleSelect(color);
                }
              }}
              onClick={() => handleSelect(color)}
            >
              <div
                className={`xros-mini-retro-trendy-content-item__circle color-bg-${color.id}`}
              ></div>
              <p className="xros-mini-retro-trendy-content-item__color">
                {color.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
