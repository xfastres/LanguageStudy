# Tasks

执行策略：按飞轮验证顺序推进。克制。先验证沉浸，再增加 Intelligence。

核心飞轮：Input → Behavior Signals → Comprehension Inference → Difficulty Adaptation → Better Immersion → Longer Input → More Signals → Better Adaptation

团队第一原则：Protect Immersion。不是 move fast。

最危险陷阱：AI Worldbuilding Addiction。World/Companion/Narrative 是 amplification layer，不是 engine。

## P0: 真 MVP（4 件事 — 生死验证）

唯一验证：Adaptive CI Runtime 是否真的比传统学习更容易进入长时沉浸？

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
  - [ ] SubTask 4.4: 英语种子内容（至少 50 条视频）

- [ ] Task 5: 视频播放器 + Signal Layer
  - [ ] SubTask 5.1: 视频播放器核心（播放/暂停/进度/全屏）
  - [ ] SubTask 5.2: 单语字幕显示 + 语速调节
  - [ ] SubTask 5.3: **Signal Layer（核心）**：采集 pause / replay / skip / completion / subtitle usage / playback speed / dwell time / immersion sequences

- [ ] Task 6: Comprehension Inference Engine（整个系统真正的大脑）
  - [ ] SubTask 6.1: 基于行为信号的理解率推断模型（pause → 低理解率、completion → 高理解率、replay → 局部不理解、skip → 完全不理解、subtitle usage → 依赖度高）
  - [ ] SubTask 6.2: 理解率推断校准（与用户主动反馈对比优化）
  - [ ] SubTask 6.3: 基于理解率的 i+1 动态难度调节（理解率 < 80% → 降难，> 90% → 升难；调整难度、语速、重复率、信息密度、字幕依赖）
  - [ ] SubTask 6.4: 内容推荐 API（基于理解率推断 + i+1 匹配返回下一内容）

**P0 验证门：用户能否忘记自己在学语言，连续沉浸 45-90 分钟？不能通过则迭代 P0，不前进。**

## P1: State + Exposure（P0 验证通过后）

- [ ] Task 7: State Machine State 0-2
  - [ ] SubTask 7.1: State 0-2 定义与特征
  - [ ] SubTask 7.2: 基于理解率推断的状态迁移判定
  - [ ] SubTask 7.3: 状态策略执行

- [ ] Task 8: Word Exposure Map（简化版 Memory Graph，不用图数据库）
  - [ ] SubTask 8.1: 词汇暴露追踪（记录用户在输入中遇到的词 + 暴露次数 + 上下文）
  - [ ] SubTask 8.2: 暴露驱动推荐（已暴露未习得词汇优先出现在后续内容中）

**P1 验证门：系统能否准确推断理解率并动态调节？用户沉浸时间是否增长？**

## P2: Immersion + Emotion（P1 验证通过后）

- [ ] Task 9: Immersion Runtime 基础版
  - [ ] SubTask 9.1: Flow State 检测
  - [ ] SubTask 9.2: 静默队列
  - [ ] SubTask 9.3: 无缝过渡 + 内容预加载

- [ ] Task 10: Emotional State Engine 基础版
  - [ ] SubTask 10.1: 焦虑水平与专注度估计
  - [ ] SubTask 10.2: 情绪响应策略（焦虑→降难、专注→延长沉浸）

- [ ] Task 11: Immersion Continuity 优化推荐
  - [ ] SubTask 11.1: 推荐目标函数（优化 Immersion Continuity，不是 CTR）
  - [ ] SubTask 11.2: 沉浸连续性追踪

**P2 验证门：推荐系统是否优化了沉浸连续性？情绪系统是否降低了焦虑？**

## P3: World & Companion（P2 验证通过后 — 放大器层，最危险的阶段）

⚠️ 警惕 AI Worldbuilding Addiction。这些是 amplification layer，不是 engine。如果输入飞轮没建立，这些只会变成 AI Chat app / AI RPG / Character AI clone。

- [ ] Task 12: 第一个 World（Tokyo Apartment）
  - [ ] SubTask 12.1: World 数据模型
  - [ ] SubTask 12.2: World 渲染引擎基础版
  - [ ] SubTask 12.3: World 内语言输入自然出现机制
  - [ ] SubTask 12.4: World 与 State Machine 难度联动

- [ ] Task 13: Persistent Companion 基础版（Input-first，不是 Conversation-first）
  - [ ] SubTask 13.1: AI Companion 基础对话（LLM 驱动，i+1 表达复杂度）
  - [ ] SubTask 13.2: Companion 记忆
  - [ ] SubTask 13.3: Companion 与 World 集成

- [ ] Task 14: Narrative Continuity Engine 基础版
  - [ ] SubTask 14.1: Narrative Graph 基础版
  - [ ] SubTask 14.2: Narrative Continuity Score

**P3 验证门：World 是否让用户忘记自己在学语言？Companion 是否增强了输入耐受度而非打断沉浸？**

## 后续扩展（P3 验证通过后，逐步推进）

- [ ] Task 15: Identity Transition Engine
- [ ] Task 16: Emotional Memory Graph
- [ ] Task 17: Acquisition Memory Graph 完整版（升级为图数据库）
- [ ] Task 18: Ambient Immersion System
- [ ] Task 19: AI Agent System（Companion Agent、Analyzer Agent、Adapter Agent、Guardian Agent）
- [ ] Task 20: Content Pipeline 完整版（ASR、向量化、AI-native 内容生成）
- [ ] Task 21: 护栏与防退化系统（Guardrails、Runtime Constitution、Constitutional AI）
- [ ] Task 22: 习得系统与可视化
- [ ] Task 23: 社区与输出
- [ ] Task 24: 多语言扩展

# Task Dependencies

- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 4] depends on [Task 2, Task 3]
- [Task 5] depends on [Task 2, Task 4]
- [Task 6] depends on [Task 5]
- [Task 7] depends on [Task 6] (P0 验证通过)
- [Task 8] depends on [Task 7]
- [Task 9] depends on [Task 8] (P1 验证通过)
- [Task 10] depends on [Task 9]
- [Task 11] depends on [Task 9]
- [Task 12] depends on [Task 11] (P2 验证通过)
- [Task 13] depends on [Task 12]
- [Task 14] depends on [Task 12]

# Parallelizable Work

- Task 2 与 Task 3 可并行
- Task 10 与 Task 11 可并行（P2 内部）
- Task 12 与 Task 13 可部分并行（P3 内部）

# Validation Gates（验证门 — 不可跳过）

- **P0 → P1**：用户能否忘记自己在学语言，连续沉浸 45-90 分钟？
- **P1 → P2**：系统能否准确推断理解率并动态调节难度？
- **P2 → P3**：推荐系统是否优化了沉浸连续性？情绪系统是否降低了焦虑？
- **P3 → 后续**：World 是否让用户忘记自己在学语言？Companion 是否增强了输入耐受度？
