import request from '@/service';

// 获取账户列表
export function queryhome(data) {
    return request({
      url: '/home/index',
      method: 'post',
      data
    })
  }