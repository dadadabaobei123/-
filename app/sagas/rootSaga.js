import { call, put, takeEvery, select } from 'redux-saga/effects';
import axios from 'axios';
import querystring from 'querystring';

export default function* () {
    // 拦截
    yield takeEvery('INIT', function* () {
        // 看见reducer中的current等数据。select就是看reducer的。
        const { current, pageSize, color, fuel, exhaust, engine } = yield select(({ esc }) => esc);

        // 发出Ajax，拉取车辆数据
        const { results, total } = yield axios.get(
            'http://192.168.2.250:3000/car?' + querystring.stringify({
                'page': current,
                'pagesize': pageSize,
                'color': color.join('v'),
                'fuel': fuel.join('v'),
                'engine': engine.join('v'),
                'exhaust': exhaust.join('v'),
            })
        ).then(data => data.data);
        // 转发2个action
        yield put({ 'type': 'CHANGERESULTS', results });
        yield put({ 'type': 'CHANGETOTAL', total });
    });

    // 拦截
    yield takeEvery('CHANGECURRENT_SAGA', function* ({ current }) {
        // 先put
        yield put({ 'type': 'CHANGECURRENT', current });
        yield put({ 'type': 'INIT' });
    });

    // 拦截
    yield takeEvery('CHANGEFILTER_SAGA', function* ({ k, v }) {
        // 先改变页码归1
        yield put({ 'type': 'CHANGECURRENT', 'current': 1 });
        // 先改变过滤器
        yield put({ 'type': 'CHANGEFILTER', k, v });
        // 拉取
        yield put({ 'type': 'INIT' });
    });
}
