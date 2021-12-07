export const getFromLSOrDefaultValue = (key, defaultValue) => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : defaultValue;
}

export const validateForm = (formData, anchorElement) => {
  if (!anchorElement) return;

  if (formData.user && formData.repository && formData.typeOfSearch && formData.condition && formData.date) {
    let condition = ''; 
    
    switch (formData.condition) {
    case 'after':
      condition = '>=';
      break;
    case 'before':
      condition = '<=';
      break; 
    }

    anchorElement.href = `https://github.com/${formData.user}/${formData.repository}/issues?q=${encodeURI(`is:${formData.typeOfSearch} closed:${condition}${formData.date}`)}`;
    anchorElement.classList.remove('btn--disabled');
  } else {
    anchorElement.href = '#';
    anchorElement.classList.add('btn--disabled');
  }
}
