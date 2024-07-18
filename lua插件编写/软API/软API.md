---
lang: zh-CN
title: 软API
description: 软API
---

# 软 API

出于一些原因，例如版本控制问题，跨进程问题，api 提供者并非底层框架而是框架内组件，
一些 api 没有被包装成函数形式以便调用

而是以软 api 形式供调用

在使用它们时，你可以把它理解为类似发往服务器的 json 请求的概念

事实上，使用跨插件 api when_called_by_api_named 创建的 api 同样也是一个跨进程的软 api


## HashedUserID
用户 Token 的哈希 (若没有 Token 此项为空，注意，可能随验证服务器密码改变而改变)
``` lua
local hashed_user_id, found = coromega:soft_get("HashedUserID")
coromega:print("hashed_user_id", hashed_user_id)
```

## HashedServerCode
用户 服务器号 的哈希
```lua
local hashed_server_code, found = coromega:soft_get("HashedServerCode")
coromega:print("hashed_server_code", hashed_server_code)
```

## GetNameRecord
使用一个准确的名字请求与之关联的历史或者现在的名字
    - in: {"current_name":string}
    - out {"history_names":[]string}
``` lua
    local ret, err = coromega:call_other_plugin_api("GetNameRecord", {
        ["current_name"] = "FBot_cb7826",
    })
    coromega:print("ret: ", json.encode(ret))
    coromega:print("err: ", json.encode(err))
```

## SearchForName
使用一个名字或名字内的片段，例如 使用 "40" 搜索出 "2401PT", 会搜索玩家的历史名字

- in: {
        "part_of_name":string,
        "max_results":int  // 最大返回数量
    }

- out:  {"possible_names":[]{
            "current":string,  // 当前名
            "history":string   // 历史名 (如果命中历史名)
        }
    }
``` lua
    local ret, err = coromega:call_other_plugin_api("SearchForName", {
        ["part_of_name"] = "401P",
        ["max_results"] = 4,
    })
    coromega:print("ret: ", json.encode(ret)) -- {"possible_names":[{"current":"2401PT","history":"2401PT"}]}
    coromega:print("err: ", json.encode(err))
```
