const RadioList = ({
    options,
    radioListName,
    handleOnClickOption,
    currentSelection,
    isHorizontal,
}) => {
    return (
        <ul className={`radio-list${isHorizontal ? " horizontal" : ""}`}>
            {options.map((option, i) => (
                <li key={`${radioListName}-option-${i}`}>
                    <input
                        defaultChecked={currentSelection === option.value}
                        type="radio"
                        name={radioListName}
                        {...option}
                    />
                    <label htmlFor={option.value} onClick={handleOnClickOption}>
                        {option.value}
                    </label>
                </li>
            ))}
        </ul>
    );
};

export default RadioList;
