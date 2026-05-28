# 图片分享平台 API 文档

## 基础信息

- **Base URL**: `http://<host>:<port>/api`
- **字符编码**: UTF-8
- **统一响应格式**:

```json
{
  "code": 1,        // 1=成功, 0=失败
  "message": "...", // 提示信息
  "date": ...       // 业务数据（字段名为 date，首字母小写）
}
```

---

## 认证机制

所有需要认证的接口，**必须在请求头中携带 Token**：

```
Authorization: Bearer <token>
```

Token 由登录接口返回，有效期 **7天**。未登录或 Token 过期将返回 **HTTP 401** 状态码，响应体为：

```json
{ "code": 0, "message": "未登录，请先登录", "date": null }
```

### 公开接口（无需 Token）

以下接口不需要认证，可直接访问：

| 接口 | 说明 |
|------|------|
| `POST /api/login` | 登录 |
| `POST /api/register` | 注册 |
| `GET /api/search` | 搜索图片 |
| `GET /api/getCount` | 获取图片总数 |
| `GET /api/getComment` | 获取图片评论 |
| `GET /api/addPageView` | 增加浏览量 |

---

## 一、用户模块

### 1. 注册

```
POST /api/register
```

**请求体** (`application/json`):

```json
{
  "uname": "用户名",
  "pwd": "密码"
}
```

**成功响应**:

```json
{
  "code": 1,
  "message": "注册成功",
  "date": null
}
```

**失败响应**:

```json
{
  "code": 0,
  "message": "用户名已存在",
  "date": null
}
```

---

### 2. 登录

```
POST /api/login
```

**请求体** (`application/json`):

```json
{
  "uname": "用户名",
  "pwd": "密码"
}
```

**成功响应**:

```json
{
  "code": 1,
  "message": "登录成功",
  "date": {
    "user": {
      "uid": 1,
      "uname": "用户名",
      "pwd": null,
      "img": null,
      "comment": null,
      "likeImgs": null,
      "clickComments": null
    },
    "token": "eyJ0eXAiOiJKV1Q..."
  }
}
```

> `token` 是 JWT 字符串，后续请求需放入 `Authorization: Bearer <token>` 请求头。

**失败响应**:

```json
{
  "code": 0,
  "message": "用户名或密码错误",
  "date": null
}
```

---

## 二、图片模块

### 3. 上传图片

> **需要认证**

```
POST /api/addImg
Content-Type: multipart/form-data
```

**表单参数**:

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `file` | File | 是 | 图片文件 |
| `iname` | String | 是 | 图片名称 |

**请求头**:

```
Authorization: Bearer <token>
```

**成功响应**:

```json
{
  "code": 1,
  "message": "添加图片成功",
  "date": null
}
```

---

### 4. 删除图片

> **需要认证**（只能删除自己上传的图片）

```
POST /api/deleteImg
```

**请求体** (`application/json`):

```json
{
  "iid": 1,
  "isrc": "/mnt/nginx/html/1/example.jpg"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `iid` | Integer | 是 | 图片ID |
| `isrc` | String | 是 | 图片文件路径（可从图片详情获取） |

**成功响应**:

```json
{
  "code": 1,
  "message": "删除成功",
  "date": null
}
```

---

### 5. 搜索图片（公开）

```
GET /api/search?order=pageview&count=10&page=1&iname=风景
```

**Query 参数**:

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `order` | String | 是 | 排序字段，可选：`uploaddate`、`pageview` |
| `count` | Integer | 是 | 每页数量 |
| `page` | Integer | 是 | 页码（从1开始） |
| `iname` | String | 是 | 图片名称关键词（支持模糊搜索，空字符串搜全部） |

**成功响应**:

```json
{
  "code": 1,
  "message": "这是第1页",
  "date": [
    {
      "iid": 1,
      "iname": "风景图",
      "isrc": "/mnt/nginx/html/1/xxx.jpg",
      "uploaddate": "2026-05-28 12:30:00",
      "user": {
        "uid": 1,
        "uname": "上传者用户名"
      },
      "pageview": 100,
      "comment": null,
      "likUsers": null
    }
  ]
}
```

---

### 6. 获取图片总数（公开）

```
GET /api/getCount?iname=风景
```

**Query 参数**:

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `iname` | String | 是 | 图片名称关键词（空字符串查全部） |

**成功响应**:

```json
{
  "code": 1,
  "message": "获取成功",
  "date": 42
}
```

---

### 7. 获取我点赞的图片

> **需要认证**

```
GET /api/getLikeImg
```

**请求头**:

```
Authorization: Bearer <token>
```

**成功响应**:

```json
{
  "code": 1,
  "message": "获取成功",
  "date": [
    {
      "iid": 1,
      "iname": "图片名称",
      "isrc": "/mnt/nginx/html/1/xxx.jpg",
      "uploaddate": "2026-05-28 12:30:00",
      "pageview": 100
    }
  ]
}
```

---

### 8. 获取我上传的图片

> **需要认证**

```
GET /api/getUserImg
```

**请求头**:

```
Authorization: Bearer <token>
```

**成功响应**: 格式同 [获取我点赞的图片](#7-获取我点赞的图片)

---

### 9. 点赞图片

> **需要认证**

```
GET /api/addLike?iid=1
```

**Query 参数**:

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `iid` | Integer | 是 | 图片ID |

**成功响应**:

```json
{
  "code": 1,
  "message": "添加喜欢",
  "date": null
}
```

---

### 10. 判断是否已点赞

> **需要认证**

```
GET /api/likeOrNot?iid=1
```

**Query 参数**:

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `iid` | Integer | 是 | 图片ID |

**成功响应**:

```json
{
  "code": 1,
  "message": "在喜欢列表中",
  "date": true                 // true=已点赞, false=未点赞
}
```

---

### 11. 取消点赞

> **需要认证**

```
GET /api/delLike?iid=1
```

**Query 参数**:

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `iid` | Integer | 是 | 图片ID |

**成功响应**:

```json
{
  "code": 1,
  "message": "从喜欢列表中移除",
  "date": null
}
```

---

### 12. 增加浏览量（公开）

```
GET /api/addPageView?iid=1
```

**Query 参数**:

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `iid` | Integer | 是 | 图片ID |

**成功响应**:

```json
{
  "code": 1,
  "message": "添加浏览量成功",
  "date": null
}
```

---

## 三、评论模块

### 13. 获取评论列表（公开）

```
GET /api/getComment?iid=1
```

**Query 参数**:

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `iid` | Integer | 是 | 图片ID |

**成功响应**:

```json
{
  "code": 1,
  "message": "这是id为1的评论",
  "date": [
    {
      "cid": 1,
      "commdate": "2026-05-28 12:30:00",
      "user": {
        "uid": 2,
        "uname": "评论者用户名"
      },
      "clicklike": 5,
      "content": "评论内容"
    }
  ]
}
```

---

### 14. 添加评论

> **需要认证**

```
POST /api/addComment
```

**请求体** (`application/json`):

```json
{
  "img": {
    "iid": 1
  },
  "content": "评论内容"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `img.iid` | Integer | 是 | 图片ID |
| `content` | String | 是 | 评论内容 |

**成功响应**:

```json
{
  "code": 1,
  "message": "添加评论成功",
  "date": null
}
```

---

### 15. 删除评论

> **需要认证**

```
POST /api/delComment
```

**请求体** (`application/json`):

```json
{
  "cid": 1
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `cid` | Integer | 是 | 评论ID |

**成功响应**:

```json
{
  "code": 1,
  "message": "删除成功",
  "date": null
}
```

---

### 16. 获取我点过赞的评论ID列表

> **需要认证**

```
GET /api/getClickComments
```

**请求头**:

```
Authorization: Bearer <token>
```

**成功响应**:

```json
{
  "code": 1,
  "message": "查询用户点赞评论成功",
  "date": [1, 3, 5]            // 评论ID数组
}
```

---

### 17. 点赞评论

> **需要认证**

```
GET /api/clickLike?cid=1
```

**Query 参数**:

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `cid` | Integer | 是 | 评论ID |

**成功响应**:

```json
{
  "code": 1,
  "message": "点赞成功",
  "date": null
}
```

---

### 18. 取消评论点赞

> **需要认证**

```
GET /api/delClick?cid=1
```

**Query 参数**:

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `cid` | Integer | 是 | 评论ID |

**成功响应**:

```json
{
  "code": 1,
  "message": "取消点赞",
  "date": null
}
```

---

## 附录：接口速览表

| # | 方法 | 路径 | 认证 | 说明 |
|---|------|------|------|------|
| 1 | POST | `/api/register` | 否 | 注册 |
| 2 | POST | `/api/login` | 否 | 登录，返回 token |
| 3 | POST | `/api/addImg` | 是 | 上传图片 |
| 4 | POST | `/api/deleteImg` | 是 | 删除图片 |
| 5 | GET | `/api/search` | 否 | 搜索图片 |
| 6 | GET | `/api/getCount` | 否 | 图片总数 |
| 7 | GET | `/api/getLikeImg` | 是 | 我点赞的图片 |
| 8 | GET | `/api/getUserImg` | 是 | 我上传的图片 |
| 9 | GET | `/api/addLike` | 是 | 点赞图片 |
| 10 | GET | `/api/likeOrNot` | 是 | 是否已点赞 |
| 11 | GET | `/api/delLike` | 是 | 取消点赞图片 |
| 12 | GET | `/api/addPageView` | 否 | 增加浏览量 |
| 13 | GET | `/api/getComment` | 否 | 获取评论 |
| 14 | POST | `/api/addComment` | 是 | 添加评论 |
| 15 | POST | `/api/delComment` | 是 | 删除评论 |
| 16 | GET | `/api/getClickComments` | 是 | 我点赞的评论ID |
| 17 | GET | `/api/clickLike` | 是 | 点赞评论 |
| 18 | GET | `/api/delClick` | 是 | 取消评论点赞 |

---

## 前端集成要点

1. **登录后存储 `token`**，建议存 `localStorage`：

   ```js
   const res = await fetch('/api/login', { ... });
   const { date } = await res.json();
   localStorage.setItem('token', date.token);
   localStorage.setItem('user', JSON.stringify(date.user));
   ```

2. **封装请求函数**，自动附加 Token：

   ```js
   async function api(url, options = {}) {
     const token = localStorage.getItem('token');
     const headers = { ...options.headers };
     if (token) {
       headers['Authorization'] = `Bearer ${token}`;
     }
     const res = await fetch(url, { ...options, headers });
     if (res.status === 401) {
       localStorage.removeItem('token');
       // 跳转到登录页
     }
     return res.json();
   }
   ```

3. **判断业务成功与否**：检查 `code === 1`，不要依赖 HTTP 状态码（401除外）。

4. **所有 `GET` 请求**都使用 Query 参数（`?key=value`），**所有 `POST` 请求**都使用 JSON Body（`application/json`），上传图片使用 `multipart/form-data`。