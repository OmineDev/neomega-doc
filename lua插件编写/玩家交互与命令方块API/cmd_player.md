---
lang: zh-CN
title: 玩家交互
description: 命令示例
---

# 玩家交互&聊天和命令块消息监听相关 API

## 获取玩家对象

### 通过名字或 uuid 获取

- get_player(uuid_string_or_name)
  - 范围：任意
  - 说明：获取指定名字或 uuid 的玩家对象
  - 参数：
    - name:玩家名
  - 返回值:player 对象
  ```lua
  local player = coromega:get_player("2401pt")
  local player = coromega:get_player("xxxxxxxx")
  ```

### 通过名字获取玩家对象

- get_player_by_name(player_name)
  - 范围：任意
  - 说明：获取指定名字的获取玩家对象
  - 参数：
    - player_name:玩家名
  - 返回值：玩家对象
  ```lua
  local player = coromega:get_player_by_name("2401pt")
  ```

### 通过 uuid 获取玩家对象

- get_player_by_uuid_string(uuid_string)
  - 范围：任意
  - 说明：获取指定 uuid 的玩家对象
  - 参数：
    - uuid_string:uuid 字符串
  - 返回值：玩家对象
  ```lua
  local player = coromega:get_player_by_uuid_string("xxxxxxxx")
  ```

## 获取所有在线玩家对象

- get_all_online_players()
  - 范围：任意
  - 说明：获取所有在线玩家的玩家对象
  - 参数：无
  - 返回值：玩家对象数组
  ```lua
  local players = coromega:get_all_online_players()
  ```

## 接收命令消息事件

- when_receive_msg_from_command_block_named(command_block_name)
  - 范围：任意
  - 说明：当收到命令块消息时，启动一个新协程并执行指定函数
  - 参数：
    - command_block_name:命令块名字
  - 返回值：监听器 -含有方法:start_new(function)
    > 允许在监听器触发时启动函数并且放入新的协程
  ```lua
  -- 命令块命名为 "扫地机"，指令为 tell 机器人名字 去扫地
  -- 当收到命令块的消息时，执行回调
  coromega:when_receive_msg_from_command_block_named("扫地机"):start_new(function(chat)
      coromega:log_and_print(("command block (%s) chat: %s"):format("扫地机", json.encode(chat)))
  end)
  ```

## 实体消息事件

- when_receive_msg_from_sender_named(name)
  - 范围：任意
  - 说明：当收到指定名字的消息时，这个名字可以是物品名，启动一个新协程并执行指定函数
  - 参数：
    - name:发送者名字
  - 返回值：监听器 -含有方法:start_new(function)
    > 允许在监听器触发时启动函数并且放入新的协程
  ```lua
  -- 命令块指令为 execute @e[type=snowball] ~ ~ ~ tell 机器人名字 @p[r=3]
  -- 当收到命令块的消息时，执行回调
  coromega:when_receive_msg_from_sender_named("雪球"):start_new(function(chat)
      coromega:log_and_print(("item (%s) chat: %s"):format("雪球", json.encode(chat)))
  end)
  ```

## 聊天消息事件

- when_chat_msg()
  - 范围：任意
  - 说明：当收到聊天消息时，启动一个新协程并执行指定函数
  - 返回值：监听器 -含有方法:start_new(function)
    > 允许在监听器触发时启动函数并且放入新的协程
  ```lua
  coromega:when_chat_msg():start_new(function(chat)
      coromega:log_and_print(("chat sender: %s > %s"):format(chat.name, json.encode(chat)))
  end)
  ```

## 玩家在线状态变化事件

- when_player_change()
  - 范围：任意
  - 当玩家的在线情况发生变化时，启动一个新协程并执行指定函数
  - 返回值：监听器 -含有方法:start_new(function)
    > 允许在监听器触发时启动函数并且放入新的协程
    > player 是一个玩家对象
  ```lua
  coromega:when_player_change():start_new(function(player, action)
      if action == "exist" then
          coromega:log_and_print(("player %s 已经在线"):format(player:name()))
      elseif action == "online" then
          coromega:log_and_print(("player %s 新上线"):format(player:name()))
      elseif action == "offline" then
          coromega:log_and_print(("player %s 下线"):format(player:name()))
      end
  end)
  ```

## player 对象的函数

### 发送消息

- say(msg)
  - 范围：任意
  - 说明：向指定玩家来发送消息
  - 参数：
    - msg:消息字符串
  - 返回值：无
  ```lua
  player:say("hello")
  ```

### 发送 tell

- raw_say(msg)
  - 范围：任意
  - 说明：向指定玩家来发送 tell raw 消息，这个消息应当是一个对象
  - 参数：
    - msg: 对象，被 json.encode 之后应该符合 tell raw 的规范
  - 返回值：无
  ```lua
  player:raw_say({rawtext={{text="hello world"}}})
  ```

### 获取输入

- ask(hint,timeout)
  - 范围：协程内
  - 说明：获取指定玩家的输入
  - 参数：
    - hint:提示给玩家的信息
    - timeout:输入超时，超时时返回为 nil
  - 返回值：输入的内容
  ```lua
  local input = player:ask("请输入：")
  local input = player:ask("请输入：",6.2)
  if input ==nil then
      coromega:print("timeout!")
  else
      coromega:print(input)
  end
  ```

### 发送标题（title）

- title(title,subtitle)
  - 范围：任意
  - 说明：发送标题
  - 参数：
    - title:标题
    - subtitle:副标题
  - 返回值：无
  ```lua
  player:title("hello","world")
  ```

### 发送副标题

- subtitle(subtitle,title)
  - 范围：任意
  - 说明：发送副标题 如果主标题为 nil 则不会显示 subtitle
  - 参数：
    - subtitle:副标题
    - title:标题
  - 返回值：无
  ```lua
  player:subtitle("world","hello")
  ```

### 发送 action_bar

- action_bar(msg)
  - 范围：任意
  - 说明：发送 actionbar
  - 参数：
    - msg:消息
  - 返回值：无
  ```lua
  player:action_bar("hi")
  ```

### 获得玩家坐标和维度

- get_pos()
  - 范围：协程内
  - 说明：获得玩家坐标和维度 (实际上是 query player 的包装)
  - 返回值:{position:{x:float,y:float,z=float},dimension:int}
  ```lua
  local pos = player:get_pos().position
  local x = math.floor(pos.x)
  local y = math.floor(pos.y)
  local z = math.floor(pos.z)
  local dimension=player:get_pos().dimension
  coromega:print(dimension)
  ```

### 判断玩家条件

- check(conditions)
  - 范围：协程内
  - 说明：检查玩家是否满足条件 为条件限制器效果:@a[xxxxxxxx]
  - 参数：
    - conditions:条件字符串 列如:{ "m=c", "tag=!no_omega","tag=!ban" }
      其会被拼装为指令 querytarget @a[name=玩家名，m=c,tag=!no_omega,tag=!ban]
  - 返回值：是否满足条件
  ```lua
  local result = player:check({ "m=c", "tag=!ban", "tag=!ban" })
  local result = player:check({ "m=c"})
  ```

### 获取玩家 uuid

- uuid_string()
  - 范围：协程内
  - 说明：获取玩家的 uuid 字符串
  - 参数：无
  - 返回值:uuid 字符串，是否获得该信息
  ```lua
  local uuid = player:uuid_string()
  local uuid,found = player:uuid_string()
  ```

### 获取玩家名字

- name()
  - 范围：协程内
  - 说明：获取玩家的名字
  - 参数：无
  - 返回值：玩家名，是否获得该信息
  ```lua
  local name = player:name()
  local name,found = player:name()
  ```

### 获取玩家 id

- entity_unique_id()
  - 范围：协程内
  - 说明：获取玩家的实体唯一 id
  - 参数：无
  - 返回值：实体唯一 id，是否获得该信息
  ```lua
  local id = player:entity_unique_id()
  local id,found = player:entity_unique_id()
  ```

### 获取玩家登录时间

- login_time()
  - 范围：协程内
  - 说明：获取玩家的登录时间 (unix time)，其类型与 :now() 一致，单位秒
  - 参数：无
  - 返回值：登录时间，是否获得该信息
  ```lua
  local time = player:login_time()
  local time,found = player:login_time()
  ```

### 获取玩家平台聊天 id

- platform_chat_id()
  - 范围：协程内
  - 说明：获取玩家的平台聊天 id
  - 参数：无
  - 返回值：平台聊天 id，是否获得该信息
  ```lua
  local id = player:platform_chat_id()
  local id,found = player:platform_chat_id()
  ```

### 获取玩家皮肤 id

- skin_id()
  - 范围：协程内
  - 说明：获取玩家的皮肤 id
  - 参数：无
  - 返回值：皮肤 id，是否获得该信息
  ```lua
  local id = player:skin_id()
  local id,found = player:skin_id()
  ```

### 获取玩家设备 id

- device_id()
  - 范围：协程内
  - 说明：获取玩家的设备 id
  - 参数：无
  - 返回值：设备 id，是否获得了该信息
  ```lua
  local id,found = player:device_id()
  ```

### 获取玩家 runtimeId

- entity_runtime_id()
  - 范围：协程内
  - 说明：获取玩家实体的 runtime_id
  - 参数：无
  - 返回值:runtime_id，是否获得了该信息
  ```lua
  local id,found = player:entity_runtime_id()
  ```

### 获取玩家实体元数据

- entity_metadata()
  - 范围：协程内
  - 说明：获取玩家实体的元数据，是否获得了该信息
  - 参数：无
  - 返回值：元数据
  ```lua
  local metadata, found = player:entity_metadata()
  ```

### 读取玩家放置方块权限

- get_build_ability()
  - 范围：协程内
  - 说明：获取玩家放置方块权限，是否获得该信息
  - 参数：无
  - 返回值：元数据
  ```lua
  local can_build_or_place_blocks, found = player:get_build_ability()
  ```

### 设置玩家放置方块权限

- set_build_ability(allow)
  - 范围：协程内
  - 说明：设置玩家放置方块权限
  - 参数：无
  - 返回值：元数据
  ```lua
  player:set_build_ability(true)
  ```

### 读取玩家破坏方块权限

- get_mine_ability()
  - 范围：协程内
  - 说明：获取玩家破坏方块权限，是否获得该信息
  - 参数：无
  - 返回值：元数据
  ```lua
  local can_mine_or_break_blocks, found = player:get_mine_ability()
  ```

### 设置玩家破坏方块权限

- set_mine_ability(allow)
  - 范围：协程内
  - 说明：设置玩家破坏方块权限
  - 参数：无
  - 返回值：元数据
  ```lua
  player:set_mine_ability(true)
  ```

### 读取玩家操作门和开关权限

- get_door_and_switches_ability()
  - 范围：协程内
  - 说明：获取玩家操作门和开关权限，是否获得该信息
  - 参数：无
  - 返回值：元数据
  ```lua
  local can_interact_with_door_and_switches, found = player:get_door_and_switches_ability()
  ```

### 设置玩家操作门和开关权限

- set_door_and_switches_ability(allow)
  - 范围：协程内
  - 说明：设置玩家操作门和开关权限
  - 参数：无
  - 返回值：元数据
  ```lua
  player:set_door_and_switches_ability(true)
  ```

### 读取玩家打开容器权限

- get_open_container_ability()
  - 范围：协程内
  - 说明：获取玩家打开容器权限，是否获得该信息
  - 参数：无
  - 返回值：元数据
  ```lua
  local can_open_container, found = player:get_open_container_ability()
  ```

### 设置玩家打开容器权限

- set_open_container_ability(allow)
  - 范围：协程内
  - 说明：设置玩家打开容器权限
  - 参数：无
  - 返回值：元数据
  ```lua
  player:set_open_container_ability(true)
  ```

### 读取玩家攻击其他玩家权限

- get_attack_player_ability()
  - 范围：协程内
  - 说明：获取玩家攻击其他玩家权限，是否获得该信息
  - 参数：无
  - 返回值：元数据
  ```lua
  local can_attack_player, found = player:get_attack_player_ability()
  ```

### 设置玩家攻击其他玩家权限

- set_attack_player_ability(allow)
  - 范围：协程内
  - 说明：设置玩家攻击其他玩家权限
  - 参数：无
  - 返回值：元数据
  ```lua
  player:set_attack_player_ability(true)
  ```

### 读取玩家攻击生物权限

- get_attack_mobs_ability()
  - 范围：协程内
  - 说明：获取玩家攻击生物权限，是否获得该信息
  - 参数：无
  - 返回值：元数据
  ```lua
  local can_attack_mobs, found = player:get_attack_mobs_ability()
  ```

### 设置玩家攻击生物权限

- set_attack_mobs_ability(allow)
  - 范围：协程内
  - 说明：设置玩家攻击生物权限
  - 参数：无
  - 返回值：元数据
  ```lua
  player:set_attack_mobs_ability(true)
  ```

### 读取玩家命令权限 (同 op 权限)

- get_operator_command_ability()
  - 范围：协程内
  - 说明：获取玩家命令权限 (同 op 权限)，是否获得该信息
  - 参数：无
  - 返回值：元数据
  ```lua
  local can_send_operator_command, found = player:get_operator_command_ability()
  ```

### 设置玩家命令权限

- set_operator_command_ability(allow)
  - 范围：协程内
  - 说明：设置玩家命令权限
  - 参数：无
  - 返回值：元数据
  ```lua
  player:set_operator_command_ability(true)
  ```

### 读取玩家传送权限

- get_teleport_ability()
  - 范围：协程内
  - 说明：获取玩家传送权限，是否获得该信息
  - 参数：无
  - 返回值：元数据
  ```lua
  local can_teleport, found = player:get_teleport_ability()
  ```

### 设置玩家传送权限

- set_teleport_ability(allow)
  - 范围：协程内
  - 说明：设置玩家传送权限
  - 参数：无
  - 返回值：元数据
  ```lua
  player:set_teleport_ability(true)
  ```

### 读取玩家飞行状态

- get_flying_status()
  - 范围：协程内
  - 说明：获取玩家飞行状态，是否获得该信息
  - 参数：无
  - 返回值：元数据
  ```lua
  local is_flying, found = player:get_flying_status()
  ```

### 读取玩家无敌 (不受伤害) 状态

- get_invulnerable_status()
  - 范围：协程内
  - 说明：获取玩家无敌 (不受伤害)，是否获得该信息
  - 参数：无
  - 返回值：元数据
  ```lua
  local is_invulnerable, found = player:get_invulnerable_status()
  ```

### 判断是否为 op

- is_op()
  - 范围：协程内
  - 说明：判断玩家是否为 op
  - 参数：无
  - 返回值：是否为 op，是否获得该信息
  ```lua
  local result = player:is_op()
  local result,found = player:is_op()
  ```

### 判断是否在线

- is_online()
  - 范围：协程内
  - 说明：判断玩家是否在线
  - 参数：无
  - 返回值：是否在线
  ```lua
  local result = player:is_online()
  ```
