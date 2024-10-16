import "../styles/FirstSelector.scss"

interface FirstSelectorProps {
  onClick: () => void
  selected: boolean
  option: {
    id: number
    name: string
    image: any
    description: string
  }
}

export default function FirstSelector({
  onClick,
  selected,
  option,
}: FirstSelectorProps) {
  return (
    <div
      onClick={onClick}
      className={
        selected
          ? "container__selector__item selected"
          : "container__selector__item"
      }
    >
      <img src={option.image} alt="logo" />
      <div className="container__selector__item__name">{option.name}</div>
      <div className="container__selector__item__description">
        {option.description}
      </div>
      <div className="circular-checkbox-container">
        <input
          type="checkbox"
          id={`circular-checkbox-${option.id}`}
          onClick={onClick}
        />
        <label
          htmlFor={`circular-checkbox-${option.id}`}
          className={selected ? "checked" : ""}
        >
          {selected ? "✓" : ""}
        </label>
      </div>
    </div>
  )
}
