# Tasks

- [x] Task 1: 修改 Prisma schema 数据库 provider
  - [x] SubTask 1.1: 将 `packages/database/prisma/schema.prisma` 中 `provider = "postgresql"` 改为 `provider = "mysql"`

- [x] Task 2: 修改 Docker Compose 数据库服务
  - [x] SubTask 2.1: 将 `docker-compose.yml` 中的 postgres 服务替换为 mysql 服务（MySQL 8 镜像、端口 3306、对应健康检查）

- [x] Task 3: 修改环境变量模板
  - [x] SubTask 3.1: 将 `.env.example` 中 `DATABASE_URL` 从 PostgreSQL 格式改为 MySQL 格式

- [x] Task 4: 修改 TypeORM 连接配置
  - [x] SubTask 4.1: 将 `services/content-service/src/app.module.ts` 中 type 从 `'postgres'` 改为 `'mysql'`，默认端口从 `'5432'` 改为 `'3306'`

- [x] Task 5: 更新 README 文档
  - [x] SubTask 5.1: 将 `README.md` 中 PostgreSQL 相关描述替换为 MySQL

# Task Dependencies

- 所有任务相互独立，可并行执行

# Parallelizable Work

- Task 1-5 均可并行执行
