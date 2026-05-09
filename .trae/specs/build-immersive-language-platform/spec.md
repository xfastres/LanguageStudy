# LinguaFlow OS — 沉浸式语言习得操作系统 Spec

## Why

当前语言学习产品普遍采用"显性学习"范式——背单词、刷语法、做题考试——这与人类母语习得的自然路径完全背离。Stephen Krashen 的第二语言习得理论证明：语言能力的获得依赖于大量可理解性输入（Comprehensible Input），而非刻意练习。市场上缺少一个真正以"输入优先、自然习得"为核心理念的沉浸式语言习得操作系统。

LinguaFlow OS 不是"语言学习平台"，而是一套模拟母语习得过程的**语言沉浸操作系统**。用户不是在"学语言"，而是在持续沉浸后自然获得语言能力。

## What Changes

- 构建基于可理解性输入（i+1）的沉浸式内容消费系统
- 实现动态语言画像与 Language Acquisition Engine，自适应推送 i+1 内容
- 设计静默期友好的学习路径，禁止初期强制输出
- 构建低焦虑 UI/UX 体系，消除传统教育产品中的惩罚与纠错机制
- 实现兴趣驱动的内容推荐流（类 TikTok/YouTube/Netflix 体验）
- 构建多语言支持架构（英语、日语、韩语，可扩展）
- 设计以"有效可理解输入时长"为北极星指标的进度追踪系统
- 构建社区沉浸环境与成就激励系统
- 构建 Content Pipeline 内容供应链系统
- 构建 AI Agent System 多智能体协作架构
- 建立哲学护栏（Philosophical Guardrails）防止产品退化

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

## ADDED Requirements

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

系统核心不是课程系统，而是动态语言习得引擎。该引擎持续评估用户语言状态并驱动所有推荐与路径决策。

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

#### Scenario: i+1 算法目标
- **WHEN** 引擎推荐内容
- **THEN** 系统始终寻找用户能理解 80%-90%、且存在少量未知信息的内容
- **AND** 未知信息量控制在 10%-20% 范围内

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

系统 SHALL 按阶段交付。

#### Scenario: MVP 阶段
- **WHEN** MVP 上线
- **THEN** 包含：用户注册登录、英语内容库（Level 0-2）、基础内容消费（视频+音频）、输入增强（字幕+悬停释义+语速调节）、Language Acquisition Engine 基础版（i+1 匹配+行为信号推断）、Content Pipeline 基础版（ASR+分级+向量化）、Language Companion Agent 基础版、Comprehension Analyzer Agent 基础版、Silent Period Guardian Agent 基础版、听力时间统计、静默期保护、North Star Metrics 追踪基础版

#### Scenario: V2 阶段
- **WHEN** V2 上线
- **THEN** 新增：日语/韩语支持、AI 对话输出系统、单词习得系统、Content Adaptation Agent、社区沉浸、成就系统、高级可视化、AI-native 内容生成

#### Scenario: V3 阶段
- **WHEN** V3 上线
- **THEN** 新增：输出系统完整版、AI 角色世界、内容创作者平台、高级 AI 推荐引擎、Philosophical Guardrails 自动审查工具、商业化完整方案
