# Tasks

执行策略：按飞轮验证顺序推进。克制。先验证沉浸，再增加 Intelligence。

核心飞轮：Input → Behavior Signals → Comprehension Inference → Difficulty Adaptation → Better Immersion → Longer Input → More Signals → Better Adaptation

团队第一原则：Protect Immersion。不是 move fast。

最危险陷阱：AI Worldbuilding Addiction。World/Companion/Narrative 是 amplification layer，不是 engine。

## 已完成

- [x] Task 0: Cognitive Runtime Kernel（已实现）
  - [x] SubTask 0.1: @linguaflow/telemetry — 事件系统 + 会话追踪 + 轨迹回放
  - [x] SubTask 0.2: @linguaflow/runtime-core — immersionScore / cognitiveLoad / flowProbability / switchingCost
  - [x] SubTask 0.3: @linguaflow/feature-space — 10维 i+1 特征空间 + 距离度量 + 自适应遍历
  - [x] SubTask 0.4: @linguaflow/comprehension — Heuristic 理解率推断 + 校准系统 + 难度自适应
  - [x] SubTask 0.5: @linguaflow/evaluation — 轨迹数据集 + 回放模拟器 + 认知稳定性指标 + 漂移检测
  - [x] SubTask 0.6: @linguaflow/simulation — 6种合成用户画像 + runtime.step() + 缺陷分析器

- [x] Task 1: 初始化项目工程结构
  - [x] SubTask 1.1: 初始化 monorepo 结构
  - [x] SubTask 1.2: 配置 TypeScript、ESLint、Prettier
  - [x] SubTask 1.3: 配置 Docker Compose（PostgreSQL、Redis、Qdrant、MinIO）

## Phase 1（0-3 个月）：验证长时沉浸 — 3-5 人

唯一验证：用户是否会忘记自己在学语言？

- [x] Task 2: 前端 MVP — TikTok-like 无限输入流
  - [x] SubTask 2.1: Next.js App Router 项目结构 + Tailwind CSS 配置 + 低焦虑配色系统
  - [x] SubTask 2.2: 全屏沉浸式视频流布局（竖屏滑动、无缝切换、无传统导航栏）
  - [x] SubTask 2.3: 视频播放器组件（播放/暂停/进度/全屏/语速调节）
  - [x] SubTask 2.4: 单语字幕组件（字幕显示/隐藏切换、字幕样式）
  - [x] SubTask 2.5: Runtime SDK 集成（前端接入 @linguaflow/telemetry + @linguaflow/runtime-core，采集行为信号）

- [x] Task 3: 后端 MVP — 内容服务 + 推荐服务
  - [x] SubTask 3.1: 内容数据模型（ContentFeatureVector + Level 0-2 分级 + 多语言支持）
  - [x] SubTask 3.2: 内容 CRUD API（创建/查询/分级标注）
  - [x] SubTask 3.3: 内容流 API（基于 i+1 匹配返回下一内容，集成 @linguaflow/feature-space）
  - [x] SubTask 3.4: 推荐服务骨架（集成 comprehension + feature-space，输出 recommendNext()）
  - [x] SubTask 3.5: Signal 接收 API（接收前端行为信号，写入 telemetry 事件流）

- [x] Task 4: 内容分级与种子内容
  - [x] SubTask 4.1: 内容管理后台基础版（内容上传 + AI 辅助分级标注）
  - [x] SubTask 4.2: 英语种子内容（50 条：强视觉、高频结构、微剧情、高情绪表达、高上下文可猜测性，Level 0-2）

- [x] Task 5: 闭环集成 — Runtime 驱动内容推荐
  - [x] SubTask 5.1: 前端 Signal Collection Layer 完整接入（10 信号全量采集）
  - [x] SubTask 5.2: 后端 Comprehension Inference 集成（Heuristic v1 实时推断理解率）
  - [x] SubTask 5.3: i+1 动态难度调节闭环（理解率 < 80% → 降难，> 90% → 升难）
  - [x] SubTask 5.4: Adaptive Difficulty Dimensions 集成（speech_speed / sentence_density / vocabulary_novelty / subtitle_exposure / scene_complexity / context_richness）

**Phase 1 验证门：用户能否忘记自己在学语言，连续沉浸 45-90 分钟？不能通过则迭代 Phase 1，不前进。**

## Phase 2（3-6 个月）：验证状态迁移

不要做 World。

- [ ] Task 6: State Machine State 0-2
  - [ ] SubTask 6.1: State 0-2 定义与特征
  - [ ] SubTask 6.2: 基于理解率推断的状态迁移判定
  - [ ] SubTask 6.3: 状态策略执行

- [ ] Task 7: Word Exposure Map（不用图数据库）
  - [ ] SubTask 7.1: 词汇暴露追踪（word → exposure_count / last_seen / contexts / confidence）
  - [ ] SubTask 7.2: 暴露驱动推荐

- [ ] Task 8: Better Recommendation + Subtitle Adaptation
  - [ ] SubTask 8.1: 推荐优化（基于理解率 + 暴露数据 + 行为序列）
  - [ ] SubTask 8.2: 字幕自适应（根据理解率动态调整字幕暴露度）

**Phase 2 验证门：系统能否准确推断理解率并动态调节？用户沉浸时间是否增长？**

## Phase 3（6-12 个月）：验证 emotional immersion

依然不要做 full AI world。

- [ ] Task 9: Immersion Runtime 生产化
  - [ ] SubTask 9.1: Flow State 检测生产化
  - [ ] SubTask 9.2: 静默队列 + Interruption Management
  - [ ] SubTask 9.3: 无缝过渡 + 内容预加载
  - [ ] SubTask 9.4: Immersion Runtime API 生产化部署

- [ ] Task 10: Emotional Runtime Lite
  - [ ] SubTask 10.1: 焦虑水平与专注度估计
  - [ ] SubTask 10.2: 情绪响应策略

- [ ] Task 11: Session Continuity
  - [ ] SubTask 11.1: 跨 session 沉浸连续性
  - [ ] SubTask 11.2: Ambient Continuity 基础版

**Phase 3 验证门：推荐系统是否优化了沉浸连续性？情绪系统是否降低了焦虑？**

## Phase 4（12-18 个月）：World & Companion — ⚠️ 最危险阶段

只有当 Input Flywheel 已成立，才允许进入此阶段。

⚠️ 警惕 AI Worldbuilding Addiction。

- [ ] Task 12: 第一个 World（Tokyo Apartment）
- [ ] Task 13: Persistent Companion 基础版（Input-first）
- [ ] Task 14: Narrative Continuity Engine 基础版

**Phase 4 验证门：World 是否让用户忘记自己在学语言？Companion 是否增强了输入耐受度而非打断沉浸？**

# Task Dependencies

- [Task 2] depends on [Task 1] (已完成)
- [Task 3] depends on [Task 1] (已完成)
- [Task 4] depends on [Task 2, Task 3]
- [Task 5] depends on [Task 2, Task 3, Task 4]
- [Task 6] depends on [Task 5] (Phase 1 验证通过)
- [Task 7] depends on [Task 6]
- [Task 8] depends on [Task 7]

# Parallelizable Work

- Task 2 与 Task 3 可并行
- Task 4 可在 Task 2/3 完成后立即开始

# Validation Gates（验证门 — 不可跳过）

- **Phase 1 → 2**：用户能否忘记自己在学语言，连续沉浸 45-90 分钟？
- **Phase 2 → 3**：系统能否准确推断理解率并动态调节难度？
- **Phase 3 → 4**：推荐系统是否优化了沉浸连续性？情绪系统是否降低了焦虑？
- **Phase 4 → 后续**：World 是否让用户忘记自己在学语言？Companion 是否增强了输入耐受度？
