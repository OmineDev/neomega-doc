---
lang: zh-CN
title: 机器人和服务器信息
description: 机器人和服务器信息
---

# 机器人和服务器信息

## 机器人名称

- bot_name()
  - 范围：任意
  - 说明：获取机器人的名字
  - 参数：无
  - 返回：机器人的名字
  ```lua
  coromega:bot_name()
  ```

## 机器人 UUID

- bot_uuid_string()
  - 范围：任意
  - 说明：获取机器人的 UUID 的字符串形式
  - 参数：无
  - 返回：机器人的 UUID
  ```lua
  coromega:bot_uuid_string()
  ```

## 机器人 uniqueId

- bot_unique_id()
  - 范围：任意
  - 说明：获取机器人的 unique_id
  - 参数：无
  - 返回：ID 字符串
  ```lua
  coromega:bot_unique_id()
  ```

## 机器人 runtimeId

- bot_runtime_id()
  - 范围：任意
  - 说明：获取机器人的 runtimeid
  - 参数：无
  - 返回：机器人的 runtimeid
  ```lua
  coromega:bot_runtime_id()
  ```

## 机器人身份

- bot_identity()
  - 范围：任意
  - 说明：获取机器人的身份
  - 参数：无
  - 返回：机器人的身份
  ```lua
  coromega:bot_identity()
  ```

## 机器人当前维度

- coromega:bot_dimension()
  - 范围：任意
  - 说明：获取机器人维度
  - 参数：无
  - 返回：维度 (0,1,2), 是否成功获得
  ```lua
  coromega:print("bot_dimension", coromega:bot_dimension())
  local dimension,ok=coromega:bot_dimension()
  local dimension=coromega:bot_dimension()
  ```

## 服务器当前 tick

- coromega:current_tick()
  - 范围：任意
  - 说明：获取服务器当前 tick
  - 参数：无
  - 返回：tick, 是否成功获得
  ```lua
  coromega:print("current_tick", coromega:current_tick())
  ```

## 服务器当前运行速度 (同步率)

- coromega:sync_ratio()
  - 范围：任意
  - 说明：获取服务器当前运行速度 (服务器实际 tps/20)
  - 参数：无
  - 返回：同步率，是否成功获得
  ```lua
  coromega:print("sync_ratio", coromega:sync_ratio())
  ```

## 服务器 gamerules 列表

- coromega:game_rules()
  - 范围：任意
  - 说明：获取服务器 gamerules 列表
  - 参数：无
  - 返回：gamerules, 是否成功获得
  ```lua
  coromega:print("game_rules", coromega:game_rules())
  -- 看起来像是这样 game_rules {"commandblockoutput":"true","commandblocksenabled":"false","dodaylightcycle":"false","doentitydrops":"true","dofiretick":"true","doimmediaterespawn":"false","doinsomnia":"true","domobloot":"true","domobspawning":"true","dotiledrops":"true","doweathercycle":"false","drowningdamage":"true","falldamage":"true","firedamage":"true","freezedamage":"true","functioncommandlimit":"20000","keepinventory":"false","maxcommandchainlength":"131070","mobgriefing":"true","naturalregeneration":"true","pvp":"true","randomtickspeed":"2","respawnblocksexplode":"true","sendcommandfeedback":"true","showbordereffect":"true","showcoordinates":"true","showdeathmessages":"true","showtags":"true","spawnradius":"10","tntexplodes":"true"} true
  ```

## 服务器时间

- coromega:server_time()
  - 范围：任意
  - 说明：获取服务器时间
  - 参数：无
  - 返回：server_time, 是否成功获得
  ```lua
  coromega:print("server_time", coromega:server_time())
  ```

## 服务器一个昼夜内的时间

- coromega:server_day_time()
  - 范围：任意
  - 说明：获取服务器一个昼夜内的时间
  - 参数：无
  - 返回：server_time, 是否成功获得
  ```lua
  coromega:print("server_day_time", coromega:server_day_time())
  ```

## 服务器白天/黑夜信息

- coromega:server_day_percent()
  - 范围：任意
  - 说明：获取服务器白天/黑夜信息 (使用一个 0 ～ 1 之间的数字表示一天过去了多少)
  - 参数：无
  - 返回：day_percent, 是否成功获得
  ```lua
  coromega:print("server_day_percent", coromega:server_day_percent())
  ```

## 机器人当前位置

- coromega:bot_position()
  - 范围：任意
  - 说明：获取机器人当前位置 (omega 内部维护的值)
  - 参数：无
  - 返回：x, y, z, 距离上次服务器明确报告位置到目前的 tick
  ```lua
  local x, y, z, out_of_sync_tick = coromega:bot_position()
  coromega:print("bot_position", x, y, z, out_of_sync_tick)
  ```

## 机器人发言

- bot_say(msg)
  - 范围：任意
  - 说明：让机器人说话 和普通玩家说话是一样的效果
  - 参数：
    - msg: 机器人要说的话
  - 返回：无
  ```lua
  coromega:bot_say("Hello World!")
  ```
