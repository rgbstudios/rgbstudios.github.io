// https://stackoverflow.com/a/12830454
const roundNumber = (num, scale = 3) => +(Math.round(num + 'e+' + scale) + 'e-' + scale);

export default roundNumber;
