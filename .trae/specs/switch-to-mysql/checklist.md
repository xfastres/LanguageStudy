# Checklist

- [x] Prisma schema provider 已从 `postgresql` 改为 `mysql`
- [x] Docker Compose 中 PostgreSQL 服务已替换为 MySQL 8 服务，端口 3306，健康检查正确
- [x] `.env.example` 中 DATABASE_URL 为 MySQL 格式
- [x] content-service 的 TypeORM 配置 type 为 `mysql`，默认端口为 `3306`
- [x] README.md 中数据库描述已更新为 MySQL
