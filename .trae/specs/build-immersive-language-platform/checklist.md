# Checklist

## Phase 1（0-3 个月）：验证长时沉浸

- [ ] TikTok-like 无限输入流正常
- [ ] 内容分级 Level 0-2 正确
- [ ] 种子内容 50-100 条（强视觉、高频结构、微剧情、高情绪表达、高上下文可猜测性）
- [ ] 视频播放器核心正常
- [ ] 单语字幕 + 语速调节正常
- [ ] Signal Collection Layer 采集正常（pause_frequency / replay_segments / subtitle_toggle / playback_speed / dwell_time / completion_rate / skip_position / immersion_session_length / transition_latency / abandonment_points）
- [ ] Heuristic 理解率推断正常（replay < threshold AND pause_rate low AND completion high AND subtitle_dependency low → comprehension_estimate +=）
- [ ] 理解率推断校准正常
- [ ] i+1 动态难度调节正确（< 80% → 降难，> 90% → 升难）
- [ ] Adaptive Difficulty Dimensions 正常（speech_speed / sentence_density / vocabulary_novelty / subtitle_exposure / scene_complexity / context_richness）
- [ ] 内容推荐 API 正常
- [ ] **Phase 1 验证门：用户能否忘记自己在学语言，连续沉浸 45-90 分钟？**

## Phase 2（3-6 个月）：验证状态迁移

- [ ] State Machine State 0-2 定义与迁移正确
- [ ] Word Exposure Map 正常（word → exposure_count / last_seen / contexts / confidence）
- [ ] 暴露驱动推荐正常
- [ ] 推荐优化正常（基于理解率 + 暴露数据 + 行为序列）
- [ ] 字幕自适应正常（根据理解率动态调整字幕暴露度）
- [ ] **Phase 2 验证门：系统能否准确推断理解率并动态调节？用户沉浸时间是否增长？**
- [ ] **未做 World**（Phase 2 明确禁止）

## Phase 3（6-12 个月）：验证 emotional immersion

- [ ] Flow State 检测正常
- [ ] 静默队列 + Interruption Management 正常
- [ ] 无缝过渡 + 内容预加载正常
- [ ] Immersion Runtime API 实现正常（immersionScore / cognitiveLoad / interruptionBudget / flowStateProbability / canInterrupt() / scheduleTransition() / estimateSwitchingCost()）
- [ ] 焦虑水平与专注度估计正常
- [ ] 情绪响应策略正常
- [ ] 跨 session 沉浸连续性正常
- [ ] Ambient Continuity 基础版正常
- [ ] **Phase 3 验证门：推荐系统是否优化了沉浸连续性？情绪系统是否降低了焦虑？**
- [ ] **未做 full AI world**（Phase 3 明确禁止）

## Phase 4（12-18 个月）：World & Companion — 最危险阶段

- [ ] World 数据模型正常
- [ ] World 渲染引擎基础版正常
- [ ] World 内语言输入自然出现机制正常
- [ ] World 与 State Machine 难度联动正常
- [ ] AI Companion 基础对话正常（Input-first，不是 Conversation-first）
- [ ] Companion 记忆正常
- [ ] Companion 与 World 集成正常
- [ ] Narrative Graph 基础版正常
- [ ] Narrative Continuity Score 正常
- [ ] **Phase 4 验证门：World 是否让用户忘记自己在学语言？Companion 是否增强了输入耐受度？**
- [ ] **未陷入 AI Worldbuilding Addiction**（未变成 AI Chat app / AI RPG / Character AI clone）

## Non-Goals 守卫（贯穿所有 Phase）

- [ ] 系统无题库化功能
- [ ] 系统无教育化 UI
- [ ] 系统无强制输出
- [ ] 系统无显式语法教学主导
- [ ] 系统无焦虑机制

## 产品陷阱守卫（贯穿所有 Phase）

- [ ] **未陷入 AI Worldbuilding Addiction**
- [ ] 未过早做 AI Chat
- [ ] 未做"学习路径"（无课程树、无 roadmap、无 checkpoint）
- [ ] 未做过强 gamification（无 Streak、无排行榜）

## 低焦虑设计（贯穿所有 Phase）

- [ ] 系统无红色错误提示
- [ ] 系统无高频纠错机制
- [ ] 反馈均为鼓励式、渐进式
- [ ] UI 无传统 LMS 风格
- [ ] 界面呈现极简、沉浸、内容优先风格

## PMF 信号（贯穿所有 Phase）

核心只有一个：**是否能让用户忘记自己在学语言**

- [ ] **信号 1**：用户原本只想看 5 分钟 → 最后沉浸了 1 小时
- [ ] **信号 2**：用户忘记自己在学语言（唯一必须验证的事）
- [ ] **信号 3**：用户开始主动打开原生内容
- [ ] **信号 4**：用户开始在脑中出现目标语言内心独白（= Cognitive Residence）

## Core Hierarchy 验证（贯穿所有 Phase）

- [ ] Runtime > Feature
- [ ] State > Level
- [ ] Input > Practice
- [ ] Immersion > Engagement
- [ ] Acquisition > Education
- [ ] World > Content
- [ ] Identity > Skill
- [ ] Narrative > Interest
- [ ] Emotion > Repetition

## 团队文化验证

- [ ] 团队第一原则是 Protect Immersion（不是 move fast）
- [ ] UI / PM / 推荐 / 商业化 / 通知 / AI 交互全部服从 Immersion Continuity
- [ ] 未陷入 AI Worldbuilding Addiction
- [ ] Phase 1 团队规模 3-5 人

## 竞争定位验证

- [ ] 产品体验接近 TikTok/Netflix/Character AI，而非 Duolingo/Babbel
- [ ] 争夺的是 Cognitive Residence，不是 Attention
- [ ] Comprehension Estimation 被视为 Human Understanding Infrastructure

## 工程化验证

- [ ] Immersion Runtime API 可正常调用（immersionScore / cognitiveLoad / interruptionBudget / flowStateProbability / canInterrupt() / scheduleTransition() / estimateSwitchingCost()）
- [ ] Heuristic 理解率推断先于复杂 AI 模型实现
- [ ] Word Exposure Map 先于图数据库实现
- [ ] Signal Collection Layer 是所有后续 AI 的根基

## 后续扩展验证（Phase 4 通过后，18 个月+）

- [ ] Identity Transition Engine 正常
- [ ] Emotional Memory Graph 正常
- [ ] Acquisition Memory Graph 完整版正常
- [ ] Ambient Immersion System 正常
- [ ] AI Agent System 正常
- [ ] Content Pipeline 完整版正常
- [ ] 护栏与防退化系统正常
- [ ] 习得系统与可视化正常
- [ ] 社区与输出正常
- [ ] 多语言扩展正常
