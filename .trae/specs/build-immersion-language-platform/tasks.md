# Tasks

- [ ] Task 1: 项目初始化与基础架构搭建
  - [ ] SubTask 1.1: 初始化前端项目（React + TypeScript + Vite），配置路由（React Router）、状态管理（Zustand）、UI框架（Tailwind CSS）
  - [ ] SubTask 1.2: 初始化后端项目（Node.js + Express + TypeScript），配置中间件（cors、body-parser）、项目结构（controllers/services/models/routes）
  - [ ] SubTask 1.3: 配置数据库（MongoDB + Mongoose），设计核心数据模型Schema（User、Course、Progress、Achievement、Community）
  - [ ] SubTask 1.4: 配置开发环境（ESLint、Prettier、concurrently前后端同启脚本）

- [ ] Task 2: 用户注册登录系统
  - [ ] SubTask 2.1: 后端实现用户注册API（邮箱+密码，bcrypt加密，JWT签发）
  - [ ] SubTask 2.2: 后端实现用户登录API（邮箱+密码验证，JWT签发）
  - [ ] SubTask 2.3: 后端实现JWT认证中间件，保护需登录的路由
  - [ ] SubTask 2.4: 前端实现注册页面（表单校验、错误提示、自动登录跳转）
  - [ ] SubTask 2.5: 前端实现登录页面（表单校验、JWT存储、跳转学习主页）
  - [ ] SubTask 2.6: 前端实现认证状态管理（Zustand store，自动token刷新，未登录重定向）

- [ ] Task 3: 三阶段分级课程体系
  - [ ] SubTask 3.1: 后端设计课程数据模型（Course、Lesson、Content），支持三阶段分级、多语种、难度标签
  - [ ] SubTask 3.2: 后端实现课程CRUD API（按语言、阶段、难度查询课程列表和详情）
  - [ ] SubTask 3.3: 后端实现内容难度分级引擎（基于语速、词汇复杂度、句式复杂度、主题抽象度计算难度分数）
  - [ ] SubTask 3.4: 前端实现课程首页（语言选择、三阶段展示、课程卡片列表）
  - [ ] SubTask 3.5: 前端实现课程详情页（课程介绍、课时列表、阶段说明、达标标准）
  - [ ] SubTask 3.6: 前端实现阶段说明页（各阶段核心目标、执行动作、绝对禁止、达标标准，沉浸式设计风格）

- [ ] Task 4: 听力训练模块（核心模块）
  - [ ] SubTask 4.1: 后端实现听力内容API（按阶段、难度、主题查询音频/视频内容）
  - [ ] SubTask 4.2: 前端实现听力训练播放器（音频/视频播放、逐段播放、重复播放、播放速度调节）
  - [ ] SubTask 4.3: 前端实现听懂率自评组件（每段内容播放后弹出"听懂了多少？"自评，80%以上计入有效输入时长）
  - [ ] SubTask 4.4: 后端实现有效输入时长记录API（接收听懂率自评，计算并记录有效输入时长）
  - [ ] SubTask 4.5: 前端实现字幕控制（阶段一禁用双语字幕、阶段二优先目标语言单字幕、阶段三减少字幕依赖）

- [ ] Task 5: 单词记忆模块
  - [ ] SubTask 5.1: 后端实现词汇提取逻辑（从用户已听内容中提取高频词汇，关联上下文场景）
  - [ ] SubTask 5.2: 后端实现词汇API（查询用户待学词汇、标记已习得词汇）
  - [ ] SubTask 5.3: 前端实现场景化单词卡片（展示单词在听力内容中的原句上下文，非孤立背诵）
  - [ ] SubTask 5.4: 前端实现词汇感知练习（通过上下文猜测词义、多例句归纳感知，非默写测试）

- [ ] Task 6: 语法练习模块
  - [ ] SubTask 6.1: 后端实现语法结构提取逻辑（从用户已听内容中提取语法结构，关联例句）
  - [ ] SubTask 6.2: 后端实现语法API（查询用户待感知语法点、标记已感知语法）
  - [ ] SubTask 6.3: 前端实现归纳式语法感知页面（展示大量例句，让用户自然感知语法规律，非规则背诵）
  - [ ] SubTask 6.4: 前端实现语法情境练习（在可理解输入中识别语法结构，非填空改错）

- [ ] Task 7: 口语跟读模块
  - [ ] SubTask 7.1: 后端实现跟读内容API（阶段二提供可选跟读内容，阶段三全面开放）
  - [ ] SubTask 7.2: 前端实现跟读播放器（播放原音→录制跟读→回放对比，支持逐句跟读）
  - [ ] SubTask 7.3: 前端集成Web Speech API进行语音识别，提供发音反馈（仅提示性，非纠错性）
  - [ ] SubTask 7.4: 前端实现阶段一静默期保护提示（温和提示"建议专注听力输入"，不强制阻止）

- [ ] Task 8: 学习进度追踪系统
  - [ ] SubTask 8.1: 后端实现进度数据模型（有效输入时长、阶段、每日统计、连续天数）
  - [ ] SubTask 8.2: 后端实现进度查询API（总有效时长、当前阶段、阶段进度、每日/每周统计）
  - [ ] SubTask 8.3: 后端实现阶段晋级判定逻辑（累计有效输入时长达标+晋级评估通过）
  - [ ] SubTask 8.4: 前端实现进度仪表盘（核心指标：有效输入时长、阶段进度环、连续天数streak）
  - [ ] SubTask 8.5: 前端实现学习时长统计图表（每日/每周有效输入时长趋势，使用Recharts）
  - [ ] SubTask 8.6: 后端实现学习连续性追踪（每日打卡记录、streak计算、断连重置逻辑）

- [ ] Task 9: 个性化学习路径推荐
  - [ ] SubTask 9.1: 后端实现初始水平评估测试逻辑（听力理解测试，确定初始阶段和起点）
  - [ ] SubTask 9.2: 后端实现i+1难度推荐引擎（基于用户当前水平+兴趣偏好+听懂率，计算推荐难度区间）
  - [ ] SubTask 9.3: 后端实现学习路径规划API（生成从当前水平到目标水平的完整路径）
  - [ ] SubTask 9.4: 前端实现水平评估测试页面（听力理解题，确定初始阶段）
  - [ ] SubTask 9.5: 前端实现兴趣偏好设置页面（主题选择：美食、旅行、职场、科普等）
  - [ ] SubTask 9.6: 前端实现个性化推荐页面（每日推荐内容、学习路径可视化、动态难度调整提示）

- [ ] Task 10: 社区交流系统
  - [ ] SubTask 10.1: 后端实现社区数据模型（Post、Comment、Group、PartnerMatch）
  - [ ] SubTask 10.2: 后端实现帖子CRUD API（发布、查询、点赞、评论，评论内容过滤纠错类内容）
  - [ ] SubTask 10.3: 后端实现语伴匹配API（阶段三用户匹配，基于目标语言和兴趣偏好）
  - [ ] SubTask 10.4: 后端实现学习小组API（创建、加入、小组打卡、进度展示）
  - [ ] SubTask 10.5: 前端实现社区首页（帖子列表、分类筛选、发布入口）
  - [ ] SubTask 10.6: 前端实现帖子详情页（内容展示、点赞、鼓励评论）
  - [ ] SubTask 10.7: 前端实现语伴匹配页面（匹配结果、交流引导、话题建议）
  - [ ] SubTask 10.8: 前端实现学习小组页面（小组列表、创建/加入、打卡、成员进度）

- [ ] Task 11: 成就激励系统
  - [ ] SubTask 11.1: 后端实现成就数据模型（Achievement定义、UserAchievement用户成就记录）
  - [ ] SubTask 11.2: 后端实现成就触发逻辑（里程碑时长、连续天数、阶段晋级时自动颁发）
  - [ ] SubTask 11.3: 后端实现成就查询API（已获得成就、未获得成就及进度、成长时间线）
  - [ ] SubTask 11.4: 前端实现成就展示页面（徽章列表、成就进度、成长时间线、里程碑意义说明）
  - [ ] SubTask 11.5: 前端实现成就弹窗通知（获得新成就时弹出庆祝动画，展示成就含义）

- [ ] Task 12: 学习主页与导航整合
  - [ ] SubTask 12.1: 前端实现学习主页（听力训练入口优先、今日推荐、进度概览、连续天数）
  - [ ] SubTask 12.2: 前端实现全局导航（侧边栏/底部导航：学习、课程、进度、社区、成就、个人中心）
  - [ ] SubTask 12.3: 前端实现个人中心页面（个人信息、目标语言设置、兴趣偏好、学习统计摘要）
  - [ ] SubTask 12.4: 前端实现响应式布局（适配桌面和移动端，确保学习体验一致性）

- [ ] Task 13: 种子数据与端到端验证
  - [ ] SubTask 13.1: 编写种子数据脚本（英语/日语/韩语三阶段示范课程、听力内容元数据、成就定义）
  - [ ] SubTask 13.2: 端到端流程验证（注册→评估→课程→听力训练→进度追踪→阶段晋级→社区→成就）

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 4] depends on [Task 3]
- [Task 5] depends on [Task 3, Task 4]
- [Task 6] depends on [Task 3, Task 4]
- [Task 7] depends on [Task 3]
- [Task 8] depends on [Task 2, Task 4]
- [Task 9] depends on [Task 2, Task 3, Task 8]
- [Task 10] depends on [Task 2, Task 8]
- [Task 11] depends on [Task 2, Task 8]
- [Task 12] depends on [Task 2, Task 3, Task 4, Task 8]
- [Task 13] depends on [Task 1 ~ Task 12]

# Parallelizable Work
- Task 2 与 Task 3 可并行开发（用户系统与课程体系独立）
- Task 5、Task 6、Task 7 可并行开发（三个学习模块相互独立）
- Task 10 与 Task 11 可并行开发（社区与成就系统独立）
