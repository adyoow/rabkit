import Mock from '@/test'

const add = function (a, b) {
  return `${a + b} from ${Mock.name}`
}
export default {
  add
}
