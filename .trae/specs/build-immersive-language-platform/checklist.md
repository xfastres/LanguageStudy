# Checklist

## MVP 核心闭环（生死验证）

- [ ] TikTok-like 内容流正常（全屏视频卡片、上下滑动、无限滚动）
- [ ] 内容分级 Level 0-2 逻辑正确
- [ ] 内容管理后台可上传、标注 Level、发布视频
- [ ] 英语种子内容至少 50 条（Level 0-2）
- [ ] 视频播放器核心功能正常（播放/暂停/进度/全屏）
- [ ] 单语字幕显示正常
- [ ] 语速调节控件可用
- [ ] 行为信号采集正常（pause/replay/completion/subtitle usage）
- [ ] 简单画像正常（兴趣标签 + 自评理解力）
- [ ] i+1 Engine MVP 正常（基于行为信号动态调节难度）
- [ ] 内容推荐 API 正常（基于画像 + i+1 匹配返回下一内容）
- [ ] 输入时长记录准确（仅播放时计时，暂停不计时）
- [ ] 有效输入时长统计看板正常
- [ ] **生死验证：用户能否连续沉浸 1 小时以上**

## State Machine State 0-2

- [ ] State 0-2 定义与特征正确
- [ ] 基于行为信号的状态迁移判定正常
- [ ] 状态策略执行正确（State 0→超慢速+强视觉，State 1→高频场景，State 2→扩大主题）

## Acquisition Memory Graph 基础版

- [ ] 图谱数据模型基础版正常（词汇节点 + 出现关系边）
- [ ] 图谱存储正常（图数据库）
- [ ] 词汇暴露追踪正常（消费内容时自动写入图谱）
- [ ] 图谱驱动推荐基础版正常（强化路径：已暴露未习得词汇优先出现）

## Emotional State Engine 基础版

- [ ] 焦虑水平与专注度估计正常（基于行为信号）
- [ ] 情绪响应策略基础版正常（焦虑→降难、专注→延长沉浸）

## Immersion Runtime 基础版

- [ ] Flow State 检测正常（基于连续输入时长与交互节奏）
- [ ] 静默队列正常（沉浸期间非关键通知排队）
- [ ] 无缝过渡正常（内容结束前预加载下一内容）

## World Simulation Layer

- [ ] World 数据模型已实现（世界设定、NPC、事件、广播、消息）
- [ ] World 渲染引擎基础版正常（场景切换、NPC 对话、环境音）
- [ ] World 内语言输入自然出现机制正常
- [ ] World 与 State Machine 难度联动正常
- [ ] 多 World 支持正常（Tokyo Apartment / Cyberpunk Seoul / Small Town America 等）
- [ ] World 内 NPC 系统与事件系统正常
- [ ] World 内叙事线管理正常
- [ ] World 与所有 Cognitive Engines 深度集成正常

## Persistent Companion System

- [ ] AI Companion 基础对话能力正常（LLM 驱动，i+1 表达复杂度）
- [ ] Companion 记忆正常（记住用户信息与互动历史）
- [ ] Companion 与 World 集成正常（Companion 生活在 World 中）
- [ ] Companion 情感记忆正常（基于 Emotional Memory Graph）
- [ ] Companion 成长系统正常（随用户 State 演化）
- [ ] Companion 多角色支持正常

## Language Acquisition Engine 完整版

- [ ] 语言画像 9 维度持续估计模型正常
- [ ] State Machine State 0-5 完整
- [ ] 状态迁移只能向前，由行为信号自动判定
- [ ] 状态可停滞，系统不因此制造焦虑
- [ ] i+1 算法完整版正确（考虑 State 约束 + Memory Graph + 情绪适配度 + 叙事连续性）
- [ ] 理解率推断引擎完整版正常
- [ ] 动态降难/升难调节完整版正常

## Emotional Memory Graph

- [ ] 情绪记忆图谱数据模型正常（情绪节点 + 情绪边 + 情绪强度 + 情绪衰减）
- [ ] 情绪编码正常（语言输入与情绪状态绑定记录）
- [ ] 情绪驱动推荐正常（强化情绪编码、利用情绪锚点扩展习得）

## Narrative Continuity Engine

- [ ] Narrative Graph 正常（叙事节点 + 叙事边 + 叙事张力 + 叙事惯性）
- [ ] Narrative Continuity Score 正常
- [ ] 叙事驱动推荐正常（高潮维持、悬念预加载、低谷引入新线）

## Identity Transition Engine

- [ ] 身份迁移信号追踪正常（目标语言思考/人格/偏好/情绪反应）
- [ ] Identity States 正确（Observer → Visitor → Resident → Native）
- [ ] 身份驱动系统策略正确

## Ambient Immersion System

- [ ] 耳机自动输入流正常
- [ ] 桌面漂浮字幕正常
- [ ] 锁屏界面目标语言内容正常
- [ ] 睡眠前低强度输入正常
- [ ] Ambient 与 State Machine 难度联动正常

## Non-Goals 守卫

- [ ] 系统无题库化功能
- [ ] 系统无教育化 UI
- [ ] 系统无强制输出
- [ ] 系统无显式语法教学主导
- [ ] 系统无焦虑机制

## 输入优先与静默期

- [ ] 系统学习时间中 70%-90% 为输入活动
- [ ] 静默期用户不被强制要求口语/对话/语法输出
- [ ] 系统不以口语输出作为核心 KPI
- [ ] 系统不以做题数量作为成长指标

## 低焦虑设计

- [ ] 系统无红色错误提示
- [ ] 系统无高频纠错机制
- [ ] 反馈均为鼓励式、渐进式
- [ ] UI 无传统 LMS 风格
- [ ] 界面呈现极简、沉浸、内容优先风格

## AI Agent System

- [ ] Agent 事件总线通信正常
- [ ] Agent 共享状态正常（语言画像 + 情绪状态 + 身份状态）
- [ ] Agent 决策护栏正常（所有 Agent 决策前通过 Philosophical Guardrails）
- [ ] Language Companion Agent 正常
- [ ] Comprehension Analyzer Agent 正常
- [ ] Content Adaptation Agent 正常
- [ ] Silent Period Guardian Agent 正常

## 推荐系统防 DAU 污染架构

- [ ] 推荐目标函数正确（唯一优化：最大化有效可理解输入时长）
- [ ] 推荐评分公式正确（i+1 匹配度 + 兴趣匹配度 + 习得价值 + 情绪适配度 + 叙事连续性，i+1 权重最高）
- [ ] DAU 信号隔离正常
- [ ] 商业化信号隔离正常
- [ ] 焦虑驱动信号隔离正常
- [ ] 推荐审计正常

## Philosophical Guardrails

- [ ] Guardrail 1-5 审查正常
- [ ] 护栏审查 API 可正常拦截未通过审查的功能
- [ ] Non-Goals 运行时守卫可检测系统退化并告警

## Runtime Constitution

- [ ] Rule 1-8 执行正常
- [ ] Runtime Constitution 监控看板可实时监控执行状态与违规告警

## Constitutional AI for Product Decisions

- [ ] Guardian AI 审查引擎正常（基于 Guardrails + Constitution + Non-Goals）
- [ ] 提案提交→审查→通过/拦截流程正常
- [ ] 上线后持续监控与退化信号检测正常

## Content Pipeline

- [ ] ASR 转录正常
- [ ] 多语言对齐正常
- [ ] i+1 Level 自动评估正确
- [ ] 高频词统计与语法模式提取正常
- [ ] 可理解性评分合理
- [ ] Embedding 向量化与推荐索引正常
- [ ] 视频转码与自适应码率正常
- [ ] 语速调节（不变调变速）正常

## North Star Metrics

- [ ] 有效可理解输入时长统计准确（Primary Metric）
- [ ] 自然理解增长率追踪正确
- [ ] 沉浸连续性追踪正确
- [ ] 输入覆盖广度统计可用
- [ ] 输出自然出现率追踪正确
- [ ] Anti-Metrics 监控正常
- [ ] 可视化成长系统正常

## 习得系统

- [ ] 词汇暴露追踪正常
- [ ] 高频输入自动强化正常
- [ ] 语境记忆卡片正常
- [ ] 词汇习得状态流转正确
- [ ] 语法结构识别正常
- [ ] 语法提醒为轻量规律提示

## 社区与输出

- [ ] 沉浸房间正常
- [ ] 输入挑战与成长分享正常
- [ ] AI 对话 Agent 正常
- [ ] 输出阶段解锁逻辑正确（Silent Period Guardian 守护）
- [ ] 极简纠错正常（无红色错误提示）

## 多语言扩展

- [ ] 日语/韩语内容分级适配完成
- [ ] 日语/韩语字幕与释义正常
- [ ] 新语言可通过配置扩展

## System Architecture Layers

- [ ] Layer 0（Immersion Runtime）正常
- [ ] Layer 1（Cognitive Engines）正常
- [ ] Layer 2（AI Agent System）正常
- [ ] Layer 3（Content System）正常
- [ ] Layer 3.5（World Simulation Layer）正常
- [ ] Layer 4（Experience Layer）正常
- [ ] Layer 4.5（Ambient Layer）正常
- [ ] Layer 5（Guardrails）正常
- [ ] 层间规则遵守

## Technical Moats

- [ ] Acquisition Memory Graph 网络效应可验证
- [ ] State Machine + i+1 推荐闭环可验证
- [ ] Immersion Runtime 沉浸数据可采集
- [ ] Emotional State + Memory Graph 情绪模型可训练
- [ ] Guardrails 防退化系统可验证
- [ ] World + Companion 情感绑定可验证
- [ ] Identity Transition 身份迁移可验证

## Core Hierarchy 验证

- [ ] Runtime > Feature：运行时优先级高于功能
- [ ] State > Level：状态优先于等级
- [ ] Input > Practice：输入优先于练习
- [ ] Immersion > Engagement：沉浸优先于活跃度
- [ ] Acquisition > Education：习得优先于教育
- [ ] World > Content：世界优先于内容
- [ ] Identity > Skill：身份优先于技能
- [ ] Narrative > Interest：叙事优先于兴趣
- [ ] Emotion > Repetition：情绪优先于重复
