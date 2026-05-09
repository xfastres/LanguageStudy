# Tasks

执行策略：按飞轮验证顺序推进，不是按 Layer 从底到顶全部做完。

核心飞轮：Input → Behavior Signals → Comprehension Inference → Difficulty Adaptation → Better Immersion → Longer Input → More Signals → Better Adaptation

## Layer A: Signal Layer（最先做 — 未来所有 AI 的根基）

- [ ] Task 1: 初始化项目工程结构
  - [ ] SubTask 1.1: 初始化 monorepo 结构（前端 apps/web、后端 services/*、共享 packages/*）
  - [ ] SubTask 1.2: 配置 TypeScript、ESLint、Prettier
  - [ ] SubTask 1.3: 配置 Docker Compose（PostgreSQL、Redis）
  - [ ] SubTask 1.4: 配置 CI/CD

- [ ] Task 2: 搭建前端 MVP
  - [ ] SubTask 2.1: 初始化 Next.js 项目，App Router
  - [ ] SubTask 2.2: UI 组件库基础（极简、低焦虑配色）
  - [ ] SubTask 2.3: TikTok-like 内容流布局（全屏视频卡片、上下滑动、无限滚动）

- [ ] Task 3: 搭建后端 MVP
  - [ ] SubTask 3.1: API Gateway 基础版（路由、鉴权）
  - [ ] SubTask 3.2: 内容服务骨架
  - [ ] SubTask 3.3: 推荐服务骨架

- [ ] Task 4: 内容分级与种子内容
  - [ ] SubTask 4.1: 内容数据模型（标题、描述、语言、Level 0-2、类型、标签、时长、视频 URL）
  - [ ] SubTask 4.2: Level 0-2 分级逻辑与存储
  - [ ] SubTask 4.3: 内容管理后台基础版（上传视频、标注 Level、发布）
  - [ ] SubTask 4.4: 内容流 API（按 Level + 兴趣返回内容列表）
  - [ ] SubTask 4.5: 英语种子内容（Level 0-2，至少 50 条视频）

- [ ] Task 5: 视频播放器 + 行为信号采集
  - [ ] SubTask 5.1: 视频播放器核心（播放/暂停/进度/全屏）
  - [ ] SubTask 5.2: 单语字幕显示
  - [ ] SubTask 5.3: 语速调节控件
  - [ ] SubTask 5.4: **行为信号采集（核心）**：pause / replay / skip / completion / subtitle usage / playback speed / dwell time / immersion sequences

- [ ] Task 6: 简单画像 + Effective Input Hours
  - [ ] SubTask 6.1: 简单画像（兴趣标签选择 + 自评理解力）
  - [ ] SubTask 6.2: 输入时长记录（仅播放时计时，暂停不计时）
  - [ ] SubTask 6.3: 有效输入时长统计看板
  - [ ] SubTask 6.4: 用户端输入时长展示

**Layer A 验证门**：用户能否连续沉浸 45-90 分钟？不能通过则不进入 Layer B。

## Layer B: Comprehension Inference Engine（第二做 — 真正的大脑）

这是最核心的 AI 系统。不是 LLM，而是 Comprehension Estimation System。

- [ ] Task 7: 理解率推断引擎
  - [ ] SubTask 7.1: 基于行为信号的理解率推断模型（pause 频率 → 低理解率、completion → 高理解率、replay → 局部不理解、skip → 完全不理解、subtitle usage → 依赖度高）
  - [ ] SubTask 7.2: 理解率推断校准（与用户主动反馈对比，持续优化推断准确度）
  - [ ] SubTask 7.3: 理解率作为推荐引擎核心输入

- [ ] Task 8: 动态难度调节
  - [ ] SubTask 8.1: 基于理解率的 i+1 难度调节算法（理解率 < 80% → 降难，理解率 > 90% → 升难）
  - [ ] SubTask 8.2: 内容推荐 API（基于画像 + 理解率推断 + i+1 匹配返回下一内容）

- [ ] Task 9: State Machine State 0-2
  - [ ] SubTask 9.1: State 0-2 定义与特征
  - [ ] SubTask 9.2: 基于理解率推断的状态迁移判定
  - [ ] SubTask 9.3: 状态策略执行

**Layer B 验证门**：系统能否准确推断用户理解率并动态调节难度？用户是否在 i+1 推荐下沉浸时间增长？

## Layer C: Adaptive Recommendation Runtime（第三做 — 优化 Immersion Continuity）

- [ ] Task 10: Acquisition Memory Graph 基础版
  - [ ] SubTask 10.1: 图谱数据模型基础版（词汇节点 + 出现关系边）
  - [ ] SubTask 10.2: 图谱存储（图数据库）
  - [ ] SubTask 10.3: 词汇暴露追踪
  - [ ] SubTask 10.4: 图谱驱动推荐基础版

- [ ] Task 11: Immersion Continuity 优化推荐
  - [ ] SubTask 11.1: 推荐目标函数（优化 Immersion Continuity，不是 CTR）
  - [ ] SubTask 11.2: 内容预加载与无缝过渡
  - [ ] SubTask 11.3: 沉浸连续性追踪

- [ ] Task 12: Immersion Runtime 基础版
  - [ ] SubTask 12.1: Flow State 检测
  - [ ] SubTask 12.2: 静默队列
  - [ ] SubTask 12.3: 无缝过渡

**Layer C 验证门**：推荐系统是否优化了沉浸连续性（而非 CTR/DAU）？用户沉浸时长是否持续增长？

## Layer D: Emotional Runtime（第四做 — A/B/C 稳定后）

- [ ] Task 13: Emotional State Engine 基础版
  - [ ] SubTask 13.1: 焦虑水平与专注度估计
  - [ ] SubTask 13.2: 情绪响应策略基础版

- [ ] Task 14: Emotional Memory Graph
  - [ ] SubTask 14.1: 情绪记忆图谱数据模型
  - [ ] SubTask 14.2: 情绪编码
  - [ ] SubTask 14.3: 情绪驱动推荐

- [ ] Task 15: Narrative Continuity Engine
  - [ ] SubTask 15.1: Narrative Graph
  - [ ] SubTask 15.2: Narrative Continuity Score
  - [ ] SubTask 15.3: 叙事驱动推荐

**Layer D 验证门**：情绪系统是否降低了用户焦虑？叙事连续性是否延长了沉浸时间？

## Layer E: World & Companion（最后做 — 放大器层）

- [ ] Task 16: 第一个 World（Tokyo Apartment）
  - [ ] SubTask 16.1: World 数据模型
  - [ ] SubTask 16.2: World 渲染引擎基础版
  - [ ] SubTask 16.3: World 内语言输入自然出现机制
  - [ ] SubTask 16.4: World 与 State Machine 难度联动

- [ ] Task 17: Persistent Companion 基础版
  - [ ] SubTask 17.1: AI Companion 基础对话（LLM 驱动，i+1 表达复杂度，Input-first 不是 Conversation-first）
  - [ ] SubTask 17.2: Companion 记忆
  - [ ] SubTask 17.3: Companion 与 World 集成

- [ ] Task 18: Identity Transition Engine
  - [ ] SubTask 18.1: 身份迁移信号追踪
  - [ ] SubTask 18.2: Identity States（Observer → Visitor → Resident → Native）
  - [ ] SubTask 18.3: 身份驱动系统策略

**Layer E 验证门**：World 是否让用户忘记自己在学语言？Companion 是否增强了输入耐受度而非打断沉浸？

## 后续扩展（Layer E 验证通过后）

- [ ] Task 19: World Simulation Layer 完整版（多 World、NPC 系统、叙事线管理）
- [ ] Task 20: Persistent Companion System 完整版（情感记忆、成长系统、多角色）
- [ ] Task 21: Ambient Immersion System（耳机输入流、桌面漂浮字幕、锁屏内容）
- [ ] Task 22: AI Agent System（Companion Agent、Analyzer Agent、Adapter Agent、Guardian Agent）
- [ ] Task 23: Content Pipeline 完整版（ASR、向量化、AI-native 内容生成）
- [ ] Task 24: 护栏与防退化系统（Guardrails、Runtime Constitution、Constitutional AI）
- [ ] Task 25: 习得系统与可视化（单词习得、语法提醒、North Star Metrics）
- [ ] Task 26: 社区与输出（沉浸房间、AI 对话输出）
- [ ] Task 27: 多语言扩展（日语、韩语）

# Task Dependencies

- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 4] depends on [Task 2, Task 3]
- [Task 5] depends on [Task 2, Task 4]
- [Task 6] depends on [Task 5]
- [Task 7] depends on [Task 5, Task 6] (Layer A 验证通过)
- [Task 8] depends on [Task 7]
- [Task 9] depends on [Task 8]
- [Task 10] depends on [Task 9] (Layer B 验证通过)
- [Task 11] depends on [Task 10]
- [Task 12] depends on [Task 11]
- [Task 13] depends on [Task 12] (Layer C 验证通过)
- [Task 14] depends on [Task 13]
- [Task 15] depends on [Task 13]
- [Task 16] depends on [Task 15] (Layer D 验证通过)
- [Task 17] depends on [Task 16]
- [Task 18] depends on [Task 17]

# Parallelizable Work

- Task 2 与 Task 3 可并行
- Task 14 与 Task 15 可并行（Layer D 内部）
- Task 16 与 Task 17 可部分并行（World 与 Companion 基础版）

# Validation Gates（验证门）

每个 Layer 必须通过验证门才能进入下一 Layer。未通过则迭代优化当前 Layer，不前进。

- **Layer A → B**：用户能否连续沉浸 45-90 分钟？
- **Layer B → C**：系统能否准确推断理解率并动态调节难度？
- **Layer C → D**：推荐系统是否优化了沉浸连续性？
- **Layer D → E**：情绪系统是否降低了焦虑？
- **Layer E → 后续**：World 是否让用户忘记自己在学语言？
