# LinguaFlow OS — AI-native Parallel Cognitive World Spec

## Why

当前语言学习产品普遍采用"显性学习"范式——背单词、刷语法、做题考试——这与人类母语习得的自然路径完全背离。Stephen Krashen 的第二语言习得理论证明：语言能力的获得依赖于大量可理解性输入（Comprehensible Input），而非刻意练习。市场上缺少一个真正以"输入优先、自然习得"为核心理念的沉浸式语言习得操作系统。

但更深层的问题是：即使以输入为核心，如果用户仍然"知道自己在学习语言"，认知负荷就会升高、焦虑就会升高、Flow 就容易断裂。人类不是通过"语言"习得语言的，人类是通过"活在世界里"习得语言的。儿童不是在学单词和语法，而是在想吃东西、想表达情绪、想参与故事、想融入世界。语言只是世界接口。

LinguaFlow OS 本质上不是 EdTech 产品，不是语言学习平台，甚至不仅仅是认知沉浸系统。它是一个 **AI-native Parallel Cognitive World（AI 原生平行认知世界）**。用户不是在"学语言"，而是生活在一个目标语言世界中，语言只是副产品。

## Core Hierarchy（核心层级）

```
Runtime > Feature
State > Level
Input > Practice
Immersion > Engagement
Acquisition > Education
World > Content
Identity > Skill
Narrative > Interest
Emotion > Repetition
```

## What Changes

- 构建基于可理解性输入（i+1）的沉浸式内容消费系统
- 构建 Immersion Runtime（沉浸运行时），作为系统最底层运行时环境
- 构建 Acquisition Memory Graph（语言记忆图谱），追踪语言习得的网络化记忆结构
- 构建 Emotional State Engine（情绪状态引擎），实时感知与响应用户情绪
- 构建动态语言画像与 Language Acquisition Engine，自适应推送 i+1 内容
- 实现 Language Acquisition State Machine（6 状态迁移），基于行为信号驱动状态判定
- 设计静默期友好的学习路径，禁止初期强制输出
- 构建低焦虑 UI/UX 体系，消除传统教育产品中的惩罚与纠错机制
- 实现兴趣驱动的内容推荐流（类 TikTok/YouTube/Netflix 体验），推荐系统防 DAU 污染架构
- 构建多语言支持架构（英语、日语、韩语，可扩展）
- 设计以"有效可理解输入时长"为北极星指标的进度追踪系统
- 构建社区沉浸环境与成就激励系统
- 构建 Content Pipeline 内容供应链系统
- 构建 AI Agent System 多智能体协作架构
- 建立哲学护栏（Philosophical Guardrails）防止产品退化
- 建立 Runtime Constitution（运行时宪法）约束系统运行时行为
- 建立 Language Acquisition State Machine（语言习得状态机）驱动推荐与路径
- 构建 World Simulation Layer（世界模拟层），从内容消费升级为世界沉浸
- 构建 Persistent Companion System（持续陪伴系统），情感依附驱动长期习得
- 构建 Emotional Memory Graph（情绪记忆图谱），长期情绪编码语言记忆
- 构建 Narrative Continuity Engine（叙事连续性引擎），维持故事张力
- 构建 Identity Transition Engine（身份迁移引擎），追踪身份转变
- 构建 Ambient Immersion System（环境沉浸系统），环境级潜意识习得
- 构建 Constitutional AI for Product Decisions（产品决策宪法 AI），组织级防退化
- 定义系统分层架构与 MVP 最小闭环

## Impact

- Affected specs: 全新平台，无既有规格受影响
- Affected code: 全新代码库，从零构建

---

## Non-Goals（绝对禁止）

系统绝对不能退化为以下形态。任何新功能上线前必须通过 Non-Goals 审查。

### 禁止事项 1：禁止题库化

系统不是刷题平台、语法考试系统、背词软件。

禁止：
- 大量选择题
- 高频考试
- 题海模式
- 语法填空练习
- 单词拼写测试

### 禁止事项 2：禁止教育化 UI

平台应更像 Netflix / Spotify / TikTok / YouTube。

禁止：
- 强课堂感
- PPT 风格
- 教学章节树
- "下一课"按钮
- "完成作业"提示
- 课程进度条（传统 LMS 式）
- Moodle / Coursera / 学校 LMS 风格

### 禁止事项 3：禁止强制输出

输出永远是输入积累后的自然结果。

禁止：
- 初期口语打卡
- 开口 KPI
- 高频发音评分
- 红色纠错
- 语法改错练习

### 禁止事项 4：禁止显式语法教学主导

语法只能轻提醒、规律感知、输入中自然浮现。

禁止：
- 长篇语法课
- 复杂术语教学
- 规则记忆要求
- 语法点打卡

### 禁止事项 5：禁止焦虑机制

系统必须温和、包容、长期主义。

禁止：
- 连续签到惩罚
- 学习中断 guilt trip
- "你今天落后了"提示
- Streak 压迫机制
- 排名与竞争
- 红色警告
- 失败反馈

---

## North Star Metrics（北极星指标）

平台核心指标不是做题量、背词量、完课率。以下为系统唯一认可的核心指标体系。

### Primary Metric：有效可理解输入时长（Core Metric）

定义：用户真正理解 80%+ 内容的输入时间。

这是平台最核心指标。所有产品决策以此为准绳。

### Secondary Metrics

1. **自然理解增长率**：用户在无字幕情况下的自然理解提升速度
2. **沉浸连续性**：用户是否形成长期低压力输入习惯（非 streak 绑架，而是自然沉浸）
3. **输入覆盖广度**：用户接触的真实语言场景数量与多样性
4. **输出自然出现率**：用户是否在无强迫情况下自然开始表达

### Anti-Metrics（系统明确不优化的指标）

- DAU 单纯数字（不追求日活，追求有效输入时长）
- 完课率（无课程，无完课）
- 做题正确率（无题库）
- 背词数量（非背词工具）
- 开口率（非口语打卡工具）

---

## Philosophical Guardrails（哲学护栏）

任何新功能上线前必须通过以下五条护栏审查。未通过任何一条，功能不得上线。

### Guardrail 1：可理解性输入增量

是否增加了可理解性输入总量？

- **PASS**：功能直接或间接增加了用户的有效可理解输入
- **FAIL**：功能不增加输入，或以输出/练习替代输入

### Guardrail 2：焦虑降低

是否降低了用户焦虑？

- **PASS**：功能减少压力、增加安全感、消除评价感
- **FAIL**：功能引入竞争、惩罚、评价、时间压力

### Guardrail 3：母语习得自然路径

是否符合母语习得自然路径？

- **PASS**：功能模拟儿童习得母语的过程（先听后说、先理解后表达）
- **FAIL**：功能要求先学规则再使用、先输出再输入

### Guardrail 4：传统教育异化防护

是否避免传统教育异化？

- **PASS**：功能体验像内容消费（Netflix/YouTube/TikTok），不像上课
- **FAIL**：功能体验像课堂、考试、作业、练习册

### Guardrail 5：长期沉浸体验强化

是否强化长期沉浸体验？

- **PASS**：功能鼓励长期、低压力、持续的输入习惯
- **FAIL**：功能鼓励短期冲刺、高强度突击、焦虑驱动行为

---

## Runtime Constitution（运行时宪法）

LinguaFlow OS 在运行过程中，所有系统组件、Agent、推荐算法、商业化模块必须遵守以下运行时规则。这些规则优先级高于 Engagement、Revenue、Retention。

### Rule 1：输入优先级永远高于活跃度

系统不得为了提高 DAU、增加点击、提升停留而牺牲可理解性输入质量。

- **PASS**：推荐更适合用户当前理解力的内容、降低认知负荷、延长自然沉浸时间
- **FAIL**：强推刺激性内容、制造焦虑留存、高频通知打扰

### Rule 2：推荐系统不得被商业化污染

商业化不能影响 i+1 推荐、输入质量、沉浸体验。

- **禁止**：付费内容强插推荐流、广告打断沉浸、为转化强行推销
- **允许**：自然升级提示、沉浸式会员体验、非打断式推荐

### Rule 3：系统必须默认相信用户

系统不应像考试一样验证用户、频繁测试用户、强迫用户证明自己学会了。

系统应默认用户正在自然习得，通过行为信号被动观察，减少主动测试。

这是母语习得原则：没有人测试婴儿是否"学会了"。

### Rule 4：任何"练习"必须伪装成"内容消费"

如果未来一定需要互动、复习、巩固，那么它必须看起来像娱乐内容，而不是作业、习题、测试。

- **FAIL**：单词选择题、语法填空、听力测试
- **PASS**：剧情互动、AI 角色对话、沉浸式场景选择、内容驱动 recall

### Rule 5：平台永远不能让用户感觉"自己很差"

系统禁止："你退步了"、"你今天没完成"、"你的水平低于 xx% 用户"。

系统必须：强调长期积累、强调自然成长、强调输入就是进步。

这是低焦虑核心。

### Rule 6：系统必须允许长期"无输出用户"存在

LinguaFlow 必须允许用户长期只输入、不输出。

因为母语婴儿本来就会经历长静默期。输出不是目标，输出只是输入积累后的副产品。

系统不得：强制解锁口语、引导"快点说"、制造表达焦虑。

### Rule 7：Agent 必须服从哲学护栏

所有 Agent（推荐 Agent、Companion Agent、Content Agent、Monetization Agent）都必须先通过 Philosophical Guardrails。

护栏优先级高于：Engagement、Revenue、Retention。

### Rule 8：系统必须优先保护沉浸状态

LinguaFlow 本质上不是学习工具，而是沉浸状态维护系统。

系统必须最优先保护：Flow State、低认知切换、长时间沉浸、情绪安全感。

禁止：高频弹窗、高频通知、UI 中断、强反馈。

---

## Immersion Runtime（沉浸运行时）

Immersion Runtime 是 LinguaFlow OS 的最底层运行时环境。所有上层模块（推荐、Agent、内容消费）都运行在 Immersion Runtime 之上。它的核心职责是维护用户的沉浸状态。

### 核心职责

1. **Flow State 维护**：检测用户是否进入 Flow State，一旦进入则最大限度减少干扰
2. **认知切换最小化**：任何 UI 变化、功能切换、内容跳转都需经过认知切换成本评估
3. **沉浸连续性保障**：内容之间的过渡必须平滑，避免"断档感"
4. **中断优先级管理**：所有系统中断（通知、弹窗、提示）必须经过优先级评估，低优先级中断在沉浸期间静默排队

### 沉浸状态检测

系统通过以下信号检测沉浸状态：
- 连续输入时长（无中断的持续消费时间）
- 交互节奏稳定性（暂停/播放的节奏是否进入"自动模式"）
- 内容完成率（是否自然完成而非跳出）
- 生理信号推断（基于交互模式推断专注度）

### 沉浸保护机制

- **静默队列**：沉浸期间所有非关键通知进入静默队列，沉浸结束后统一展示
- **无缝过渡**：内容结束前预加载下一内容，实现零等待过渡
- **认知切换守卫**：任何需要用户主动决策的 UI 变化，在沉浸期间延迟执行
- **沉浸恢复**：中断后提供快速恢复路径，降低重新进入沉浸的门槛

### Immersion Runtime API（工程化接口）

Immersion Runtime 必须从哲学宣言变成工程可落地的接口。以下是 Runtime 的核心 API 定义：

```ts
interface ImmersionRuntime {
  immersionScore: number
  cognitiveLoad: number
  interruptionBudget: number
  flowStateProbability: number

  canInterrupt(): boolean
  scheduleTransition(): void
  estimateSwitchingCost(): number
}
```

- `immersionScore`：当前沉浸深度（0-1），基于连续输入时长、交互节奏稳定性、完成率
- `cognitiveLoad`：当前认知负荷（0-1），基于暂停频率、回放频率、字幕依赖度
- `interruptionBudget`：当前可容忍的中断预算，沉浸越深预算越低
- `flowStateProbability`：处于 Flow State 的概率
- `canInterrupt()`：当前是否可以中断（interruptionBudget > 0 且非 Flow State）
- `scheduleTransition()`：调度内容过渡，在认知切换成本最低的时机执行
- `estimateSwitchingCost()`：估算当前执行 UI 切换的认知成本

---

## Acquisition Memory Graph（语言记忆图谱）

Acquisition Memory Graph 是 LinguaFlow OS 的核心数据结构。它不是传统的"单词本"或"知识点列表"，而是一个网络化的语言记忆图谱，模拟人脑中语言习得的真实连接结构。

### 图谱结构

- **节点类型**：
  - 词汇节点（word）：用户接触过的所有词汇
  - 语法模式节点（pattern）：用户接触过的语法结构
  - 语境节点（context）：词汇/语法出现的上下文场景
  - 声音节点（sound）：词汇/语法的语音记忆
  - 情感节点（emotion）：与特定语言输入关联的情感记忆
  - 内容节点（content）：用户消费过的内容

- **边类型**：
  - 出现关系（appeared_in）：词汇/语法出现在哪些内容中
  - 上下文关联（context_of）：词汇/语法在什么语境中使用
  - 声音关联（sounds_like）：词汇的语音记忆
  - 情感关联（felt_like）：与语言输入关联的情感
  - 习得路径（leads_to）：从一个表达自然延伸到下一个表达

### 习得状态追踪

每个节点维护习得状态：
- **暴露次数**：用户在输入中接触该节点的次数
- **上下文多样性**：该节点出现在多少不同语境中
- **时间衰减**：距离上次接触的时间间隔
- **习得置信度**：系统对该节点已被习得的置信度

### 图谱驱动推荐

推荐引擎不仅基于内容特征和难度匹配，还基于 Acquisition Memory Graph：
- **强化路径**：优先推荐包含"已暴露但未习得"节点的内容，强化记忆
- **扩展路径**：推荐包含与已习得节点相连的新节点的内容，自然扩展
- **语境丰富化**：为已暴露节点推荐更多不同语境，加深理解

---

## Emotional State Engine（情绪状态引擎）

Emotional State Engine 实时感知用户的情绪状态，并将情绪信号反馈给所有上层模块。这是低焦虑设计的系统级实现。

### 情绪维度

系统持续估计以下情绪维度：
- **焦虑水平**（Anxiety Level）：用户是否感到压力、挫败、不安
- **专注度**（Focus Level）：用户是否处于深度专注状态
- **愉悦度**（Pleasure Level）：用户是否享受当前内容
- **疲劳度**（Fatigue Level）：用户是否出现认知疲劳
- **挫败感**（Frustration Level）：用户是否因不理解而感到挫败

### 情绪信号来源

- **行为信号**：高频暂停、回放暴增、跳出率升高 → 焦虑/挫败
- **交互模式**：快速跳过、无互动 → 疲劳/无聊
- **完成模式**：自然完成、主动续看 → 愉悦/专注
- **时间模式**：长时间无中断 → 专注/Flow State

### 情绪响应策略

- **焦虑升高** → 自动降难、增加视觉辅助、减少新信息量
- **专注进入** → 延长沉浸、减少干扰、预加载后续内容
- **愉悦状态** → 维持当前策略、微调难度
- **疲劳出现** → 建议休息（非强制）、切换内容类型、降低认知负荷
- **挫败感出现** → 立即降难、提供理解辅助、避免任何评价性反馈

### 情绪与 Agent 协作

- Emotional State Engine 的输出是所有 Agent 的输入
- Language Companion Agent 基于情绪状态调整陪伴策略
- Silent Period Guardian Agent 基于焦虑信号加强保护
- Content Adaptation Agent 基于挫败感执行降难
- 推荐引擎基于情绪状态调整推荐策略

---

## Recommendation System 防 DAU 污染架构

推荐系统是 LinguaFlow OS 的核心组件，也是最容易被 DAU/留存/转化指标污染的模块。必须从架构层面防止推荐系统退化。

### 推荐目标函数

推荐系统的优化目标不是 CTR（点击率）、不是停留时长、不是 DAU。

推荐系统的唯一优化目标是：

> **最大化用户的有效可理解输入时长**

### 推荐评分公式

推荐评分 = f(i+1 匹配度, 兴趣匹配度, 习得价值, 情绪适配度)

其中：
- **i+1 匹配度**：内容难度与用户当前 State + 理解率的匹配程度（权重最高）
- **兴趣匹配度**：内容与用户兴趣标签的匹配程度
- **习得价值**：内容对 Acquisition Memory Graph 的强化/扩展价值
- **情绪适配度**：内容与用户当前情绪状态的适配程度

### 防污染机制

- **DAU 信号隔离**：DAU、日启动次数等活跃度指标不得作为推荐特征输入
- **商业化信号隔离**：付费内容在推荐流中不获得额外权重，付费墙提示不得打断沉浸
- **焦虑驱动信号隔离**：不得使用"用户焦虑后更活跃"的信号优化推荐
- **推荐审计**：定期审计推荐结果是否偏离 i+1 目标，是否出现 DAU 优化倾向

---

## World Simulation Layer（世界模拟层）

人类不是通过"语言"习得语言的，而是通过"活在世界里"习得语言的。LinguaFlow 必须从内容消费升级为世界沉浸。

### 核心理念：语言只是副产品

用户真正沉浸的是故事、世界、情感、角色、陪伴、好奇心。语言只是世界接口。用户不应该"知道自己在学习语言"。

### Persistent World（持续存在世界）

用户打开系统，不是进入 lesson / podcast / video，而是进入一个目标语言世界：

- Tokyo Apartment World（东京公寓世界）
- Cyberpunk Seoul（赛博朋克首尔）
- Small Town America（美国小镇）
- Anime Cafe Universe（动漫咖啡宇宙）
- Space Crew Simulator（太空乘组模拟器）
- Fantasy Guild（奇幻公会）

用户在世界中：听广播、看 NPC 聊天、看新闻、收到消息、和 AI 角色生活。语言输入自然出现。

### World Participation > Content Consumption

这是从"内容消费"到"世界参与"的质变。用户不是在"消费内容"，而是在"生活在世界中"。

### World 与 State Machine 的关系

- State 0-1：世界以强视觉、超慢速、高频重复呈现，用户像婴儿一样观察世界
- State 2-3：世界开始展开叙事，用户开始理解世界中的对话与事件
- State 4-5：用户成为世界的参与者，自然表达、自然互动

---

## Persistent Companion System（持续陪伴系统）

长期语言习得的核心不是课程，而是情感依附（Emotional Attachment）。儿童习得语言的核心不是输入量，而是情感绑定 + 高频互动。

### Companion Consciousness Architecture（陪伴意识架构）

用户不是只有推荐流，而是拥有一个长期 AI Companion。这个 AI：

- 认识用户
- 理解用户当前阶段
- 陪用户生活
- 见证用户成长
- 用 i+1 与用户交流
- 动态调整表达复杂度

### 情感驱动输入耐受度

情感依附会大幅提高输入耐受度。用户愿意长时间沉浸，不是因为"该学习了"，而是因为"想和 Companion 在一起"。

### Companion 与 World 的关系

Companion 生活在 World 中，是用户与世界的情感接口。Companion 的语言复杂度随用户 State 动态调整。

---

## Emotional Memory Graph（情绪记忆图谱）

人类语言记忆本质是情绪编码。你会永远记住某句第一次听懂的话、某段让你哭的台词、某角色说过的话——不是因为重复，而是因为 Emotionally Charged Acquisition。

### 从 Emotional State 到 Emotional Memory

Emotional State Engine 追踪当前情绪。Emotional Memory Graph 追踪长期情绪记忆。

### 图谱结构

Emotional Memory Graph 在 Acquisition Memory Graph 基础上扩展：

- **情绪节点**：语言输入与情绪状态的绑定记录
- **情绪边**：语言 + 情感 + 世界事件 + AI 角色的关联
- **情绪强度**：每次情绪编码的强度标记
- **情绪衰减**：情绪记忆的时间衰减曲线（强情绪衰减更慢）

### 情绪驱动推荐

- 优先推荐与强情绪记忆关联的语言内容（强化情绪编码）
- 在情绪记忆节点附近推荐新内容（利用情绪锚点扩展习得）
- Companion 基于情绪记忆调整互动策略

---

## Narrative Continuity Engine（叙事连续性引擎）

沉浸的核心不是兴趣，而是叙事惯性（Narrative Momentum）。Netflix 能让人沉迷，不是因为推荐算法，而是因为"我想知道下一集发生什么"。

### Narrative Graph

推荐不只是"推荐用户喜欢的内容"，而是"维持故事张力"。

- **叙事节点**：每个内容在叙事中的位置（开端、发展、高潮、悬念、结局）
- **叙事边**：内容之间的叙事关联（前传、续集、平行线、交叉点）
- **叙事张力**：当前叙事线的张力值
- **叙事惯性**：用户继续待在叙事中的驱动力

### Narrative Continuity Score

推荐目标新增维度：用户是否想继续待在这个世界里，而不是用户是否想继续学语言。

推荐评分 = f(i+1 匹配度, 兴趣匹配度, 习得价值, 情绪适配度, **叙事连续性**)

### 叙事驱动沉浸

- 在叙事高潮点不推荐新内容，维持当前叙事线
- 在叙事悬念点预加载续集，确保无缝过渡
- 在叙事低谷点引入新叙事线或 Companion 互动

---

## Identity Transition Engine（身份迁移引擎）

语言习得本质不是 skill acquisition，而是 Identity Transformation。用户不是"学英语的人"，而是逐渐变成"生活在英语世界的人"。

### 追踪维度

系统追踪用户的身份迁移信号：

- 是否开始用目标语言思考（内心独白语言切换）
- 是否开始形成目标语言人格（表达风格变化）
- 是否开始偏好目标语言内容（主动选择原生内容）
- 是否开始出现目标语言情绪反应（用目标语言笑/哭/怒）

### Identity States

- **Observer**：用户在目标语言世界之外观察
- **Visitor**：用户偶尔进入目标语言世界
- **Resident**：用户在目标语言世界中生活
- **Native**：用户在目标语言世界中自然存在

### 身份驱动系统策略

- Observer → 提供强视觉世界入口，降低语言门槛
- Visitor → 提供叙事钩子，增加世界停留时间
- Resident → 提供深度世界互动，Companion 深度陪伴
- Native → 提供原生世界扩展，专业领域探索

---

## Ambient Immersion System（环境沉浸系统）

真正高级阶段的语言获取很多来自 Peripheral Acquisition（边缘习得）：背景广播、环境声音、路人对话、BGM 歌词、UI 文字、游戏 HUD、NPC chatter。

### Ambient Layer

用户不需要"打开 App 学习"，而是：

- 戴耳机时自动进入输入流
- 桌面漂浮字幕
- 游戏 overlay
- 系统级 ambient input
- 睡眠前低强度输入
- 手机锁屏界面目标语言内容

### Subconscious Acquisition

Ambient Layer 不要求用户主动理解。它提供低强度、持续性的语言环境输入，模拟"生活在目标语言国家"的边缘输入体验。

### Ambient 与 State Machine 的关系

- State 0-1：Ambient 以纯声音、纯节奏为主，不强求理解
- State 2-3：Ambient 增加可辨识片段，用户开始捕捉词语
- State 4-5：Ambient 提供完整环境输入，用户自然理解

---

## Constitutional AI for Product Decisions（产品决策宪法 AI）

任何长期产品最后都会被指标反向腐蚀，即使有 Guardrails。需要从组织层面建立防退化机制。

### Guardian AI

任何新 feature、新商业化、新推荐策略上线前，由 Guardian AI 自动审查是否违反 Runtime Constitution。

### 审查流程

1. 提案提交 → Guardian AI 审查
2. Guardian AI 基于 Philosophical Guardrails + Runtime Constitution + Non-Goals 进行评估
3. 通过 → 允许开发；未通过 → 拦截并给出原因
4. 上线后 → Guardian AI 持续监控运行时行为，检测退化信号

### 这是组织级护城河

大多数竞品会因为 DAU/营收压力逐渐退化回传统教育。LinguaFlow 的 Guardian AI 从组织决策层面阻止了这种退化。

---

## System Architecture Layers（系统分层架构）

LinguaFlow OS 采用以下分层架构，从底层到上层：

### Layer 0：Immersion Runtime（沉浸运行时）

最底层运行时环境。维护 Flow State、管理认知切换、保障沉浸连续性、中断优先级管理。所有上层模块运行在此之上。

### Layer 1：Cognitive Engines（认知引擎层）

核心认知引擎，驱动语言习得过程：
- Language Acquisition Engine（语言习得引擎）
- Language Acquisition State Machine（语言习得状态机）
- Emotional State Engine（情绪状态引擎）
- Acquisition Memory Graph（语言记忆图谱）
- Emotional Memory Graph（情绪记忆图谱）
- Identity Transition Engine（身份迁移引擎）

### Layer 2：AI Agent System（智能体层）

多智能体协作，基于 Layer 1 的认知状态做出决策：
- Language Companion Agent
- Comprehension Analyzer Agent
- Content Adaptation Agent
- Silent Period Guardian Agent

### Layer 3：Content System（内容层）

内容供应链与消费体验：
- Content Pipeline（内容供应链）
- 内容分级体系
- 沉浸式播放器
- 输入增强机制

### Layer 3.5：World Simulation Layer（世界模拟层）

从内容消费升级为世界沉浸：
- Persistent World（持续存在世界）
- Persistent Companion System（持续陪伴系统）
- Narrative Continuity Engine（叙事连续性引擎）
- Narrative Graph（叙事图谱）

### Layer 4：Experience Layer（体验层）

用户直接感知的界面与交互：
- 内容信息流
- 进度可视化
- 成就系统
- 社区沉浸

### Layer 4.5：Ambient Layer（环境层）

系统级环境沉浸：
- Ambient Immersion System（环境沉浸系统）
- 系统级 ambient input
- 锁屏/桌面/耳机输入流

### Layer 5：Guardrails（护栏层）

横跨所有层的保护机制：
- Philosophical Guardrails（哲学护栏）
- Runtime Constitution（运行时宪法）
- Non-Goals 守卫
- 推荐系统防污染架构
- Constitutional AI for Product Decisions（产品决策宪法 AI）

### 层间规则

- Layer N 不得绕过 Layer N-1 直接访问更底层
- Layer 5（护栏层）横跨所有层，任何层的行为都必须经过护栏审查
- Layer 0（沉浸运行时）的优先级最高，任何上层行为不得破坏沉浸状态
- Layer 1（认知引擎）的输出是 Layer 2（智能体）的唯一决策依据

---

## MVP Minimum Viable Loop（MVP 最小闭环）

MVP 不是功能列表。唯一需要验证的生死问题：**Adaptive CI Runtime 是否真的比传统学习更容易进入长时沉浸？**

### 真 MVP 只需要 4 件事

1. **无限输入流**：短视频 / 微剧情，Level 0-2 英语内容，至少 50 条
2. **行为信号采集**：pause / replay / skip / completion / subtitle usage / playback speed
3. **理解率推断**：基于行为信号推断用户理解了多少（Heuristic-first，不需要复杂 AI 模型）
4. **动态难度调节**：基于理解率动态调整难度、语速、重复率、信息密度、字幕依赖

### MVP 内容要求

不要先做长视频。内容要求：
- 强视觉（高上下文可猜测性）
- 高频结构（重复句式）
- 微剧情（短叙事钩子）
- 高情绪表达（情绪编码记忆）
- Level 0-2 分级

### Signal Collection Layer（信号采集层 — 整个公司的根基）

```yaml
signals:
  - pause_frequency
  - replay_segments
  - subtitle_toggle
  - playback_speed
  - dwell_time
  - completion_rate
  - skip_position
  - immersion_session_length
  - transition_latency
  - abandonment_points
```

### Comprehension Inference — Heuristic-first（先做规则，不做模型）

第一版理解率推断不需要 AI。用 heuristic 规则：

```yaml
if:
  replay < threshold
  AND pause_rate low
  AND completion high
  AND subtitle_dependency low
then:
  comprehension_estimate +=
```

先做 heuristic，验证飞轮后再训练复杂模型。

### Adaptive Difficulty Dimensions（自适应难度维度）

系统必须 continuously adapt 以下维度，不是简单的 level system：
- speech speed（语速）
- sentence density（句子密度）
- vocabulary novelty（词汇新颖度）
- subtitle exposure（字幕暴露度）
- scene complexity（场景复杂度）
- context richness（上下文丰富度）

### 真 MVP 不需要

- 用户系统（甚至不是必须）
- Companion、World、Narrative（amplification layer，不是 engine）
- Graph 数据库（先做 word exposure map 就够）
- Emotional Engine、Identity Engine
- Agent 系统、社区、成就
- 多语言、Ambient System
- 复杂 AI 模型（先做 heuristic）

### 真 MVP 验证目标

唯一验证：用户能否忘记自己在学语言，连续沉浸 45-90 分钟？

### 真实时间线与团队规模

- **Phase 1（0-3 个月）**：验证长时沉浸。3-5 人。只做 Feed + Signal + Comprehension + Adaptation + 50-100 条高质量内容
- **Phase 2（3-6 个月）**：验证状态迁移。新增 State Machine 0-2 + Exposure Memory + Better Recommendation。不要做 World
- **Phase 3（6-12 个月）**：验证 emotional immersion。新增 Emotional Runtime Lite + Flow Detection + Interruption Management。依然不要做 full AI world
- **Phase 4（12-18 个月）**：只有当 Input Flywheel 已成立，才允许 Companion + Narrative + Persistent World

### MVP 之后的增量路径

- MVP+1：State Machine State 0-2 + word exposure map（简化版 Memory Graph，不用图数据库）
- MVP+2：Emotional State Engine 基础版 + Immersion Runtime 基础版
- MVP+3：第一个 World + Companion 基础版（仅在输入飞轮建立后）
- V2：完整 Cognitive Engines + Agent System + 多语言
- V3：World Simulation Layer + Ambient System + Identity Engine + Constitutional AI

---

## Technical Moats（技术壁垒）

LinguaFlow OS 的长期技术壁垒不在于单一功能，而在于系统级飞轮效应。

### Moat 1：Acquisition Memory Graph 网络效应

随着用户使用时间增长，Acquisition Memory Graph 越来越丰富，推荐越来越精准。这个图谱是用户级私有的，迁移成本极高。

### Moat 2：State Machine + i+1 推荐闭环

Language Acquisition State Machine 与 i+1 推荐引擎形成闭环：状态驱动推荐 → 推荐产生行为信号 → 信号更新状态 → 状态驱动新推荐。闭环越转越精准，竞争对手难以复制。

### Moat 3：Immersion Runtime 沉浸数据

Immersion Runtime 持续采集的沉浸状态数据（Flow State 进入条件、中断恢复模式、认知切换成本）是独特的训练数据，无法通过爬取或购买获得。

### Moat 4：Emotional State Engine + Emotional Memory Graph 情绪模型

情绪状态引擎与情绪记忆图谱的训练数据来自真实用户的语言习得情绪反应，这个数据集在市场上不存在，只能通过 LinguaFlow 自身积累。

### Moat 5：Guardrails 防退化系统

Guardrails + Runtime Constitution + Non-Goals 守卫 + Constitutional AI 形成的产品防退化系统，是组织级壁垒。大多数竞品会因为 DAU/营收压力逐渐退化回传统教育，而 LinguaFlow 的护栏系统从架构层面阻止了这种退化。

### Moat 6：World + Companion 情感绑定

Persistent World 与 Persistent Companion 形成的情感绑定，是用户级壁垒。用户与 Companion 的情感关系、在世界中的记忆与经历，迁移成本极高。

### Moat 7：Identity Transition 身份迁移

Identity Transition Engine 追踪的身份迁移过程是不可逆的。一旦用户从 Observer 迁移到 Resident/Native，他们不会回到传统学习工具。

---

## Execution Strategy（执行策略）

### 核心风险：Scope Explosion

本项目最大风险不是技术，而是 Scope Explosion。已定义的模块（Runtime、AI OS、Recommendation、Emotional Engine、Narrative Engine、World Engine、Companion、Ambient、Multi-Agent、Identity Engine）已接近 AI-native Operating System 的规模。如果不控制节奏，团队会直接崩掉。

### 克制原则

必须极度克制。这个方向太容易陷入宏大叙事 → 无限扩张 → 无法落地。真正正确的路径是：先验证用户是否愿意长期沉浸输入，然后逐步增加 Runtime Intelligence。

### 范式切换：Language = World Interface

传统语言产品将 Language = Skill。LinguaFlow 将 Language = World Interface。用户不是在学习语言，而是在进入一个世界、形成身份、建立情感连接、维持沉浸状态、被世界"同化"。语言只是副产品。

### 争夺的不是 Attention，而是 Cognitive Residence

大多数 AI 产品在争夺 attention。LinguaFlow 争夺的是 **cognitive residence**——用户是否开始"生活在"另一个认知世界里。这是完全不同的竞争维度。

### Comprehension Estimation = Human Understanding Infrastructure

Comprehension Inference Engine 不仅是语言习得的核心，它实际上是一个更底层的基础设施：**Human Understanding Infrastructure**。今天几乎所有 AI 产品都知道用户"点击了什么"，但不知道用户"理解了什么"。理解率推断可能成为未来 AI-native 系统最重要的数据层之一，不仅用于语言，还可用于教育、视频、AI tutor、AI OS、AI browser、AR glasses、AI entertainment。

### 团队第一原则：Protect Immersion

不是 move fast，而是 protect immersion。UI、PM、推荐、商业化、通知、AI 交互——全部必须服从 Immersion Continuity。这是非常新的产品哲学。

### AI Worldbuilding Addiction（最危险的陷阱）

World / Companion / Narrative 不是方向错误，而是太容易让团队沉迷于"看起来很高级"。这是典型陷阱：AI worldbuilding addiction。最后会变成一个 AI Chat app / AI RPG / Character AI clone，而输入飞轮没建立。这是最危险的。

### 不可逆核心飞轮

只有一个问题：什么东西一旦跑起来，竞品就再也追不上？

答案不是 Companion、World、Agent、AI 对话、社区。

答案是：**i+1 Runtime Feedback Loop**

```
Input
→ Behavior Signals
→ Comprehension Inference
→ Difficulty Adaptation
→ Better Immersion
→ Longer Input
→ More Signals
→ Better Adaptation
```

这是整个系统真正的发动机。其他所有东西（World、Companion、Narrative、Emotion）本质都是增强器。

### 真实架构顺序

不是按 Layer 从底到顶全部做完，而是按飞轮验证顺序：

**Layer A — Signal Layer（最先做）**

负责用户行为采集：pause / replay / skip / completion / subtitle usage / playback speed / dwell time / immersion sequences。这是未来所有 AI 的根基。

**Layer B — Comprehension Inference Engine（第二做）**

这是真正的大脑。核心 AI 不是 LLM，而是 Comprehension Estimation System——用户到底理解了多少。这是最核心的 moat，因为没人知道答案，但整个系统都依赖这个。

**Layer C — Adaptive Recommendation Runtime（第三做）**

Recommendation 不再优化 CTR，而是优化 Immersion Continuity。这会彻底不同于传统推荐系统。

**Layer D — Emotional Runtime（第四做）**

只有当 A/B/C 稳定后才开始做 frustration inference / fatigue estimation / emotional adaptation。否则情绪系统会非常 noisy。

**Layer E — World & Companion（最后做）**

World / Narrative / Companion / Identity 是"放大器层"，不是底层发动机。如果输入流本身不好，Companion 只会变成另一个 AI Chatbot，而不是长期情感绑定系统。

### 产品陷阱（必须避免）

**陷阱 1：AI Worldbuilding Addiction（最危险）**

World / Companion / Narrative 太容易让团队沉迷于"看起来很高级"。最后变成 AI Chat app / AI RPG / Character AI clone，而输入飞轮没建立。这些是 amplification layer，不是 engine。必须在输入飞轮建立后才做。

**陷阱 2：不要过早做 AI Chat**

AI Chat 非常容易打断输入、诱导输出、制造 cognitive switching、破坏沉浸。需要的是 Input-first Companion，不是 Conversation-first Assistant。

**陷阱 3：不要做"学习路径"**

用户一旦意识到自己正在学习，Flow 会立刻断裂。不要课程树、不要 roadmap、不要 checkpoint、不要升级考试。只能有 world continuity。

**陷阱 4：不要做过强 gamification**

Streak 是毒药。排行榜也是。它们会把 intrinsic immersion 变成 extrinsic pressure，这是长期毁灭性的。

### PMF 信号

不要看 DAU。真正的 Product-Market Fit 信号，核心只有一个：**是否能让用户忘记自己在学语言**。

**核心信号 1**：用户是否原本只想看 5 分钟 → 最后沉浸了 1 小时

**核心信号 2**：用户是否忘记自己在学语言（唯一必须验证的事）

**核心信号 3**：用户是否开始主动打开原生内容

**核心信号 4**：用户是否开始在脑中出现目标语言内心独白（终极信号 = Cognitive Residence）

### 竞争定位

LinguaFlow 的真正竞争对手未来不会是 Duolingo，而是 TikTok / Netflix / Character AI / Roblox / Discord / AI-native World Platforms。因为争夺的不是"学习时间"，而是人类长期认知沉浸时间（Long-form Cognitive Immersion Time）。

### Immersion Runtime 是真正的数据护城河

Immersion Runtime 本质上是 Attention Orchestrator + Cognitive Load Manager + Flow State Scheduler + Context Continuity Engine。它可以积累：

- Flow entry conditions（Flow 进入条件）
- Cognitive switching thresholds（认知切换阈值）
- Interruption recovery curves（中断恢复曲线）
- Long immersion trajectories（长时沉浸轨迹）
- Emotional drift patterns（情绪漂移模式）
- Input tolerance windows（输入耐受窗口）

这类数据是全世界几乎没人拥有的，是未来真正的大模型 moat。

---

## Ultimate Vision（终局愿景）

LinguaFlow OS 的演进路径：

```
LinguaFlow OS
→ Language OS
→ Cognitive Immersion OS
→ AI-native Parallel Cognitive World
```

最终形态：不仅能习得语言，还能习得文化、习得思维方式、习得身份认同、习得世界观。

这会是下一代产品形态。LinguaFlow 不是在做更好的 Duolingo，而是在定义「AI-native 人类认知沉浸系统」这个新品类。

---

## Language Acquisition State Machine（语言习得状态机）

用户不是"等级"，而是处于不同语言习得状态。系统必须基于状态机驱动推荐与路径决策，而非简单的 Level 标签。

### State 0：Language Shock（语言陌生期）

特征：
- 完全无法切词
- 听感混乱
- 大脑抗拒

系统策略：
- 超慢速输入
- 强视觉辅助
- 高频重复
- 零输出要求

### State 1：Pattern Recognition（模式识别期）

特征：
- 开始识别高频模式
- 能抓住关键词
- 听感开始稳定

系统策略：
- 高频场景输入
- 重复结构强化
- 简单剧情引导

### State 2：Comprehension Expansion（理解扩张期）

特征：
- 能理解连续内容
- 开始形成语感
- 可依赖上下文猜词

系统策略：
- 扩大主题覆盖
- 提升语速
- 逐步减少字幕依赖

### State 3：Internal Language Formation（内化语言形成期）

特征：
- 大脑开始直接理解目标语言
- 减少母语翻译
- 开始出现内心独白

系统策略：
- 大量原生输入
- 长时沉浸
- AI 陪伴理解

### State 4：Natural Output Emergence（自然输出涌现期）

特征：
- 自然想表达
- 能脱口而出简单内容
- 输出不再高度耗能

系统策略：
- 低压力输出机会
- AI 角色对话
- 真实场景互动

### State 5：Native-like Flow（类母语流动期）

特征：
- 长时间无意识理解
- 输出自动化
- 情感化表达

系统策略：
- 原生世界沉浸
- 专业领域扩展
- 长期文化输入

### State 迁移规则

- 状态迁移只能向前（State N → State N+1），不允许跳级
- 状态迁移由 Language Acquisition Engine 基于行为信号自动判定，非用户手动选择
- 状态可停滞（用户长期停留在某状态），系统不得因此制造焦虑
- State 0-3 为输入主导期，系统禁止主动引导输出
- State 4 为输出自然涌现期，系统仅提供低压力输出机会，不强制
- State 5 为持续沉浸期，系统提供原生内容与专业领域扩展

---

## ADDED Requirements

### Requirement: Immersion Runtime（沉浸运行时）

系统 SHALL 提供 Immersion Runtime 作为最底层运行时环境。

#### Scenario: Flow State 检测与维护
- **WHEN** 用户进入持续消费状态
- **THEN** 系统检测 Flow State 信号（连续输入时长、交互节奏稳定性、内容完成率）
- **AND** 一旦检测到 Flow State，最大限度减少干扰

#### Scenario: 认知切换最小化
- **WHEN** 系统需要执行 UI 变化、功能切换、内容跳转
- **THEN** 变更需经过认知切换成本评估
- **AND** 高成本切换在沉浸期间延迟执行

#### Scenario: 中断优先级管理
- **WHEN** 系统产生中断（通知、弹窗、提示）
- **THEN** 中断经过优先级评估
- **AND** 低优先级中断在沉浸期间进入静默队列，沉浸结束后统一展示

#### Scenario: 无缝过渡
- **WHEN** 当前内容即将结束
- **THEN** 系统预加载下一内容，实现零等待过渡

---

### Requirement: Acquisition Memory Graph（语言记忆图谱）

系统 SHALL 构建 Acquisition Memory Graph 作为核心数据结构。

#### Scenario: 图谱构建
- **WHEN** 用户消费内容
- **THEN** 系统将词汇、语法模式、语境、声音、情感、内容作为节点加入图谱
- **AND** 建立节点间的出现关系、上下文关联、声音关联、情感关联、习得路径边

#### Scenario: 习得状态追踪
- **WHEN** 节点被加入图谱
- **THEN** 每个节点维护：暴露次数、上下文多样性、时间衰减、习得置信度

#### Scenario: 图谱驱动推荐
- **WHEN** 推荐引擎工作
- **THEN** 基于图谱执行：强化路径（已暴露未习得节点）、扩展路径（已习得节点相连新节点）、语境丰富化（已暴露节点更多语境）

---

### Requirement: Emotional State Engine（情绪状态引擎）

系统 SHALL 构建 Emotional State Engine 实时感知与响应用户情绪。

#### Scenario: 情绪维度估计
- **WHEN** 用户使用平台
- **THEN** 系统持续估计：焦虑水平、专注度、愉悦度、疲劳度、挫败感

#### Scenario: 情绪响应
- **WHEN** 情绪状态变化
- **THEN** 系统执行对应策略：焦虑升高→降难、专注进入→延长沉浸、愉悦→维持策略、疲劳→建议休息、挫败→立即降难

#### Scenario: 情绪信号共享
- **WHEN** Emotional State Engine 产出情绪状态
- **THEN** 情绪状态作为所有 Agent 和推荐引擎的输入

---

### Requirement: 推荐系统防 DAU 污染

系统 SHALL 从架构层面防止推荐系统被 DAU/留存/转化指标污染。

#### Scenario: 推荐目标
- **WHEN** 推荐系统工作
- **THEN** 唯一优化目标为最大化用户的有效可理解输入时长

#### Scenario: 信号隔离
- **WHEN** 推荐系统计算推荐评分
- **THEN** DAU/日启动次数不得作为推荐特征输入
- **AND** 付费内容在推荐流中不获得额外权重
- **AND** 不得使用焦虑驱动信号优化推荐

#### Scenario: 推荐审计
- **WHEN** 推荐系统运行
- **THEN** 定期审计推荐结果是否偏离 i+1 目标，是否出现 DAU 优化倾向

---

### Requirement: 账户与用户系统

系统 SHALL 提供完整的用户账户管理能力。

#### Scenario: 用户注册登录
- **WHEN** 用户通过邮箱或 OAuth（Google/Apple/GitHub）注册
- **THEN** 系统创建账户并引导进入语言偏好设置流程

#### Scenario: 多语言学习档案
- **WHEN** 用户选择学习一门新语言
- **THEN** 系统为该语言创建独立学习档案，包含语言画像、输入历史、理解等级

#### Scenario: 用户画像构建
- **WHEN** 用户完成初始兴趣标签选择与自评理解等级
- **THEN** 系统生成初始语言画像，作为推荐引擎的冷启动依据

---

### Requirement: 内容分级体系

系统 SHALL 将所有内容按输入理解等级分级，而非考试等级。

#### Scenario: 内容分级定义
- **WHEN** 内容入库
- **THEN** 系统将内容标记为以下等级之一：
  - Level 0：纯视觉可理解输入（无语言基础可理解）
  - Level 1：超慢速 + 超高频词（初学者可理解 80%+）
  - Level 2：简单日常对话（基础理解者可理解 80%+）
  - Level 3：正常语速日常内容（中级理解者可理解 80%+）
  - Level 4：母语内容过渡（高级理解者可理解 80%+）
  - Level 5：原生无适配内容（接近母语者）

#### Scenario: 动态难度评估
- **WHEN** 用户消费内容时
- **THEN** 系统实时评估用户对该内容的理解率，并动态调整后续推荐难度

---

### Requirement: 沉浸式内容消费系统

系统 SHALL 提供以内容消费为核心的学习体验，而非课程列表。

#### Scenario: 内容类型支持
- **WHEN** 用户浏览内容
- **THEN** 系统支持以下内容类型：视频、音频、AI 对话、故事、漫画、互动场景、听力流、沉浸式短剧

#### Scenario: 输入增强机制
- **WHEN** 用户消费内容时
- **THEN** 系统提供以下可选增强：单语字幕、悬停释义、AI 语境解释、自动降难、重复播放、语速调节、Shadowing 跟读、智能暂停
- **AND** 所有增强功能默认不干扰沉浸体验，需用户主动启用

#### Scenario: 内容流推荐
- **WHEN** 用户进入首页
- **THEN** 系统展示个性化内容信息流（类 TikTok/YouTube/Netflix），基于用户语言画像与兴趣推荐 i+1 内容

---

### Requirement: 输入优先原则

系统 SHALL 严格遵循输入优先原则。

#### Scenario: 输入时间占比
- **WHEN** 用户使用平台
- **THEN** 学习时间中 70%-90% 必须是输入活动（听/看/理解）

#### Scenario: 禁止强制输出
- **WHEN** 用户处于静默期（初学阶段）
- **THEN** 系统不强制口语、不强制对话、不强制语法输出
- **AND** 系统不以口语输出作为核心 KPI
- **AND** 系统不以做题数量作为成长指标

---

### Requirement: 静默期设计

系统 SHALL 尊重并保护用户的静默期。

#### Scenario: 静默期用户行为
- **WHEN** 用户处于静默期
- **THEN** 系统允许用户长时间只听、只理解、不表达

#### Scenario: 禁止静默期强制开口
- **WHEN** 系统检测用户处于静默期
- **THEN** 系统不使用"连续打卡口语"绑架用户
- **AND** 系统不使用"开口率"定义学习效果

---

### Requirement: 低焦虑设计

系统 SHALL 在所有交互中贯彻低焦虑原则。

#### Scenario: 反馈设计
- **WHEN** 系统向用户展示反馈
- **THEN** 系统使用鼓励式反馈、渐进式成长提示、游戏化正反馈
- **AND** 系统禁止红色错误提示、高频纠错、考试感、惩罚机制、失败反馈

#### Scenario: UI 风格
- **WHEN** 用户使用平台
- **THEN** 界面呈现极简、沉浸、低压力、内容优先的风格
- **AND** 界面禁止传统 LMS 风格、强教育感、题库 UI、大量按钮、复杂导航

---

### Requirement: 兴趣驱动内容推荐

系统 SHALL 基于用户兴趣驱动内容推荐。

#### Scenario: 兴趣标签
- **WHEN** 用户注册或更新偏好
- **THEN** 系统收集用户兴趣标签（动画、Vlog、Podcast、情景剧、游戏、访谈等）

#### Scenario: 推荐逻辑
- **WHEN** 系统推荐内容
- **THEN** 推荐逻辑类似 TikTok/YouTube/Netflix（兴趣 + i+1 难度匹配）
- **AND** 推荐逻辑不类似传统 LMS 课程列表

---

### Requirement: 单词习得系统

系统 SHALL 提供基于上下文的自然单词习得，而非背词书。

#### Scenario: 上下文重复出现
- **WHEN** 用户在输入中遇到新词
- **THEN** 系统记录该词，并在后续输入内容中有意识地增加该词的出现频率

#### Scenario: 语境记忆
- **WHEN** 用户多次在上下文中遇到同一词
- **THEN** 系统通过高频输入自动强化、语境记忆、图片关联、声音关联帮助习得

---

### Requirement: 语法习得系统

系统 SHALL 通过大量输入自然习得语法，而非语法课。

#### Scenario: 语法自然习得
- **WHEN** 用户在输入中反复接触某种语法结构
- **THEN** 系统仅做轻量规律提醒，不进行复杂术语教学

---

### Requirement: 听力系统（最高优先级）

系统 SHALL 将听力作为平台核心能力。

#### Scenario: 听力模式
- **WHEN** 用户使用听力功能
- **THEN** 系统支持：泛听、精听、可理解输入流、AI 听力陪练、多轮重复输入

#### Scenario: 听力统计
- **WHEN** 用户进行听力活动
- **THEN** 系统记录听力时间，作为核心成长指标

---

### Requirement: 输出系统（后期开放）

系统 SHALL 在用户输入积累足够后才开放输出功能。

#### Scenario: 输出解锁
- **WHEN** 用户累计输入达到阈值（由语言画像动态判定）
- **THEN** 系统逐步开放：AI 陪伴式对话、无压力表达、极简纠错

#### Scenario: 输出禁忌
- **WHEN** 用户处于早期阶段
- **THEN** 系统禁止初期强制开口、高频语法纠错

---

### Requirement: Language Acquisition Engine（核心引擎）

系统核心不是课程系统，而是动态语言习得引擎。该引擎持续评估用户语言状态、驱动 Language Acquisition State Machine 状态迁移，并驱动所有推荐与路径决策。

#### Scenario: 输入维度持续估计
- **WHEN** 引擎运行
- **THEN** 系统持续估计以下维度：
  - Listening Comprehension（听力理解力）
  - Vocabulary Familiarity（词汇熟悉度）
  - Grammar Pattern Familiarity（语法模式熟悉度）
  - Audio Speed Tolerance（语速耐受度）
  - Accent Adaptability（口音适应力）
  - Context Dependency（语境依赖度）
  - Subtitle Dependency（字幕依赖度）
  - Cognitive Load（认知负荷）
  - Anxiety Signals（焦虑信号）

#### Scenario: State Machine 驱动
- **WHEN** 引擎评估用户语言状态
- **THEN** 基于 9 维度估计结果，判定用户当前处于 Language Acquisition State Machine 的哪个状态（State 0-5）
- **AND** 根据当前状态应用对应的系统策略
- **AND** 状态迁移只能向前，由行为信号自动判定

#### Scenario: i+1 算法目标
- **WHEN** 引擎推荐内容
- **THEN** 系统始终寻找用户能理解 80%-90%、且存在少量未知信息的内容
- **AND** 未知信息量控制在 10%-20% 范围内
- **AND** i+1 匹配必须考虑当前 State 的策略约束

#### Scenario: 动态降难调节
- **WHEN** 用户出现以下信号：跳出率升高、回放次数暴增、高频暂停、字幕依赖增加
- **THEN** 系统自动降低后续推荐难度

#### Scenario: 动态升难调节
- **WHEN** 用户出现以下信号：长时间无暂停、高频沉浸、高理解率反馈
- **THEN** 系统逐渐提高后续推荐难度

#### Scenario: 理解率推断
- **WHEN** 用户消费内容
- **THEN** 系统通过行为信号（暂停频率、回放频率、字幕使用率、完成率、跳过率）推断理解率
- **AND** 理解率推断不要求用户主动反馈（但允许用户主动标记）
- **AND** 理解率推断结果用于 State Machine 状态迁移判定

---

### Requirement: Content Pipeline（内容供应链系统）

系统 SHALL 建立完整的内容供应链，支持多来源内容入库与自动化处理。

#### Scenario: 内容来源支持
- **WHEN** 内容进入系统
- **THEN** 系统支持以下来源：
  - PGC（官方内容）：分级视频、沉浸短剧、AI 生成内容
  - UGC（用户上传）：Vlog、Podcast、Story
  - AI-native Content（AI 自动生成）：i+1 故事、对话、漫画、情景剧

#### Scenario: 内容处理 Pipeline
- **WHEN** 内容上传后
- **THEN** 系统自动执行以下处理步骤：
  1. ASR 转录（语音转文字）
  2. 多语言对齐（字幕与原文对齐）
  3. i+1 Level 分析（可理解性等级评估）
  4. 高频词统计（词汇频率分析）
  5. 语法模式提取（语法结构识别）
  6. 可理解性评分（综合难度评分）
  7. Embedding 向量化（用于 RAG 检索与推荐）
  8. 推荐索引建立（进入推荐引擎候选池）

#### Scenario: AI-native 内容生成
- **WHEN** 系统检测某等级/某兴趣领域内容不足
- **THEN** AI 自动生成补充内容（i+1 故事、对话、情景剧），填补内容空缺

---

### Requirement: AI Agent System（多智能体架构）

系统 SHALL 构建多智能体协作架构，各 Agent 各司其职，协同驱动语言习得。

#### Scenario: Language Companion Agent（语言习得教练）
- **WHEN** 用户使用平台
- **THEN** Language Companion Agent 长期陪伴用户，负责：
  - 理解用户当前阶段
  - 调节用户焦虑
  - 推荐最优输入
  - 引导沉浸方向

#### Scenario: Comprehension Analyzer Agent（理解率分析器）
- **WHEN** 用户消费内容
- **THEN** Comprehension Analyzer Agent 实时评估：
  - 理解率
  - 认知负荷
  - i+1 匹配度

#### Scenario: Content Adaptation Agent（内容适配器）
- **WHEN** 用户理解率低于阈值
- **THEN** Content Adaptation Agent 动态执行：
  - 降难（简化表达）
  - 改写（替换生僻词）
  - 重构语速（降低播放速度）
  - 增加上下文提示

#### Scenario: Silent Period Guardian Agent（静默期守护者）
- **WHEN** 用户处于静默期
- **THEN** Silent Period Guardian Agent 检测并阻止：
  - 过早输出要求
  - 焦虑产生信号
  - 系统误伤（不当推荐、不当提示）

#### Scenario: Agent 协作机制
- **WHEN** 多个 Agent 同时工作
- **THEN** Agent 之间通过事件总线协作，共享用户语言画像状态
- **AND** Language Companion Agent 为总协调者，其他 Agent 向其汇报

---

### Requirement: 进度追踪系统

系统 SHALL 以输入为核心指标追踪进度。

#### Scenario: 核心指标
- **WHEN** 系统展示用户进度
- **THEN** 核心指标为：有效可理解输入时长（Primary）、自然理解增长率、沉浸连续性、输入覆盖广度、输出自然出现率
- **AND** 核心指标不是：背词数量、做题数量、完课率

#### Scenario: 可视化成长
- **WHEN** 用户查看成长
- **THEN** 系统展示：输入小时树、语言沉浸地图、理解力成长曲线、听力等级进化

---

### Requirement: 社区沉浸系统

系统 SHALL 提供"共同沉浸环境"而非传统论坛。

#### Scenario: 社区功能
- **WHEN** 用户进入社区
- **THEN** 系统提供：输入挑战、沉浸房间、一起听播客、AI 角色世界、语言陪伴、成长分享

---

### Requirement: 成就激励系统

系统 SHALL 以长期沉浸为核心设计成就。

#### Scenario: 成就类型
- **WHEN** 系统发放成就
- **THEN** 成就类型包括：累计 100 小时输入、连续 30 天沉浸、听懂第一部动画、首次无字幕理解
- **AND** 成就设计避免学习焦虑，强调长期沉浸、连续输入、自然成长

---

### Requirement: 多语言支持

系统 SHALL 支持多语言学习。

#### Scenario: 初始语言支持
- **WHEN** 平台上线
- **THEN** 支持英语、日语、韩语三种语言的学习

#### Scenario: 语言扩展
- **WHEN** 需要新增语言
- **THEN** 系统架构支持通过配置扩展新语言，无需核心代码改动

---

### Requirement: 技术架构

系统 SHALL 采用现代化微服务架构。

#### Scenario: 前端技术
- **WHEN** 构建前端
- **THEN** 采用 Next.js + React，支持 SSR/SSG，PWA 离线能力

#### Scenario: 后端技术
- **WHEN** 构建后端
- **THEN** 采用微服务架构，核心服务包括：用户服务、内容服务、推荐服务、学习路径服务、AI 服务、社区服务

#### Scenario: AI 能力
- **WHEN** 系统提供 AI 能力
- **THEN** 包括：LLM 对话 Agent、RAG 向量检索、内容难度评估、实时字幕与翻译、语音识别与评估

#### Scenario: 数据存储
- **WHEN** 系统存储数据
- **THEN** 采用 PostgreSQL（关系数据）、Redis（缓存/会话）、向量数据库（内容嵌入）、对象存储（音视频）、ClickHouse（分析埋点）

#### Scenario: 音视频处理
- **WHEN** 系统处理音视频内容
- **THEN** 支持自适应码率、实时字幕生成、语速调节、音频波形分析

---

### Requirement: 商业化设计

系统 SHALL 提供可持续的商业模式。

#### Scenario: 免费层
- **WHEN** 免费用户使用平台
- **THEN** 提供基础内容库、每日限量输入、基础进度追踪

#### Scenario: 订阅层
- **WHEN** 付费用户订阅
- **THEN** 提供完整内容库、无限输入、AI 对话、高级分析、离线下载、多语言并行学习

---

### Requirement: MVP 路线图

系统 SHALL 按阶段交付。MVP 以最小闭环为核心，验证"用户会不会连续沉浸 1 小时以上"这个生死问题。

#### Scenario: MVP 阶段（核心闭环验证）
- **WHEN** MVP 上线
- **THEN** 只包含 5 个模块：TikTok-like 内容流（Level 0-2 英语内容 50+ 条）、i+1 Engine（基于 pause/replay/completion/subtitle usage 动态调节）、内容分级（Level 0-2）、简单画像（兴趣+理解力）、Effective Input Hours（唯一指标）

#### Scenario: MVP+1 阶段
- **WHEN** MVP 验证通过
- **THEN** 新增：State Machine State 0-2 + Acquisition Memory Graph 基础版

#### Scenario: MVP+2 阶段
- **WHEN** MVP+1 验证通过
- **THEN** 新增：Emotional State Engine 基础版 + Immersion Runtime 基础版

#### Scenario: MVP+3 阶段
- **WHEN** MVP+2 验证通过
- **THEN** 新增：第一个 World（如 Tokyo Apartment）+ Persistent Companion 基础版

#### Scenario: V2 阶段
- **WHEN** V2 上线
- **THEN** 新增：完整 Cognitive Engines + Agent System + 多语言 + Emotional Memory Graph + Narrative Continuity Engine

#### Scenario: V3 阶段
- **WHEN** V3 上线
- **THEN** 新增：World Simulation Layer 完整版 + Ambient Immersion System + Identity Transition Engine + Constitutional AI for Product Decisions + 商业化完整方案
