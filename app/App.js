import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Checkbox, Tag } from 'antd';

import './less/ys.less';

@connect(
    ({ esc }) => ({
        // 页码
        current: esc.current,
        // 总数
        total: esc.total,
        // 数组
        results: esc.results,
        // 筛选条件们：
        color: esc.color,
        fuel: esc.fuel,
        engine: esc.engine,
        exhaust: esc.exhaust
    }),
    dispatch => ({
        dispatch
    })
)
export default class App extends Component {
    // 生命周期
    componentWillMount() {
        // 初始化，被saga拦截
        this.props.dispatch({ 'type': 'INIT' });
    }
    render() {
        return (
            <div className="wrap">
                <Checkbox.Group 
                    value={this.props.color}
                    onChange={(v)=>{
                        this.props.dispatch({'type': 'CHANGEFILTER_SAGA', 'k': 'color', v});
                    }}
                >
                    {
                        ['红', '黄', '黑', '白', '蓝'].map(item => <Checkbox
                            key={item}
                            value={item}
                        >
                            {item}
                        </Checkbox>)
                    }
                </Checkbox.Group>
                <br />
                <Checkbox.Group 
                    value={this.props.fuel}
                    onChange={(v)=>{
                        this.props.dispatch({'type': 'CHANGEFILTER_SAGA', 'k': 'fuel', v});
                    }}
                >
                    {
                        ['汽油', '柴油', '油电混合', '纯电动'].map(item => <Checkbox
                            key={item}
                            value={item}
                        >
                            {item}
                        </Checkbox>)
                    }
                </Checkbox.Group>

                <br />
                <Checkbox.Group 
                    value={this.props.engine}
                    onChange={(v)=>{
                        this.props.dispatch({'type': 'CHANGEFILTER_SAGA', 'k': 'engine', v});
                    }}
                >
                    {
                        ['1.6L', '2.0L', '2.2L'].map(item => <Checkbox
                            key={item}
                            value={item}
                        >
                            {item}
                        </Checkbox>)
                    }
                </Checkbox.Group>

                <br />
                <Checkbox.Group 
                    value={this.props.exhaust}
                    onChange={(v)=>{
                        this.props.dispatch({'type': 'CHANGEFILTER_SAGA', 'k': 'exhaust', v});
                    }}
                >
                    {
                        ['国一', '国二', '国三', '国四', '国五'].map(item => <Checkbox
                            key={item}
                            value={item}
                        >
                            {item}
                        </Checkbox>)
                    }
                </Checkbox.Group>

                <br />
                
                {
                    [
                        {'e': 'color', 'c': '颜色'},
                        {'e': 'fuel', 'c': '燃料'},
                        {'e': 'engine', 'c': '发动机'},
                        {'e': 'exhaust', 'c': '排放'}
                    ].map(item => {
                        if ( this.props[item.e].length != 0 ) {
                            return <Tag key={item.e} closable onClose={()=>{
                                this.props.dispatch({'type': 'CHANGEFILTER_SAGA', 'k': item.e, 'v': []})
                            }}>
                                {item.c}： {this.props[item.e].join(' 或 ')}
                            </Tag>
                        }
                        return null;
                    })
                }


                <h3>共{this.props.total}辆车符合要求</h3>
                <Table
                    rowKey="id"
                    columns={[
                        {
                            'title': '图片',
                            'key': 'image',
                            'dataIndex': 'image',
                            'render': (txt, { id }) => {
                                return <div>
                                    <img src={`http://192.168.2.250:3000/images/carimages_small/${id}/view/${txt}`} />
                                </div>
                            }
                        },
                        { 'title': '编号', 'key': 'id', 'dataIndex': 'id' },
                        { 'title': '品牌', 'key': 'brand', 'dataIndex': 'brand' },
                        { 'title': '车系', 'key': 'series', 'dataIndex': 'series' },
                        { 'title': '颜色', 'key': 'color', 'dataIndex': 'color' },
                        { 'title': '发动机', 'key': 'engine', 'dataIndex': 'engine' },
                        { 'title': '尾气', 'key': 'exhaust', 'dataIndex': 'exhaust' },
                        { 'title': '燃料', 'key': 'fuel', 'dataIndex': 'fuel' }
                    ]}
                    dataSource={this.props.results}
                    pagination={{
                        'total': this.props.total,
                        'current': this.props.current,
                        'pageSize': this.props.pageSize,
                        'onChange': (current) => {
                            this.props.dispatch({ 'type': 'CHANGECURRENT_SAGA', 'current': current });
                        }
                    }}
                />
            </div>
        );
    }
};
