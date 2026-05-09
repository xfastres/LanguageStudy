# Checklist

## Layer A: Signal Layer 验证

- [ ] TikTok-like 内容流正常（全屏视频卡片、上下滑动、无限滚动）
- [ ] 内容分级 Level 0-2 逻辑正确
- [ ] 内容管理后台可上传、标注 Level、发布视频
- [ ] 英语种子内容至少 50 条（Level 0-2）
- [ ] 视频播放器核心功能正常（播放/暂停/进度/全屏）
- [ ] 单语字幕显示正常
- [ ] 语速调节控件可用
- [ ] 行为信号采集正常（pause / replay / skip / completion / subtitle usage / playback speed / dwell time / immersion sequences）
- [ ] 简单画像正常（兴趣标签 + 自评理解力）
- [ ] 输入时长记录准确（仅播放时计时，暂停不计时）
- [ ] 有效输入时长统计看板正常
- [ ] **Layer A 验证门：用户能否连续沉浸 45-90 分钟**

## Layer B: Comprehension Inference Engine 验证

- [ ] 理解率推断模型正常（基于行为信号推断理解率）
- [ ] 理解率推断校准正常（与用户主动反馈对比优化）
- [ ] 理解率作为推荐引擎核心输入正常
- [ ] i+1 难度调节算法正确（理解率 < 80% → 降难，> 90% → 升难）
- [ ] 内容推荐 API 正常（基于画像 + 理解率 + i+1 匹配）
- [ ] State Machine State 0-2 定义与迁移正确
- [ ] **Layer B 验证门：系统能否准确推断理解率并动态调节难度？用户沉浸时间是否增长？**

## Layer C: Adaptive Recommendation Runtime 验证

- [ ] Acquisition Memory Graph 基础版正常（词汇节点 + 出现关系边）
- [ ] 词汇暴露追踪正常
- [ ] 图谱驱动推荐基础版正常
- [ ] 推荐目标函数正确（优化 Immersion Continuity，不是 CTR）
- [ ] 内容预加载与无缝过渡正常
- [ ] 沉浸连续性追踪正常
- [ ] Flow State 检测正常
- [ ] 静默队列正常
- [ ] **Layer C 验证门：推荐系统是否优化了沉浸连续性？用户沉浸时长是否持续增长？**

## Layer D: Emotional Runtime 验证

- [ ] 焦虑水平与专注度估计正常
- [ ] 情绪响应策略正常（焦虑→降难、专注→延长沉浸）
- [ ] Emotional Memory Graph 数据模型正常
- [ ] 情绪编码正常
- [ ] 情绪驱动推荐正常
- [ ] Narrative Graph 正常
- [ ] Narrative Continuity Score 正常
- [ ] 叙事驱动推荐正常
- [ ] **Layer D 验证门：情绪系统是否降低了焦虑？叙事连续性是否延长了沉浸时间？**

## Layer E: World & Companion 验证

- [ ] World 数据模型正常
- [ ] World 渲染引擎基础版正常
- [ ] World 内语言输入自然出现机制正常
- [ ] World 与 State Machine 难度联动正常
- [ ] AI Companion 基础对话正常（Input-first，不是 Conversation-first）
- [ ] Companion 记忆正常
- [ ] Companion 与 World 集成正常
- [ ] Identity States 正确（Observer → Visitor → Resident → Native）
- [ ] 身份迁移信号追踪正常
- [ ] **Layer E 验证门：World 是否让用户忘记自己在学语言？Companion 是否增强了输入耐受度？**

## Non-Goals 守卫（贯穿所有 Layer）

- [ ] 系统无题库化功能
- [ ] 系统无教育化 UI
- [ ] 系统无强制输出
- [ ] 系统无显式语法教学主导
- [ ] 系统无焦虑机制

## 产品陷阱守卫（贯穿所有 Layer）

- [ ] 未过早做 AI Chat（AI Chat 会打断输入、诱导输出、破坏沉浸）
- [ ] 未做"学习路径"（无课程树、无 roadmap、无 checkpoint、无升级考试）
- [ ] 未做过强 gamification（无 Streak、无排行榜，避免 intrinsic → extrinsic 转化）

## 低焦虑设计（贯穿所有 Layer）

- [ ] 系统无红色错误提示
- [ ] 系统无高频纠错机制
- [ ] 反馈均为鼓励式、渐进式
- [ ] UI 无传统 LMS 风格
- [ ] 界面呈现极简、沉浸、内容优先风格

## PMF 信号（贯穿所有 Layer）

- [ ] **核心信号 1**：用户是否原本只想看 5 分钟 → 最后沉浸了 1 小时
- [ ] **核心信号 2**：用户是否忘记自己在学语言
- [ ] **核心信号 3**：用户是否开始主动打开原生内容
- [ ] **核心信号 4**：用户是否开始在脑中出现目标语言内心独白

## Core Hierarchy 验证（贯穿所有 Layer）

- [ ] Runtime > Feature
- [ ] State > Level
- [ ] Input > Practice
- [ ] Immersion > Engagement
- [ ] Acquisition > Education
- [ ] World > Content
- [ ] Identity > Skill
- [ ] Narrative > Interest
- [ ] Emotion > Repetition

## 竞争定位验证

- [ ] 产品体验接近 TikTok/Netflix/Character AI，而非 Duolingo/Babbel
- [ ] 争夺的是认知沉浸时间，不是学习时间
- [ ] Immersion Runtime 数据积累正常（Flow 进入条件、认知切换阈值、中断恢复曲线、沉浸轨迹、情绪漂移、输入耐受窗口）

## 后续扩展验证（Layer E 通过后）

- [ ] World Simulation Layer 完整版正常
- [ ] Persistent Companion System 完整版正常
- [ ] Ambient Immersion System 正常
- [ ] AI Agent System 正常
- [ ] Content Pipeline 完整版正常
- [ ] 护栏与防退化系统正常
- [ ] 习得系统与可视化正常
- [ ] 社区与输出正常
- [ ] 多语言扩展正常
