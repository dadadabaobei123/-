const initObj = {
    // 页码
    current: 1,
    // 每页条数
    pageSize: 10,
    // 总数
    total: 0,
    // 颜色
    color: [],
    // 尾气
    exhaust: [],
    // 发动机
    engine: [],
    // 燃料
    fuel: [],
    // 放10辆车的数组
    results: []
};

export default (state = initObj, action) => {
    switch (action.type) {
        case 'CHANGERESULTS':
            return {
                ...state,
                'results': action.results
            };
        case 'CHANGETOTAL':
            return {
                ...state,
                'total': action.total
            };
        case 'CHANGECURRENT': 
            return {
                ...state,
                'current': action.current
            };
        case 'CHANGEFILTER':
            return {
                ...state,
                [action.k]: action.v
            }; 
    }
    return state;
};