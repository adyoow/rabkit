export function add(...args) {
  return args.reduce((ac, cur) => ac + cur)
}
