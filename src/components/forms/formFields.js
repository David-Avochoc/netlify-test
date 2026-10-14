
/**
 * @typedef {Object} FormOption
 * @property {string} label
 * @property {string} value
 */

/**
 * @typedef {Object} FormField
 * @property {string} name
 * @property {string} label
 * @property {
 *   "text" |
 *   "email" |
 *   "tel" |
 *   "number" |
 *   "url" |
 *   "password" |
 *   "search" |
 *   "date" |
 *   "time" |
 *   "datetime-local" |
 *   "month" |
 *   "week" |
 *   "color" |
 *   "file" |
 *   "hidden" |
 *   "checkbox" |
 *   "radio" |
 *   "range" |
 *   "submit" |
 *   "reset" |
 *   "button" |
 *   "textarea" |
 *   "select"
 * } [type]
 * @property {string} [placeholder]
 * @property {boolean} [required]
 * @property {"full" | "half"} [width]
 * @property {number} [rows]
 * @property {FormOption[]} [options]
 */

/** @type {Record<string, FormField>} */
export const formFieldConfig = {
  fullName: {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    required: true,
    width: "half",
  },

  email: {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "name@company.com",
    required: true,
    width: "half",
  },

  company: {
    name: "company",
    label: "Company",
    type: "text",
    placeholder: "Enter company name",
    required: false,
    width: "full",
  },

  phone: {
    name: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "Enter phone number",
    required: false,
    width: "full",
  },

  message: {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Type your message",
    required: true,
    width: "full",
    rows: 4,
  },
};

/** @type {FormField[]} */
export const formFields = Object.values(formFieldConfig);
