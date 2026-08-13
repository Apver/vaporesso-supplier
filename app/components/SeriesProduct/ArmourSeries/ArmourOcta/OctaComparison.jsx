const UpgradeIcon = ({ id }) => {
  const gradientId = `octa-upgrade-${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="19"
      viewBox="0 0 10 19"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 8.62703H6.99941V19H2.99941V8.62703H0L5 0L10 8.62703Z"
        fill={`url(#${gradientId})`}
      />

      <defs>
        <linearGradient
          id={gradientId}
          x1="5"
          y1="0.0901689"
          x2="5"
          y2="24.7568"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FE5A11" />

          <stop
            offset="1"
            stopColor="#FE5A11"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const OctaComparison = ({ data }) => {
  const {
    title,
    products = [],
    rows = [],
  } = data;

  return (
    <section className="octa-comparison">
      <div className="octa-comparison__container">
        <h2 className="octa-comparison__title">
          {title}
        </h2>

        <div className="octa-comparison__scroll">
          <table className="octa-comparison__table">
            <thead>
              <tr>
                <th className="octa-comparison__feature-head" />

                {products.map((product) => (
                  <th
                    key={product.key}
                    className={[
                      'octa-comparison__product-head',
                      product.highlight
                        ? 'octa-comparison__product-head--highlight'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <div className="octa-comparison__product">
                      {product.image && (
                        <picture className="octa-comparison__picture">
                          {product.image.mobile && (
                            <source
                              media="(max-width: 767px)"
                              srcSet={product.image.mobile}
                            />
                          )}

                          <img
                            src={product.image.pc}
                            alt={product.alt || product.name}
                            className="octa-comparison__product-image"
                          />
                        </picture>
                      )}

                      <div className="octa-comparison__product-name">
                        {product.name}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
            {rows.map((row, rowIndex) => {
                if (row.group) {
                return (
                    <tr
                    key={row.key}
                    className={[
                        'octa-comparison__row',
                        'octa-comparison__row--protection',
                    ].join(' ')}
                    >
                    <th
                        scope="row"
                        className="
                        octa-comparison__feature
                        octa-comparison__feature--group
                        "
                    >
                        <div className="octa-comparison__group-list">
                        {row.labels.map((item, index) => (
                            <div
                            key={index}
                            className={[
                                'octa-comparison__group-item',
                                item.muted
                                ? 'octa-comparison__group-item--muted'
                                : '',
                            ]
                                .filter(Boolean)
                                .join(' ')}
                            >
                            {item.text}
                            </div>
                        ))}
                        </div>
                    </th>

                    {products.map((product) => {
                        const values = row.values?.[product.key] || [];

                        return (
                        <td
                            key={`${row.key}-${product.key}`}
                            className={[
                            'octa-comparison__cell',
                            product.highlight
                                ? 'octa-comparison__cell--highlight'
                                : '',
                            ]
                            .filter(Boolean)
                            .join(' ')}
                        >
                            <div className="octa-comparison__group-list">
                            {values.map((cell, index) => (
                                <div
                                key={index}
                                className={[
                                    'octa-comparison__group-item',
                                    cell.muted
                                    ? 'octa-comparison__group-item--muted'
                                    : '',
                                ]
                                    .filter(Boolean)
                                    .join(' ')}
                                >
                                {cell.type === 'dot' ? (
                                    <span
                                    className={[
                                        'octa-comparison__dot',
                                        cell.variant === 'orange'
                                        ? 'octa-comparison__dot--orange'
                                        : '',
                                        cell.variant === 'outline'
                                        ? 'octa-comparison__dot--outline'
                                        : '',
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    />
                                ) : (
                                    <div className="octa-comparison__cell-title">
                                    {cell.title || cell.text}

                                    {cell.upgrade && (
                                        <span className="octa-comparison__upgrade">
                                        <UpgradeIcon
                                            id={`${row.key}-${product.key}-${index}`}
                                        />
                                        </span>
                                    )}
                                    </div>
                                )}
                                </div>
                            ))}
                            </div>
                        </td>
                        );
                    })}
                    </tr>
                );
                }
                return (
                <tr
                    key={row.key || rowIndex}
                    className={[
                    'octa-comparison__row',
                    `octa-comparison__row--${row.key}`,
                    ].join(' ')}
                >
                    <th
                    scope="row"
                    className={[
                        'octa-comparison__feature',
                        row.muted
                        ? 'octa-comparison__feature--muted'
                        : '',
                    ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                    {row.label}
                    </th>

                    {products.map((product) => {
                    const cell = row.values?.[product.key];

                    return (
                        <td
                        key={`${row.key}-${product.key}`}
                        className={[
                            'octa-comparison__cell',
                            product.highlight
                            ? 'octa-comparison__cell--highlight'
                            : '',
                            cell?.muted
                            ? 'octa-comparison__cell--muted'
                            : '',
                        ]
                            .filter(Boolean)
                            .join(' ')}
                        >
                        <div className="octa-comparison__cell-inner">
                            {cell?.type === 'dot' ? (
                            <span
                                className={[
                                'octa-comparison__dot',
                                product.highlight
                                    ? 'octa-comparison__dot--orange'
                                    : '',
                                ]
                                .filter(Boolean)
                                .join(' ')}
                            />
                            ) : (
                            <>
                                {cell?.title && (
                                <div className="octa-comparison__cell-title">
                                    {cell.title}

                                    {cell.upgrade && (
                                    <span className="octa-comparison__upgrade">
                                        <UpgradeIcon
                                        id={`${row.key}-${product.key}`}
                                        />
                                    </span>
                                    )}
                                </div>
                                )}

                                {cell?.description && (
                                <div className="octa-comparison__cell-desc">
                                    {cell.description}
                                </div>
                                )}

                                {!cell?.title &&
                                !cell?.description &&
                                cell?.text && (
                                    <div className="octa-comparison__cell-title">
                                    {cell.text}
                                    </div>
                                )}
                            </>
                            )}
                        </div>
                        </td>
                    );
                    })}
                </tr>
                );
            })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};