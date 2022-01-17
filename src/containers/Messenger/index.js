import React, { useState } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./style.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  AvatarGroup,
  Button,
  Conversation,
  ConversationHeader,
  StarButton,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
  ConversationList,
  InputToolbox,
  Loader,
  TypingIndicator,
  StatusList,
  Status,
  Sidebar,
  Search,
  MessageSeparator,
  action,
  ExpansionPanel,
} from "@chatscope/chat-ui-kit-react";

export default function App() {
  const [messageInputValue, setMessageInputValue] = useState("");
  const avatarIco =
    "https://firebasestorage.googleapis.com/v0/b/chat-buddy-b3873.appspot.com/o/users%2FXC1cpyoeu8WX7LhyQZ2g9bfW1EX2?alt=media&token=d4318c56-9fbc-41bf-9fdd-e82467b9cb56";

  return (
    <div
      style={{
        height: "100vh",
        position: "relative",
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={true}>
          <Search placeholder="Search..." />
          <ConversationList>
            <Conversation
              name="Lilly"
              lastSenderName="Lilly"
              info="Yes i can do it for you"
            >
              <Avatar src={avatarIco} name="Lilly" status="available" />
            </Conversation>

            <Conversation
              name="Joe"
              lastSenderName="Joe"
              info="Yes i can do it for you"
            >
              <Avatar src={avatarIco} name="Joe" status="dnd" />
            </Conversation>

            <Conversation
              name="Emily"
              lastSenderName="Emily"
              info="Yes i can do it for you"
              unreadCnt={3}
            >
              <Avatar src={avatarIco} name="Emily" status="available" />
            </Conversation>

            <Conversation
              name="Kai"
              lastSenderName="Kai"
              info="Yes i can do it for you"
              unreadDot
            >
              <Avatar src={avatarIco} name="Kai" status="unavailable" />
            </Conversation>

            <Conversation
              name="Akane"
              lastSenderName="Akane"
              info="Yes i can do it for you"
            >
              <Avatar src={avatarIco} name="Akane" status="eager" />
            </Conversation>

            <Conversation
              name="Eliot"
              lastSenderName="Eliot"
              info="Yes i can do it for you"
            >
              <Avatar src={avatarIco} name="Eliot" status="away" />
            </Conversation>

            <Conversation
              name="Zoe"
              lastSenderName="Zoe"
              info="Yes i can do it for you"
              active
            >
              <Avatar src={avatarIco} name="Zoe" status="dnd" />
            </Conversation>

            <Conversation
              name="Patrik"
              lastSenderName="Patrik"
              info="Yes i can do it for you"
            >
              <Avatar src={avatarIco} name="Patrik" status="invisible" />
            </Conversation>
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={avatarIco} name="Zoe" />
            <ConversationHeader.Content
              userName="Zoe"
              info="Active 10 mins ago"
            />
            {/* <ConversationHeader.Actions>
              <VoiceCallButton />
              <VideoCallButton />
              <InfoButton />
            </ConversationHeader.Actions> */}
          </ConversationHeader>
          <MessageList
            typingIndicator={<TypingIndicator content="Zoe is typing" />}
          >
            <MessageSeparator content="Saturday, 30 November 2019" />

            <Message
              model={{
                message: "Hello my friend 1",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "single",
              }}
            >
              <Avatar src={avatarIco} name="Zoe" />
            </Message>

            <Message
              model={{
                message: "Hello my friend 2",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "single",
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "first",
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "normal",
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "normal",
              }}
              avatarSpacer
            />

            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "first",
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "last",
              }}
            >
              <Avatar src={avatarIco} name="Zoe" />
            </Message>
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={() => setMessageInputValue("")}
          />
        </ChatContainer>

        {/* <Sidebar position="right">
          <ExpansionPanel open title="INFO">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
          <ExpansionPanel title="LOCALIZATION">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
          <ExpansionPanel title="MEDIA">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
          <ExpansionPanel title="SURVEY">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
          <ExpansionPanel title="OPTIONS">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
        </Sidebar> */}
      </MainContainer>
    </div>
  );
}

// import React, { useState } from "react";
// import { Layout, Menu, Affix } from "antd";
// import {
//   AppstoreOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   ShopOutlined,
//   TeamOutlined,
//   UserOutlined,
//   UploadOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons";
// import "./style.css";
// import { connect } from "react-redux";
// //
// import UserIcon from "../../components/Posts/UserIcon";
// //
// function Messenger(props) {
//   const { currentUser, allUsers } = props;
//   const { Header, Content, Footer, Sider } = Layout;
//   const [collapsed, setcollapsed] = useState(false);

//   const onCollapse = (collapsed) => {
//     setcollapsed(collapsed);
//   };

//   const sidebarCollapsedWidth = 80;
//   const sidebarWidth = 250;
//   //
//   const menuItem = (friendId) => {
//     const friend = allUsers[friendId];
//     if (friend) {
//       const { displayName, uid, photoURL } = friend;
//       return (
//         <>
//           <Menu.Item
//             style={{
//               padding: "0.2rem",
//               height: 55,
//             }}
//             key={uid}
//             icon={<UserIcon src={photoURL} />}
//           >
//             {displayName}
//           </Menu.Item>
//           {/* <hr /> */}
//         </>
//       );
//     }
//     return;
//   };
//   //
//   return (
//     <Layout hasSider>
//       <Sider
//         style={{
//           overflow: "auto",
//           height: "100vh",
//           position: "fixed",
//           left: 0,
//           top: 0,
//           bottom: 0,
//         }}
//         // collapsible
//         breakpoint="md"
//         collapsedWidth={sidebarCollapsedWidth}
//         width={sidebarWidth}
//         onBreakpoint={(broken) => {
//           console.log("onbreakpoint", broken);
//         }}
//         onCollapse={onCollapse}
//         theme="light"
//       >
//         <div className="logo" />
//         <Menu theme="light" mode="inline" defaultSelectedKeys={["4"]}>
//           <Affix offsetTop={0}>
//             <Header
//               theme="light"
//               className="site-layout-background"
//               style={{ padding: 0 }}
//             />
//           </Affix>
//           {currentUser.friends
//             ? currentUser.friends.map((id, index) => menuItem(id))
//             : null}
//         </Menu>
//       </Sider>
//       <Layout
//         className="site-layout"
//         style={{ marginLeft: collapsed ? sidebarCollapsedWidth : sidebarWidth }}
//       >
//         <Header
//           theme="light"
//           className="site-layout-background"
//           style={{ padding: 0 }}
//         />
//         <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
//           <div className="site-layout-background" style={{ padding: 24 }}>
//             ...
//             <br />
//             Really
//             <br />
//             ...
//             <br />
//             ...
//             <br />
//             ...
//             <br />
//             long
//             <br />
//             ...
//             <br />
//             ...
//             <br />
//             ...
//             <br />
//             ...
//             <br />
//             ...
//             <br />
//             content
//           </div>
//         </Content>
//         <Footer style={{ textAlign: "center" }}>
//           Ant Design ©2018 Created by Ant UED
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// }
// const mapStateToProps = (state) => ({
//   currentUser: state.global.currentUser,
//   allUsers: state.global.allUsers,
// });
// export default connect(mapStateToProps, null)(Messenger);
