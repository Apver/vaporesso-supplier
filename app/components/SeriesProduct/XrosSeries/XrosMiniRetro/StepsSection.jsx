export function StepsSection({title, stepsList}) {
  return (
    <div className="xros-mini-retro-steps ui-v4-flex">
      <h3 className="ui-v4-title">{title}</h3>
      <div className="xros-mini-retro-steps-content ui-v4-flex">
        {stepsList.map((step) => (
          <div key={step.id} className="xros-mini-retro-steps-content-item">
            <picture>
              <source media="(max-width: 1023px)" srcSet={step.mobImageUrl} />
              <source media="(min-width: 1024px)" srcSet={step.pcImageUrl} />
              <img src={step.pcImageUrl} alt={step.name} />
            </picture>
            <p className="xros-mini-retro-steps-content-item-title">
              {step.title}
            </p>
            <p className="xros-mini-retro-steps-content-item-description">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
