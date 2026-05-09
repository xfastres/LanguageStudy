# Tasks

## Phase 1: 项目基础设施

- [ ] Task 1: 初始化项目工程结构
  - [ ] SubTask 1.1: 初始化 monorepo 结构（前端 apps/web、后端 services/*、共享 packages/*）
  - [ ] SubTask 1.2: 配置 TypeScript、ESLint、Prettier 等工程化工具
  - [ ] SubTask 1.3: 配置 Docker Compose 本地开发环境（PostgreSQL、Redis、向量数据库、对象存储）
  - [ ] SubTask 1.4: 配置 CI/CD 基础流水线

- [ ] Task 2: 搭建前端基础框架
  - [ ] SubTask 2.1: 初始化 Next.js 项目，配置 App Router、SSR/SSG、PWA
  - [ ] SubTask 2.2: 搭建 UI 组件库基础（极简风格、低焦虑配色、暗色/亮色主题）
  - [ ] SubTask 2.3: 实现全局布局：沉浸式导航栏、内容优先布局、底部 Tab 导航
  - [ ] SubTask 2.4: 配置国际化方案（i18n），支持中文、英语、日语、韩语界面语言

- [ ] Task 3: 搭建后端微服务基础
  - [ ] SubTask 3.1: 搭建 API Gateway（路由、鉴权、限流）
  - [ ] SubTask 3.2: 初始化用户服务（NestJS / Fastify 基础骨架）
  - [ ] SubTask 3.3: 初始化内容服务骨架
  - [ ] SubTask 3.4: 初始化推荐服务骨架
  - [ ] SubTask 3.5: 初始化 AI 服务骨架
  - [ ] SubTask 3.6: 配置服务间通信（gRPC / 消息队列）

## Phase 2: 用户系统

- [ ] Task 4: 实现用户注册登录
  - [ ] SubTask 4.1: 实现邮箱注册登录（JWT 鉴权）
  - [ ] SubTask 4.2: 实现 OAuth 登录（Google、Apple、GitHub）
  - [ ] SubTask 4.3: 实现用户资料管理（头像、昵称、偏好设置）

- [ ] Task 5: 实现用户语言画像
  - [ ] SubTask 5.1: 设计语言画像数据模型（理解力、听力水平、输入时长、已习得表达、兴趣偏好、焦虑程度、内容偏好）
  - [ ] SubTask 5.2: 实现初始画像构建流程（兴趣标签选择、自评理解等级）
  - [ ] SubTask 5.3: 实现多语言学习档案（每门语言独立画像与进度）
  - [ ] SubTask 5.4: 实现画像动态更新逻辑（基于用户行为持续更新）

## Phase 3: 内容系统（核心）

- [ ] Task 6: 设计内容数据模型与分级体系
  - [ ] SubTask 6.1: 设计内容数据模型（标题、描述、语言、Level、类型、标签、时长、难度参数）
  - [ ] SubTask 6.2: 实现 Level 0-5 分级逻辑与存储
  - [ ] SubTask 6.3: 设计内容元数据结构（字幕、释义、语速、词汇列表）

- [ ] Task 7: 实现内容管理后台
  - [ ] SubTask 7.1: 实现内容上传与入库（视频、音频）
  - [ ] SubTask 7.2: 实现内容分级标注（AI 辅助 + 人工审核）
  - [ ] SubTask 7.3: 实现内容标签与分类管理
  - [ ] SubTask 7.4: 实现内容发布与上下架

- [ ] Task 8: 实现音视频处理管线
  - [ ] SubTask 8.1: 实现视频转码与自适应码率（HLS/DASH）
  - [ ] SubTask 8.2: 实现音频波形分析与语速检测
  - [ ] SubTask 8.3: 实现自动字幕生成（Whisper ASR）
  - [ ] SubTask 8.4: 实现语速调节（不变调变速）
  - [ ] SubTask 8.5: 实现内容向量化嵌入（用于 RAG 检索与推荐）

## Phase 4: 内容消费体验

- [ ] Task 9: 实现沉浸式视频播放器
  - [ ] SubTask 9.1: 实现视频播放器核心（播放/暂停/进度/全屏）
  - [ ] SubTask 9.2: 实现单语字幕显示与切换
  - [ ] SubTask 9.3: 实现悬停释义（字幕词语悬停弹出解释）
  - [ ] SubTask 9.4: 实现语速调节控件
  - [ ] SubTask 9.5: 实现智能暂停（复杂句自动暂停选项）
  - [ ] SubTask 9.6: 实现重复播放（AB 循环、单句重播）
  - [ ] SubTask 9.7: 实现输入时长记录（仅播放时计时，暂停不计时）

- [ ] Task 10: 实现沉浸式音频播放器
  - [ ] SubTask 10.1: 实现音频播放器核心（后台播放、锁屏控制）
  - [ ] SubTask 10.2: 实现听力流模式（连续播放同等级内容）
  - [ ] SubTask 10.3: 实现音频字幕同步
  - [ ] SubTask 10.4: 实现泛听/精听模式切换

- [ ] Task 11: 实现内容信息流首页
  - [ ] SubTask 11.1: 实现内容卡片组件（缩略图、标题、等级标签、时长）
  - [ ] SubTask 11.2: 实现无限滚动内容流
  - [ ] SubTask 11.3: 实现内容分类筛选（类型、等级、兴趣）
  - [ ] SubTask 11.4: 实现个性化推荐接入

## Phase 5: AI 推荐与学习路径

- [ ] Task 12: 实现 i+1 推荐引擎
  - [ ] SubTask 12.1: 实现内容向量嵌入与相似度计算
  - [ ] SubTask 12.2: 实现基于语言画像的 i+1 难度匹配算法
  - [ ] SubTask 12.3: 实现兴趣加权推荐（协同过滤 + 内容特征）
  - [ ] SubTask 12.4: 实现实时反馈调整（根据用户消费行为动态调整推荐）

- [ ] Task 13: 实现学习路径引擎
  - [ ] SubTask 13.1: 实现静默期判定逻辑（基于输入时长与理解率）
  - [ ] SubTask 13.2: 实现输入/输出阶段切换逻辑
  - [ ] SubTask 13.3: 实现每日学习路径推荐（今日最佳输入内容组合）

## Phase 6: 习得系统

- [ ] Task 14: 实现单词习得系统
  - [ ] SubTask 14.1: 实现词汇暴露追踪（记录用户在输入中遇到的词）
  - [ ] SubTask 14.2: 实现高频输入自动强化（在后续内容中增加已遇词的出现频率）
  - [ ] SubTask 14.3: 实现语境记忆卡片（词语 + 来源上下文 + 图片 + 声音）
  - [ ] SubTask 14.4: 实现词汇习得状态（未见 → 暴露 → 熟悉 → 习得）

- [ ] Task 15: 实现语法习得提醒
  - [ ] SubTask 15.1: 实现语法结构识别（从字幕/文本中提取语法模式）
  - [ ] SubTask 15.2: 实现轻量规律提醒（非术语教学，仅提示"这个结构你已见过 N 次"）

## Phase 7: 进度追踪与可视化

- [ ] Task 16: 实现核心指标追踪
  - [ ] SubTask 16.1: 实现有效输入时长统计（区分有效/无效输入）
  - [ ] SubTask 16.2: 实现听力累计小时统计
  - [ ] SubTask 16.3: 实现可理解率评估（基于用户反馈与行为推断）
  - [ ] SubTask 16.4: 实现沉浸连续性追踪（连续天数）
  - [ ] SubTask 16.5: 实现输入覆盖度统计（词汇/语法覆盖面）

- [ ] Task 17: 实现可视化成长系统
  - [ ] SubTask 17.1: 实现输入小时树（可视化累计输入时长）
  - [ ] SubTask 17.2: 实现理解力成长曲线
  - [ ] SubTask 17.3: 实现听力等级进化图
  - [ ] SubTask 17.4: 实现语言沉浸地图（已探索的内容领域）

## Phase 8: 成就与激励

- [ ] Task 18: 实现成就激励系统
  - [ ] SubTask 18.1: 设计成就数据模型（类型、条件、奖励）
  - [ ] SubTask 18.2: 实现里程碑成就（累计 100h 输入、连续 30 天沉浸等）
  - [ ] SubTask 18.3: 实现理解力成就（听懂第一部动画、首次无字幕理解等）
  - [ ] SubTask 18.4: 实现成就通知与展示（低焦虑、鼓励式动画）

## Phase 9: 社区沉浸

- [ ] Task 19: 实现社区沉浸系统
  - [ ] SubTask 19.1: 实现沉浸房间（多人同步听/看同一内容）
  - [ ] SubTask 19.2: 实现输入挑战（社区挑战活动）
  - [ ] SubTask 19.3: 实现成长分享（学习里程碑分享）
  - [ ] SubTask 19.4: 实现语言陪伴匹配

## Phase 10: 输出系统（V2+）

- [ ] Task 20: 实现 AI 对话输出系统
  - [ ] SubTask 20.1: 实现 AI 对话 Agent（LLM 驱动的语言陪练）
  - [ ] SubTask 20.2: 实现输出阶段解锁逻辑（输入积累达标后开放）
  - [ ] SubTask 20.3: 实现极简纠错（不显示红色错误，仅提供自然重述）
  - [ ] SubTask 20.4: 实现语音识别与评估（Shadowing 跟读反馈）

## Phase 11: 数据埋点与分析

- [ ] Task 21: 实现数据埋点方案
  - [ ] SubTask 21.1: 设计埋点事件体系（内容消费、交互行为、学习行为、系统事件）
  - [ ] SubTask 21.2: 实现客户端埋点 SDK
  - [ ] SubTask 21.3: 实现埋点数据采集与存储（ClickHouse）
  - [ ] SubTask 21.4: 实现基础分析看板

## Phase 12: 多语言扩展

- [ ] Task 22: 实现日语与韩语支持
  - [ ] SubTask 22.1: 实现日语内容分级适配（参考 JLPT 但重新抽象为输入理解等级）
  - [ ] SubTask 22.2: 实现韩语内容分级适配（参考 TOPIK 但重新抽象为输入理解等级）
  - [ ] SubTask 22.3: 实现日语/韩语字幕与释义系统
  - [ ] SubTask 22.4: 实现语言扩展配置化方案（新语言无需核心代码改动）

# Task Dependencies

- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 4] depends on [Task 3]
- [Task 5] depends on [Task 4]
- [Task 6] depends on [Task 3]
- [Task 7] depends on [Task 6]
- [Task 8] depends on [Task 6]
- [Task 9] depends on [Task 2, Task 8]
- [Task 10] depends on [Task 2, Task 8]
- [Task 11] depends on [Task 2, Task 6]
- [Task 12] depends on [Task 5, Task 8]
- [Task 13] depends on [Task 5, Task 12]
- [Task 14] depends on [Task 6, Task 9]
- [Task 15] depends on [Task 6, Task 9]
- [Task 16] depends on [Task 9, Task 10]
- [Task 17] depends on [Task 16]
- [Task 18] depends on [Task 16]
- [Task 19] depends on [Task 4, Task 11]
- [Task 20] depends on [Task 13, Task 5]
- [Task 21] depends on [Task 2, Task 3]
- [Task 22] depends on [Task 6, Task 8, Task 9]

# Parallelizable Work

- Task 2 与 Task 3 可并行
- Task 9 与 Task 10 可并行
- Task 14 与 Task 15 可并行
- Task 17 与 Task 18 可并行
