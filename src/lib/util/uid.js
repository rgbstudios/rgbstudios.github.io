/**
 * Creates a unique ID for accessing data
 *
 * ID is base 36 (lowercase letters and numbers).
 * ID is generated using random numbers in combination with the current timestamp.
 * It would be impossible to generate a duplicate ID unless timestamps are identical.
 * The odds any two IDs with identical timestamps are the same are 1/36^10
 */

const uid = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

export default uid;
