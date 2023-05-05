<h2 align="center">Chat App Server</h2>
<p align="center">
    <a href="https://github.com/Snail-Lu/chat-app-server" target="_blank">仓库地址</a>
    ·
    <a href="https://github.com/Snail-Lu/chat-app-server/issues" target="_blank">建议意见</a>
</p>

## 简介 
[Chat App](https://github.com/snail-lu/chat-app)项目的服务端，基于`Express` + `MongoDB`开发。

## 项目结构
```
chat-app-server
├── README.md               # 项目文档
│
├── package.json            # 项目依赖
│
├── .gitignore
│
├── public                  # 静态资源
│   └── styles              # 样式文件 
│
├── bin                     # 项目启动
│   └── www
│
├── models                  # 数据库模型定义
│   ├── chat.js             # 聊天模型
│   ├── user.js             # 用户模型
│   └── index.js            # 数据库连接
│
├── routes                  # 路由
│   ├── chat.js             # 聊天路由
│   ├── user.js             # 用户路由
│   └── index.js            # 根路由
│
├── socketIO                # 即时通讯
│   
└── views                   # 页面文件
    ├─ index.ejs            # 项目首页
    └─ error.ejs            # 报错页面

```

## 常用命令
1. 启动数据库
```bash
mongod --config /usr/local/etc/mongod.conf
```
2. 测试连接数据库

```bash
mongo
```

3. 本地启动
```bash
npm start
```

## 接口文档
项目启动后，访问`localhost:4000/swagger`查看接口文档。