import { useEffect, useState } from "react";

export interface ISelectedOptionProps {
  id: string;
}

export interface IOptionProps {
  id: ISelectedOptionProps;
  name: string;
}

interface IMultiSelectCompionentProps {
  selectRef: HTMLDivElement | any;
  options: IOptionProps[];
  getSeletcedData?: (data: ISelectedOptionProps[]) => void;
  selectedData?: ISelectedOptionProps[];
}

const MultiSelectComponent = (props: IMultiSelectCompionentProps) => {
  const {
    selectRef,
    options,
    getSeletcedData,
    selectedData
  } = props;
  const [selectedOptions, setSelectedOptions] = useState<ISelectedOptionProps[]>(selectedData || []);
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!selectRef?.current?.contains(event.target as HTMLElement))
        setIsOpenDropDown(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  const handleOptionSelect = (id: ISelectedOptionProps) => {
    const index = selectedOptions.indexOf(id);
    if (index === -1) {
        setSelectedOptions([...selectedOptions, id]);
        getSeletcedData?.([...selectedOptions, id])
    } else {
      const newSelected = [...selectedOptions];
      newSelected.splice(index, 1);
      setSelectedOptions(newSelected);
      getSeletcedData?.(newSelected)
      
    }
  };

  const toggleSelect = () => setIsOpenDropDown(!isOpenDropDown);

  return (
    <div className="multiple-select-input" ref={selectRef}>
      <div className="selected-options" onClick={() => toggleSelect()}>
        {selectedOptions.length > 0 ? (
          selectedOptions.map(
            (optionId: ISelectedOptionProps, index: number) => (
              <span key={`${optionId}${index}`} className="chip">
                {options.find((option) => option.id === optionId)?.name}
                <button
                  type="button"
                  onClick={() => handleOptionSelect(optionId)}
                  className="remove-button"
                >
                  x
                </button>
              </span>
            )
          )
        ) : (
          <span className="placeholder">Select options...</span>
        )}
      </div>
      {isOpenDropDown && (
        <div className={`options ${isOpenDropDown ? "open" : ""}`}>
          {options.map((option: IOptionProps, index: number) => (
            <label key={`${option.id}${index}`} className="checkbox">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option?.id)}
                onChange={() => handleOptionSelect(option?.id)}
                className="checkbox-input"
              />
              <span className="checkbox-label">{option.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectComponent;
