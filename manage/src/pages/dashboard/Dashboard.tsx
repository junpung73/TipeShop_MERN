import { useState } from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  Progress,
  Button,
  Timeline,
  Radio,
} from "antd";
import {
  DollarTwoTone,
  IdcardTwoTone,
  HeartTwoTone,
  ShoppingTwoTone,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import Paragraph from "antd/lib/typography/Paragraph";
import Echart from "./chart/EChart";
import LineChart from "./chart/LineChart";

import ava1 from "./image/iphone.jpg";
import ava2 from "./image/logo-shopify.svg";
import ava3 from "./image/logo-shopify.svg";
import ava4 from "./image/logo-shopify.svg";
import ava5 from "./image/logo-shopify.svg";

import "./style.css";

const Dashboard = () => {
  const { Title, Text } = Typography;

  const [reverse, setReverse] = useState(false);

  const dollar = [
    <DollarTwoTone style={{ fontSize: '22px', color: '#08c' }}/>
  ];
  const profile = [
    <IdcardTwoTone style={{ fontSize: '22px', color: '#08c' }}/>
  ];
  const heart = [
    <HeartTwoTone style={{ fontSize: '22px', color: '#08c' }}/>
  ];
  const cart = [
    <ShoppingTwoTone style={{ fontSize: '22px', color: '#08c' }}/>
  ];
  const count = [
    {
      today: "Today’s Sales",
      title: "$53,000",
      persent: "+30%",
      icon: dollar,
      bnb: "bnb2",
    },
    {
      today: "Users",
      title: "3,200",
      persent: "+20%",
      icon: profile,
      bnb: "bnb2",
    },
    {
      today: "New Clients",
      title: "+1,200",
      persent: "-20%",
      icon: heart,
      bnb: "redtext",
    },
    {
      today: "New Orders",
      title: "$13,200",
      persent: "10%",
      icon: cart,
      bnb: "bnb2",
    },
  ];

  const list = [
    {
      img: ava1,
      Title: "Điện Thoại iPhone 13 Pro Max 512GB",
      bud: "$126,000",
      progress: <Progress percent={60} size="small" />
    },
    {
      img: ava2,
      Title: "Máy Tính Bảng Samsung Galaxy Tab S7 FE LTE T735 (4GB/64GB)",
      bud: "$3,000",
      progress: <Progress percent={10} size="small" />
    },
    {
      img: ava3,
      Title: "Điện thoại Samsung Galaxy M51",
      bud: "Not Set",
      progress: <Progress percent={100} size="small" status="active" />
    },
    {
      img: ava4,
      Title: "Ram Desktop Kingston Fury Beast (KF436C17BBK2/16) 16GB ",
      bud: "$4,000",
      progress: <Progress percent={80} size="small" />
    },

    {
      img: ava5,
      Title: "Máy tính laptop Surface Pro 7 Core I3 Ram 4Gb ",
      bud: "$2,000",
      progress: (
        <Progress
          percent={100}
          size="small"
          status="exception"
          format={() => "Cancel"}
        />
      )
    },
  ];

  const timelineList = [
    {
      title: "$2,400 - Redesign store",
      time: "09 JUN 7:20 PM",
      color: "green",
    },
    {
      title: "New order #3654323",
      time: "08 JUN 12:20 PM",
      color: "green",
    },
    {
      title: "Company server payments",
      time: "04 JUN 3:10 PM",
    },
    {
      title: "New card added for order #4826321",
      time: "02 JUN 2:45 PM",
    },
    {
      title: "Unlock folders for development",
      time: "18 MAY 1:30 PM",
    },
    {
      title: "New order #46282344",
      time: "14 MAY 3:30 PM",
      color: "gray",
    },
  ];

  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    }
  };

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Trending Products</Title>
                  <Paragraph className="lastweek">
                    done this month<span className="blue">40%</span>
                  </Paragraph>
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group  defaultValue="a">
                      <Radio.Button value="a">ALL</Radio.Button>
                      <Radio.Button value="b">ONLINE</Radio.Button>
                      <Radio.Button value="c">STORES</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div className="ant-list-box table-responsive">
                <table className="width-100">
                  <thead>
                    <tr>
                      <th>PRODUCST</th>
                      <th>REVENUE</th>
                      <th>COMPLETION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((d, index) => (
                      <tr key={index}>
                        <td>
                          <h6>
                            <img
                              src={d.img}
                              alt=""
                              className="avatar-sm mr-10"
                            />{" "}
                            {d.Title}
                          </h6>
                        </td>
                        <td>
                          <span className="text-xs font-weight-bold">
                            {d.bud}{" "}
                          </span>
                        </td>
                        <td>
                          <div className="percent-progress">{d.progress}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <div className="timeline-box">
                <Title level={5}>Orders History</Title>
                <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                  this month <span className="bnb2">20%</span>
                </Paragraph>

                <Timeline
                  pending="Recording..."
                  className="timelinelist"
                  reverse={reverse}
                >
                  {timelineList.map((t, index) => (
                    <Timeline.Item color={t.color} key={index}>
                      <Title level={5}>{t.title}</Title>
                      <Text>{t.time}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
                <Button
                  type="primary"
                  className="width-100"
                  onClick={() => setReverse(!reverse)}
                >
                  {<MenuUnfoldOutlined />} REVERSE
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Dashboard;
