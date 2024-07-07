export const validateZipCode = (zip) => {
    return /^(?!0{3})\d{5}(?:-?\d{4})?$/.test(zip);
};