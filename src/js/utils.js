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

export const validateForm = () => {
  const fielValid = {
    type_of_search: {
      required: true,
    },
    input_user: {
      required: true,
    },
    input_repository: {
      required: true,
    },
    input_condition: {
      required: true,
    },
    input_date: {
      required: true,
    },
  };
  const fiels = document.querySelectorAll(
    ".box.d-inline input,.box.d-inline select"
  );

  let bool = true;
  for (var i in fiels) {
    if (!fiels.hasOwnProperty(i)) continue;
    const idFiel = fiels[i].getAttribute("id");

    const value = fiels[i].value.trim();
    if (fielValid[idFiel].required && !value) {
      fiels[i].classList.add("error");
      fiels[i].nextElementSibling.classList.add("span_error");
      fiels[i].nextElementSibling.innerHTML =
        "Please enter the required field";
      bool = false;
    } else {
      fiels[i].classList.remove("error");
      fiels[i].nextElementSibling.classList.remove("span_error");
      fiels[i].nextElementSibling.innerHTML = "";
    }
  }

  return bool;
};


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
