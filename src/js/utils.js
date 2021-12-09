export const getFromLSOrDefaultValue = (key, defaultValue) => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : defaultValue;
}

export const createSearchFilter = (formData) => {
  const {
    user,
    repository,
    typeOfSearch,
    condition,
    date
  } = formData;

  let searchCondition = '';

  if (user && repository && typeOfSearch && condition && date) {
    switch (condition) {
      case 'after':
        searchCondition = '>=';
        break;
      case 'before':
        searchCondition = '<=';
        break;
    }
  }

  const searchTypeOfSearch = typeOfSearch ? `is:${typeOfSearch}` : undefined;
  const searchDate = searchCondition && date ? `closed:${searchCondition}${date}` : undefined;

  return {
    user,
    repository,
    typeOfSearch: searchTypeOfSearch,
    date: searchDate
  };
}

const changeAnchorLink = (anchorElement, { user, repository, typeOfSearch, date }) => {
  if (anchorElement) { 
    anchorElement.href = `https://github.com/${user}/${repository}/issues?q=${encodeURI(`${typeOfSearch} ${date}`)}`;
    anchorElement.classList.remove('btn--disabled');
  } else {
    anchorElement.href = '#';
    anchorElement.classList.add('btn--disabled');
  }
}

export const validateForm = (formData, anchorElement) => {
  const filterData = createSearchFilter(formData);

  const isValid = filterData.user && filterData.repository && filterData.typeOfSearch && filterData.date;

  if (isValid && anchorElement) changeAnchorLink(anchorElement, filterData);
  
  return isValid;
}

export const getFormValues = (form) => {
  if (!form) return;
  
  const values = {}

  for (const input of Object.values(form)) {
    try {
      if (input.name.trim() && input.value.trim()) {
        values[input.name] = input.value;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return values;
}
