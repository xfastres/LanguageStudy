# 切换数据库为 MySQL Spec

## Why

项目当前使用 PostgreSQL 作为数据库，但用户实际使用的是 MySQL，需要将所有数据库相关配置从 PostgreSQL 切换为 MySQL，确保 Prisma、TypeORM、Docker Compose 及环境变量配置保持一致。

## What Changes

- 将 Prisma schema 的 datasource provider 从 `postgresql` 改为 `mysql`
- 将 Docker Compose 中的 PostgreSQL 服务替换为 MySQL 服务
- 将 TypeORM 连接配置从 `postgres` 改为 `mysql`，默认端口从 `5432` 改为 `3306`
- 将 `.env.example` 中的 `DATABASE_URL` 从 PostgreSQL 格式改为 MySQL 格式
- 更新 README.md 中的数据库相关描述

## Impact

- Affected specs: build-immersive-language-platform（基础设施层变更）
- Affected code:
  - `packages/database/prisma/schema.prisma`
  - `docker-compose.yml`
  - `.env.example`
  - `services/content-service/src/app.module.ts`
  - `README.md`

## ADDED Requirements

### Requirement: MySQL 数据库支持

系统 SHALL 使用 MySQL 作为数据库，替代 PostgreSQL。

#### Scenario: Prisma 连接 MySQL
- **WHEN** Prisma Client 连接数据库
- **THEN** datasource provider 为 `mysql`，连接字符串为 MySQL 格式

#### Scenario: TypeORM 连接 MySQL
- **WHEN** content-service 启动并连接数据库
- **THEN** TypeORM type 为 `mysql`，默认端口为 `3306`

#### Scenario: Docker Compose 提供 MySQL 服务
- **WHEN** 执行 `docker-compose up`
- **THEN** 启动 MySQL 服务而非 PostgreSQL 服务，端口映射为 `3306:3306`

#### Scenario: 环境变量模板正确
- **WHEN** 开发者复制 `.env.example` 作为本地配置
- **THEN** `DATABASE_URL` 为 MySQL 格式连接字符串

## MODIFIED Requirements

### Requirement: 数据库基础设施

Docker Compose 提供的数据库服务从 PostgreSQL 16 替换为 MySQL 8，默认用户名 `linguaflow`、密码 `linguaflow_dev`、数据库名 `linguaflow` 保持不变。

## REMOVED Requirements

### Requirement: PostgreSQL 支持
**Reason**: 用户使用 MySQL，不再需要 PostgreSQL 支持
**Migration**: 所有 PostgreSQL 配置替换为 MySQL 对等配置
