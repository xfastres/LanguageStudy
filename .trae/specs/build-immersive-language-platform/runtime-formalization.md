# LinguaFlow OS — Runtime Formalization

从哲学到可计算系统。不再扩写概念，只定义可观测、可计算、可验证的东西。

---

## 1. Observable PMF Signals（可观测 PMF 信号体系）

"用户忘记自己在学语言"是终极指标，但不可直接测量。需要分解为可观测信号链。

### Level 1 Signal：Unintended Long Immersion（非预期长时沉浸）

用户原本打算看 5 分钟，结果停留 45 分钟+。

**可观测指标：**

| 指标 | 定义 | 阈值 |
|------|------|------|
| `session_duration` | 单次连续使用时长 | > 45 min |
| `app_switch_frequency` | 单位时间切出 App 次数 | < 0.5 /hour |
| `pause_pattern_variance` | 暂停节奏方差（低 = 自动模式） | < threshold |
| `task_completion_ratio` | 自然完成内容比例 vs 主动跳出 | > 0.85 |
| `fatigue_signal_absence` | 无快速跳过、无加速播放、无频繁暂停 | 连续 30 min+ 无 fatigue signal |

**判定规则：**

```
Level_1_triggered =
  session_duration > 45min
  AND app_switch_frequency < 0.5/hr
  AND task_completion_ratio > 0.85
  AND fatigue_signal_absence > 30min
```

**含义：** 产品已开始脱离"学习工具"属性。用户进入的是内容消费模式，不是任务完成模式。

**Phase 1 必须达到此信号。达不到则迭代，不前进。**

### Level 2 Signal：Intrinsic Return Motivation（内源性回访动机）

用户主动回来，不是因为 streak / 提醒 / 打卡，而是"我想继续"。

**可观测指标：**

| 指标 | 定义 | 阈值 |
|------|------|------|
| `organic_return_rate` | 无推送触发的回访比例 | > 60% |
| `push_dependency_ratio` | 推送驱动的打开 / 总打开 | < 0.3 |
| `return_latency` | 上次离开到下次主动打开的时间 | < 24hr |
| `session_intent_signal` | 打开后直接进入内容流（非首页/进度页） | > 70% |
| `narrative_continuation_rate` | 回访后继续上次叙事线的比例 | > 50% |

**判定规则：**

```
Level_2_triggered =
  organic_return_rate > 0.6
  AND push_dependency_ratio < 0.3
  AND session_intent_signal > 0.7
```

**含义：** 产品已产生内源性吸引力。用户不是"该学习了"，而是"想回到那个世界"。

**Phase 2 必须达到此信号。**

### Level 3 Signal：Identity Transition（身份迁移开始）

用户开始出现目标语言认知迁移。

**可观测指标：**

| 指标 | 定义 | 阈值 |
|------|------|------|
| `native_content_seek_rate` | 主动搜索/打开原生内容的比例 | > 20% |
| `subtitle_off_preference` | 主动关闭字幕的比例 | > 30% |
| `speed_up_preference` | 主动加速播放的比例 | > 15% |
| `output_emergence_signal` | 无引导情况下主动尝试表达 | 出现即记录 |
| `inner_monologue_signal` | 自我报告脑内出现目标语言（问卷/访谈） | > 10% 用户 |

**判定规则：**

```
Level_3_triggered =
  native_content_seek_rate > 0.2
  AND (subtitle_off_preference > 0.3 OR speed_up_preference > 0.15)
  AND (output_emergence_signal OR inner_monologue_signal)
```

**含义：** Identity Transition 已开始。用户不再"学语言"，而是"生活在语言中"。这是 Cognitive Residence 的起点。

**Phase 3-4 追求此信号。**

### PMF 信号链

```
Level 1（Phase 1 验证）
  产品脱离"学习工具"属性
  ↓
Level 2（Phase 2 验证）
  产品产生内源性吸引力
  ↓
Level 3（Phase 3-4 追求）
  身份迁移开始 = Cognitive Residence
```

每级信号必须在前一级稳定后才追求。跳级 = 自欺。

---

## 2. Comprehension Estimation Engine（理解率推断引擎）

这是整个系统真正的核心。不是 World，不是 Companion，不是 AI Chat。

今天几乎所有 AI 系统都知道用户"点了什么"、"停留多久"、"喜欢什么"。

但几乎没人知道：**用户到底理解了多少。**

### 2.1 问题定义

给定用户 u 在时间 t 消费内容 c，估计：

```
comprehension(u, c, t) ∈ [0, 1]
```

其中 1.0 = 完全理解，0.0 = 完全不理解。

目标区间：comprehension ∈ [0.8, 0.9] 为 i+1 甜蜜区。

### 2.2 Signal Vector（信号向量）

理解率推断基于以下行为信号向量：

```ts
interface ComprehensionSignalVector {
  pauseFrequency: number       // 暂停频率（次/分钟）
  replayFrequency: number      // 回放频率（次/分钟）
  subtitleToggleCount: number  // 字幕开关次数
  subtitleOnRatio: number      // 字幕开启时间占比
  playbackSpeed: number        // 播放速度（0.5x - 2.0x）
  completionRate: number       // 内容完成率（0-1）
  skipSegments: number[]       // 跳过片段的时间戳
  dwellTimePerSegment: number  // 每段停留时间方差
  abandonmentPoint: number | null  // 放弃点（null = 完成）
  transitionLatency: number    // 内容切换延迟（ms）
}
```

### 2.3 Heuristic Model v1（规则优先，不做模型）

第一版不需要 ML。用可解释的启发式规则：

```ts
function estimateComprehensionV1(s: ComprehensionSignalVector): number {
  let score = 0.5

  // Completion signal (权重最高)
  if (s.completionRate > 0.9) score += 0.2
  else if (s.completionRate > 0.7) score += 0.1
  else if (s.completionRate < 0.3) score -= 0.2

  // Pause pattern (低暂停 = 流畅理解)
  if (s.pauseFrequency < 0.3) score += 0.1
  else if (s.pauseFrequency > 1.5) score -= 0.15

  // Replay pattern (少量回放 = 主动确认; 大量回放 = 理解困难)
  if (s.replayFrequency < 0.2) score += 0.05
  else if (s.replayFrequency > 0.8) score -= 0.15

  // Subtitle dependency (字幕依赖度 = 理解力不足信号)
  if (s.subtitleOnRatio < 0.3) score += 0.1
  else if (s.subtitleOnRatio > 0.8) score -= 0.1

  // Speed preference (主动加速 = 理解有余力)
  if (s.playbackSpeed > 1.2) score += 0.05
  else if (s.playbackSpeed < 0.8) score -= 0.1

  // Abandonment (中途放弃 = 理解率极低)
  if (s.abandonmentPoint !== null) score -= 0.2

  return clamp(score, 0, 1)
}
```

### 2.4 Signal Weight Calibration（信号权重校准）

Heuristic 权重不是拍脑袋，需要校准：

**校准方法：**

1. **主动反馈校准**：每 5-10 条内容后，弹出非侵入式反馈："这段内容你大概理解了多少？"（0-100% 滑块）
2. **A/B 校准**：对同一理解率推断结果，调整权重，观察用户后续行为是否与推断一致
3. **回放行为校准**：回放后暂停减少 → 回放是确认（理解率不低）；回放后仍暂停 → 回放是挣扎（理解率低）

**校准目标：**

```
|heuristic_estimate - user_self_report| < 0.15
```

在 85% 的样本上达到此精度，v1 即可上线。

### 2.5 从 Heuristic 到 Model 的升级路径

```
v1: Pure Heuristic（规则 + 权重）
  ↓ 收集 1000+ 标注样本
v2: Heuristic + Logistic Regression（规则特征 + 线性模型）
  ↓ 收集 10000+ 样本
v3: Gradient Boosted Trees（多信号融合 + 非线性）
  ↓ 收集 100000+ 样本
v4: Neural Comprehension Model（序列建模 + 注意力）
```

**关键约束：每一版必须可解释。** 理解率推断是系统核心，黑盒 = 不可调试 = 不可信任。

### 2.6 Comprehension Estimation = Human Understanding Infrastructure

理解率推断不仅是语言习得的核心。它实际上定义了一种新的数据层：

```
传统 AI 数据层：
  Click → Dwell → Like → Share → Purchase

LinguaFlow 数据层：
  Input → Behavior Signals → Comprehension → Adaptation
```

"用户理解了多少"这个信号，未来可用于：

- AI Tutor：知道学生理解了多少，才能教下一步
- AI Video：知道观众理解了多少，才能调整叙事节奏
- AI Browser：知道读者理解了多少，才能调整内容呈现
- AI Education：知道学习者理解了多少，才能个性化路径
- AI OS：知道用户理解了多少，才能调整交互复杂度
- AR Glasses：知道用户理解了多少，才能决定何时提供辅助

这是 **Human Understanding Infrastructure**。

LinguaFlow 是第一个真正需要这个基础设施的产品，因此也是第一个有机会构建它的产品。

---

## 3. i+1 Feature Space（i+1 特征空间）

i+1 不是 level。它是一个动态多维空间中的区域。

### 3.1 Feature Space 定义

```ts
interface ContentFeatureVector {
  speechSpeed: number           // 语速 (0-1, 0=极慢 1=极快)
  lexicalNovelty: number        // 词汇新颖度 (0-1, 相对用户已知词汇)
  grammarDensity: number        // 语法密度 (0-1, 复杂结构占比)
  subtitleDependency: number    // 字幕依赖度 (0-1, 需要字幕才能理解的程度)
  visualContextStrength: number // 视觉上下文强度 (0-1, 画面可猜测程度)
  emotionalIntensity: number    // 情绪强度 (0-1, 情绪编码程度)
  narrativeDependency: number   // 叙事依赖度 (0-1, 需要前文理解的程度)
  sceneComplexity: number       // 场景复杂度 (0-1, 信息密度)
  accentDistance: number        // 口音距离 (0-1, 相对标准发音的偏离)
  abstractionLevel: number     // 抽象程度 (0-1, 具象→抽象)
}
```

```ts
interface UserProfileVector {
  speedTolerance: number        // 语速耐受度
  vocabularyBreadth: number     // 词汇广度
  grammarFamiliarity: number    // 语法熟悉度
  subtitleReliance: number      // 字幕依赖度
  contextInference: number      // 语境推断力
  emotionalReceptivity: number  // 情绪接收度
  narrativeFollowing: number    // 叙事跟随力
  sceneProcessing: number       // 场景处理力
  accentAdaptability: number    // 口音适应力
  abstractionCapacity: number   // 抽象理解力
}
```

### 3.2 i+1 Zone 定义

i+1 不是 level system 中的"下一级"。它是特征空间中的一个区域：

```
i+1_zone(u) = {
  c ∈ ContentSpace |
  0.8 ≤ comprehension(u, c) ≤ 0.9
  AND cognitive_load(u, c) < fatigue_threshold(u)
  AND novelty(c, known(u)) ∈ [0.1, 0.2]
}
```

即：用户能理解 80-90%、认知负荷未达疲劳阈值、新信息占比 10-20% 的内容集合。

### 3.3 Distance Metric（距离度量）

用户画像向量 u 与内容特征向量 c 之间的匹配距离：

```
d(u, c) = Σᵢ wᵢ · |uᵢ - target(cᵢ)|

其中：
- wᵢ 是维度权重（由校准确定）
- target(cᵢ) 是内容 c 在维度 i 上的目标值
- uᵢ 是用户在维度 i 上的当前能力值
```

**i+1 匹配 = d(u, c) 最小且 comprehension ∈ [0.8, 0.9]**

### 3.4 Adaptive Traversal（自适应遍历）

系统不是静态匹配，而是持续遍历特征空间：

```
loop:
  observe: comprehension(u, c_current)
  if comprehension < 0.8:
    // 降难：向低维度方向移动
    adjust: reduce speechSpeed, lexicalNovelty, grammarDensity
    adjust: increase visualContextStrength, emotionalIntensity
  elif comprehension > 0.9:
    // 升难：向高维度方向移动
    adjust: increase speechSpeed, lexicalNovelty
    adjust: decrease visualContextStrength, subtitleDependency
  else:
    // 甜蜜区：维持方向，微调
    maintain current trajectory
    micro-adjust based on fatigue signals
```

### 3.5 维度间交互

维度不是独立的。关键交互：

- `visualContextStrength` ↑ → 可容忍 `lexicalNovelty` ↑（画面补偿词汇难度）
- `emotionalIntensity` ↑ → 可容忍 `abstractionLevel` ↑（情绪编码补偿抽象）
- `narrativeDependency` ↑ → 可容忍 `sceneComplexity` ↑（叙事惯性补偿复杂度）
- `subtitleDependency` ↓ → 需要 `visualContextStrength` ↑ 或 `speechSpeed` ↓

这些交互在 v1 用规则表达，v2+ 用模型学习。

---

## 4. Content Cold Start Strategy（内容冷启动策略）

没有内容就没有输入飞轮。这是现实层面最大的生死问题。

### 4.1 Content Cold Start 问题

| 来源 | 问题 |
|------|------|
| AI 生成内容 | 不够真实、缺乏情感编码、语感不自然 |
| 原生内容 | 难度太高、分级成本极高、版权问题 |
| 人工制作 | 成本极高、产能有限、难以规模化 |

### 4.2 最优早期内容形态

**不是长视频、不是 AI 世界，而是：强视觉 + 高频结构 + 微剧情**

最优内容特征矩阵：

| 特征 | 为什么 | 代表 |
|------|--------|------|
| 强视觉 | 画面补偿语言难度，降低 lexicalNovelty 门槛 | Peppa Pig, Tom & Jerry |
| 高频结构 | 重复句式降低 grammarDensity，加速 pattern recognition | Doraemon, Slice of Life |
| 微剧情 | 短叙事钩子维持 narrativeDependency，不需要长时记忆 | TikTok 微场景 |
| 高情绪表达 | 情绪编码记忆，提高 emotionalIntensity | 情景剧, Reaction Video |
| 高上下文可猜测性 | visualContextStrength 高，即使不理解语言也能跟随 | 日常 Vlog, 烹饪视频 |
| Level 0-2 | 早期用户 comprehension ∈ [0.8, 0.9] 的目标区间 | 分级适配 |

### 4.3 内容获取策略（按优先级）

**Tier 1：Curated Existing Content（0-1 个月）**

- 筛选已有的公开/授权 Level 0-2 内容
- 目标：50-100 条
- 来源：YouTube Creative Commons、公开教育视频、自制短视频
- 分级方法：人工标注 + AI 辅助（ASR + 词汇频率分析 + 语速检测）

**Tier 2：AI-Assisted Content Creation（1-3 个月）**

- AI 生成脚本 + 人工审核
- AI 生成 TTS 音频（多口音）
- AI 生成配图/动画
- 关键：AI 生成的内容必须通过"情感真实性"审核

**Tier 3：Community Content Pipeline（3-6 个月）**

- 用户上传内容 + 自动分级
- 内容创作者激励
- AI 辅助分级与适配

**Tier 4：AI-Native Content（6-12 个月）**

- AI 自动检测内容缺口
- AI 自动生成 i+1 内容填补缺口
- 闭环：信号 → 缺口检测 → 生成 → 验证 → 入库

### 4.4 内容分级成本优化

分级是最大瓶颈。策略：

```
v1: 人工标注（50-100 条，可承受）
  ↓
v2: 人工 + AI 辅助（AI 预标注 + 人工校验，10x 效率）
  ↓
v3: AI 自动分级 + 置信度标注（高置信度自动入库，低置信度人工校验）
  ↓
v4: 完全自动化（基于用户理解率反馈自动校准分级）
```

关键洞察：**用户行为本身就是最好的分级校准器。** 如果 80% 的 Level 1 用户对某内容的理解率 > 0.9，那这个内容可能应该是 Level 0。

### 4.5 Content Flywheel

```
内容入库
→ 用户消费
→ 采集理解率信号
→ 校准内容分级
→ 更精准的 i+1 推荐
→ 更长的沉浸
→ 更多信号
→ 更好的分级
→ 更好的推荐
→ 吸引更多内容创作者
→ 更多内容
```

冷启动靠人工 + AI 辅助，飞轮转起来后靠用户行为自动校准。

---

## 5. Computable Immersion Runtime（可计算沉浸运行时）

从"哲学 Runtime"到"可计算 Runtime"。

### 5.1 immersionScore 数学定义

```ts
immersionScore(t) = weighted(
  sessionContinuity(t),     // 会话连续性
  pauseVariance(t),         // 暂停方差（低方差 = 自动模式）
  replayPattern(t),         // 回放模式（确认型 vs 挣扎型）
  subtitleStability(t),     // 字幕状态稳定性（不频繁切换）
  switchingLatency(t),      // 切换延迟（高 = 沉浸深）
  completionMomentum(t)     // 完成动量（连续完成 = 沉浸流）
)
```

各分量定义：

**sessionContinuity(t)**：连续无中断输入时长

```
sessionContinuity(t) = 1 - exp(-λ · continuousInputDuration(t))

其中 λ 是衰减系数，由校准确定
```

**pauseVariance(t)**：暂停节奏方差

```
pauseVariance(t) = var(pause_intervals in window [t-Δ, t])

低方差 = 用户进入自动节奏 = 沉浸
高方差 = 用户在挣扎或分心 = 非沉浸
```

**replayPattern(t)**：回放模式分类

```
confirmation_replay: 回放后暂停减少 → score += 0.1
struggle_replay: 回放后暂停增加 → score -= 0.15
```

**switchingLatency(t)**：内容切换延迟

```
switchingLatency(t) = time_from_content_end_to_user_action

高延迟 = 用户沉浸在上一内容中 = 深度沉浸
低延迟 = 用户急于切换 = 浅层消费或挣扎
```

**completionMomentum(t)**：完成动量

```
completionMomentum(t) = running_average(completion_rate, window=5)

连续完成 = 沉浸流
频繁跳出 = 沉浸断裂
```

### 5.2 immersionScore 合成公式

```
immersionScore(t) = clamp(
  0.25 · sessionContinuity(t)
  + 0.20 · (1 - normalize(pauseVariance(t)))
  + 0.15 · replayPatternScore(t)
  + 0.15 · subtitleStability(t)
  + 0.10 · normalize(switchingLatency(t))
  + 0.15 · completionMomentum(t),
  0, 1
)
```

权重由校准确定。初始权重基于认知科学文献和工程直觉，后续通过 A/B 实验优化。

### 5.3 cognitiveLoad 量化

```ts
cognitiveLoad(t) = weighted(
  pauseFrequency(t),        // 暂停频率（高 = 高负荷）
  replayFrequency(t),       // 回放频率（高 = 高负荷）
  subtitleDependency(t),    // 字幕依赖（高 = 高负荷）
  speedReduction(t),        // 减速行为（有 = 高负荷）
  skipFrequency(t),         // 跳过频率（高 = 负荷过高或无聊）
  abandonmentProximity(t)   // 接近放弃点（近 = 高负荷）
)
```

```
cognitiveLoad(t) = clamp(
  0.25 · normalize(pauseFrequency(t))
  + 0.20 · normalize(replayFrequency(t))
  + 0.20 · subtitleDependency(t)
  + 0.15 · speedReductionScore(t)
  + 0.10 · normalize(skipFrequency(t))
  + 0.10 · abandonmentProximity(t),
  0, 1
)
```

### 5.4 Cognitive Switching Cost（认知切换成本）

这是 Runtime 是否真正 AI-native 的关键指标。

**定义：** 用户从当前认知状态切换到另一个认知状态所需的认知资源量。

**可观测代理指标：**

```ts
interface SwitchingCostEstimate {
  contentTransitionCost: number    // 内容间切换成本
  modeTransitionCost: number       // 模式切换成本（如播放→设置）
  languageContextCost: number       // 语言上下文切换成本
  emotionalContextCost: number      // 情绪上下文切换成本
}

function estimateSwitchingCost(from: State, to: State): number {
  return weighted(
    topicDistance(from.topic, to.topic),       // 主题距离
    difficultyJump(from.level, to.level),      // 难度跳跃
    emotionalShift(from.emotion, to.emotion),  // 情绪转换
    narrativeBreak(from.narrative, to.narrative) // 叙事断裂
  )
}
```

**量化方法：**

1. **内容过渡后恢复时间**：切换到新内容后，用户暂停频率恢复到稳态的时间
   - 快恢复（< 30s）= 低切换成本
   - 慢恢复（> 2min）= 高切换成本

2. **过渡后首段完成率**：切换后第一个内容段的完成率
   - 高完成率 = 低切换成本（用户顺利进入新内容）
   - 低完成率 = 高切换成本（用户还在切换中）

3. **过渡后首段暂停频率**：切换后第一个内容段的暂停频率
   - 低暂停 = 低切换成本
   - 高暂停 = 高切换成本

### 5.5 flowStateProbability 估计

```
flowStateProbability(t) = P(flow | signals(t))

其中 signals(t) = {
  immersionScore(t) > 0.7,
  cognitiveLoad(t) < 0.4,
  pauseVariance(t) < low_threshold,
  sessionContinuity(t) > 0.6,
  no_explicit_interruption(t)
}
```

v1 用规则：

```ts
function estimateFlowState(t: number): number {
  const signals = {
    highImmersion: immersionScore(t) > 0.7,
    lowLoad: cognitiveLoad(t) < 0.4,
    stablePace: pauseVariance(t) < LOW_THRESHOLD,
    longSession: sessionContinuity(t) > 0.6,
    noInterrupt: !hasRecentInterruption(t)
  }

  const matchCount = Object.values(signals).filter(Boolean).length
  return matchCount / 5
}
```

### 5.6 interruptionBudget 计算

```
interruptionBudget(t) = f(immersionScore(t), flowStateProbability(t))

if flowStateProbability > 0.8:
  interruptionBudget = 0  // Flow 中，绝对不打断
elif immersionScore > 0.6:
  interruptionBudget = 0.2  // 深度沉浸，极少打断
elif immersionScore > 0.3:
  interruptionBudget = 0.5  // 中度沉浸，允许低优先级中断
else:
  interruptionBudget = 1.0  // 浅层浏览，正常中断
```

### 5.7 Immersion Runtime API 完整定义

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

class ImmersionRuntimeImpl implements ImmersionRuntime {
  get immersionScore(): number {
    return computeImmersionScore(now())
  }

  get cognitiveLoad(): number {
    return computeCognitiveLoad(now())
  }

  get interruptionBudget(): number {
    return computeInterruptionBudget(this.immersionScore, this.flowStateProbability)
  }

  get flowStateProbability(): number {
    return estimateFlowState(now())
  }

  canInterrupt(): boolean {
    return this.interruptionBudget > 0.3
      && this.flowStateProbability < 0.8
  }

  scheduleTransition(): void {
    const cost = this.estimateSwitchingCost()
    if (cost > HIGH_SWITCHING_COST) {
      deferTransitionUntil(lowestCostWindow())
    } else {
      executeTransition()
    }
  }

  estimateSwitchingCost(): number {
    return computeSwitchingCost(currentState(), pendingTransition())
  }
}
```

---

## 6. Strategic Positioning（战略定位分析）

### 6.1 核心问题：你到底是不是"语言产品"

这不是修辞问题。这决定一切。

| 维度 | Language Product | Cognitive Residence Platform |
|------|-----------------|------------------------------|
| 用户心智 | "我在学语言" | "我在进入另一个世界" |
| 竞争对手 | Duolingo, Babbel | TikTok, Netflix, Character AI |
| 优化目标 | 学习效率 | 沉浸连续性 |
| 核心指标 | 完课率、词汇量 | 有效输入时长、沉浸深度 |
| 产品形态 | 课程 + 练习 | 内容流 + 世界 |
| 商业模式 | 订阅（教育定价） | 订阅 + 内容（娱乐定价） |
| 护城河 | 内容库 | 理解率数据 + 沉浸数据 |
| 团队结构 | 教育 + AI | 内容 + AI + 认知科学 |
| 融资叙事 | EdTech | AI-native Cognitive Platform |

### 6.2 定位选择

**LinguaFlow 的本质定位是：Cognitive Residence Platform**

理由：

1. **Input-first Immersion 不是教育范式**：用户不是在"学"，而是在"沉浸"
2. **竞争对手已经是 TikTok/Netflix**：用户不会把 LinguaFlow 和 Duolingo 放在同一个时间槽
3. **理解率推断是平台级基础设施**：不限于语言，可扩展到任何认知内容
4. **Cognitive Residence 是新品类**：没有人在做"人类长期认知沉浸系统"

### 6.3 定位对产品的影响

**如果定位为 Language Product：**
- 会自然退化回课程 + 练习
- 会被 Duolingo 的 gamification 碾压
- 商业化天花板是 EdTech 市场
- 团队会被"学习效果"指标绑架

**如果定位为 Cognitive Residence Platform：**
- 产品形态必须像 TikTok/Netflix，不像课堂
- 竞争维度是沉浸时间，不是学习效率
- 商业化天花板是娱乐 + 认知市场
- 团队围绕"沉浸体验"组织

### 6.4 定位对融资叙事的影响

**EdTech 叙事：**
- "AI 版 Duolingo"
- TAM = 语言学习市场（~$60B）
- 投资人会问：为什么不用 Duolingo？

**Cognitive Residence 叙事：**
- "AI-native 人类认知沉浸系统"
- TAM = 注意力市场 + 认知市场（~$数万亿）
- 投资人会问：这到底是什么品类？（好问题，说明是新品类）

### 6.5 定位对技术路线的影响

Language Product → 优先做课程系统、练习系统、评估系统
Cognitive Residence Platform → 优先做理解率推断、沉浸运行时、自适应推荐

当前 Spec 的技术路线已经对齐 Cognitive Residence Platform。这是正确的。

### 6.6 阶段性定位策略

```
Phase 1-2: 对外说"语言习得平台"（降低理解门槛）
           对内做"Cognitive Residence Platform"（产品形态对齐）

Phase 3-4: 对外开始说"AI-native 沉浸系统"
           产品形态已经脱离 EdTech

Phase 5+:  对外说"AI-native Cognitive Platform"
           理解率推断开始扩展到语言之外
```

---

## 7. Degeneration Map（退化地图）

比"做什么"更重要的是"什么绝对不能做"。

退化不是突然发生的，而是渐进的。每条退化路径都有早期信号。

### 7.1 退化路径 A：Input-first → AI Chat App

```
Input-first Immersion
  ↓ 加入 AI Chat "增强体验"
  ↓ 用户开始高频对话
  ↓ 对话成为主要交互模式
  ↓ 输入时间被对话挤压
  ↓ 用户开始有"输出焦虑"
  ↓ Flow State 频繁断裂
  ↓ 退化成 AI 口语练习 App
```

**早期信号：**
- 用户对话时长占比 > 30%
- 输入流消费时长下降
- 用户开始出现"不知道说什么"的焦虑行为（长停顿、退出对话）
- Flow State 进入频率下降

**预防机制：**
- AI Chat 必须是 Input-first Companion，不是 Conversation-first Assistant
- Companion 主动说、用户被动听的比例 > 7:3
- 对话不作为核心 KPI
- 对话时长占比监控，超过阈值触发 Guardian AI 审查

### 7.2 退化路径 B：Immersion → Gamification Trap

```
Low-anxiety Immersion
  ↓ 加入 streak 机制"提高留存"
  ↓ 加入排行榜"增加竞争"
  ↓ 加入每日任务"提高 DAU"
  ↓ 用户动机从 intrinsic → extrinsic
  ↓ 不 streak 的日子产生 guilt
  ↓ guilt 变成焦虑
  ↓ 焦虑破坏沉浸
  ↓ 长期用户流失
  ↓ 只剩下短期 gamification 用户
  ↓ 退化成 Duolingo clone
```

**早期信号：**
- Streak 用户与非 Streak 用户的沉浸时长差异显著（Streak 用户更短）
- 用户打开后先看 streak 状态而非直接进入内容
- "保持 streak"成为用户自述的主要使用原因
- DAU 上升但有效输入时长下降

**预防机制：**
- 禁止 streak 机制（Non-Goals 已定义）
- 禁止排行榜
- 禁止每日任务
- 唯一指标是有效输入时长，不是 DAU
- Guardian AI 审查所有 gamification 提案

### 7.3 退化路径 C：World → AI RPG

```
World Simulation
  ↓ 加入 AI NPC 互动
  ↓ 用户开始"玩角色"
  ↓ RPG 元素增加（任务、道具、升级）
  ↓ 语言输入变成"游戏奖励"
  ↓ 用户注意力从语言输入转向游戏机制
  ↓ 输入质量下降
  ↓ 退化成 AI RPG / Character AI clone
```

**早期信号：**
- 用户在 World 中的语言输入消费时长占比 < 50%
- 用户互动以非语言行为为主（点击、拖拽、选择）
- World 中的语言复杂度不再随用户 State 适配
- 用户自述"在玩游戏"而非"在体验世界"

**预防机制：**
- World 内所有交互必须以语言输入为核心
- World 内非语言交互占比 < 30%
- World 内语言复杂度必须随用户 State 动态调整
- Input-first 原则适用于 World 内所有设计

### 7.4 退化路径 D：Comprehension → Assessment Trap

```
Comprehension Inference
  ↓ "需要验证推断是否准确"
  ↓ 加入理解力测试
  ↓ 加入选择题"确认理解"
  ↓ 测试成为主要交互
  ↓ 用户开始"备考"
  ↓ 焦虑升高
  ↓ 沉浸断裂
  ↓ 退化成题库 App
```

**早期信号：**
- 理解力测试出现频率 > 1次/5条内容
- 用户在测试环节停留时间占比 > 15%
- 测试正确率成为推荐权重
- 用户自述"在做题"

**预防机制：**
- 理解率推断必须基于被动行为信号，不基于主动测试
- 主动反馈（"你理解了多少？"）频率 < 1次/10条内容
- 任何测试必须伪装成内容消费（Runtime Constitution Rule 4）
- 测试结果不作为推荐权重

### 7.5 退化路径 E：Recommendation → DAU Optimization

```
i+1 Recommendation
  ↓ "需要提高留存"
  ↓ 加入 CTR 作为推荐特征
  ↓ 加入停留时长作为优化目标
  ↓ 推荐开始偏向刺激性内容
  ↓ i+1 匹配度下降
  ↓ 用户消费的内容不再适合习得
  ↓ 有效输入时长下降
  ↓ 退化成 TikTok clone（无习得价值）
```

**早期信号：**
- 推荐内容的 i+1 匹配度均值下降
- 高 CTR 内容的推荐权重上升
- 有效输入时长与总停留时长的比值下降
- 用户消费后的理解率推断值下降

**预防机制：**
- DAU 信号隔离（推荐系统防 DAU 污染架构）
- 推荐审计：定期检查推荐结果是否偏离 i+1 目标
- 唯一优化目标 = 有效可理解输入时长
- Guardian AI 审查推荐策略变更

### 7.6 退化路径 F：Companion → Dependency Trap

```
Persistent Companion
  ↓ Companion 越来越"懂"用户
  ↓ 用户对 Companion 产生情感依赖
  ↓ Companion 成为用户唯一使用理由
  ↓ 用户不再消费内容流
  ↓ 只和 Companion 聊天
  ↓ 输入飞轮断裂
  ↓ 退化成 AI Companion App
```

**早期信号：**
- Companion 互动时长占比 > 50%
- 内容流消费时长下降
- 用户打开后直接进入 Companion 而非内容流
- Companion 对话中目标语言输入占比下降

**预防机制：**
- Companion 必须是 Input-first（说给用户听，不是和用户聊）
- Companion 互动时长占比监控，超过阈值触发审查
- Companion 的语言复杂度必须随用户 State 适配
- Companion 不能成为独立使用理由，必须嵌入 World / 内容流

### 7.7 Degeneration Map 总结

```
                    ┌─→ AI Chat App (路径 A)
                    │
Input-first ────────┼─→ Gamification Trap (路径 B)
Immersion          │
                    ├─→ AI RPG (路径 C)
                    │
                    ├─→ Assessment Trap (路径 D)
                    │
                    ├─→ DAU Optimization (路径 E)
                    │
                    └─→ Companion Dependency (路径 F)
```

**每条退化路径的共同特征：**

1. 都是从 intrinsic motivation → extrinsic motivation 的转换
2. 都是从 immersion → task 的转换
3. 都是从 input → output/interaction 的转换
4. 都有早期信号，可以被检测
5. 都有预防机制，可以被阻止

**Degeneration Map 的使用方式：**

- 每个新功能上线前，对照退化地图检查：这个功能是否会触发任何退化路径？
- 每周监控退化信号指标
- Guardian AI 基于 Degeneration Map 自动审查

---

## 从 Formalization 到 Engineering

本文档定义了 7 个核心问题的可计算答案。下一步是 Engineering：

1. **Phase 1 Engineering**：实现 Heuristic Comprehension Engine + Signal Collection + Adaptive Difficulty + Content Feed
2. **Phase 1 Validation**：验证 Level 1 PMF Signal（用户能否忘记自己在学语言，连续沉浸 45-90 分钟）
3. **Phase 1 Calibration**：基于真实用户行为校准所有权重和阈值

不再扩写概念。只做可计算、可观测、可验证的事。
