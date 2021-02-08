export const ObjectHelper = {
  toCamel: function(o) {
    var newO, origKey, newKey, value;
    if (o instanceof Array) {
      return o.map(function(value) {
        if (typeof value === "object") {
          // eslint-disable-next-line no-undef
          value = this.toCamel(value);
        }
        return value;
      });
    } else {
      newO = {};
      for (origKey in o) {
        if (o.hasOwnProperty(origKey)) {
          newKey = (
            origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey
          ).toString();
          value = o[origKey];
          if (
            value instanceof Array ||
            (value !== null && value.constructor === Object)
          ) {
            // eslint-disable-next-line no-undef
            value = this.toCamel(value);
          }
          newO[newKey] = value;
        }
      }
    }
    return newO;
  }
};
