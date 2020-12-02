const Mock = require('mockjs')

const data = Mock.mock({
  'items|6': [{
    id: '@id',
    title: '@word(3)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)',
    'number|+1':  1,
    commodifyId:'@word(3)',
  }]
})

module.exports = [
  {
    url: '/backGround/commodify/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/backGround/container/list',
    type: 'post',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          items
        }
      }
    }
  }
]
