import validatejs from "validate.js";
import {showToast} from "./common";
// https://github.com/lawnstarter/react-native-form-helpers/tree/5bf9f1f27be1628927af1eea4753edb1265ec76a/demoApp
const validationDictionary = {
  bool: {
    presence: { allowEmpty: false, message: "^required"}
  },

  day: {
    presence: { allowEmpty: false, message: "^required" },
    numericality: { greaterThan: 0, lessThanOrEqualTo: 31, message: "^notValid" }
  },

  email: {
    presence: { allowEmpty: false, message: '^required' },
    email: {  message: "^notValid" }
  },

  genericRequired: {
    presence: { allowEmpty: false, message: "^required" }
  },

  generic: {
    presence: { allowEmpty: true, message: "^required" }
  },

  integer: {
    presence: { allowEmpty: true, message: "^required" },
    numericality: { greaterThan: -1, onlyInteger: true, message: "^notValid" }
  },

  integerRequired: {
    presence: { allowEmpty: false, message: "^required" },
    numericality: { greaterThan: -1, onlyInteger: true, message: "^notValid" }
  },

  month: {
    presence: { allowEmpty: false, message: "^required" },
    numericality: { greaterThan: 0, lessThanOrEqualTo: 12, message: "^notValid" }
  },

  password: {
    presence: { allowEmpty: false, message: "^required" },
    length: { minimum: 4, message: "^tooShort" },
  },

  confirmPassword: {
    presence: { allowEmpty: false, message: "^required" },
    equality: { attribute: "password", message: "^doesntMatch" ,comparator: function(v1, v2) {
        return JSON.stringify(v1) === JSON.stringify(v2);
        console.log("v1", v1, v2);
      }},
  },

  phone: {
    presence: { allowEmpty: false, message: "^required" },
    format: { pattern: /^[2-9]\d{2}-\d{3}-\d{4}$/, message: "^Phone number must be valid" }
  },

  state: {
    presence: { allowEmpty: false, message: "^required" },
    inclusion: {
      within: [ "AK", "AL", "AR", ], message: "^notValid" }
  },

  zip: {
    presence: { allowEmpty: false, message: "^required" },
    length: { is: 5, message: "^Zip must be 5 digits long" }
  }
};

function onInputChange({ field, value, obj='inputs', onChangeValidation =false, cb = () => {} }) {
  const inputs = this.state[obj];
  this.setState(
    {
      [obj]: {
        ...inputs,
        [field]: getInputValidationState({
          input: inputs[field],
          value,
          onChangeValidation
        })
      }
    },
    cb
  );
}

function getInputValidationState({ input, value, onChangeValidation=true }) {
  return {
    ...input,
    value,
    error: input.optional || !onChangeValidation
      ? null
      : validateInput({ type: input.type, value })
  };
}

function validateInput({ type, value }) {
  const result = validatejs(
    {
      [type]: value
    },
    {
      [type]: validationDictionary[type]
    }
  );

  if (result) {
    return result[type][0];
  }

  return null;
}

function getFormValidation({obj='inputs'}) {
  const inputs = this.state[obj];

  const updatedInputs = {};
  let validForm= true;

  for (const [key, input] of Object.entries(inputs)) {
    updatedInputs[key] = getInputValidationState({
      input,
      value: input.value
    });
    if(updatedInputs[key].error && validForm) validForm=false; 
  }

  this.setState({
    [obj]: updatedInputs,
    validForm : validForm
  });
}

function renderError(obj, field, fieldName, toast) {
  const { language, errorStyle } = this.props;
  const inputs = this.state[obj];
  if (inputs[field].error) {
    let err = `${language[fieldName]} ${language[inputs[field].error]}`;
    if(toast){
      showToast(err,"danger");
    }else{
      return err;
    }
  }
  return null;
}

export const validationService = {
  onInputChange,
  getInputValidationState,
  validateInput,
  getFormValidation,
  renderError
};