---
lang: zh-CN
title: 命令
description: 命令示例
---

# 命令收发相关 API

## 以 wo 身份发送命令

- send_wo_cmd(cmd)
  - 范围：任意
  - 说明：以 wo 身份发送 setting command 命令 没有返回值，部分指令使用此方法发送是无效的
  - 参数：
    - cmd:命令字符串
  - 示例：

```lua
  coromega:send_wo_cmd("say hello")
```

## 以 websocket 身份发送命令

- send_ws_cmd(cmd,get_result,timeout)

  - 范围：协程内
  - 说明：以 websocket 身份发送命令 当 get_result 为 true 时 ,会返回命令执行结果 否则返回 nil

    > 部分指令没有返回值，如果此时将 get_result 设为为 true, 可能导致程序卡死<br>
    > 例如 say

  - 参数：
    - cmd:命令字符串
    - get_result:是否获取返回值
  - 返回值：返回命令返回结果 json 字符串
  - 示例：

```lua
  coromega:send_ws_cmd("tp @s ~~~") -- get_result 为 false 或者空时没有返回值
  local result = coromega:send_ws_cmd("tp @s ~~~",true)
  coromega:print(json.encode(result)) -- result 的结果是一个很复杂的结构

  local result = coromega:send_ws_cmd("tp 网易 ~~~",true,1.5)
  -- 当有 timeout 时，如果因为违禁词或者其他原因导致收不到消息的返回，则 result 为 nil
  if not result then
      coromega:print("服务器未响应指令，可能是因为指令存在违禁词")
  else
      coromega:print("结果：", json.encode(result))
  end
```

## 以玩家身份发送命令

- send_player_cmd(cmd,get_result,timeout)

  - 范围：协程内
  - 说明：以玩家身份发送命令 当 get_result 为 true 时，会返回命令执行结果 否则返回 nil

    > 部分指令没有返回值，如果此时将 get_result 设为为 true, 可能导致程序卡死<br>
    > 例如 say

  - 参数：
    - cmd:命令字符串
    - get_result:是否获取返回值
  - 示例：

```lua
  coromega:send_player_cmd("tp @s ~~~") -- get_result 为 false 或者空时没有返回值
  local result = coromega:send_player_cmd("tp @s ~~~",true)
  coromega:print(json.encode(result)) -- result 的结果是一个很复杂的结构

  local result = coromega:send_player_cmd("tp 网易 ~~~",true,1.5)
  -- 当有 timeout 时，如果因为违禁词或者其他原因导致收不到消息的返回，则 result 为 nil
  if not result then
      coromega:print("服务器未响应指令，可能是因为指令存在违禁词")
  else
      coromega:print("结果：", json.encode(result))
  end
```

## 以魔法指令身份发送命令

- send_ai_cmd(cmd,get_result,timeout)

  - 范围：协程内
  - 说明：以魔法指令身份发送命令 当 get_result 为 true 时，会返回命令执行结果 否则返回 nil

    > 部分指令没有返回值，如果此时将 get_result 设为为 true, 可能导致程序卡死<br>
    > 例如 say

  - 参数：
    - cmd:命令字符串
    - get_result:是否获取返回值
  - 示例：

```lua
  coromega:send_ai_cmd("tp @s ~~~") -- get_result 为 false 或者空时没有返回值
  local result = coromega:send_player_cmd("tp @s ~~~",true)
  coromega:print(json.encode(result)) -- result 的结果是一个很复杂的结构

  local result = coromega:send_ai_cmd("tp 网易 ~~~",true,1.5)
  -- 当有 timeout 时，如果因为违禁词或者其他原因导致收不到消息的返回，则 result 为 nil
  if not result then
      coromega:print("服务器未响应指令，可能是因为指令存在违禁词")
  else
      coromega:print("结果：", json.encode(result))
  end
```
