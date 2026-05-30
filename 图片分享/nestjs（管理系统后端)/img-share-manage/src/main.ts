import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import './entity';  // 显式导入所有实体，确保元数据注册

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('图片分享管理系统后台 API')
    .setDescription(`
## 📖 系统说明

这是一个**图片分享平台的管理系统后台**，用于管理原 SpringBoot 系统的数据。

### 🎯 主要功能
- **用户管理**：查看、搜索、删除用户及其关联数据
- **图片管理**：审核、统计、删除违规图片
- **评论管理**：查看、删除不当评论
- **数据统计**：Dashboard 仪表盘展示核心指标

### 🔗 与原系统的关系
- 原系统（SpringBoot）：面向普通用户的图片分享平台
- 本系统（NestJS）：面向管理员的后台管理系统
- 两者共享同一数据库 \`mydb\`

### 📊 统一响应格式
\`\`\`json
{
  "code": 1,        // 1=成功, 0=失败
  "message": "...", // 提示信息
  "data": ...       // 业务数据
}
\`\`\`
    `)
    .setVersion('1.0')
    .addTag('Dashboard', '仪表盘 - 数据概览与趋势分析')
    .addTag('User', '用户管理 - 查看/搜索/删除用户')
    .addTag('Image', '图片管理 - 审核/统计/删除图片')
    .addTag('Comment', '评论管理 - 审核/删除评论')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
  console.log('🚀 服务已启动: http://localhost:3000');
  console.log('📚 API 文档: http://localhost:3000/api-docs');
}
bootstrap();