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

## Phase 2: Immersion Runtime（沉浸运行时 — Layer 0）

- [ ] Task 4: 实现 Immersion Runtime 基础版
  - [ ] SubTask 4.1: 实现 Flow State 检测（基于连续输入时长、交互节奏稳定性、内容完成率推断沉浸状态）
  - [ ] SubTask 4.2: 实现中断优先级管理（所有中断经优先级评估，低优先级中断沉浸期间进入静默队列）
  - [ ] SubTask 4.3: 实现静默队列（沉浸期间非关键通知排队，沉浸结束后统一展示）
  - [ ] SubTask 4.4: 实现无缝过渡（内容结束前预加载下一内容，零等待过渡）
  - [ ] SubTask 4.5: 实现认知切换守卫（需用户主动决策的 UI 变化在沉浸期间延迟执行）
  - [ ] SubTask 4.6: 实现沉浸恢复（中断后提供快速恢复路径，降低重新进入沉浸门槛）

## Phase 3: 用户系统

- [ ] Task 5: 实现用户注册登录
  - [ ] SubTask 5.1: 实现邮箱注册登录（JWT 鉴权）
  - [ ] SubTask 5.2: 实现 OAuth 登录（Google、Apple、GitHub）
  - [ ] SubTask 5.3: 实现用户资料管理（头像、昵称、偏好设置）

- [ ] Task 6: 实现用户语言画像
  - [ ] SubTask 6.1: 设计语言画像数据模型（9 维度：听力理解力、词汇熟悉度、语法模式熟悉度、语速耐受度、口音适应力、语境依赖度、字幕依赖度、认知负荷、焦虑信号）
  - [ ] SubTask 6.2: 实现初始画像构建流程（兴趣标签选择、自评理解等级）
  - [ ] SubTask 6.3: 实现多语言学习档案（每门语言独立画像与进度）
  - [ ] SubTask 6.4: 实现画像动态更新逻辑（基于用户行为持续更新）

## Phase 4: 内容系统（核心）

- [ ] Task 7: 设计内容数据模型与分级体系
  - [ ] SubTask 7.1: 设计内容数据模型（标题、描述、语言、Level、类型、标签、时长、难度参数、来源类型 PGC/UGC/AI-native）
  - [ ] SubTask 7.2: 实现 Level 0-5 分级逻辑与存储
  - [ ] SubTask 7.3: 设计内容元数据结构（字幕、释义、语速、词汇列表、语法模式、可理解性评分）

- [ ] Task 8: 实现内容管理后台
  - [ ] SubTask 8.1: 实现内容上传与入库（视频、音频，支持 PGC/UGC/AI-native 来源标记）
  - [ ] SubTask 8.2: 实现内容分级标注（AI 辅助 + 人工审核）
  - [ ] SubTask 8.3: 实现内容标签与分类管理
  - [ ] SubTask 8.4: 实现内容发布与上下架

- [ ] Task 9: 实现 Content Pipeline（内容供应链管线）
  - [ ] SubTask 9.1: 实现 ASR 转录（Whisper 语音转文字）
  - [ ] SubTask 9.2: 实现多语言对齐（字幕与原文时间轴对齐）
  - [ ] SubTask 9.3: 实现 i+1 Level 分析（可理解性等级自动评估）
  - [ ] SubTask 9.4: 实现高频词统计（词汇频率分析）
  - [ ] SubTask 9.5: 实现语法模式提取（语法结构识别）
  - [ ] SubTask 9.6: 实现可理解性评分（综合难度评分算法）
  - [ ] SubTask 9.7: 实现 Embedding 向量化（用于 RAG 检索与推荐）
  - [ ] SubTask 9.8: 实现推荐索引建立（进入推荐引擎候选池）
  - [ ] SubTask 9.9: 实现视频转码与自适应码率（HLS/DASH）
  - [ ] SubTask 9.10: 实现音频波形分析与语速检测
  - [ ] SubTask 9.11: 实现语速调节（不变调变速）

## Phase 5: 内容消费体验

- [ ] Task 10: 实现沉浸式视频播放器
  - [ ] SubTask 10.1: 实现视频播放器核心（播放/暂停/进度/全屏）
  - [ ] SubTask 10.2: 实现单语字幕显示与切换
  - [ ] SubTask 10.3: 实现悬停释义（字幕词语悬停弹出解释）
  - [ ] SubTask 10.4: 实现语速调节控件
  - [ ] SubTask 10.5: 实现智能暂停（复杂句自动暂停选项）
  - [ ] SubTask 10.6: 实现重复播放（AB 循环、单句重播）
  - [ ] SubTask 10.7: 实现输入时长记录（仅播放时计时，暂停不计时）

- [ ] Task 11: 实现沉浸式音频播放器
  - [ ] SubTask 11.1: 实现音频播放器核心（后台播放、锁屏控制）
  - [ ] SubTask 11.2: 实现听力流模式（连续播放同等级内容）
  - [ ] SubTask 11.3: 实现音频字幕同步
  - [ ] SubTask 11.4: 实现泛听/精听模式切换

- [ ] Task 12: 实现内容信息流首页
  - [ ] SubTask 12.1: 实现内容卡片组件（缩略图、标题、等级标签、时长）
  - [ ] SubTask 12.2: 实现无限滚动内容流
  - [ ] SubTask 12.3: 实现内容分类筛选（类型、等级、兴趣）
  - [ ] SubTask 12.4: 实现个性化推荐接入

## Phase 6: Cognitive Engines（认知引擎层 — Layer 1）

- [ ] Task 13: 实现 Language Acquisition Engine 核心
  - [ ] SubTask 13.1: 实现语言画像 9 维度持续估计模型（听力理解力、词汇熟悉度、语法模式熟悉度、语速耐受度、口音适应力、语境依赖度、字幕依赖度、认知负荷、焦虑信号）
  - [ ] SubTask 13.2: 实现 Language Acquisition State Machine（6 状态定义、状态特征、状态策略、迁移规则）
  - [ ] SubTask 13.3: 实现状态迁移判定算法（基于 9 维度估计与行为信号自动判定 State 0-5）
  - [ ] SubTask 13.4: 实现状态策略执行引擎（根据当前 State 应用对应系统策略）
  - [ ] SubTask 13.5: 实现 i+1 算法核心（寻找 80%-90% 理解率 + 10%-20% 未知信息的内容匹配，考虑当前 State 策略约束）
  - [ ] SubTask 13.6: 实现理解率推断引擎（基于行为信号：暂停频率、回放频率、字幕使用率、完成率、跳过率，推断结果用于 State 迁移判定）
  - [ ] SubTask 13.7: 实现动态降难调节（跳出率升高、回放暴增、高频暂停、字幕依赖增加时自动降难）
  - [ ] SubTask 13.8: 实现动态升难调节（长时间无暂停、高频沉浸、高理解率时逐渐升难）
  - [ ] SubTask 13.9: 实现内容向量嵌入与相似度计算
  - [ ] SubTask 13.10: 实现兴趣加权推荐（协同过滤 + 内容特征 + i+1 难度匹配 + State 策略约束 + Acquisition Memory Graph 驱动 + 情绪适配度）

- [ ] Task 14: 实现 Acquisition Memory Graph（语言记忆图谱）
  - [ ] SubTask 14.1: 设计图谱数据模型（6 种节点类型：词汇、语法模式、语境、声音、情感、内容；5 种边类型：出现关系、上下文关联、声音关联、情感关联、习得路径）
  - [ ] SubTask 14.2: 实现图谱存储（图数据库，如 Neo4j 或 Apache Age）
  - [ ] SubTask 14.3: 实现图谱构建（用户消费内容时自动将节点与边加入图谱）
  - [ ] SubTask 14.4: 实现习得状态追踪（每个节点维护：暴露次数、上下文多样性、时间衰减、习得置信度）
  - [ ] SubTask 14.5: 实现图谱驱动推荐（强化路径、扩展路径、语境丰富化）

- [ ] Task 15: 实现 Emotional State Engine（情绪状态引擎）
  - [ ] SubTask 15.1: 实现情绪维度估计（焦虑水平、专注度、愉悦度、疲劳度、挫败感）
  - [ ] SubTask 15.2: 实现情绪信号来源处理（行为信号→焦虑/挫败、交互模式→疲劳/无聊、完成模式→愉悦/专注、时间模式→Flow State）
  - [ ] SubTask 15.3: 实现情绪响应策略（焦虑→降难、专注→延长沉浸、愉悦→维持、疲劳→建议休息、挫败→立即降难）
  - [ ] SubTask 15.4: 实现情绪信号共享（情绪状态作为所有 Agent 和推荐引擎的输入）

- [ ] Task 16: 实现学习路径引擎
  - [ ] SubTask 16.1: 实现静默期判定逻辑（State 0-3 为输入主导期，禁止主动引导输出）
  - [ ] SubTask 16.2: 实现输入/输出阶段切换逻辑（State 4 为输出自然涌现期，仅提供低压力输出机会）
  - [ ] SubTask 16.3: 实现每日学习路径推荐（基于当前 State 生成最优输入内容组合）

## Phase 7: AI Agent System（智能体层 — Layer 2）

- [ ] Task 17: 实现 Language Companion Agent（语言习得教练）
  - [ ] SubTask 17.1: 实现 Agent 基础框架（事件总线、状态共享、消息协议）
  - [ ] SubTask 17.2: 实现用户阶段理解模块（读取语言画像，判断用户当前习得阶段）
  - [ ] SubTask 17.3: 实现焦虑调节模块（基于 Emotional State Engine 信号调整推荐策略）
  - [ ] SubTask 17.4: 实现输入推荐模块（综合兴趣 + i+1 + Acquisition Memory Graph 生成最优推荐）
  - [ ] SubTask 17.5: 实现沉浸引导模块（引导用户进入深度沉浸状态，与 Immersion Runtime 协作）

- [ ] Task 18: 实现 Comprehension Analyzer Agent（理解率分析器）
  - [ ] SubTask 18.1: 实现实时理解率评估（基于行为信号流）
  - [ ] SubTask 18.2: 实现认知负荷评估（检测用户是否过载）
  - [ ] SubTask 18.3: 实现 i+1 匹配度评估（当前内容与用户 i+1 的匹配程度）

- [ ] Task 19: 实现 Content Adaptation Agent（内容适配器）
  - [ ] SubTask 19.1: 实现动态降难（简化表达、替换生僻词）
  - [ ] SubTask 19.2: 实现语速重构（降低播放速度建议）
  - [ ] SubTask 19.3: 实现上下文提示增强（增加辅助理解信息）

- [ ] Task 20: 实现 Silent Period Guardian Agent（静默期守护者）
  - [ ] SubTask 20.1: 实现过早输出检测（检测并阻止静默期输出要求）
  - [ ] SubTask 20.2: 实现焦虑信号检测（基于 Emotional State Engine 检测用户焦虑信号）
  - [ ] SubTask 20.3: 实现系统误伤防护（阻止不当推荐、不当提示）

- [ ] Task 21: 实现 Agent 协作机制
  - [ ] SubTask 21.1: 实现事件总线（Agent 间异步通信）
  - [ ] SubTask 21.2: 实现共享语言画像状态（Agent 间画像同步，含情绪状态）
  - [ ] SubTask 21.3: 实现 Language Companion Agent 总协调逻辑（其他 Agent 向其汇报）

## Phase 8: 习得系统

- [ ] Task 22: 实现单词习得系统
  - [ ] SubTask 22.1: 实现词汇暴露追踪（记录用户在输入中遇到的词，写入 Acquisition Memory Graph）
  - [ ] SubTask 22.2: 实现高频输入自动强化（在后续内容中增加已遇词的出现频率，基于图谱强化路径）
  - [ ] SubTask 22.3: 实现语境记忆卡片（词语 + 来源上下文 + 图片 + 声音，从图谱中提取）
  - [ ] SubTask 22.4: 实现词汇习得状态（未见 → 暴露 → 熟悉 → 习得，基于图谱习得置信度）

- [ ] Task 23: 实现语法习得提醒
  - [ ] SubTask 23.1: 实现语法结构识别（从字幕/文本中提取语法模式，写入图谱）
  - [ ] SubTask 23.2: 实现轻量规律提醒（非术语教学，仅提示"这个结构你已见过 N 次"）

## Phase 9: North Star Metrics 追踪与可视化

- [ ] Task 24: 实现 North Star Metrics 追踪
  - [ ] SubTask 24.1: 实现有效可理解输入时长统计（Primary Metric：用户真正理解 80%+ 内容的输入时间）
  - [ ] SubTask 24.2: 实现自然理解增长率追踪（无字幕情况下理解提升速度）
  - [ ] SubTask 24.3: 实现沉浸连续性追踪（长期低压力输入习惯，非 streak 绑架）
  - [ ] SubTask 24.4: 实现输入覆盖广度统计（真实语言场景数量与多样性，基于 Acquisition Memory Graph）
  - [ ] SubTask 24.5: 实现输出自然出现率追踪（无强迫情况下自然表达频率）
  - [ ] SubTask 24.6: 实现 Anti-Metrics 监控（确保系统未优化做题量、背词量、完课率等错误指标）

- [ ] Task 25: 实现可视化成长系统
  - [ ] SubTask 25.1: 实现输入小时树（可视化累计输入时长）
  - [ ] SubTask 25.2: 实现理解力成长曲线
  - [ ] SubTask 25.3: 实现听力等级进化图
  - [ ] SubTask 25.4: 实现语言沉浸地图（已探索的内容领域，基于 Acquisition Memory Graph 可视化）

## Phase 10: 成就与激励

- [ ] Task 26: 实现成就激励系统
  - [ ] SubTask 26.1: 设计成就数据模型（类型、条件、奖励）
  - [ ] SubTask 26.2: 实现里程碑成就（累计 100h 输入、连续 30 天沉浸等）
  - [ ] SubTask 26.3: 实现理解力成就（听懂第一部动画、首次无字幕理解等）
  - [ ] SubTask 26.4: 实现成就通知与展示（低焦虑、鼓励式动画，禁止 streak 压迫，通过 Immersion Runtime 静默队列管理通知时机）

## Phase 11: 社区沉浸

- [ ] Task 27: 实现社区沉浸系统
  - [ ] SubTask 27.1: 实现沉浸房间（多人同步听/看同一内容）
  - [ ] SubTask 27.2: 实现输入挑战（社区挑战活动）
  - [ ] SubTask 27.3: 实现成长分享（学习里程碑分享）
  - [ ] SubTask 27.4: 实现语言陪伴匹配

## Phase 12: 输出系统（V2+）

- [ ] Task 28: 实现 AI 对话输出系统
  - [ ] SubTask 28.1: 实现 AI 对话 Agent（LLM 驱动的语言陪练）
  - [ ] SubTask 28.2: 实现输出阶段解锁逻辑（输入积累达标后开放，由 Silent Period Guardian 守护）
  - [ ] SubTask 28.3: 实现极简纠错（不显示红色错误，仅提供自然重述）
  - [ ] SubTask 28.4: 实现语音识别与评估（Shadowing 跟读反馈）

## Phase 13: AI-native 内容生成

- [ ] Task 29: 实现 AI-native 内容生成系统
  - [ ] SubTask 29.1: 实现内容空缺检测（检测某等级/某兴趣领域内容不足）
  - [ ] SubTask 29.2: 实现 i+1 故事生成（AI 自动生成符合 i+1 的故事内容）
  - [ ] SubTask 29.3: 实现 i+1 对话生成（AI 自动生成符合 i+1 的对话场景）
  - [ ] SubTask 29.4: 实现情景剧生成（AI 自动生成沉浸式短剧脚本）
  - [ ] SubTask 29.5: 实现生成内容自动进入 Content Pipeline 处理

## Phase 14: 哲学护栏与运行时宪法执行机制（护栏层 — Layer 5）

- [ ] Task 30: 实现 Philosophical Guardrails 审查机制
  - [ ] SubTask 30.1: 实现 Guardrail 1 审查（可理解性输入增量检查）
  - [ ] SubTask 30.2: 实现 Guardrail 2 审查（焦虑降低检查）
  - [ ] SubTask 30.3: 实现 Guardrail 3 审查（母语习得自然路径检查）
  - [ ] SubTask 30.4: 实现 Guardrail 4 审查（传统教育异化防护检查）
  - [ ] SubTask 30.5: 实现 Guardrail 5 审查（长期沉浸体验强化检查）
  - [ ] SubTask 30.6: 实现护栏审查 API（新功能上线前必须调用，未通过则拦截）
  - [ ] SubTask 30.7: 实现 Non-Goals 运行时守卫（运行时检测系统是否退化，如出现题库化、教育化 UI、强制输出等行为则告警）

- [ ] Task 31: 实现 Runtime Constitution 执行机制
  - [ ] SubTask 31.1: 实现 Rule 1 执行（输入优先级高于活跃度：推荐系统不得为 DAU/点击/停留牺牲输入质量）
  - [ ] SubTask 31.2: 实现 Rule 2 执行（推荐系统不得被商业化污染：付费内容不得强插推荐流，广告不得打断沉浸）
  - [ ] SubTask 31.3: 实现 Rule 3 执行（默认相信用户：系统不得频繁测试验证用户，通过行为信号被动观察）
  - [ ] SubTask 31.4: 实现 Rule 4 执行（练习伪装成内容消费：任何互动/复习/巩固必须看起来像娱乐内容）
  - [ ] SubTask 31.5: 实现 Rule 5 执行（不让用户感觉差：禁止"你退步了"等负面反馈，强调长期积累）
  - [ ] SubTask 31.6: 实现 Rule 6 执行（允许长期无输出用户：系统不得强制解锁口语、引导"快点说"）
  - [ ] SubTask 31.7: 实现 Rule 7 执行（Agent 服从哲学护栏：所有 Agent 决策前必须通过 Guardrails，护栏优先级高于 Engagement/Revenue/Retention）
  - [ ] SubTask 31.8: 实现 Rule 8 执行（优先保护沉浸状态：禁止高频弹窗/通知/UI 中断/强反馈，保护 Flow State，与 Immersion Runtime 协作）
  - [ ] SubTask 31.9: 实现 Runtime Constitution 监控看板（实时监控 8 条规则的执行状态与违规告警）

- [ ] Task 32: 实现推荐系统防 DAU 污染架构
  - [ ] SubTask 32.1: 实现推荐目标函数（唯一优化目标：最大化有效可理解输入时长）
  - [ ] SubTask 32.2: 实现推荐评分公式（i+1 匹配度 + 兴趣匹配度 + 习得价值 + 情绪适配度，i+1 权重最高）
  - [ ] SubTask 32.3: 实现 DAU 信号隔离（DAU/日启动次数不得作为推荐特征输入）
  - [ ] SubTask 32.4: 实现商业化信号隔离（付费内容在推荐流中不获得额外权重）
  - [ ] SubTask 32.5: 实现焦虑驱动信号隔离（不得使用焦虑驱动信号优化推荐）
  - [ ] SubTask 32.6: 实现推荐审计（定期审计推荐结果是否偏离 i+1 目标）

## Phase 15: 数据埋点与分析

- [ ] Task 33: 实现数据埋点方案
  - [ ] SubTask 33.1: 设计埋点事件体系（内容消费、交互行为、学习行为、系统事件、Agent 事件、State 迁移事件、Runtime Constitution 违规事件、Immersion 事件、情绪事件）
  - [ ] SubTask 33.2: 实现客户端埋点 SDK
  - [ ] SubTask 33.3: 实现埋点数据采集与存储（ClickHouse）
  - [ ] SubTask 33.4: 实现 North Star Metrics 分析看板（有效可理解输入时长为核心）
  - [ ] SubTask 33.5: 实现 Anti-Metrics 监控看板（检测是否优化了错误指标）

## Phase 16: 多语言扩展

- [ ] Task 34: 实现日语与韩语支持
  - [ ] SubTask 34.1: 实现日语内容分级适配（参考 JLPT 但重新抽象为输入理解等级）
  - [ ] SubTask 34.2: 实现韩语内容分级适配（参考 TOPIK 但重新抽象为输入理解等级）
  - [ ] SubTask 34.3: 实现日语/韩语字幕与释义系统
  - [ ] SubTask 34.4: 实现语言扩展配置化方案（新语言无需核心代码改动）

# Task Dependencies

- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 4] depends on [Task 2, Task 3]
- [Task 5] depends on [Task 3]
- [Task 6] depends on [Task 5]
- [Task 7] depends on [Task 3]
- [Task 8] depends on [Task 7]
- [Task 9] depends on [Task 7]
- [Task 10] depends on [Task 2, Task 9, Task 4]
- [Task 11] depends on [Task 2, Task 9, Task 4]
- [Task 12] depends on [Task 2, Task 7]
- [Task 13] depends on [Task 6, Task 9]
- [Task 14] depends on [Task 13]
- [Task 15] depends on [Task 13]
- [Task 16] depends on [Task 6, Task 13]
- [Task 17] depends on [Task 13, Task 3]
- [Task 18] depends on [Task 13]
- [Task 19] depends on [Task 18]
- [Task 20] depends on [Task 13, Task 15]
- [Task 21] depends on [Task 17, Task 18, Task 19, Task 20]
- [Task 22] depends on [Task 7, Task 10, Task 14]
- [Task 23] depends on [Task 7, Task 10, Task 14]
- [Task 24] depends on [Task 10, Task 11, Task 13, Task 14]
- [Task 25] depends on [Task 24]
- [Task 26] depends on [Task 24, Task 4]
- [Task 27] depends on [Task 5, Task 12]
- [Task 28] depends on [Task 16, Task 6, Task 20]
- [Task 29] depends on [Task 9, Task 13]
- [Task 30] depends on [Task 3]
- [Task 31] depends on [Task 30, Task 17, Task 4]
- [Task 32] depends on [Task 13, Task 14, Task 15]
- [Task 33] depends on [Task 2, Task 3, Task 31]
- [Task 34] depends on [Task 7, Task 9, Task 10]

# Parallelizable Work

- Task 2 与 Task 3 可并行
- Task 10 与 Task 11 可并行
- Task 14、Task 15 可并行（Cognitive Engines 内部）
- Task 18、Task 19、Task 20 可并行（Agent 开发）
- Task 22 与 Task 23 可并行
- Task 25 与 Task 26 可并行
