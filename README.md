# LinguaFlow OS

AI-native Cognitive Immersion Runtime — 基于可理解性输入的沉浸式语言习得系统

LinguaFlow 不是语言学习 App，而是 **Cognitive Runtime**：一个通过实时认知状态估计和动态难度适配，让用户在沉浸中自然习得语言的运行时系统。

核心飞轮：

```
Input → Behavior Signals → Comprehension Inference → Difficulty Adaptation
  ↑                                                        ↓
  └── Better Adaptation ← More Signals ← Longer Input ← Better Immersion
```

## 架构

```
packages/
├── telemetry/          感知器官 — 事件系统 + 会话追踪 + 轨迹回放
├── runtime-core/       心脏 — immersionScore / cognitiveLoad / flowProbability
├── feature-space/      i+1 特征空间 — 10维匹配 + 距离度量 + 自适应遍历
├── comprehension/      核心 moat — 理解率推断 + 校准系统 + 难度自适应
├── evaluation/         Runtime Truth Layer — 轨迹数据集 + 漂移检测
├── simulation/         合成用户测试 — 6种画像 + 缺陷分析器
├── shared/             共享类型
├── database/           Prisma 数据库
└── logger/             日志

services/
├── content-service/    内容管理 + i+1 feed (NestJS, port 3001)
├── recommendation-service/  推荐引擎 + Signal 接收 (NestJS, port 3002)
├── api-gateway/        API 网关
├── user-service/       用户服务
└── ai-service/         AI 服务

apps/
└── web/                前端 MVP — TikTok-like 沉浸式视频流 (Next.js)
```

## 核心包

### @linguaflow/telemetry

Runtime 事件系统。13 种 `RuntimeEvent` 类型，`TelemetryBus` 类型安全事件总线，`SessionTracker` 实时指标计算，`ReplayEngine` 轨迹重建与沉浸崩溃/认知过载分析。

### @linguaflow/runtime-core

Immersion Runtime 核心。`ImmersionRuntimeImpl` 类实现 `ImmersionRuntime` 接口：

```ts
const runtime = new ImmersionRuntimeImpl(tracker)

runtime.immersionScore       // 0-1 沉浸分数
runtime.cognitiveLoad        // 0-1 认知负荷
runtime.flowStateProbability // 0-1 心流概率
runtime.canInterrupt()       // 是否可以打断
runtime.estimateSwitchingCost(transition) // 切换成本
```

### @linguaflow/feature-space

i+1 特征空间。10 维 `ContentFeatureVector` 和 `UserProfileVector`，加权距离度量，`recommendNext()` 返回最佳 i+1 匹配。

### @linguaflow/comprehension

理解率推断引擎。Heuristic v1 从行为信号推断理解率，`CalibrationStore` 收集 ground truth 校准数据，`computeDifficultyAdjustment()` 输出自适应难度调整。

### @linguaflow/evaluation

Runtime 验证层。`TraceDatasetStore` 管理轨迹数据集，`ReplaySimulator` 离线回放模拟，`RuntimeMetricsComputer` 计算认知稳定性指标，`DriftDetector` 检测运行时漂移。

### @linguaflow/simulation

合成用户测试。6 种 `SyntheticUserProfile`（焦虑型/字幕依赖/高沉浸易疲劳/探索型/高理解低耐心/完成强迫型），`SyntheticUserSimulator` 确定性模拟，`DefectAnalyzer` 跨画像缺陷分析。

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动基础设施
docker compose up -d

# 启动后端服务
pnpm --filter @linguaflow/content-service start:dev
pnpm --filter @linguaflow/recommendation-service start:dev

# 启动前端
pnpm --filter @linguaflow/web dev

# 种子数据
curl -X POST http://localhost:3001/seed
```

## Runtime SDK

```ts
import { TelemetryBus, SessionTracker } from '@linguaflow/telemetry'
import { ImmersionRuntimeImpl } from '@linguaflow/runtime-core'
import { recommendNext } from '@linguaflow/feature-space'
import { estimateComprehensionV1, computeDifficultyAdjustment } from '@linguaflow/comprehension'

const bus = new TelemetryBus()
const tracker = new SessionTracker(bus)
const runtime = new ImmersionRuntimeImpl(tracker)

tracker.startSession('user_1')

// 用户行为自动流入 runtime
bus.emit({ type: 'Pause', timestamp: Date.now(), sessionId: 's1', contentId: 'c1', position: 30 })
bus.emit({ type: 'Resume', timestamp: Date.now(), sessionId: 's1', contentId: 'c1', position: 30 })

// 读取 runtime 状态
console.log(runtime.immersionScore)       // 0-1
console.log(runtime.cognitiveLoad)        // 0-1
console.log(runtime.flowStateProbability) // 0-1

// 推荐下一个 i+1 内容
const next = recommendNext(userProfile, candidates)

// 推断理解率
const comprehension = estimateComprehensionV1(signals)

// 自适应难度
const adjustment = computeDifficultyAdjustment(comprehension)
```

## 设计原则

| 原则 | 说明 |
|------|------|
| Input-first | 大量低焦虑输入，不强迫输出 |
| Immersion > Engagement | 优化沉浸连续性，不是停留时间 |
| Heuristic-first | 先规则后模型，先校准后升级 |
| Anti-DAU | 推荐系统优化 i+1 匹配，不优化 DAU |
| Protect Immersion | 不做 gamification/streak/排行榜 |
| Runtime > Feature | UI 可以无限重做，Runtime 不成立则一切无意义 |

## Non-Goals

- ❌ 题库化（quiz-ification）
- ❌ 教育化 UI
- ❌ 强制输出
- ❌ 显式语法教学
- ❌ 焦虑机制

## PMF 信号

1. 用户原本只想看 5 分钟 → 沉浸了 1 小时
2. 用户忘记自己在学语言
3. 用户开始主动消费原生内容
4. 用户出现目标语言内心独白（Cognitive Residence）

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS, Zustand, Framer Motion
- **Backend**: NestJS, Fastify, TypeORM, PostgreSQL
- **Runtime**: TypeScript (platform-agnostic), Vitest
- **Infrastructure**: Docker Compose, PostgreSQL 16, Redis 7, Qdrant, MinIO

## License

Private
