import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import { useHistory } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

export default function LayoutComponent(props: Props) {
  let history = useHistory();

  return (
    <>
      <Layout className="layout" >
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key={1} onClick={() => history.push("/listar")}>
              Listar tareas
            </Menu.Item>
            <Menu.Item key={2} onClick={() => history.push("/mantenedor")}>
              Crear tareas
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ minHeight: 800  }}>{props.children}</Content>
        <Footer style={{ textAlign: "center" }}>Juan Mansilla Asenjo</Footer>
      </Layout>
      ,
    </>
  );
}
