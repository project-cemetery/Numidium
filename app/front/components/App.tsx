import * as React from 'react'

import { Layout, Menu } from 'antd'
import { css } from 'emotion'
import { Route, Link } from 'react-router-dom'

import ContentBlock from 'components/common/Content'
import IconWithText from 'components/common/IconWithText'
import IconEnum from 'util/IconEnum'
import menu, { MenuItem, INDEX_PAGE } from 'menu'

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
            <Layout className={s.constainer}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className={s.logo} />
                    <Menu theme='dark' defaultSelectedKeys={[ INDEX_PAGE ]} mode='inline'>
                        {menu.map((item, i) => !!item.children
                            ? renderSubMenu(item)
                            : renderMenuItem(item)
                        )}
                    </Menu>
                </Sider>
                <Layout>
                    <Header className={s.header} />
                    <Content className={s.content}>
                        <ContentBlock />
                    </Content>
                    <Footer className={s.footer}>
                        Numidium © 2017 – {new Date().getFullYear()}
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

const renderSubMenu = (item: MenuItem) =>
    <SubMenu key={item.key} title={<IconWithText icon={item.icon} text={item.title} />}>
        {item.children && item.children.map(renderMenuItem)}
    </SubMenu>

const renderMenuItem = (item: MenuItem) =>
    <Menu.Item key={item.key}>
        <Link to={item.path || '/'}>
            <IconWithText icon={item.icon} text={item.title} />
        </Link>
    </Menu.Item>


const s = {
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
}
