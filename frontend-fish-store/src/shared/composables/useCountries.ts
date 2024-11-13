import countries from 'src/assets/data/countries';

export const useCountries = function () {
  function list(): { label: string; value: string }[] {
    return countries;
  }
  function getLabelByAlpha2(val: string): string | undefined {
    return countries.find((item) => item.value === val)?.label;
  }
  function getValueByLabel(label: string): string | undefined {
    return countries.find((item) => item.label === label)?.value;
  }

  return {
    list,
    getLabelByAlpha2,
    getValueByLabel,
  };
};
