# 📚 图片分享管理系统后台 API 文档

> **版本**: v1.0  
> **基础URL**: `http://localhost:3000`  
> **在线文档**: `http://localhost:3000/api-docs` (Swagger UI)

---

## 🔐 认证说明

当前版本为**内部管理系统**，无需 Token 认证。生产环境建议添加管理员登录验证。

---

## 📊 统一响应格式

所有接口均返回以下 JSON 格式：

```json
{
  "code": 1,        // 1=成功, 0=失败
  "message": "...", // 提示信息
  "data": ...       // 业务数据（字段名为 data，首字母小写）
}
```

---

## 🎯 系统架构

```
┌─────────────────────────────────┐
│   SpringBoot 原系统 (用户端)     │
│   - 用户注册/登录               │
│   - 上传/点赞/评论图片          │
│   - 搜索/浏览                   │
└──────────────┬──────────────────┘
               │ 共享数据库 mydb
               ▼
┌─────────────────────────────────┐
│   NestJS 本系统 (管理端)         │
│   - 用户管理                    │
│   - 图片审核                    │
│   - 评论管理                    │
│   - 数据统计                    │
└─────────────────────────────────┘
```

---

# 一、Dashboard 数据仪表盘

**路径前缀**: `/admin/dashboard`

---

## 1.1 系统概览数据

```
GET /admin/dashboard/overview
```

### 功能描述

获取系统的核心指标概览，适合在管理后台首页展示。

### 返回示例

```json
{
  "code": 1,
  "message": "概览数据获取成功",
  "data": {
    "users": {
      "total": 100,        // 总注册用户数
      "todayNew": 5        // 今日新注册用户数
    },
    "images": {
      "total": 500,        // 总图片数
      "todayUploads": 20,  // 今日新增上传数
      "totalViews": 12000  // 总浏览量
    },
    "comments": {
      "total": 2000,       // 总评论数
      "todayNew": 50       // 今日新增评论数
    },
    "likes": {
      "total": 3000        // 总点赞数
    }
  }
}
```

### 使用场景

- 管理后台首页大屏展示
- 实时监控核心指标
- 快速了解系统运营状况

---

## 1.2 趋势分析数据

```
GET /admin/dashboard/trends
```

### 功能描述

获取近7天的趋势数据和排行榜，适合用图表展示趋势变化。

### 返回示例

```json
{
  "code": 1,
  "message": "趋势数据获取成功",
  "data": {
    "last7Days": [
      {
        "date": "2026-05-24",
        "uploads": 15,      // 当天上传量
        "comments": 30,     // 当天评论量
        "newUsers": 3       // 当天新用户
      }
      // ... 近7天的数据
    ],
    "activeUsers": [        // 活跃用户 TOP5
      {
        "uid": 1,
        "uname": "张三",
        "imgCount": 20      // 上传图片数
      }
    ],
    "hotImages": [          // 热门图片 TOP5
      {
        "iid": 1,
        "iname": "风景图",
        "pageview": 1000    // 浏览量
      }
    ]
  }
}
```

### 使用场景

- 折线图展示近7天趋势
- 排行榜展示活跃用户和热门内容
- 数据分析和决策支持

---

# 二、User 用户管理

**路径前缀**: `/admin/user`

---

## 2.1 获取用户列表

```
GET /admin/user/list?page=1&pageSize=10
```

### Query 参数

| 参数 | 类型 | 必填 | 说明 | 示例 |
|------|------|------|------|------|
| `page` | Integer | 否 | 页码（从1开始） | 1 |
| `pageSize` | Integer | 否 | 每页数量 | 10 |

### 返回示例

```json
{
  "code": 1,
  "message": "",
  "data": {
    "list": [
      {
        "uid": 1,
        "uname": "张三",
        "imgCount": 10,           // 该用户的图片数量
        "commentCount": 25,       // 评论数量
        "likeImgCount": 30,       // 点赞的图片数
        "likeCommentCount": 15    // 点赞的评论数
      }
    ],
    "total": 100,
    "page": 1,
    "pageSize": 10
  }
}
```

### 特色功能

- 自动计算每个用户的活跃度指标
- 支持分页浏览大量用户
- 可用于发现异常用户（如刷量账号）

---

## 2.2 搜索用户

```
GET /admin/user/search?uname=张三
```

### Query 参数

| 参数 | 类型 | 必填 | 说明 | 示例 |
|------|------|------|------|------|
| `uname` | String | 是 | 用户名关键词 | 张三 |

### 返回示例

```json
{
  "code": 1,
  "data": [
    { "uid": 1, "uname": "张三丰" },
    { "uid": 2, "uname": "张三" }
  ]
}
```

---

## 2.3 获取用户详情

```
GET /admin/user/detail?uid=1
```

### Query 参数

| 参数 | 类型 | 必填 | 说明 | 示例 |
|------|------|------|------|------|
| `uid` | Integer | 是 | 用户ID | 1 |

### 返回示例

```json
{
  "code": 1,
  "message": "获取成功",
  "data": {
    "uid": 1,
    "uname": "张三",
    "imgs": [                          // 该用户上传的所有图片
      {
        "iid": 1,
        "iname": "风景照",
        "isrc": "img/2026-05-29/xxx.jpg",
        "uploaddate": "2026-05-29",
        "pageview": 100,
        "commentCount": 5
      }
    ],
    "comments": [                      // 该用户发布的所有评论
      {
        "cid": 1,
        "content": "真好看！",
        "commdate": "2026-05-28T12:00:00",
        "clicklike": 3
      }
    ],
    "statistics": {                    // 用户统计数据
      "totalImgs": 10,
      "totalComments": 25,
      "likedImgs": 30,
      "likedComments": 15
    }
  }
}
```

### 使用场景

- 查看用户完整档案
- 审核违规用户时查看其历史行为
- 分析高价值用户特征

---

## 2.4 用户统计数据

```
GET /admin/user/statistics
```

### 返回示例

```json
{
  "code": 1,
  "message": "统计数据获取成功",
  "data": {
    "totalUsers": 100,              // 总注册用户数
    "activeUsers": 60,              // 有上传过图片的用户数
    "usersWithComments": 45         // 有发表过评论的用户数
  }
}
```

---

## 2.5 删除用户

```
POST /admin/user/delete
Content-Type: application/json
```

### 请求体

```json
{
  "uid": 1
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `uid` | Integer | 是 | 用户ID |

### 返回示例

**成功：**
```json
{
  "code": 1,
  "message": "已删除用户 张三 及其所有关联数据",
  "data": null
}
```

**失败：**
```json
{
  "code": 0,
  "message": "用户不存在",
  "data": null
}
```

### ⚠️ 注意事项

删除用户会**级联删除**以下关联数据：
- ✅ 用户上传的所有图片
- ✅ 图片下的所有评论
- ✅ 用户发布的所有评论
- ✅ 所有点赞记录

**操作不可恢复！建议先调用详情接口确认。**

---

# 三、Image 图片管理

**路径前缀**: `/admin/img`

---

## 3.1 获取图片列表

```
GET /admin/img/list?page=1&pageSize=10&order=uploaddate&iname=
```

### Query 参数

| 参数 | 类型 | 必填 | 说明 | 示例 |
|------|------|------|------|------|
| `page` | Integer | 否 | 页码 | 1 |
| `pageSize` | Integer | 否 | 每页数量 | 10 |
| `order` | String | 否 | 排序字段：`uploaddate`(时间) / `pageview`(浏览量) | uploaddate |
| `iname` | String | 否 | 图片名称关键词（空字符串查全部） | 风景 |

### 返回示例

```json
{
  "code": 1,
  "message": "这是第1页",
  "data": {
    "list": [
      {
        "iid": 1,
        "iname": "风景照",
        "isrc": "img/2026-05-29/xxx.jpg",
        "uploaddate": "2026-05-29",
        "pageview": 100,
        "uploader": {              // 上传者信息
          "uid": 1,
          "uname": "张三"
        },
        "commentCount": 5,         // 评论数
        "likeCount": 30            // 点赞数
      }
    ],
    "total": 500,
    "page": 1,
    "pageSize": 10,
    "orderBy": "uploaddate"
  }
}
```

### 特色功能

- 双维度排序：按时间或浏览量
- 支持模糊搜索
- 自动聚合统计数据（评论数、点赞数）
- 可用于发现违规内容或热门内容

---

## 3.2 获取图片详情

```
GET /admin/img/detail?iid=1
```

### Query 参数

| 参数 | 类型 | 必填 | 说明 | 示例 |
|------|------|------|------|------|
| `iid` | Integer | 是 | 图片ID | 1 |

### 返回示例

```json
{
  "code": 1,
  "message": "获取成功",
  "data": {
    "iid": 1,
    "iname": "风景照",
    "isrc": "img/2026-05-29/xxx.jpg",
    "uploaddate": "2026-05-29",
    "pageview": 128,
    "uploader": {
      "uid": 1,
      "uname": "张三"
    },
    "comments": [                        // 评论列表
      {
        "cid": 1,
        "content": "真好看！",
        "commdate": "2026-05-28T12:00:00",
        "clicklike": 5,
        "commenter": {
          "uid": 2,
          "uname": "李四"
        }
      }
    ],
    "likeCount": 30,                     // 总点赞数
    "likedByUsers": [                    // 点赞用户列表
      { "uid": 3, "uname": "王五" }
    ]
  }
}
```

### 使用场景

- 审核违规图片时查看完整上下文
- 分析热门内容的互动情况
- 监控特定图片的评论区质量

---

## 3.3 图片统计数据

```
GET /admin/img/statistics
```

### 返回示例

```json
{
  "code": 1,
  "message": "统计数据获取成功",
  "data": {
    "totalImgs": 500,                  // 总图片数
    "todayUploads": 20,                // 今日新增
    "topHotImages": [                  // TOP 10 热门图片
      {
        "iid": 1,
        "iname": "风景照",
        "pageview": 1000
      }
    ],
    "averageViews": 150                // 平均浏览量
  }
}
```

---

## 3.4 热门图片排行榜

```
GET /admin/img/hot?limit=10
```

### Query 参数

| 参数 | 类型 | 必填 | 说明 | 示例 |
|------|------|------|------|------|
| `limit` | Integer | 否 | 返回数量限制 | 10 |

### 返回示例

```json
{
  "code": 1,
  "message": "获取热门图片TOP 10",
  "data": [
    {
      "iid": 1,
      "iname": "风景照",
      "isrc": "img/2026-05-29/xxx.jpg",
      "pageview": 1000,
      "uploader": "张三"
    }
  ]
}
```

---

## 3.5 删除图片

```
POST /admin/img/delete
Content-Type: application/json
```

### 请求体

```json
{
  "iid": 1,
  "isrc": "img/2026-05-29/xxx.jpg"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `iid` | Integer | 是 | 图片ID |
| `isrc` | String | 否 | 图片文件路径（可选） |

### 返回示例

**成功：**
```json
{
  "code": 1,
  "message": "已删除图片「风景照」及其 5 条评论",
  "data": null
}
```

### ⚠️ 注意事项

删除图片会**级联删除**：
- ✅ 图片下的所有评论
- ✅ 相关的点赞记录

**操作不可恢复！**

---

# 四、Comment 评论管理

**路径前缀**: `/admin/comment`

---

## 4.1 获取评论列表

```
GET /admin/comment/list?page=1&pageSize=10
```

### Query 参数

| 参数 | 类型 | 必填 | 说明 | 示例 |
|------|------|------|------|------|
| `page` | Integer | 否 | 页码 | 1 |
| `pageSize` | Integer | 否 | 每页数量 | 10 |

### 返回示例

```json
{
  "code": 1,
  "message": "这是第1页",
  "data": {
    "list": [
      {
        "cid": 1,
        "content": "真好看！",           // 评论内容
        "commdate": "2026-05-28T12:00:00",
        "clicklike": 5,                 // 点赞数
        "user": {                       // 评论者
          "uid": 2,
          "uname": "李四"
        },
        "img": {                        // 所属图片
          "iid": 1,
          "iname": "风景照"
        }
      }
    ],
    "total": 2000,
    "page": 1,
    "pageSize": 10
  }
}
```

### 使用场景

- 全局审核不当评论
- 发现垃圾广告或恶意内容
- 监控社区氛围

---

## 4.2 获取某图片的评论

```
GET /admin/comment/byImg?iid=1
```

### Query 参数

| 参数 | 类型 | 必填 | 说明 | 示例 |
|------|------|------|------|------|
| `iid` | Integer | 是 | 图片ID | 1 |

### 返回示例

```json
{
  "code": 1,
  "message": "这是id为1的评论",
  "data": [
    {
      "cid": 1,
      "content": "真好看！",
      "commdate": "2026-05-28T12:00:00",
      "clicklike": 5,
      "user": {
        "uid": 2,
        "uname": "李四"
      }
    }
  ]
}
```

### 使用场景

- 审核特定图片的评论区
- 处理用户举报的评论
- 清理恶意刷评

---

## 4.3 获取某用户的评论

```
GET /admin/comment/byUser?uid=1
```

### Query 参数

| 参数 | 类型 | 必填 | 说明 | 示例 |
|------|------|------|------|------|
| `uid` | Integer | 是 | 用户ID | 1 |

### 返回示例

```json
{
  "code": 1,
  "message": "用户1的评论列表",
  "data": [
    {
      "cid": 1,
      "content": "真好看！",
      "commdate": "2026-05-28T12:00:00",
      "clicklike": 5,
      "img": {
        "iid": 1,
        "iname": "风景照"
      }
    }
  ]
}
```

### 使用场景

- 监控特定用户的行为
- 发现刷评或恶意账号
- 分析用户活跃度

---

## 4.4 评论统计数据

```
GET /admin/comment/statistics
```

### 返回示例

```json
{
  "code": 1,
  "message": "统计数据获取成功",
  "data": {
    "totalComments": 2000,            // 总评论数
    "todayComments": 50,              // 今日新增
    "topHotComments": [              // TOP 10 热门评论
      {
        "cid": 1,
        "content": "太美了...",
        "clicklike": 100,
        "commenter": "李四"
      }
    ],
    "averageLikes": 8.5              // 平均点赞数
  }
}
```

---

## 4.5 删除评论

```
POST /admin/comment/delete
Content-Type: application/json
```

### 请求体

```json
{
  "cid": 1
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `cid` | Integer | 是 | 评论ID |

### 返回示例

**成功：**
```json
{
  "code": 1,
  "message": "已删除评论：真好看！...",
  "data": null
}
```

### ⚠️ 注意事项

- 删除操作不可恢复
- 删除后该评论的点赞记录也会被清理
- 建议结合详情接口确认后再删除

---

# 五、接口速览表

| # | 方法 | 路径 | 模块 | 说明 |
|---|------|------|------|------|
| 1 | GET | `/admin/dashboard/overview` | Dashboard | 系统概览数据 |
| 2 | GET | `/admin/dashboard/trends` | Dashboard | 趋势分析数据 |
| 3 | GET | `/admin/user/list` | User | 用户列表（分页） |
| 4 | GET | `/admin/user/search` | User | 搜索用户 |
| 5 | GET | `/admin/user/detail` | User | 用户详情 |
| 6 | GET | `/admin/user/statistics` | User | 用户统计 |
| 7 | POST | `/admin/user/delete` | User | 删除用户 |
| 8 | GET | `/admin/img/list` | Image | 图片列表（支持排序+筛选） |
| 9 | GET | `/admin/img/detail` | Image | 图片详情 |
| 10 | GET | `/admin/img/statistics` | Image | 图片统计 |
| 11 | GET | `/admin/img/hot` | Image | 热门图片排行 |
| 12 | POST | `/admin/img/delete` | Image | 删除图片 |
| 13 | GET | `/admin/comment/list` | Comment | 评论列表（分页） |
| 14 | GET | `/admin/comment/byImg` | Comment | 某图片的评论 |
| 15 | GET | `/admin/comment/byUser` | Comment | 某用户的评论 |
| 16 | GET | `/admin/comment/statistics` | Comment | 评论统计 |
| 17 | POST | `/admin/comment/delete` | Comment | 删除评论 |

---

# 六、使用指南

## 6.1 快速开始

### 1. 安装依赖

```bash
cd img-share-manage
npm install
```

### 2. 配置数据库

编辑 `src/app.module.ts`：

```typescript
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',      // MySQL 地址
  port: 3306,             // 端口
  username: 'root',       // 用户名
  password: 'password',   // 密码
  database: 'mydb',       // 数据库名
  entities: [User, Img, Comment],
})
```

### 3. 启动服务

```bash
npm run start:dev
```

### 4. 访问 API 文档

打开浏览器访问：

```
http://localhost:3000/api-docs
```

即可看到交互式 Swagger UI 文档界面！

---

## 6.2 测试接口示例

### 查看 Dashboard

```bash
curl http://localhost:3000/admin/dashboard/overview
curl http://localhost:3000/admin/dashboard/trends
```

### 查看用户

```bash
# 获取前10个用户
curl http://localhost:3000/admin/user/list

# 搜索用户
curl http://localhost:3000/admin/user/search?uname=张

# 查看用户详情
curl http://localhost:3000/admin/user/detail?uid=1
```

### 查看图片

```bash
# 获取图片列表（按浏览量排序）
curl "http://localhost:3000/admin/img/list?order=pageview"

# 搜索图片
curl "http://localhost:3000/admin/img/list?iname=风景"

# 查看图片详情
curl http://localhost:3000/admin/img/detail?iid=1

# 热门图片 TOP10
curl http://localhost:3000/admin/img/hot
```

### 删除操作

```bash
# 删除用户（谨慎操作）
curl -X POST http://localhost:3000/admin/user/delete \
  -H "Content-Type: application/json" \
  -d '{"uid": 999}'

# 删除图片（谨慎操作）
curl -X POST http://localhost:3000/admin/img/delete \
  -H "Content-Type: application/json" \
  -d '{"iid": 999}'

# 删除评论（谨慎操作）
curl -X POST http://localhost:3000/admin/comment/delete \
  -H "Content-Type: application/json" \
  -d '{"cid": 999}'
```

---

## 6.3 最佳实践

### ✅ 推荐做法

1. **删除前先查询详情**
   ```bash
   # 先查看
   curl http://localhost:3000/admin/user/detail?uid=1
   
   # 确认后再删除
   curl -X POST http://localhost:3000/admin/user/delete ...
   ```

2. **使用分页避免性能问题**
   ```bash
   # ❌ 不推荐：一次性获取所有数据
   curl http://localhost:3000/admin/user/list
   
   # ✅ 推荐：使用分页
   curl "http://localhost:3000/admin/user/list?page=1&pageSize=20"
   ```

3. **定期检查统计数据**
   ```bash
   # 每日检查核心指标
   curl http://localhost:3000/admin/dashboard/overview
   
   # 每周分析趋势
   curl http://localhost:3000/admin/dashboard/trends
   ```

4. **利用排序功能发现问题**
   ```bash
   # 按浏览量排序，发现异常热门内容
   curl "http://localhost:3000/admin/img/list?order=pageview"
   
   # 按时间排序，查看最新内容
   curl "http://localhost:3000/admin/img/list?order=uploaddate"
   ```

### ⚠️ 注意事项

1. **级联删除风险**
   - 删除用户会同时删除其所有图片和评论
   - 删除图片会同时删除其下所有评论
   - **操作不可恢复！**

2. **性能优化**
   - 大数据量时注意使用分页
   - 避免频繁调用详情接口（包含大量关联数据）

3. **安全建议**
   - 生产环境应添加管理员认证
   - 敏感操作建议增加二次确认机制
   - 建议记录操作日志

---

## 6.4 错误处理

### 常见错误响应

**参数缺失：**
```json
{
  "code": 0,
  "message": "用户ID不能为空",
  "data": null
}
```

**资源不存在：**
```json
{
  "code": 0,
  "message": "用户不存在",
  "data": null
}
```

**搜索无结果：**
```json
{
  "code": 1,
  "data": [],
  "message": ""
}
```

---

# 七、更新日志

## v1.0.0 (2026-05-30)

### 新增功能
- ✅ Dashboard 仪表盘模块（概览 + 趋势）
- ✅ 用户管理模块（CRUD + 统计）
- ✅ 图片管理模块（审核 + 排行榜）
- ✅ 评论管理模块（多维查询 + 审核）
- ✅ Swagger API 在线文档
- ✅ 完整的 API 文档（本文件）

### 技术特性
- 📊 丰富的统计分析功能
- 🔍 多维度数据查询
- 📈 趋势分析与排行榜
- 🔄 级联删除保证数据一致性
- 📝 统一响应格式

---

# 八、联系方式

如有问题或建议，欢迎反馈！

---

**文档最后更新**: 2026-05-30  
**文档版本**: v1.0.0