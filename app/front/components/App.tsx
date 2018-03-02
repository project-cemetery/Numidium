import * as React from 'react'

import { Layout, Menu } from 'antd'
import { css } from 'emotion'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import ContentBlock from 'components/common/Content'
import IconWithText from 'components/common/IconWithText'
import IconEnum from 'util/enum/IconEnum'
import menu, { MenuItem, INDEX_PAGE } from 'menu'
import User from 'model/User'

import Dashboard from './dashboard/Dashboard'
import Vacations from './vacations/Vacations'

const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu


interface LocalState {
    collapsed: boolean
}

export default class App extends React.PureComponent<{}, LocalState> {

    state = {
        collapsed: false,
    } as LocalState

    onCollapse = (collapsed: boolean) => {
        this.setState({ collapsed })
    }

    render() {
        return (
            <Layout className={this.s('constainer')}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className={this.s('logo')} />
                    <Menu theme='dark' defaultSelectedKeys={[ INDEX_PAGE ]} mode='inline'>
                        {menu.map((item, i) => !!item.children
                            ? this.renderSubMenu(item)
                            : this.renderMenuItem(item)
                        )}
                    </Menu>
                </Sider>
                <Layout>
                    <Header className={this.s('header')} />
                    <Content className={this.s('content')}>
                        <Route path='/' exact component={Dashboard} />
                        <Route path='/vacations' component={Vacations} />
                    </Content>
                    <Footer className={this.s('footer')}>
                        Numidium © 2017 – {new Date().getFullYear()}
                    </Footer>
                </Layout>
            </Layout>
        )
    }

    renderSubMenu = (item: MenuItem) =>
        <SubMenu key={item.key} title={<IconWithText icon={item.icon} text={item.title} />}>
            {item.children && item.children.map(this.renderMenuItem)}
        </SubMenu>

    renderMenuItem = (item: MenuItem) =>
        <Menu.Item key={item.key}>
            <Link to={item.path || '/'}>
                <IconWithText icon={item.icon} text={item.title} />
            </Link>
        </Menu.Item>

    s = (className: string) => ({
        constainer: css`
            min-height: 100vh;
        `,
        logo: css`
            height: 32px;
            background: rgba(255,255,255,.2);
            margin: 16px;
        `,
        header: css`
            background: #fff;
            padding: 0;
        `,
        content: css`
            margin: 0 16px;
        `,
        footer: css`
            text-align: center;
        `,
    } as any)[className]
}
