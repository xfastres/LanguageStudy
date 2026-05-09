# Tasks

- [ ] Task 1: 项目初始化与基础架构搭建
  - [ ] SubTask 1.1: 初始化前端项目（React + TypeScript + Vite），配置路由（React Router）、状态管理（Zustand）、UI框架（Tailwind CSS）、媒体播放库（video.js / howler.js）
  - [ ] SubTask 1.2: 初始化后端主服务（NestJS + TypeScript），配置模块结构（Users/Content/Recommendation/Progress/Community/Achievement），集成PostgreSQL（TypeORM）和Redis
  - [ ] SubTask 1.3: 初始化AI Pipeline服务（Python FastAPI），配置项目结构（pipeline/comprehension/companion），集成Whisper、OpenAI API、向量数据库（ChromaDB）
  - [ ] SubTask 1.4: 设计核心数据模型：User、UserAcquisitionProfile、InputContent、ContentFeatures、Progress、Achievement、CommunityPost、CommunityGroup
  - [ ] SubTask 1.5: 配置开发环境（ESLint、Prettier、docker-compose for PostgreSQL+Redis、concurrently前后端同启脚本）

- [ ] Task 2: 用户注册登录与初始评估系统
  - [ ] SubTask 2.1: 后端实现用户注册API（邮箱+密码，bcrypt加密，JWT签发），注册时初始化UserAcquisitionProfile
  - [ ] SubTask 2.2: 后端实现用户登录API（邮箱+密码验证，JWT签发），Google OAuth2.0登录
  - [ ] SubTask 2.3: 后端实现JWT认证守卫（NestJS Guard），保护需登录的路由
  - [ ] SubTask 2.4: 前端实现注册页面（表单校验、错误提示、自动登录跳转至初始评估）
  - [ ] SubTask 2.5: 前端实现登录页面（表单校验、JWT存储、跳转输入流首页）
  - [ ] SubTask 2.6: 前端实现认证状态管理（Zustand store，自动token刷新，未登录重定向）
  - [ ] SubTask 2.7: 前端实现初始评估流程页：目标语言与母语选择→兴趣偏好设置→沉浸式水平评估（播放不同难度内容，用户自评听懂程度）→确定初始输入区间
  - [ ] SubTask 2.8: 后端实现初始评估API：接收评估结果，计算初始UserAcquisitionProfile，确定初始输入区间

- [ ] Task 3: 输入内容数据模型与AI内容加工流水线
  - [ ] SubTask 3.1: 后端设计InputContent数据模型（支持视频/音频/动画/对话/播客/vlog类型，多语言，多难度版本关联）
  - [ ] SubTask 3.2: 后端设计ContentFeatures数据模型（speechRate、vocabComplexity、sentenceComplexity、abstractness、visualSupportStrength、topicTags、duration、difficultyScore）
  - [ ] SubTask 3.3: AI Pipeline实现Whisper自动转录与分句（生成时间轴对齐的字幕文件）
  - [ ] SubTask 3.4: AI Pipeline实现难度分析与特征提取（语速计算、词汇复杂度评估、句式复杂度评估、主题抽象度评估、视觉辅助强度评分）
  - [ ] SubTask 3.5: AI Pipeline实现关键词与表达提取（高频词汇、关键表达、语法结构，关联上下文例句）
  - [ ] SubTask 3.6: AI Pipeline实现LLM多语言字幕生成（目标语言字幕+母语翻译，确保翻译自然）
  - [ ] SubTask 3.7: AI Pipeline实现慢速版生成（降速不变调音频处理）
  - [ ] SubTask 3.8: AI Pipeline实现简化版生成（LLM简化文本+TTS生成简化音频）
  - [ ] SubTask 3.9: AI Pipeline实现自动打标（场景标签、兴趣标签、视觉辅助评分、推荐适配区间）
  - [ ] SubTask 3.10: 后端实现内容入库API（提交原始URL触发AI Pipeline处理，异步回调更新处理状态）

- [ ] Task 4: 可理解性评分引擎（平台灵魂）
  - [ ] SubTask 4.1: 后端实现UserAcquisitionProfile完整CRUD与更新逻辑（所有画像维度的读写）
  - [ ] SubTask 4.2: AI Pipeline实现comprehensionScore计算模型（基于UserAcquisitionProfile与ContentFeatures的多维度加权评分，输出0-1分数）
  - [ ] SubTask 4.3: AI Pipeline实现i+1区间判定逻辑（score 0.8-0.92为i+1区间，<0.8太难，>0.92太简单）
  - [ ] SubTask 4.4: 后端实现评分动态修正逻辑（根据用户实际行为信号修正comprehensionScore，更新UserAcquisitionProfile）
  - [ ] SubTask 4.5: 后端实现用户行为信号采集API（接收前端上报的replayCount、subtitleUsage、pauseFrequency、shadowingBehavior、sessionCompletion等信号）

- [ ] Task 5: 持续可理解输入流（Input Feed）
  - [ ] SubTask 5.1: 后端实现输入流推荐API（基于可理解性评分引擎，返回i+1区间内的内容列表，支持分页和兴趣主题筛选）
  - [ ] SubTask 5.2: 后端实现输入流动态续推逻辑（根据用户实时行为信号调整下一条推荐难度）
  - [ ] SubTask 5.3: 前端实现输入流首页（沉浸式内容流，类似短视频Feed，无限下滑，内容卡片展示缩略图/波形、时长、主题标签）
  - [ ] SubTask 5.4: 前端实现兴趣主题筛选组件（美食、旅行、职场、科普、日常、音乐等标签切换）
  - [ ] SubTask 5.5: 前端实现"继续沉浸"入口（恢复上次沉浸位置，降低重新开始摩擦）

- [ ] Task 6: 沉浸式输入播放器（平台最重要页面）
  - [ ] SubTask 6.1: 前端实现播放器核心框架（全屏播放、播放/暂停、进度拖拽、音量控制、响应式布局）
  - [ ] SubTask 6.2: 前端实现播放速度调节（0.5x-2.0x，降速不变调，使用Web Audio API或time-stretching库）
  - [ ] SubTask 6.3: 前端实现AB循环播放（用户选择区间，循环播放直到完全理解）
  - [ ] SubTask 6.4: 前端实现自动句块切分（基于字幕时间轴按句切分，逐句前进/后退/重复播放）
  - [ ] SubTask 6.5: 前端实现智能字幕系统（目标语言字幕、母语翻译字幕可选、字幕透明度渐隐滑块、点击字幕词弹出上下文释义）
  - [ ] SubTask 6.6: 前端实现字幕渐隐机制（根据字幕查看频率自动建议降低透明度，引导脱离字幕依赖）
  - [ ] SubTask 6.7: 前端实现仅音频模式（隐藏视频画面，保留音频+字幕，适配视频→纯音频过渡）
  - [ ] SubTask 6.8: 前端实现视觉辅助强度调节（高辅助：完整画面+动画提示；低辅助：纯音频+最小化画面）
  - [ ] SubTask 6.9: 前端实现跟读影子模式（每句播放后留跟读间隔，Web Speech API语音识别提示性反馈，仅"日常场景输入"及以上区间开放）
  - [ ] SubTask 6.10: 前端实现"帮我理解"AI解释功能（调用AI Companion生成简化目标语言解释）
  - [ ] SubTask 6.11: 前端实现沉浸输入完成反馈面板（本次有效输入时长、自然接触的表达列表，自动过渡下一条推荐）
  - [ ] SubTask 6.12: 前端实现行为信号采集上报（回放次数、字幕使用、暂停频率、跟读行为、会话完成度实时上报后端）

- [ ] Task 7: 多信号有效输入时长计算
  - [ ] SubTask 7.1: 后端实现有效输入时长计算模型（综合replayCount、subtitleUsage、pauseFrequency、shadowingBehavior、quickComprehensionChecks、selfRating、sessionCompletion多信号计算effectiveMinutes）
  - [ ] SubTask 7.2: 后端实现有效输入时长累计与查询API（总有效时长、今日有效时长、连续沉浸天数）
  - [ ] SubTask 7.3: 前端实现快速理解检查组件（沉浸输入中偶尔弹出轻量级理解检查，如"刚才那段大概讲了什么？"，非测试性质）
  - [ ] SubTask 7.4: 前端实现有效输入时长展示组件（核心指标展示，今日/累计/连续天数）

- [ ] Task 8: 语言发现与表达感知
  - [ ] SubTask 8.1: 后端实现表达浮现逻辑（从用户已听内容中提取高频表达，关联上下文例句，按出现频次排序）
  - [ ] SubTask 8.2: 后端实现表达深度探索API（查询某表达在用户已听内容中的所有出现实例、上下文场景、用法归纳）
  - [ ] SubTask 8.3: 后端实现语法结构自然感知API（查询某语法结构在已听内容中的多组例句，归纳式呈现）
  - [ ] SubTask 8.4: 后端实现表达收藏API（用户主动收藏表达，关联原始输入内容）
  - [ ] SubTask 8.5: 前端实现沉浸输入完成后的表达浮现面板（"你已经自然接触了"表达列表，每条关联上下文例句）
  - [ ] SubTask 8.6: 前端实现表达深度探索页面（某表达的所有实例、上下文场景、用法归纳）
  - [ ] SubTask 8.7: 前端实现"我的表达收藏"页面（收藏的表达列表，每条可回溯到原始听力场景）

- [ ] Task 9: 隐形阶段系统
  - [ ] SubTask 9.1: 后端实现阶段判定逻辑（基于有效输入时长+可理解性评分+行为信号，判定Stage 1/2/3）
  - [ ] SubTask 9.2: 后端实现区间过渡检测与触发逻辑（当用户行为信号持续满足高区间条件时，触发区间过渡）
  - [ ] SubTask 9.3: 后端实现功能按区间开放逻辑（不同区间开放不同功能：跟读影子/AI对话/语伴匹配等）
  - [ ] SubTask 9.4: 前端实现区间中性展示组件（"当前输入区间"：慢速视觉辅助输入/日常场景输入/自然母语输入，不使用等级词汇）
  - [ ] SubTask 9.5: 前端实现区间过渡提示（"你的输入世界正在扩展"，展示新解锁内容类型和功能）
  - [ ] SubTask 9.6: 前端实现低区间功能温和提示（尝试使用高区间功能时，提示"多听就好"，不强制阻止）

- [ ] Task 10: AI沉浸式陪伴教师
  - [ ] SubTask 10.1: AI Pipeline实现AI Companion对话引擎（基于用户输入历史和当前水平，用目标语言进行可理解性对话，语速和词汇适配用户水平）
  - [ ] SubTask 10.2: AI Pipeline实现AI表达解释功能（用简化目标语言解释复杂表达，而非母语翻译）
  - [ ] SubTask 10.3: AI Pipeline实现AI推荐解释功能（用目标语言说明推荐理由）
  - [ ] SubTask 10.4: AI Pipeline实现AI鼓励消息生成（基于用户里程碑和沉浸习惯，生成个性化鼓励消息）
  - [ ] SubTask 10.5: 后端实现AI Companion API（WebSocket实时对话，对话历史管理）
  - [ ] SubTask 10.6: 前端实现AI Companion对话界面（聊天气泡式，支持语音输入和文字输入，仅"日常场景输入"及以上区间开放）
  - [ ] SubTask 10.7: 前端实现AI鼓励消息通知（里程碑和沉浸习惯达标时弹出AI个性化鼓励）

- [ ] Task 11: 陪伴型社区
  - [ ] SubTask 11.1: 后端实现社区数据模型（Post、Comment、Group、PartnerMatch），评论内容过滤规则（禁止纠错类和能力比较类）
  - [ ] SubTask 11.2: 后端实现输入体验分享API（发布、查询、共鸣、鼓励、推荐互动）
  - [ ] SubTask 11.3: 后端实现沉浸伙伴匹配API（"自然母语输入"区间用户匹配，基于目标语言+兴趣+时段偏好）
  - [ ] SubTask 11.4: 后端实现沉浸小组API（创建、加入、共同沉浸打卡、主题输入挑战、互相推荐内容）
  - [ ] SubTask 11.5: 前端实现社区首页（输入体验分享流，共鸣/鼓励/推荐互动按钮，无纠错无比较）
  - [ ] SubTask 11.6: 前端实现沉浸伙伴匹配页面（匹配结果、交流引导、话题建议）
  - [ ] SubTask 11.7: 前端实现沉浸小组页面（小组列表、创建/加入、打卡、主题挑战、内容推荐）

- [ ] Task 12: 成就激励系统
  - [ ] SubTask 12.1: 后端实现成就数据模型与触发逻辑（沉浸里程碑50h/100h/300h/600h/1000h、连续沉浸7/30/100天、输入世界扩展）
  - [ ] SubTask 12.2: 后端实现成就查询API（已获得/未获得成就及进度、沉浸轨迹时间线）
  - [ ] SubTask 12.3: 前端实现成就展示页面（徽章列表、成就进度、沉浸轨迹时间线，文案强调"自然习得"）
  - [ ] SubTask 12.4: 前端实现成就弹窗通知（获得新成就时弹出庆祝动画+里程碑意义说明）

- [ ] Task 13: 学习主页、导航与个人中心
  - [ ] SubTask 13.1: 前端实现沉浸主页（输入流为核心入口，今日精选、有效输入时长概览、连续沉浸天数、"继续沉浸"入口）
  - [ ] SubTask 13.2: 前端实现全局导航（底部/侧边导航：沉浸、发现、进度、社区、我的，"沉浸"入口最突出）
  - [ ] SubTask 13.3: 前端实现个人中心页面（个人信息、目标语言设置、兴趣偏好调整、输入区间展示、沉浸统计摘要）
  - [ ] SubTask 13.4: 前端实现进度页面（有效输入时长核心指标、今日/累计/连续天数、沉浸轨迹图表）
  - [ ] SubTask 13.5: 前端实现响应式布局（适配桌面和移动端，沉浸式播放器全屏适配）

- [ ] Task 14: 种子数据与端到端验证
  - [ ] SubTask 14.1: 编写种子数据脚本（英语/日语/韩语示范输入内容元数据、AI Pipeline预处理结果、成就定义）
  - [ ] SubTask 14.2: 端到端流程验证（注册→初始评估→输入流浏览→沉浸播放→行为信号采集→有效输入计算→表达浮现→区间过渡→AI陪伴→社区→成就）

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 4] depends on [Task 2, Task 3]
- [Task 5] depends on [Task 3, Task 4]
- [Task 6] depends on [Task 5]
- [Task 7] depends on [Task 4, Task 6]
- [Task 8] depends on [Task 3, Task 6]
- [Task 9] depends on [Task 4, Task 7]
- [Task 10] depends on [Task 4, Task 6]
- [Task 11] depends on [Task 2, Task 9]
- [Task 12] depends on [Task 7, Task 9]
- [Task 13] depends on [Task 5, Task 6, Task 7, Task 8]
- [Task 14] depends on [Task 1 ~ Task 13]

# Parallelizable Work
- Task 2 与 Task 3 可并行（用户系统与内容流水线独立）
- Task 7、Task 8、Task 9 可并行（有效输入计算、语言发现、阶段系统相互独立）
- Task 10、Task 11、Task 12 可并行（AI陪伴、社区、成就系统独立）
