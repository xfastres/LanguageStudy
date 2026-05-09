# Checklist

## 已完成：Cognitive Runtime Kernel

- [x] @linguaflow/telemetry — 13 种 RuntimeEvent + TelemetryBus + SessionTracker + ReplayEngine
- [x] @linguaflow/runtime-core — immersionScore / cognitiveLoad / flowProbability / switchingCost / ImmersionRuntimeImpl
- [x] @linguaflow/feature-space — 10维 ContentFeatureVector / UserProfileVector / distance() / recommendNext() / adaptation
- [x] @linguaflow/comprehension — Heuristic v1 / CalibrationStore / difficulty-adapter
- [x] @linguaflow/evaluation — TraceDatasetStore / ReplaySimulator / RuntimeMetricsComputer / DriftDetector
- [x] @linguaflow/simulation — 6 种 SyntheticUser / SyntheticUserSimulator / DefectAnalyzer
- [x] monorepo 结构 + TypeScript + ESLint + Prettier + Docker Compose
- [x] 66 个测试全部通过

## Phase 1（0-3 个月）：验证长时沉浸

### Task 2: 前端 MVP

- [x] Next.js App Router 项目结构正确
- [x] Tailwind CSS 配置 + 低焦虑配色系统
- [x] 全屏沉浸式视频流布局（竖屏滑动、无缝切换、无传统导航栏）
- [x] 视频播放器组件正常（播放/暂停/进度/全屏/语速调节）
- [x] 单语字幕组件正常（显示/隐藏切换、字幕样式）
- [x] Runtime SDK 前端集成正常（telemetry 事件采集）

### Task 3: 后端 MVP

- [x] 内容数据模型正确（ContentFeatureVector + Level 0-2 分级 + 多语言）
- [x] 内容 CRUD API 正常
- [x] 内容流 API 正常（基于 i+1 匹配返回下一内容）
- [x] 推荐服务正常（集成 comprehension + feature-space）
- [x] Signal 接收 API 正常（接收前端行为信号）

### Task 4: 内容分级与种子内容

- [ ] 内容管理后台基础版正常
- [ ] 英语种子内容 50-100 条（强视觉、高频结构、微剧情、高情绪表达、高上下文可猜测性）

### Task 5: 闭环集成

- [ ] 前端 Signal Collection Layer 完整接入（10 信号全量采集）
- [ ] 后端 Comprehension Inference 集成正常
- [ ] i+1 动态难度调节闭环正确（< 80% → 降难，> 90% → 升难）
- [ ] Adaptive Difficulty Dimensions 集成正常
- [ ] **Phase 1 验证门：用户能否忘记自己在学语言，连续沉浸 45-90 分钟？**

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

- [ ] **信号 1**：用户原本只想看 5 分钟 → 最后沉浸了 1 小时
- [ ] **信号 2**：用户忘记自己在学语言
- [ ] **信号 3**：用户开始主动打开原生内容
- [ ] **信号 4**：用户开始在脑中出现目标语言内心独白（= Cognitive Residence）

## 工程化验证

- [ ] Immersion Runtime API 可正常调用
- [ ] Heuristic 理解率推断先于复杂 AI 模型实现
- [ ] Word Exposure Map 先于图数据库实现
- [ ] Signal Collection Layer 是所有后续 AI 的根基
- [ ] Runtime 必须平台无关（mobile / web / future devices）
