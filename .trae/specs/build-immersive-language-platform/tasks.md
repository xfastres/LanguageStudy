# Tasks

执行策略：按飞轮验证顺序推进。克制。先验证沉浸，再增加 Intelligence。

核心飞轮：Input → Behavior Signals → Comprehension Inference → Difficulty Adaptation → Better Immersion → Longer Input → More Signals → Better Adaptation

团队第一原则：Protect Immersion。不是 move fast。

最危险陷阱：AI Worldbuilding Addiction。World/Companion/Narrative 是 amplification layer，不是 engine。

## Phase 1（0-3 个月）：验证长时沉浸 — 3-5 人

唯一验证：用户是否会忘记自己在学语言？

- [ ] Task 1: 初始化项目工程结构
  - [ ] SubTask 1.1: 初始化 monorepo 结构
  - [ ] SubTask 1.2: 配置 TypeScript、ESLint、Prettier
  - [ ] SubTask 1.3: 配置 Docker Compose（PostgreSQL、Redis）
  - [ ] SubTask 1.4: 配置 CI/CD

- [ ] Task 2: 前端 MVP
  - [ ] SubTask 2.1: 初始化 Next.js 项目，App Router
  - [ ] SubTask 2.2: UI 组件库基础（极简、低焦虑配色）
  - [ ] SubTask 2.3: TikTok-like 无限输入流布局

- [ ] Task 3: 后端 MVP
  - [ ] SubTask 3.1: API Gateway 基础版
  - [ ] SubTask 3.2: 内容服务骨架
  - [ ] SubTask 3.3: 推荐服务骨架

- [ ] Task 4: 内容分级与种子内容
  - [ ] SubTask 4.1: 内容数据模型（Level 0-2）
  - [ ] SubTask 4.2: 内容管理后台基础版
  - [ ] SubTask 4.3: 内容流 API
  - [ ] SubTask 4.4: 英语种子内容（50-100 条高质量短视频：强视觉、高频结构、微剧情、高情绪表达、高上下文可猜测性）

- [ ] Task 5: 视频播放器 + Signal Collection Layer
  - [ ] SubTask 5.1: 视频播放器核心（播放/暂停/进度/全屏）
  - [ ] SubTask 5.2: 单语字幕显示 + 语速调节
  - [ ] SubTask 5.3: **Signal Collection Layer（核心 — 整个公司的根基）**：采集 pause_frequency / replay_segments / subtitle_toggle / playback_speed / dwell_time / completion_rate / skip_position / immersion_session_length / transition_latency / abandonment_points

- [ ] Task 6: Comprehension Inference Engine — Heuristic-first
  - [ ] SubTask 6.1: Heuristic 理解率推断规则（replay < threshold AND pause_rate low AND completion high AND subtitle_dependency low → comprehension_estimate +=）
  - [ ] SubTask 6.2: 理解率推断校准（与用户主动反馈对比优化）
  - [ ] SubTask 6.3: 基于理解率的 i+1 动态难度调节（< 80% → 降难，> 90% → 升难）
  - [ ] SubTask 6.4: Adaptive Difficulty Dimensions：continuously adapt speech_speed / sentence_density / vocabulary_novelty / subtitle_exposure / scene_complexity / context_richness
  - [ ] SubTask 6.5: 内容推荐 API（基于理解率推断 + i+1 匹配返回下一内容）

**Phase 1 验证门：用户能否忘记自己在学语言，连续沉浸 45-90 分钟？不能通过则迭代 Phase 1，不前进。**

## Phase 2（3-6 个月）：验证状态迁移

不要做 World。

- [ ] Task 7: State Machine State 0-2
  - [ ] SubTask 7.1: State 0-2 定义与特征
  - [ ] SubTask 7.2: 基于理解率推断的状态迁移判定
  - [ ] SubTask 7.3: 状态策略执行

- [ ] Task 8: Word Exposure Map（不用图数据库）
  - [ ] SubTask 8.1: 词汇暴露追踪（word → exposure_count / last_seen / contexts / confidence）
  - [ ] SubTask 8.2: 暴露驱动推荐

- [ ] Task 9: Better Recommendation + Subtitle Adaptation
  - [ ] SubTask 9.1: 推荐优化（基于理解率 + 暴露数据 + 行为序列）
  - [ ] SubTask 9.2: 字幕自适应（根据理解率动态调整字幕暴露度）

**Phase 2 验证门：系统能否准确推断理解率并动态调节？用户沉浸时间是否增长？**

## Phase 3（6-12 个月）：验证 emotional immersion

依然不要做 full AI world。

- [ ] Task 10: Immersion Runtime 基础版
  - [ ] SubTask 10.1: Flow State 检测
  - [ ] SubTask 10.2: 静默队列 + Interruption Management
  - [ ] SubTask 10.3: 无缝过渡 + 内容预加载
  - [ ] SubTask 10.4: Immersion Runtime API 实现（immersionScore / cognitiveLoad / interruptionBudget / flowStateProbability / canInterrupt() / scheduleTransition() / estimateSwitchingCost()）

- [ ] Task 11: Emotional Runtime Lite
  - [ ] SubTask 11.1: 焦虑水平与专注度估计
  - [ ] SubTask 11.2: 情绪响应策略（焦虑→降难、专注→延长沉浸）

- [ ] Task 12: Session Continuity
  - [ ] SubTask 12.1: 跨 session 沉浸连续性
  - [ ] SubTask 12.2: Ambient Continuity（基础版：下次打开时恢复沉浸状态）

**Phase 3 验证门：推荐系统是否优化了沉浸连续性？情绪系统是否降低了焦虑？**

## Phase 4（12-18 个月）：World & Companion — ⚠️ 最危险阶段

只有当 Input Flywheel 已成立，才允许进入此阶段。

⚠️ 警惕 AI Worldbuilding Addiction。如果输入飞轮没建立，这些只会变成 AI Chat app / AI RPG / Character AI clone。

- [ ] Task 13: 第一个 World（Tokyo Apartment）
  - [ ] SubTask 13.1: World 数据模型
  - [ ] SubTask 13.2: World 渲染引擎基础版
  - [ ] SubTask 13.3: World 内语言输入自然出现机制
  - [ ] SubTask 13.4: World 与 State Machine 难度联动

- [ ] Task 14: Persistent Companion 基础版（Input-first，不是 Conversation-first）
  - [ ] SubTask 14.1: AI Companion 基础对话（LLM 驱动，i+1 表达复杂度）
  - [ ] SubTask 14.2: Companion 记忆
  - [ ] SubTask 14.3: Companion 与 World 集成

- [ ] Task 15: Narrative Continuity Engine 基础版
  - [ ] SubTask 15.1: Narrative Graph 基础版
  - [ ] SubTask 15.2: Narrative Continuity Score

**Phase 4 验证门：World 是否让用户忘记自己在学语言？Companion 是否增强了输入耐受度而非打断沉浸？**

## 后续扩展（Phase 4 验证通过后，18 个月+）

- [ ] Task 16: Identity Transition Engine
- [ ] Task 17: Emotional Memory Graph
- [ ] Task 18: Acquisition Memory Graph 完整版（升级为图数据库）
- [ ] Task 19: Ambient Immersion System
- [ ] Task 20: AI Agent System
- [ ] Task 21: Content Pipeline 完整版（ASR、向量化、AI-native 内容生成）
- [ ] Task 22: 护栏与防退化系统（Guardrails、Runtime Constitution、Constitutional AI）
- [ ] Task 23: 习得系统与可视化
- [ ] Task 24: 社区与输出
- [ ] Task 25: 多语言扩展

# Task Dependencies

- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 4] depends on [Task 2, Task 3]
- [Task 5] depends on [Task 2, Task 4]
- [Task 6] depends on [Task 5]
- [Task 7] depends on [Task 6] (Phase 1 验证通过)
- [Task 8] depends on [Task 7]
- [Task 9] depends on [Task 8]
- [Task 10] depends on [Task 9] (Phase 2 验证通过)
- [Task 11] depends on [Task 10]
- [Task 12] depends on [Task 10]
- [Task 13] depends on [Task 12] (Phase 3 验证通过)
- [Task 14] depends on [Task 13]
- [Task 15] depends on [Task 13]

# Parallelizable Work

- Task 2 与 Task 3 可并行
- Task 11 与 Task 12 可并行（Phase 3 内部）
- Task 13 与 Task 14 可部分并行（Phase 4 内部）

# Validation Gates（验证门 — 不可跳过）

- **Phase 1 → 2**（3 个月门）：用户能否忘记自己在学语言，连续沉浸 45-90 分钟？
- **Phase 2 → 3**（6 个月门）：系统能否准确推断理解率并动态调节难度？
- **Phase 3 → 4**（12 个月门）：推荐系统是否优化了沉浸连续性？情绪系统是否降低了焦虑？
- **Phase 4 → 后续**（18 个月门）：World 是否让用户忘记自己在学语言？Companion 是否增强了输入耐受度？
