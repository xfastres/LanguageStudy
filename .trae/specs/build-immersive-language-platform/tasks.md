# Tasks

## Phase 0: MVP 核心闭环（生死验证）

验证目标：用户会不会真的连续沉浸 1 小时以上。

- [ ] Task 1: 初始化项目工程结构
  - [ ] SubTask 1.1: 初始化 monorepo 结构（前端 apps/web、后端 services/*、共享 packages/*）
  - [ ] SubTask 1.2: 配置 TypeScript、ESLint、Prettier 等工程化工具
  - [ ] SubTask 1.3: 配置 Docker Compose 本地开发环境（PostgreSQL、Redis）
  - [ ] SubTask 1.4: 配置 CI/CD 基础流水线

- [ ] Task 2: 搭建前端 MVP 框架
  - [ ] SubTask 2.1: 初始化 Next.js 项目，配置 App Router
  - [ ] SubTask 2.2: 搭建 UI 组件库基础（极简风格、低焦虑配色）
  - [ ] SubTask 2.3: 实现 TikTok-like 内容流布局（全屏视频卡片、上下滑动、无限滚动）

- [ ] Task 3: 搭建后端 MVP 骨架
  - [ ] SubTask 3.1: 搭建 API Gateway 基础版（路由、鉴权）
  - [ ] SubTask 3.2: 初始化内容服务骨架
  - [ ] SubTask 3.3: 初始化推荐服务骨架

- [ ] Task 4: 实现内容分级与内容流
  - [ ] SubTask 4.1: 设计内容数据模型（标题、描述、语言、Level 0-2、类型、标签、时长、视频 URL）
  - [ ] SubTask 4.2: 实现 Level 0-2 分级逻辑与存储
  - [ ] SubTask 4.3: 实现内容管理后台基础版（上传视频、标注 Level、发布）
  - [ ] SubTask 4.4: 实现内容流 API（按 Level + 兴趣返回内容列表）
  - [ ] SubTask 4.5: 准备英语种子内容（Level 0-2，至少 50 条视频）

- [ ] Task 5: 实现视频播放器
  - [ ] SubTask 5.1: 实现视频播放器核心（播放/暂停/进度/全屏）
  - [ ] SubTask 5.2: 实现单语字幕显示
  - [ ] SubTask 5.3: 实现语速调节控件
  - [ ] SubTask 5.4: 实现行为信号采集（pause/replay/completion/subtitle usage）

- [ ] Task 6: 实现 i+1 Engine MVP
  - [ ] SubTask 6.1: 实现简单画像（兴趣标签选择 + 自评理解力）
  - [ ] SubTask 6.2: 实现基于行为信号的动态难度调节（pause 多→降难、completion 高→升难）
  - [ ] SubTask 6.3: 实现内容推荐 API（基于画像 + i+1 匹配返回下一内容）

- [ ] Task 7: 实现 Effective Input Hours 追踪
  - [ ] SubTask 7.1: 实现输入时长记录（仅播放时计时，暂停不计时）
  - [ ] SubTask 7.2: 实现有效输入时长统计看板
  - [ ] SubTask 7.3: 实现用户端输入时长展示

## Phase 1: MVP+1（认知引擎基础）

- [ ] Task 8: 实现 State Machine State 0-2
  - [ ] SubTask 8.1: 实现 State 0-2 定义与特征
  - [ ] SubTask 8.2: 实现基于行为信号的状态迁移判定
  - [ ] SubTask 8.3: 实现状态策略执行（State 0→超慢速+强视觉，State 1→高频场景，State 2→扩大主题）

- [ ] Task 9: 实现 Acquisition Memory Graph 基础版
  - [ ] SubTask 9.1: 设计图谱数据模型基础版（词汇节点 + 出现关系边）
  - [ ] SubTask 9.2: 实现图谱存储（图数据库）
  - [ ] SubTask 9.3: 实现词汇暴露追踪（用户消费内容时自动写入图谱）
  - [ ] SubTask 9.4: 实现图谱驱动推荐基础版（强化路径：已暴露未习得词汇优先出现）

## Phase 2: MVP+2（情绪与沉浸基础）

- [ ] Task 10: 实现 Emotional State Engine 基础版
  - [ ] SubTask 10.1: 实现焦虑水平与专注度估计（基于行为信号）
  - [ ] SubTask 10.2: 实现情绪响应策略基础版（焦虑→降难、专注→延长沉浸）

- [ ] Task 11: 实现 Immersion Runtime 基础版
  - [ ] SubTask 11.1: 实现 Flow State 检测（基于连续输入时长与交互节奏）
  - [ ] SubTask 11.2: 实现静默队列（沉浸期间非关键通知排队）
  - [ ] SubTask 11.3: 实现无缝过渡（内容结束前预加载下一内容）

## Phase 3: MVP+3（世界与陪伴）

- [ ] Task 12: 实现第一个 World（Tokyo Apartment）
  - [ ] SubTask 12.1: 设计 World 数据模型（世界设定、NPC、事件、广播、消息）
  - [ ] SubTask 12.2: 实现 World 渲染引擎基础版（场景切换、NPC 对话、环境音）
  - [ ] SubTask 12.3: 实现 World 内语言输入自然出现机制
  - [ ] SubTask 12.4: 实现 World 与 State Machine 的难度联动

- [ ] Task 13: 实现 Persistent Companion 基础版
  - [ ] SubTask 13.1: 实现 AI Companion 基础对话能力（LLM 驱动，i+1 表达复杂度）
  - [ ] SubTask 13.2: 实现 Companion 记忆（记住用户信息与互动历史）
  - [ ] SubTask 13.3: 实现 Companion 与 World 的集成（Companion 生活在 World 中）

## Phase 4: 完整 Cognitive Engines

- [ ] Task 14: 实现 Language Acquisition Engine 完整版
  - [ ] SubTask 14.1: 实现语言画像 9 维度持续估计模型
  - [ ] SubTask 14.2: 实现 State Machine State 3-5
  - [ ] SubTask 14.3: 实现 i+1 算法完整版（考虑 State 策略约束 + Acquisition Memory Graph + 情绪适配度 + 叙事连续性）
  - [ ] SubTask 14.4: 实现理解率推断引擎完整版
  - [ ] SubTask 14.5: 实现动态降难/升难调节完整版

- [ ] Task 15: 实现 Emotional Memory Graph
  - [ ] SubTask 15.1: 设计情绪记忆图谱数据模型（情绪节点 + 情绪边 + 情绪强度 + 情绪衰减）
  - [ ] SubTask 15.2: 实现情绪编码（语言输入与情绪状态绑定记录）
  - [ ] SubTask 15.3: 实现情绪驱动推荐（强化情绪编码、利用情绪锚点扩展习得）

- [ ] Task 16: 实现 Narrative Continuity Engine
  - [ ] SubTask 16.1: 设计 Narrative Graph（叙事节点 + 叙事边 + 叙事张力 + 叙事惯性）
  - [ ] SubTask 16.2: 实现 Narrative Continuity Score
  - [ ] SubTask 16.3: 实现叙事驱动推荐（高潮维持、悬念预加载、低谷引入新线）

- [ ] Task 17: 实现 Identity Transition Engine
  - [ ] SubTask 17.1: 实现身份迁移信号追踪（目标语言思考/人格/偏好/情绪反应）
  - [ ] SubTask 17.2: 实现 Identity States（Observer → Visitor → Resident → Native）
  - [ ] SubTask 17.3: 实现身份驱动系统策略

## Phase 5: AI Agent System

- [ ] Task 18: 实现 Agent 基础框架
  - [ ] SubTask 18.1: 实现事件总线（Agent 间异步通信）
  - [ ] SubTask 18.2: 实现共享状态（语言画像 + 情绪状态 + 身份状态）
  - [ ] SubTask 18.3: 实现 Agent 决策护栏（所有 Agent 决策前通过 Philosophical Guardrails）

- [ ] Task 19: 实现 Language Companion Agent 完整版
  - [ ] SubTask 19.1: 实现用户阶段理解模块
  - [ ] SubTask 19.2: 实现焦虑调节模块（基于 Emotional State Engine）
  - [ ] SubTask 19.3: 实现输入推荐模块（综合兴趣 + i+1 + Memory Graph + 叙事连续性）
  - [ ] SubTask 19.4: 实现沉浸引导模块（与 Immersion Runtime 协作）

- [ ] Task 20: 实现 Comprehension Analyzer Agent
  - [ ] SubTask 20.1: 实现实时理解率评估
  - [ ] SubTask 20.2: 实现认知负荷评估
  - [ ] SubTask 20.3: 实现 i+1 匹配度评估

- [ ] Task 21: 实现 Content Adaptation Agent
  - [ ] SubTask 21.1: 实现动态降难（简化表达、替换生僻词）
  - [ ] SubTask 21.2: 实现语速重构
  - [ ] SubTask 21.3: 实现上下文提示增强

- [ ] Task 22: 实现 Silent Period Guardian Agent
  - [ ] SubTask 22.1: 实现过早输出检测
  - [ ] SubTask 22.2: 实现焦虑信号检测（基于 Emotional State Engine）
  - [ ] SubTask 22.3: 实现系统误伤防护

## Phase 6: Content Pipeline 完整版

- [ ] Task 23: 实现 Content Pipeline 完整版
  - [ ] SubTask 23.1: 实现 ASR 转录（Whisper）
  - [ ] SubTask 23.2: 实现多语言对齐
  - [ ] SubTask 23.3: 实现 i+1 Level 自动评估
  - [ ] SubTask 23.4: 实现高频词统计与语法模式提取
  - [ ] SubTask 23.5: 实现可理解性评分
  - [ ] SubTask 23.6: 实现 Embedding 向量化与推荐索引
  - [ ] SubTask 23.7: 实现视频转码与自适应码率
  - [ ] SubTask 23.8: 实现语速调节（不变调变速）

- [ ] Task 24: 实现 AI-native 内容生成
  - [ ] SubTask 24.1: 实现内容空缺检测
  - [ ] SubTask 24.2: 实现 i+1 故事/对话/情景剧生成
  - [ ] SubTask 24.3: 实现生成内容自动进入 Content Pipeline

## Phase 7: World Simulation Layer 完整版

- [ ] Task 25: 实现 World Simulation Layer 完整版
  - [ ] SubTask 25.1: 实现多 World 支持（Tokyo Apartment / Cyberpunk Seoul / Small Town America 等）
  - [ ] SubTask 25.2: 实现 World 内 NPC 系统与事件系统
  - [ ] SubTask 25.3: 实现 World 内叙事线管理
  - [ ] SubTask 25.4: 实现 World 与所有 Cognitive Engines 的深度集成

- [ ] Task 26: 实现 Persistent Companion System 完整版
  - [ ] SubTask 26.1: 实现 Companion 情感记忆（基于 Emotional Memory Graph）
  - [ ] SubTask 26.2: 实现 Companion 成长系统（随用户 State 演化）
  - [ ] SubTask 26.3: 实现 Companion 多角色支持

## Phase 8: Ambient Immersion System

- [ ] Task 27: 实现 Ambient Immersion System
  - [ ] SubTask 27.1: 实现耳机自动输入流
  - [ ] SubTask 27.2: 实现桌面漂浮字幕
  - [ ] SubTask 27.3: 实现锁屏界面目标语言内容
  - [ ] SubTask 27.4: 实现睡眠前低强度输入
  - [ ] SubTask 27.5: 实现 Ambient 与 State Machine 的难度联动

## Phase 9: 护栏与防退化系统

- [ ] Task 28: 实现 Philosophical Guardrails 审查机制
  - [ ] SubTask 28.1: 实现 Guardrail 1-5 审查
  - [ ] SubTask 28.2: 实现护栏审查 API
  - [ ] SubTask 28.3: 实现 Non-Goals 运行时守卫

- [ ] Task 29: 实现 Runtime Constitution 执行机制
  - [ ] SubTask 29.1: 实现 Rule 1-8 执行
  - [ ] SubTask 29.2: 实现 Runtime Constitution 监控看板

- [ ] Task 30: 实现推荐系统防 DAU 污染架构
  - [ ] SubTask 30.1: 实现推荐目标函数（唯一优化：最大化有效可理解输入时长）
  - [ ] SubTask 30.2: 实现 DAU/商业化/焦虑驱动信号隔离
  - [ ] SubTask 30.3: 实现推荐审计

- [ ] Task 31: 实现 Constitutional AI for Product Decisions
  - [ ] SubTask 31.1: 实现 Guardian AI 审查引擎（基于 Philosophical Guardrails + Runtime Constitution + Non-Goals）
  - [ ] SubTask 31.2: 实现提案提交→审查→通过/拦截流程
  - [ ] SubTask 31.3: 实现上线后持续监控与退化信号检测

## Phase 10: 习得系统与可视化

- [ ] Task 32: 实现单词习得系统
  - [ ] SubTask 32.1: 实现词汇暴露追踪（写入 Acquisition Memory Graph）
  - [ ] SubTask 32.2: 实现高频输入自动强化
  - [ ] SubTask 32.3: 实现语境记忆卡片
  - [ ] SubTask 32.4: 实现词汇习得状态流转

- [ ] Task 33: 实现语法习得提醒
  - [ ] SubTask 33.1: 实现语法结构识别
  - [ ] SubTask 33.2: 实现轻量规律提醒

- [ ] Task 34: 实现 North Star Metrics 追踪与可视化
  - [ ] SubTask 34.1: 实现有效可理解输入时长统计（Primary Metric）
  - [ ] SubTask 34.2: 实现自然理解增长率/沉浸连续性/输入覆盖广度/输出自然出现率追踪
  - [ ] SubTask 34.3: 实现 Anti-Metrics 监控
  - [ ] SubTask 34.4: 实现可视化成长系统（输入小时树/理解力曲线/听力进化/沉浸地图）

## Phase 11: 社区与输出

- [ ] Task 35: 实现社区沉浸系统
  - [ ] SubTask 35.1: 实现沉浸房间
  - [ ] SubTask 35.2: 实现输入挑战与成长分享

- [ ] Task 36: 实现 AI 对话输出系统
  - [ ] SubTask 36.1: 实现 AI 对话 Agent
  - [ ] SubTask 36.2: 实现输出阶段解锁逻辑（Silent Period Guardian 守护）
  - [ ] SubTask 36.3: 实现极简纠错与语音识别

## Phase 12: 多语言扩展

- [ ] Task 37: 实现日语与韩语支持
  - [ ] SubTask 37.1: 实现日语/韩语内容分级适配
  - [ ] SubTask 37.2: 实现日语/韩语字幕与释义
  - [ ] SubTask 37.3: 实现语言扩展配置化方案

# Task Dependencies

- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 4] depends on [Task 2, Task 3]
- [Task 5] depends on [Task 2, Task 4]
- [Task 6] depends on [Task 4, Task 5]
- [Task 7] depends on [Task 5]
- [Task 8] depends on [Task 6, Task 7]
- [Task 9] depends on [Task 8]
- [Task 10] depends on [Task 8]
- [Task 11] depends on [Task 8]
- [Task 12] depends on [Task 11, Task 9]
- [Task 13] depends on [Task 12]
- [Task 14] depends on [Task 9, Task 10]
- [Task 15] depends on [Task 10, Task 9]
- [Task 16] depends on [Task 12, Task 14]
- [Task 17] depends on [Task 14]
- [Task 18] depends on [Task 14, Task 3]
- [Task 19] depends on [Task 18]
- [Task 20] depends on [Task 18]
- [Task 21] depends on [Task 20]
- [Task 22] depends on [Task 18, Task 10]
- [Task 23] depends on [Task 4]
- [Task 24] depends on [Task 23, Task 14]
- [Task 25] depends on [Task 12, Task 14]
- [Task 26] depends on [Task 13, Task 15]
- [Task 27] depends on [Task 11, Task 14]
- [Task 28] depends on [Task 3]
- [Task 29] depends on [Task 28]
- [Task 30] depends on [Task 14, Task 15]
- [Task 31] depends on [Task 28, Task 29]
- [Task 32] depends on [Task 9, Task 5]
- [Task 33] depends on [Task 9, Task 5]
- [Task 34] depends on [Task 7, Task 9, Task 17]
- [Task 35] depends on [Task 6]
- [Task 36] depends on [Task 22, Task 14]
- [Task 37] depends on [Task 23, Task 4]

# Parallelizable Work

- Task 2 与 Task 3 可并行
- Task 8 与 Task 9 可在 MVP 验证后并行
- Task 10 与 Task 11 可并行
- Task 20、Task 21、Task 22 可并行（Agent 开发）
- Task 32 与 Task 33 可并行
