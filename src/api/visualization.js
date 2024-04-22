// 用于从服务器获取可视化数据
import request from '@/utils/request.js'

export const getVisualization = () => {
    return request({
      url: "/visualization",
    });
}