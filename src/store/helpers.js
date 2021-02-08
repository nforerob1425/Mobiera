import Vue from "vue";
const REPLACEWITHCOMMA_WILDCARD = "REPLACE_WITH_COMMA";
const GettersHelper = {
  // Find an object in a list of objects by matching a property value.
  // userById: findByKey('users', 'id')
  // getters.userById('123')
  findByKey(prop, targetKey) {
    return state => val => state[prop].find(x => x[targetKey] === val);
  },

  // Filter a list of objects by matching a property value.
  // usersByStatus: filterByKey('users', 'status')
  // getters.usersByStatus('INACTIVE')
  filterByKey(prop, targetKey) {
    return state => vals => {
      if (!Array.isArray(vals)) vals = [vals];
      return state[prop].filter(x => vals.indexOf(x[targetKey]) > -1);
    };
  },

  mapKeys(prop, targetKey) {
    const filter = GettersHelper.filterByKey(prop, targetKey);
    return state => vals =>
      filter(state)(vals).sort(
        (a, b) => vals.indexOf(a[targetKey]) - vals.indexOf(b[targetKey])
      );
  }
};

const MutationsHelper = {
  // Find an object in a list of objects by matching a property value.
  // userById: findByKey('users', 'id')
  // getters.userById('123')
  set: key => (state, val) => {
    state[key] = val;
  },

  // Set a value at a path within state
  // Create objects and arrays as needed
  // Path is an array, and array indicies are numbers (not string numbers)
  // setUserName: setPath(['user', 'name'])
  // commit('setUserName', 'foo')
  setPath: path => (state, val) => {
    const last = xs => xs[xs.length - 1];
    const obj = path.slice(0, -1).reduce((acc, x, i) => {
      if (!(x in acc)) acc[x] = typeof path[i + 1] === "number" ? [] : {};
      return acc[x];
    }, state);
    obj[last(path)] = val;
  },

  // Toggle boolean in state
  // toggleOpen: toggle('open')
  // commit('toggleOpen')
  toggle: key => state => {
    state[key] = !state[key];
  },

  // For all key/value in propMap, set state[key] = data[propMap[value]]
  pick: propMap => (state, data) => {
    data = data || {};
    Object.keys(propMap).forEach(x => {
      state[x] = data[propMap[x]];
    });
  },

  // push an item onto a list
  // addItem: pushTo('items')
  pushTo: key => (state, val) => {
    state[key].push(val);
  },

  // copy all key/values from data to state
  // useful for resetting state to default values
  // resetState: assignConstant(initialState)
  // commit('resetState')
  assignConstant: data => state => {
    Object.assign(state, data);
  },

  // remove item from list
  omitFromList: key => (state, item) => {
    const index = state[key].indexOf(item);
    if (index > -1) {
      state[key].splice(index, 1);
    }
  },

  // increment the index of a list argument or a list in state
  incrementListIndex: (key, listOrListProp) => state => {
    const list = Array.isArray(listOrListProp)
      ? listOrListProp
      : state[listOrListProp];
    state[key] = (state[key] + 1) % list.length;
  },

  // add or extend a record in a list
  extendRecordInList: (key, idKey = "id", valKey) => (state, data) => {
    const id = data[idKey];
    const val = valKey ? data[valKey] : data;
    const index = state[key].findIndex(x => x[idKey] === id);
    return index < 0
      ? state[key].push(val)
      : state[key].splice(index, 1, Object.assign({}, state[key][index], val));
  },

  // add or replace a record in a list
  replaceRecordInList: (key, idKey = "id", valKey) => (state, data) => {
    const id = data[idKey];
    const val = valKey ? data[valKey] : data;
    const index = state[key].findIndex(x => x[idKey] === id);
    return index < 0 ? state[key].push(val) : state[key].splice(index, 1, val);
  },

  // Add or remove value
  addOrRemove: key => (state, val) => {
    let index = state[key].indexOf(val);
    let tt;
    let copy = Object.assign([], state[key]);
    if (index < 0) {
      tt = copy.push(val);
    } else {
      tt = copy.splice(index, 1);
    }
    Vue.set(state, key, copy);
    return tt;
  }
};
const StringHelper = {
  GetFromStringWithRegex(value) {
    let originalPattern = /(?:\[\[)(.*?)(?:\]\])+/g;
    let result = [];
    if (value != null && value != undefined) {
      let matches;
      var list = [];
      while ((matches = originalPattern.exec(value))) {
        list.push(matches[1]);
      }
      result = [list];
    }
    return result;
  }
};
const ArrayHelper = {
  DistinctArrayObjects(array) {
    var resultIds = Array.from(new Set(array.map(x => x.id)));

    var result = resultIds.map(y => {
      return { id: y, value: array.find(s => s.id === y).value };
    });
    return result;
  }
};
const FormValidationHelper = {
  RequiredField(value) {
    const valueToValidate = typeof value === "string" ? value.trim() : value;

    if (
      valueToValidate === "" ||
      valueToValidate == undefined ||
      valueToValidate == null
    ) {
      return "Field is required";
    } else {
      return true;
    }
  },
  MaximumLength(value, requiredLength) {
    if (!value) {
      return true;
    } else if (value.length > requiredLength) {
      return `Field must not exceed ${requiredLength} characters`;
    } else {
      return true;
    }
  },
  MiniumLength(value, requiredLength) {
    if (!value) {
      return true;
    } else if (value.length < requiredLength) {
      return `Field must contain at least ${requiredLength} characters`;
    } else {
      return true;
    }
  },
  MinimunElementsRequired(value, minimumQuantity) {
    if (value.length < minimumQuantity) {
      return `At least ${minimumQuantity} element is required`;
    } else {
      return true;
    }
  },
  MinimumLanguageRequired(value, minimumQuantity) {
    if (value.length < minimumQuantity) {
      return `Minimum ${minimumQuantity} language required`;
    } else {
      return true;
    }
  },
  EmailStructure(value, required = false) {
    if (!value && !required) {
      return true;
    } else {
      return (
        /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(
          value
        ) || "The email is invalid"
      );
    }
  },
  AtLeastOneLower(value) {
    return (
      /[a-z]/g.test(value) || "Must to contain at least one lower case letter"
    );
  },
  AtLeastOneNumber(value) {
    return /[0-9]/.test(value) || false;
  },
  AtLeastOneSpecialChar(value) {
    return /[!@#$%^&*(),.?":{}|<>]/g.test(value) || false;
  },
  RangeMatch(value, minValue, maxValue, required = false) {
    if (!value && !required) {
      return true;
    } else {
      return (
        (value >= minValue && value <= maxValue) ||
        `The value must be between ${minValue} and ${maxValue}`
      );
    }
  },
  MaxFileSize(value, sizeInBytes, required = false) {
    if ((!value || value.length) === 0 && !required) {
      return true;
    } else {
      return (
        !value ||
        value.size < sizeInBytes ||
        "File size should be less than 2 MB!"
      );
    }
  },
  CustomRule(conditionRule, message) {
    return conditionRule || message;
  },
  PasswordPolicy(value, required = false) {
    if (!value && !required) {
      return true;
    } else {
      return (
        /(?=^.{8,}$)((?!.*\s)(?=.*[A-Z])(?=.*[a-z]))((?=(.*\d){1,})|(?=(.*\W){1,}))^.*$/.test(
          value
        ) ||
        "Password must have minimum 8 characters and contain at least one lowercase letter, one uppercase letter and one special character or one number"
      );
    }
  },
  SpecialCharNotAllowed(value) {
    return (
      !/[^a-zA-Z0-9-._ ]/g.test(value) ||
      "Special characters are not allowed, use letters and numbers only"
    );
  },
  OnlyNumber(value) {
    return !/[^0-9]/g.test(value) || "Only numbers allowed";
  }
};
const FilterSanitizer = {
  SanitizerStringValue(conditionValue) {
    var formattedCondition = conditionValue;
    //- if condition has value
    if (!!conditionValue && conditionValue.length > 0) {
      //- scape user input backslashes
      var escapeBackSlashes = conditionValue.replace(/\\/g, "\\\\");
      //- sanitize comma
      var sanitizeCommas = escapeBackSlashes.replace(
        /,/g,
        REPLACEWITHCOMMA_WILDCARD
      );
      //- scape user input aposthrophe
      formattedCondition = sanitizeCommas.replace(/'/g, "\\'");
    }
    return formattedCondition;
  }
};

const FiltersHelper = {
  FilteredArrayByStringAttribute(searches, criteria, attribute) {
    if (criteria != null) {
      const search = criteria.toLowerCase().trim();
      searches = searches
        .filter(gs => gs[attribute].toLowerCase().indexOf(search) > -1)
        .sort((a, b) => {
          var textA = a[attribute].toUpperCase();
          var textB = b[attribute].toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
    }
    return searches;
  },
  FilteredArrayByPropAndValue(searches, criteria, attribute) {
    if (criteria != null) {
      const search = criteria;
      searches = searches.filter(gs => gs[attribute] == search);
    }
    return searches;
  }
};
export {
  GettersHelper,
  MutationsHelper,
  FormValidationHelper,
  StringHelper,
  ArrayHelper,
  FilterSanitizer,
  FiltersHelper
};
