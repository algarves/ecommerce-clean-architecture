import React, { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";
import Breadcrumb from "../Breadcrumb";
import { Layout } from "antd";
import { styled } from "./StructureStyled";

const { Content } = Layout;

type Props = {
  children: ReactNode,
};
const StructureView: React.FC<Props> = ({ children }) => {
  return (
    <Layout>
      <Header />
      <Content style={styled.content}>
        <Breadcrumb items={["teste01", "teste02"]}></Breadcrumb>
        <Layout
          className="site-layout-background"
          style={styled.layout}
        >
          {children}
        </Layout>
      </Content>
      <Footer />
    </Layout>
  );
};

export default StructureView;
